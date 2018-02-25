<template>
  <div>
    <div class="card-content">
      <h4>Preferencias de los desarrolladores</h4>
      <p>Eso es una encuesta para determinar de una vez por todas cuáles son las preferencias de los desarrolladores de software del mundo</p>
    </div>
    <div
      class="card-action"
      style="overflow: hidden">
      <h5><span class="e2e-response-today">{{ countResponseForToday }}</span> {{ countResponseForToday > 1 ? 'respuestas' : 'respuesta' }} hoy</h5>
      <br>
      <h5>Distribucion de las respuestas</h5>
      <response
        :title="titles.spacesVsTabs"
        :data1="{ label: 'Spaces', value: countResponseLabel('Spaces') }"
        :data2="{ label: 'Tabs', value: countResponseLabel('Tabs') }"/>
      <response
        :title="titles.cSharpVsJava"
        :data1="{ label: 'C#', value: countResponseLabel('C#') }"
        :data2="{ label: 'Java', value: countResponseLabel('Java') }"/>
      <response
        :title="titles.reactVsAngular"
        :data1="{ label: 'React', value: countResponseLabel('React') }"
        :data2="{ label: 'Angular', value: countResponseLabel('Angular') }"/>
      <response
        :title="titles.compiledVsInterpreted"
        :data1="{ label: 'Compilado', value: countResponseLabel('Compilado') }"
        :data2="{ label: 'Interpretado', value: countResponseLabel('Interpretado') }"/>
      <response
        :title="titles.sqlVsDoc"
        :data1="{ label: 'SQL', value: countResponseLabel('SQL') }"
        :data2="{ label: 'Document', value: countResponseLabel('Document') }"/>
      <br>
      <h5>Todas las respuestas</h5>
      <div style="overflow-x: scroll">
        <table class="striped">
          <thead>
            <tr>
              <th
                v-for="(key, index) in Object.keys(titles)"
                :key="index">
                {{ titles[key] }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(response,index) in sortedByDateResponses"
              :key="response.key">
              <td>{{ response.userName }}</td>
              <td>{{ new Date(response.date).toLocaleDateString() }}</td>
              <td>{{ response.spacesVsTabs }}</td>
              <td>{{ response.cSharpVsJava }}</td>
              <td>{{ response.reactVsAngular }}</td>
              <td>{{ response.compiledVsInterpreted }}</td>
              <td>{{ response.sqlVsDoc }}</td>
              <div
                v-if="index === sortedByDateResponses.length - 1"
                :username="response.username"
                :data-values="`['${response.spacesVsTabs}', '${response.cSharpVsJava}', '${response.reactVsAngular}', '${response.compiledVsInterpreted}', '${response.sqlVsDoc}']`"
                class="e2e-last-result"/>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import response from '@/components/Response'
import { db } from '../firebase'

export default {
  components: {
    response
  },
  data () {
    return {
      responses: {},
      titles: {
        userName: 'Nombre de usuario',
        date: 'Fecha',
        spacesVsTabs: 'Space o Tabs',
        cSharpVsJava: 'C# o Java',
        reactVsAngular: 'React o Angular',
        compiledVsInterpreted: 'Compilado o Interpretado',
        sqlVsDoc: 'Sql o Document'
      }
    }
  },
  computed: {
    countResponseForToday: function () {
      let count = 0
      this.responses.forEach(response => {
        let yesterday = Date.now() - 24 * 3600 * 1000
        if (response.date > yesterday) {
          count++
        }
      })
      return count
    },

    sortedByDateResponses: function () {
      var reponse = this.responses // no side effect lint rule
      return reponse.sort((a, b) => {
        if (a.date < b.date) {
          return -1
        }
        if (a.date > b.date) {
          return 1
        }
        return 0
      })
    }
  },

  methods: {
    countResponseLabel (value) {
      let counter = 0
      this.responses.forEach(response => {
        let responseKey = Object.keys(response)
        responseKey.forEach(key => {
          if (response[key] === value) {
            counter++
          }
        })
      })
      return counter
    }
  },

  firebase: {
    responses: {
      source: db.ref('responses'),
      cancelCallback (err) {
        console.error(err)
      }
    }
  }
}
</script>

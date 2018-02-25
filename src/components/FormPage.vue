<template>
  <div>
    <div class="card-content">
      <h4>Preferencias de los desarrolladores</h4>
      <p>Eso es una encuesta para determinar de una vez por todas cuáles son las preferencias de los desarrolladores de software del mundo</p>
    </div>
    <div
      v-if="!submitedYet"
      class="card-action"
    >
      <form
        class="e2e-form"
        @submit="submitForm"
      >
        <div class="input-field">
          <input
            id="name"
            v-model="userName"
            :class="{'validate e2e-username': errors.length === 0, 'validate e2e-username invalid': errors.length !== 0}"
            placeholder="Tu respuesta"
            type="text"
            required>
          <label for="first_name">Indica tu nombre</label>
        </div>
        <div
          v-for="question in questions"
          :key="question.id"
          class="radio radioRequired">
          <div :class="'e2e-radio-' + question.name">
            <span class="title">{{ question.title }}</span>
            <p>
              <label>
                <input
                  :name="question.name"
                  :value="question.options[0]"
                  v-model="question.model"
                  type="radio"
                >
                <span :class="'e2e-' + question.options[0]">{{ question.options[0] }}</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  :name="question.name"
                  :value="question.options[1]"
                  v-model="question.model"
                  type="radio" >
                <span :class="'e2e-' + question.options[1]">{{ question.options[1] }}</span>
              </label>
            </p>
          </div>
        </div>
        <button class="btn">Enviar</button>
      </form>
    </div>
    <div
      v-if="submitedYet"
      class="card-action e2e-form-submited"
    >
      <p>Gracias por tu respuesta</p>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'

export default {
  data () {
    return {
      errors: [],
      userName: '',
      questions: [
        {
          id: 1,
          title: 'Prefieres spaces o tabs?',
          options: ['Spaces', 'Tabs'],
          name: 'spacesVsTabs',
          model: 'Spaces'
        },
        {
          id: 2,
          title: 'C# o Java?',
          options: ['C#', 'Java'],
          name: 'cSharpVsJava',
          model: 'C#'
        },
        {
          id: 3,
          title: 'Compilado o interpretado?',
          options: ['Compilado', 'Interpretado'],
          name: 'compiledVsInterpreted',
          model: 'Compilado'
        },
        {
          id: 4,
          title: 'Angular o React?',
          options: ['Angular', 'React'],
          name: 'reactVsAngular',
          model: 'Angular'
        },
        {
          id: 5,
          title: 'Document o SQL?',
          options: ['Document', 'SQL'],
          name: 'sqlVsDoc',
          model: 'Document'
        }
      ],
      submitedYet: false
    }
  },

  methods: {
    submitForm: function (event) {
      this.errors = []
      if (!this.userName) {
        this.errors.push('Name required.')
      } else {
        let response = {
          userName: this.userName,
          date: Date.now()
        }
        this.questions.forEach(question => {
          response[question.name] = question.model
        })
        db.ref('responses').push(response)
        this.submitedYet = true
      }
      event.preventDefault()
    }
  }
}
</script>

<style scoped>
.radio {
  margin-top: 2rem;
}
.radio label span {
  color: initial;
}
</style>

<template>
  <div id="app">
    <div class="header teal lighten-2"/>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 push-m2">
          <div class="card">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app .title {
  font-size: 1.5rem;
}

#app .header {
  height: 20vw;
  margin-bottom: -8vw;
}
#app .card-content .h4{
    margin-top: 0;
}
#app .card-action {
  padding-bottom: 2rem;
}
#app form {
  padding-top: 5rem;
}
#app form button {
  margin-top: 2rem;
}
#app input[type="text"]:not(.browser-default).validate + label {
  transform: initial;
  top: -3rem;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.87);
}
</style>

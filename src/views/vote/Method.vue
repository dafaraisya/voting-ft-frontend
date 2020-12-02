<template>
  <div class="method page">   
      <h1 class="text-white">
        Pilih metode masuk
      </h1>
      <router-link :to="{name:'Upload'}">
        <b-button class="btn mt-5">
          <h4>
            <i class="fas fa-upload"></i>
            Unggah kartu
          </h4>
        </b-button>
      </router-link><br/>
      <router-link :to="{name:'Scan'}">
        <b-button class="btn mt-5">
          <h4>
            <i class="fas fa-camera"></i>
            Scan kartu
          </h4>
        </b-button>
      </router-link>
  </div>
</template>

<script>

export default {
  name: 'Method',
}
</script>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

* {
    font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 50px;
}

.btn {
  padding: 10px 30px;
  background-color: rgba(0,0,0,0);
  border-color: rgb(255,255,255);
}

.btn:hover {
  background-color: rgb(255,255,255);
  color: rgb(0,0,0)
}

@media only screen and (min-width: 1200px) and (max-width: 1920px){
  h1 {
    font-size: 50px;
  }
  .page {
  padding-top: 100px;
}
}
@media only screen and (max-width: 767px) {
  h1 {
    font-size: 35px;
  }
  .page {
  padding-top: 20px;
}
}

</style>

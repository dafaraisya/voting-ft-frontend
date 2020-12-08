<style>
.img-profile {
  height: 240px;
  width: 310px;
}
.blank {
  height: 350px;
  width: 240px;
}
</style>
<template>
  <div class="container text-left mt-4">
      <b-row>
          <b-col class="mb-4" lg="4" v-for="candidate in candidates" :key="candidate._id">
              <b-container class="bg-white p-0 rounded-sm shadow">
                <img class="img-profile" v-bind:src="getImage(candidate.image)"/>
                <b-container class="mt-2 pb-2">
                  <b> {{ candidate.name }} </b> <br/>
                  {{ candidate.number }} <br/>
                  <router-link :to="{name:'DetailCandidate', params: {id: candidate._id}}">
                    <b-button class="mt-2" variant="primary">
                      <i class="fas fa-info-circle text-white"></i>
                      Detail
                    </b-button>
                  </router-link>
                </b-container>
              </b-container>
          </b-col>
          <b-col class="mb-4" lg="4">
            <router-link :to="{name:'CreateCandidate'}">
              <b-container class="bg-secondary p-0 rounded-sm shadow blank text-white text-center">
                  <i class="far fa-plus-square fa-2x mb-2" style="margin-top:100px;"></i><br/>
                  Tambah
              </b-container>
            </router-link>
          </b-col>
        </b-row>   
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ListCandidate',
  data() {
      return {
        candidates : []
      }
  },
  methods: {
    getImage(url) {
      return '../../'+url;
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/candidate/all')
      .then(res => (this.candidates = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>

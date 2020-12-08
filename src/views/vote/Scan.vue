<template>
  <div class="scan page pt-5">
      <img src="" alt="">
      <h1 class="text-white tittle">Scan kartu</h1>

      <div class="scanner-card mt-5">
        <b-row>
          <b-col lg="3"/>
          <b-col lg="6">
            <b-container class="bg-white p-3 rounded-sm shadow-sm">
              <qrcode-stream @init="onInit" @decode="onDecode">
                <div class="loading-indicator" v-if="loading">
                  Loading...
                </div>
              </qrcode-stream>
            </b-container>
          </b-col>
        </b-row>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { QrcodeStream } from 'vue-qrcode-reader'
import Swal from 'sweetalert2'

export default {
  name: 'Scan',
  components: {
    QrcodeStream
  },
  data() {
    return {
      dataParticipant : {
        name: '',
        nim: '',
        email: ''
      },
      id : '',
      loading : false
    }
  },
  methods:{
    async onInit (promise) {
      this.loading = true

      try {
        await promise
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    onDecode (decodedString) {
      this.id = decodedString;
      axios
        .get("http://localhost:3000/api/v1/participant/"+this.id)
        .then(res => {
          this.dataParticipant = res.data.data;
          this.check();
        })
        .catch(err => {console.log(err)});
    },
    check() {
      // cek data partisipan ada enggak
      if(this.dataParticipant == null) {
        this.$router.push({ name: "Error", params: {error : 'failed-not-found'}});
      } else {
        // cek apakah sudah vote apa belum
        var dataParticipantString = JSON.parse(JSON.stringify(this.dataParticipant));
        if(Object.prototype.hasOwnProperty.call(dataParticipantString, 'voting')) {
          this.$router.push({ name: "Error", params: {error : 'failed-already-vote'}});
        } else {
          // cek apakah sedang sesinya atau enggak
          var today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+('0' + today.getDate()).slice(-2);
          const time = ('0' + today.getHours()).slice(-2) + ":" + today.getMinutes() + ":" + today.getSeconds();
          const dateTime = date +'T'+ time + '.000Z';
          if(this.dataParticipant.session.min < dateTime && this.dataParticipant.session.max > dateTime) {
            Swal.fire({
                icon: 'success',
                title: 'Autentikasi berhasil',
                text: 'Selamat datang ' + this.dataParticipant.name,
                showConfirmButton: true
            }).then(()=>{
              this.$store.commit("setAuthentication", true);
              this.$router.replace({ name: "VotingBEM", params : {id:this.dataParticipant._id}, query: {'success': true} });
            })
          } else {
            this.$router.push({ name: "Error", params: {error : 'failed-not-your-session'}});
          }
        }
      }
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/participant/all")
      .then(res => (this.dataParticipants = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
<style scoped>
.tittle, h1 {
    font-weight: bold;
}

.page {
  margin-top:100px;
}

.scanner-card {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
}
.alert {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
}
.loading-indicator {
  font-size: 20px ;
  font-weight: bold;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px ;
  width: 100px;
}

@media only screen and (min-width: 1200px) and (max-width: 1920px){
    .scanner-card-body {
        margin-top: 100px;
    }
}
@media only screen and (max-width: 767px) {
    .scanner-card-body {
        margin-top: 10px;
    }
    .scanner-card {
        margin-bottom: 20px;
    }
}
</style>

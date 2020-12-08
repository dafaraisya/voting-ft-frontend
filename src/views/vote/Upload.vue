<template>
  <div class="upload page pt-4">
    <h1 class="text-white tittle">Unggah kartu</h1>
    <div class="scanner-card mt-5">
      <b-row>
        <b-col sm="3" />
        <b-col sm="6">
          <b-container
            class="bg-white p-3 rounded-sm shadow-sm"
            style="max-width: 300px;"
          >
            <input id="image" ref="image" type="file" v-on:change="decode()" />
          </b-container>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import QrcodeDecoder from "qrcode-decoder";
//import moment from "moment";

export default {
  name: "Scan",
  components: {},
  data() {
    return {
      dataParticipant: {
        name: "",
        nim: "",
        email: "",
      },
      id: "",
    };
  },
  methods: {
    decode() {
      var file = this.$refs.image.files[0];
      var reader = new FileReader();
      var that = this;
      reader.onload = async function(e) {
        const qr = new QrcodeDecoder();
        qr.decodeFromImage(e.target.result).then((res) => {
          that.id = res.data;
          axios
            .get(
              "http://localhost:3000/api/v1/participant/" + that.id
            )
            .then((res) => {
              that.dataParticipant = res.data.data;
              that.check();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      };
      reader.readAsDataURL(file);
    },
    check() {
      if (this.dataParticipant == null) {
        this.$router.push({
          name: "Error",
          params: { error: "failed-not-found" },
        });
      } else {
        var dataParticipantString = JSON.parse(
          JSON.stringify(this.dataParticipant)
        );
        if (
          Object.prototype.hasOwnProperty.call(dataParticipantString, "voting")
        ) {
          this.$router.push({
            name: "Error",
            params: { error: "failed-already-vote" },
          });
        } else {
          var today = new Date();
          var start = new Date(this.dataParticipant.session.min);
          var end = new Date(this.dataParticipant.session.max);
          
          start = new Date(
            start.getTime() + today.getTimezoneOffset() * 60 * 1000
          );
          end = new Date(
            end.getTime() + today.getTimezoneOffset() * 60 * 1000
          );
          today = new Date(
            today.getTime() + (today.getTimezoneOffset() + 420) * 60 * 1000
          );
          
          if (start < today && end > today) {
            Swal.fire({
              icon: "success",
              title: "Autentikasi berhasil",
              text: "Selamat datang " + this.dataParticipant.name,
              showConfirmButton: true,
            }).then(() => {
              this.$store.commit("setAuthentication", true);
              this.$router.replace({
                name: "VotingBEM",
                params: { id: this.dataParticipant._id },
                query: { success: true },
              });
            });
          } else {
            this.$router.push({
              name: "Error",
              params: { error: "failed-not-your-session" },
            });
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.tittle,
h1 {
  margin-top: 20px;
  font-weight: bold;
}

.page {
  margin-top: 100px;
  overflow: hidden;
}
</style>

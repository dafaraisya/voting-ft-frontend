<template>
  <div class="page">
    <div class="sub-page">
      <h1 class="text-white" style="padding-top:20px;">
        PEMIRA FMIPA UNS 2020
      </h1>
      <div class="home-voting" />
      <b-container class="text-white mt-5 shadow-sm form-login p-3 rounded">
        <b-form class="text-left ml-5 mt-4 mr-5">
          <b-form-group label="Nama pengguna :" label-for="username">
            <b-form-input
              type="text"
              id="username"
              placeholder="Masukan Username"
              v-model="authentication.username"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Sandi :" label-for="password">
            <b-form-input
              type="password"
              id="password"
              placeholder="Masukan Sandi"
              v-model="authentication.password"
            ></b-form-input>
          </b-form-group>
          <b-button class="btn mt-4 ml-3" @click="login">
            <i class="fas fa-sign-in-alt"></i>
            Login
          </b-button>
        </b-form>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Welcome",
  created() {
    document.title = "PEMIRA FMIPA UNS 2020";
  },
  data() {
    return {
      authentication: {},
    };
  },
  methods: {
    login() {
      axios
        .post("http://pemira.fmipauns.com:3000/api/v1/login", this.authentication)
        .then((response) => {
          if (response.data.message == "success") {
            Swal.fire({
              icon: "success",
              title: "Selamat datang admin",
              showConfirmButton: true,
            }).then(() => {
              this.$store.commit("setAuthentication", true);
              this.$router.push("admin");
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Nama pengguna atau sandi salah",
              showConfirmButton: true,
            }).then(() => {});
          }
        });
    },
  },
};
</script>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

* {
  font-family: "Poppins", sans-serif;
  scroll-behavior: smooth;
}

html {
  min-height: 100% !important;
  height: 100%;
}

.home-voting {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgb(0, 0, 0, 0.7) 80%
    ),
    url("https://drive.google.com/uc?export=download&id=1A08sfz0Ah2Vy4RgWt2L-_e2DS35Z30XD");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
#video-bg {
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -2;
}

.page {
  height: 100%;
  width: 100%;
}

.sub-page {
  min-height: 100%;
  width: 100%;
  padding-top: 50px;
}

b-button {
  margin-top: 50px;
}

.form-login {
  max-width: 400px;
  background: rgba(0, 0, 0, 0.6);
}

.btn {
  padding: 10px 30px;
  background-color: rgba(0, 0, 0, 0);
  border-color: rgb(255, 255, 255);
}

.btn:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}
</style>

<template>
  <div class="voting">
    <div class="container text-left">
      <img src="" alt="" />
      <h1 class="text-white tittle">PEMIRA FMIPA UNS 2020</h1>
      <h4 class="text-white mt-1 mb-5">
        Halo {{ participant.name }}, Silakan Ketuk Pilih untuk memilih daftar
        calon dibawah ini
      </h4>
      <b-row>
        <b-col
          lg="4"
          class="mb-5 text-center"
          v-for="candidate in candidates"
          :key="candidate._id"
        >
          <b-container class="bg-white p-0 rounded-sm shadow">
            <img
              class="img-profile w-100"
              v-bind:src="getImage(candidate.image)"
            />
            <b-container class="mt-2 pb-2">
              <b> {{ candidate.name }} </b> <br />
              {{ candidate.number }} <br />
              <router-link
                :to="{
                  name: 'DetailCandidateVoting',
                  params: { id: candidate._id },
                }"
              >
                <b-button class="mt-2" variant="primary">
                  <i class="fas fa-info-circle text-white"></i>
                  Detail
                </b-button>
              </router-link>
              <b-button
                @click="vote(candidate._id, candidate.name)"
                class="mt-2 ml-2"
                variant="success"
              >
                <i class="fas fa-check-circle text-white"></i>
                Pilih
              </b-button>
            </b-container>
          </b-container>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Voting",
  data() {
    return {
      participant: [],
      candidates: [],
    };
  },
  methods: {
    vote(id_candidate, name_candidate) {
      new Swal({
        title: "Anda Yakin Memilih " + name_candidate + " ?",
        showDenyButton: true,
        buttons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            id_participant: this.participant._id,
            id_candidate: id_candidate,
          };
          axios
            .put(
              "http://pemira.fmipauns.com:3000/api/v1/participant/vote",
              data
            )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Pilihan anda berhasil dikirim",
                showConfirmButton: true,
              }).then(() => {
                this.$store.commit("setAuthentication", false);
                this.$router.push({
                  name: "Announcement",
                  query: { success: true },
                });
              });
            })
            .catch((err) => console.log(err));
        }
      });
    },
    getImage(url) {
      return "../../" + url;
    },
  },
  mounted() {
    axios
      .get(
        "http://pemira.fmipauns.com:3000/api/v1/participant/" +
          this.$route.params.id
      )
      .then((res) => (this.participant = res.data.data))
      .catch((err) => console.log(err));

    axios
      .get("http://pemira.fmipauns.com:3000/api/v1/candidate/all")
      .then((res) => (this.candidates = res.data.data))
      .catch((error) => console.log(error));
  },
};
</script>
<style scoped>
.tittle,
h1 {
  margin-top: 50px;
  font-weight: bold;
}
.voting {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgb(0, 0, 0, 0.7) 80%
    ),
    url("https://drive.google.com/uc?export=download&id=1COIP91BUDc2z0l_Bl2OFYQIFNnGXuS83");
    background-size: cover;
}
</style>

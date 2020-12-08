<template>
  <div class="container text-left">
    <label>Cari peserta</label>
    <b-form-input
      @change="search()"
      v-model="keyword"
      class="p-3 mb-3"
      placeholder="Ketika nama"
    ></b-form-input>
    <router-link :to="{ name: 'CreateParticipant' }">
      <b-button variant="primary" class="mb-2">
        <i class="far fa-plus-square text-white"></i>
        Tambah peserta
      </b-button>
    </router-link>
    <div v-if="keyword != ''">
      <b-container
        v-if="searchParticipants.length == 0 && searchLoading == 0"
        class="w-100 p-3 text-center"
      >
        <b-spinner label="Spinning"></b-spinner>
      </b-container>
      <div
        class="bg-white mt-2 p-3 shadow-sm rounded"
        v-for="participant in searchParticipants"
        :key="participant._id"
      >
        <div>
          <h3>
            {{ participant.name }}
            <i
              v-if="participant.voting != null"
              class="fas fa-circle text-success dot"
            ></i>
            <i
              v-if="participant.voting == null"
              class="fas fa-circle text-danger dot"
            ></i>
          </h3>
        </div>
        <div>NIM : {{ participant.nim }}</div>
        <div>Email : {{ participant.email }}</div>
        <div>Sesi : {{ participant.session.number }}</div>
        <div v-if="participant.email_at != null">
          Email telah dikirim pada :
          {{ getDateTime(new Date(participant.email_at)) }}
        </div>
        <div v-if="participant.voting != null">
          Telah memilih pada :
          {{ getDateTime(new Date(participant.voting.time)) }}
        </div>
        <div class="mt-3">
          <router-link
            :to="{ name: 'DetailParticipant', params: { id: participant._id } }"
          >
            <b-button href="" variant="primary">
              <i class="fas fa-info-circle text-white"></i>
              Detail
            </b-button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="bg-white mt-2 p-3 shadow-sm rounded"
        v-for="participant in participants"
        :key="participant._id"
      >
        <div>
          <h3>
            {{ participant.name }}
            <i
              v-if="participant.voting != null"
              class="fas fa-circle text-success dot"
            ></i>
            <i
              v-if="participant.voting == null"
              class="fas fa-circle text-danger dot"
            ></i>
          </h3>
        </div>
        <div>NIM : {{ participant.nim }}</div>
        <div>Email : {{ participant.email }}</div>
        <div>Sesi : {{ participant.session.number }}</div>
        <div v-if="participant.email_at != null">
          Email telah dikirim pada :
          {{ getDateTime(new Date(participant.email_at)) }}
        </div>
        <div v-if="participant.voting != null">
          Telah memilih pada :
          {{ getDateTime(new Date(participant.voting.time)) }}
        </div>
        <div class="mt-3">
          <router-link
            :to="{ name: 'DetailParticipant', params: { id: participant._id } }"
          >
            <b-button href="" variant="primary">
              <i class="fas fa-info-circle text-white"></i>
              Detail
            </b-button>
          </router-link>
        </div>
      </div>
    </div>
    <b-row class="mt-3 mb-3" v-if="keyword.length == 0">
        <b-col lg="1" md="1" v-for="page in totalPage" :key="page">
          <a v-bind:href="page">
            <b-container
              class="bg-primary shadow-sm text-white text-center p-2"
              v-if="page == $route.params.page"
            >
              {{ page }}
            </b-container>
            <b-container class="bg-white shadow-sm text-center p-2" v-else>
              {{ page }}
            </b-container>
          </a>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "ListParticipant",
  data() {
    return {
      participants: [],
      searchParticipants: [],
      searchLoading: 0,
      keyword: "",
      totalPage: 0,
    };
  },
  methods: {
    moment: function(date) {
      return moment(date);
    },
    del(id) {
      axios
        .delete("http://localhost:3000/api/v1/participant/" + id)
        .then(() => location.reload())
        .catch((err) => console.log(err));
    },
    search() {
      this.searchLoading = 1;
      axios
        .get(
          "http://localhost:3000/api/v1/participant/search/" +
            this.keyword
        )
        .then((res) => {
          this.searchLoading = 0;

          this.searchParticipants = res.data.data;
        })
        .catch((error) => console.log(error));
    },
    getDateTime(date) {
      var today = new Date();
      date = new Date(date.getTime() + (today.getTimezoneOffset()+420) * 60 * 1000);

      var tahun = date.getFullYear();
      var month = date.getMonth();
      var tanggal = date.getDate();
      var day = date.getDay();
      var hour = date.getHours();
      var minute = date.getMinutes();

      switch (day) {
        case 0:
          day = "Minggu";
          break;
        case 1:
          day = "Senin";
          break;
        case 2:
          day = "Selasa";
          break;
        case 3:
          day = "Rabu";
          break;
        case 4:
          day = "Kamis";
          break;
        case 5:
          day = "Jum'at";
          break;
        case 6:
          day = "Sabtu";
          break;
      }
      switch (month) {
        case 0:
          month = "Januari";
          break;
        case 1:
          month = "Februari";
          break;
        case 2:
          month = "Maret";
          break;
        case 3:
          month = "April";
          break;
        case 4:
          month = "Mei";
          break;
        case 5:
          month = "Juni";
          break;
        case 6:
          month = "Juli";
          break;
        case 7:
          month = "Agustus";
          break;
        case 8:
          month = "September";
          break;
        case 9:
          month = "Oktober";
          break;
        case 10:
          month = "November";
          break;
        case 11:
          month = "Desember";
          break;
      }

      if (hour < 10) hour = "0" + hour;

      if (minute < 10) minute = "0" + minute;

      var datetime =
        hour +
        ":" +
        minute +
        ", " +
        day +
        ", " +
        tanggal +
        " " +
        month +
        " " +
        tahun;

      return datetime;
    },
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/api/v1/participant/page/" +
          this.$route.params.page
      )
      .then((res) => {
        this.participants = res.data.data.participants;
        this.totalPage = res.data.data.totalPage;
      })
      .catch((error) => console.log(error));
  },
};
</script>
<style>
.dot {
  margin-bottom: 4px;
  font-size: 14px;
}
</style>

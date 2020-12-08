<template>
  <div class="container text-left">
    <router-link :to="{ name: 'CreateSession' }">
      <b-button variant="primary" class="mb-2">
        <i class="far fa-plus-square text-white"></i>
        Buat sesi
      </b-button>
    </router-link>
    <div
      class="bg-white mb-3 p-3 rounded-sm shadow"
      v-for="session in sessions"
      :key="session._id"
    >
      <div>
        <b style="font-size:26px;">Sesi {{ session.number }}</b
        ><br />
        <i class="far fa-clock"></i>
        {{ getDateTime(new Date(session.start)) }} -
        {{ getDateTime(new Date(session.end)) }}
      </div>
      <div>
        <i class="fas fa-user"></i> {{ session.total_participant }} peserta
      </div>
      <div class="mt-3">
        <router-link
          :to="{ name: 'DetailSession', params: { id: session._id } }"
        >
          <b-button href="" variant="primary">
            <i class="fas fa-info-circle text-white"></i>
            Detail
          </b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ListSession",
  data() {
    return {
      sessions: [],
    };
  },
  methods: {
    getDateTime(date) {
      var today = new Date();
      date = new Date(date.getTime() + today.getTimezoneOffset() * 60 * 1000);

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
      .get("http://localhost:3000/api/v1/session/all")
      .then((res) => (this.sessions = res.data.data))
      .catch((error) => console.log(error));
  },
};
</script>

<template>
  <div>
    <h1 class="text-white mt-4">Timeline</h1>
    <br />
    <b-container
      class="bg-white rounded shadow-sm mt-3 p-3 pl-5 pr-5 session"
      v-for="event in timeline"
      :key="event._id"
    >
      <b-row>
        <b-col lg="3">
          <b class="name">{{ event.name }}</b>
        </b-col>
        <b-col lg="9">
          <div>
            <b>Pembukaan: </b><br />
            {{ getTime(new Date(event.start)) + ", " + getDay(new Date(event.start)) }}
          </div>
          <div>
            <b>Penutupan: </b><br />
            {{ getTime(new Date(event.end)) + ", " + getDay(new Date(event.end)) }}
          </div>
          <div>
            <b>Jumlah peserta: </b><br />
            {{ event.participant + " orang" }}
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      timeline: [],
    };
  },
  methods: {
    getDay(date) {
      var today = new Date();
      date = new Date(date.getTime() + today.getTimezoneOffset() * 60 * 1000);

      var tahun = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();

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

      day = day + " " + month + " " + tahun;

      return day;
    },
    getTime(date) {
      var today = new Date();
      date = new Date(date.getTime() + today.getTimezoneOffset() * 60 * 1000);

      var hour = date.getHours();
      var minute = date.getMinutes();

      if (hour < 10) hour = "0" + hour;

      if (minute < 10) minute = "0" + minute;

      var time = hour + ":" + minute;

      return time;
    },
  },
  mounted() {
    axios
      .get("http://pemira.fmipauns.com:3000/api/v1/session/all")
      .then((res) => {
        res.data.data.forEach((event) => {
          this.timeline.push({
            name: "Sesi " + event.number,
            start: event.start,
            end: event.end,
            participant: event.total_participant,
          });
        });
      })
      .catch((error) => console.log(error));
  },
};
</script>
<style scoped>
.session {
  max-width: 700px;
}
.session .name {
  font-size: 32px;
}
.session br {
  display: none;
}
@media only screen and (max-width: 767px) {
  .session {
    max-width: 320px;
  }
  .session br {
    display: block;
  }
}
</style>

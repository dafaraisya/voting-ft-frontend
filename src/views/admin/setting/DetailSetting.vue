<template>
  <b-container>
    <b-row>
      <b-col lg="12">
        <div class="container bg-white p-4 text-left rounded-sm shadow">
          <h3>Pengumuman</h3>
          <p>{{ getDateTime(new Date(detail.announcement)) }}</p>
          <br />
          <h3>Kredensial</h3>
          <b> Username </b>
          <p>{{ detail.authentication.username }}</p>
          <b> Password </b>
          <p>{{ detail.authentication.password }}</p>
          <br />
          <h3>Email</h3>
          <b> Email </b>
          <p>{{ detail.email.email }}</p>
          <b> Password </b>
          <p>{{ detail.email.password }}</p>
          <br />
          <h3>Prosedur</h3>
          <a
            v-bind:href="'http://localhost/procedure.pdf'"
            class="btn btn-primary"
          >
            <i class="far fa-file-alt text-white"></i>
            Buka </a
          ><br /><br />
          <router-link :to="{ name: 'EditSetting' }">
            <b-button variant="primary">
              <i class="far fa-edit text-white"></i>
              Ubah
            </b-button>
          </router-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from "axios";

export default {
  name: "SettingDetail",
  data() {
    return {
      detail: [],
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
      .get("http://localhost:3000/api/v1/setting/all")
      .then((res) => (this.detail = res.data.data[0]))
      .catch((err) => console.log(err));
  },
};
</script>

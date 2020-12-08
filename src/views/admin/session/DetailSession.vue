<template>
  <b-container>
    <b-row>
      <b-col lg="12">
        <div class="container text-left bg-white p-3 rounded-sm shadow">
          <div class="mt-3">
            <b style="font-size:26px;">Sesi {{ detail.number }}</b
            ><br />

            <i class="far fa-clock"></i>
            {{ getDateTime(new Date(detail.start)) }} -
            {{ getDateTime(new Date(detail.end)) }}
          </div>
          <div>
            <i class="fas fa-user"></i> {{ detail.total_participant }} peserta
          </div>
          <div class="mt-3"></div>
          <router-link
            :to="{ name: 'EditSession', params: { id: detail._id } }"
          >
            <b-button class="ml-2" href="" variant="primary">
              <i class="far fa-edit text-white"></i>
              Ubah
            </b-button>
          </router-link>
          <b-button @click="del()" class="ml-2" href="" variant="primary">
            <i class="far fa-trash-alt text-white"></i>
            Hapus
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "SessionDetail",
  data() {
    return {
      detail: [],
    };
  },
  methods: {
    del() {
      Swal.fire({
        title: "Apakah anda yakin menghapus sesi ini?",
        showDenyButton: true,
        confirmButtonText: `Ya`,
        denyButtonText: `Tidak`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              "http://localhost:3000/api/v1/session/" + this.$route.params.id
            )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Sesi berhasil dihapus",
                showConfirmButton: true,
              }).then(() => {
                this.$router.push({ name: "ListSession" });
              });
            })
            .catch((err) => console.log(err));
          Swal.fire("Saved!", "", "success");
        }
      });
    },
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
      .get("http://localhost:3000/api/v1/session/" + this.$route.params.id)
      .then((res) => (this.detail = res.data.data))
      .catch((err) => console.log(err));
  },
};
</script>

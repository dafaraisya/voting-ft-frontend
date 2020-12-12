<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1
          style="margin-top: 50px;margin-bottom: 30px;"
          class="text-center text-white"
        >
          Pengumuman Hasil Voting PEMILU 2020
        </h1>
      </div>
    </div>
    <!-- bar chart -->
    <div v-if="timeUp">
      <b-container>
        <b-row v-if="arrCandidateBEM.length > 0">
          <b-col cols="12">
            <highcharts :options="barOptions" ref="chart"></highcharts>
          </b-col>
        </b-row>
        <b-row v-if="arrCandidateLegislatif.length > 0" class="mt-4">
          <b-col cols="12">
            <highcharts :options="barOptions2" ref="chart"></highcharts>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- countdown -->
    <div v-else class="row mt-5">
      <div class="col countdown">
        <Countdown
          :year="year"
          :month="month"
          :date="date"
          :hour="hour"
          :minute="minute"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Countdown from "@/components/Countdown";
import Highcharts from "highcharts";

export default {
  components: {
    Countdown,
  },
  data() {
    return {
      timeUp: "",
      participants: [],
      candidates: [],
      announcement: [],
      year: 0,
      month: 0,
      date: 0,
      hour: 0,
      minute: 0,
      arrCandidateBEM: [],
      arrCandidateLegislatif: [],
      barOptions: {
        chart: {
          type: "bar",
        },
        title: {
          text: "Hasil Perhitungan Suara Calon Ketua BEM",
        },
        xAxis: {
          categories: ["oke", "oke2", "oke3"],
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "46/100 suara",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
        },
        tooltip: {
          valueSuffix: " suara",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            animation: {
              duration: 0,
            },
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "Perolehan",
            data: [107, 31, 635, 203, 2],
            color: "#4BB543",
            showInLegend: false,
          },
        ],
      },
      barOptions2: {
        chart: {
          type: "bar",
        },
        title: {
          text: "Hasil Perhitungan Suara Calon Dewan Mahasiswa",
        },
        xAxis: {
          categories: ["oke", "oke2", "oke3"],
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "46/100 suara",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
        },
        tooltip: {
          valueSuffix: " suara",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            animation: {
              duration: 0,
            },
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "Perolehan",
            data: [107, 31, 635, 203, 2],
            color: "#4BB543",
            showInLegend: false,
          },
        ],
      },
    };
  },
  computed: {
    BEMCandidates: function() {
      return this.candidates.filter(function(candidate) {
        return candidate.type == "bem";
      });
    },
    LegislatifCandidates: function() {
      return this.candidates.filter(function(candidate) {
        return candidate.type == "legislatif";
      });
    },
  },
  methods: {
    checkEndTime() {
      const end = new Date(
        this.year,
        this.month - 1,
        this.date,
        this.hour,
        this.minute
      );

      const now = new Date();

      const distance = end.getTime() - now.getTime();
      if (distance < 0) {
        this.timeUp = true;
      }
    },
    formatter() {
      const format = this.announcement.split("-");
      this.year = parseInt(format[0]);
      this.month = parseInt(format[1]);
      const time = format[2].split("T");
      this.date = parseInt(time[0]);
      const clock = time[1].split(":");
      this.hour = parseInt(clock[0]);
      this.minute = parseInt(clock[1]);
    },
    findCandidateById(id) {
      var i = 0;
      for (i = 0; i < this.BEMCandidates.length; i++) {
        if (this.BEMCandidates[i]._id == id) return i;
      }
    },
    findCandidateByIdLegislatif(id) {
      var i = 0;
      for (i = 0; i < this.LegislatifCandidates.length; i++) {
        if (this.LegislatifCandidates[i]._id == id) return i;
      }
    },
    count() {
      setInterval(() => {
        var now = new Date();

        var endCount = new Date(this.announcement);

        endCount = new Date(
          endCount.getTime() + now.getTimezoneOffset() * 60 * 1000
        );
        now = new Date(
          now.getTime() + (now.getTimezoneOffset() + 420) * 60 * 1000
        );

        var maxCount = (now - endCount) / 1000;
        maxCount = Math.ceil(maxCount);

        if (maxCount > 0) this.timeUp = true;

        if (maxCount > this.participants.length)
          maxCount = this.participants.length;

        var totalCandidateBEM = [];
        var totalCandidateLegislatif = [];

        this.BEMCandidates.forEach((candidate) =>
          totalCandidateBEM.push({
            name: candidate.name,
            total: 0,
          })
        );

        this.LegislatifCandidates.forEach((candidate) =>
          totalCandidateLegislatif.push({
            name: candidate.name,
            total: 0,
          })
        );

        var n = 0;

        for (n = 0; n < maxCount; n++) {
          if (this.participants[n].voting) {
            var index = this.findCandidateById(
              this.participants[n].voting.id_candidate_bem
            );
            totalCandidateBEM[index].total++;
          }
        }

        this.arrCandidateBEM = totalCandidateBEM;

        n = 0;

        for (n = 0; n < maxCount; n++) {
          if (this.participants[n].voting) {
            index = this.findCandidateByIdLegislatif(
              this.participants[n].voting.id_candidate_legislatif
            );
            totalCandidateLegislatif[index].total++;
          }
        }

        this.arrCandidateLegislatif = totalCandidateLegislatif;
        

        var name = [];
        var vote = [];

        totalCandidateBEM.forEach((count) => {
          name.push(count.name);
          vote.push(count.total);
        });

        this.barOptions.xAxis.categories = name;
        this.barOptions.series[0].data = vote;
        this.barOptions.yAxis.title.text =
          maxCount + "/" + this.participants.length + " suara";

        name = [];
        vote = [];

        totalCandidateLegislatif.forEach((count) => {
          name.push(count.name);
          vote.push(count.total);
        });

        this.barOptions2.xAxis.categories = name;
        this.barOptions2.series[0].data = vote;
        this.barOptions2.yAxis.title.text =
          maxCount + "/" + this.participants.length + " suara";
      }, 250);
    },
  },
  mounted() {
    axios
      .get("http://52.163.218.138:3000/api/v1/announcement")
      .then((res) => {
        this.announcement = res.data.data;
        this.formatter();
        this.checkEndTime();
      })
      .catch((err) => console.log(err));
    axios
      .get("http://52.163.218.138:3000/api/v1/participant/all")
      .then((res) => {
        this.participants = res.data.data;
        this.count();
      })
      .catch((err) => console.log(err));
    axios
      .get("http://52.163.218.138:3000/api/v1/candidate/all")
      .then((res) => {
        this.candidates = res.data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style>
.countdown {
  margin-top: 8%;
}
.highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 800px;
  margin: 1em auto;
}

#container {
  height: 400px;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>

<template>
  <div class="page">
    <NavBar />
    <div class="sub-page" id="home">
      <b-container class="container h-100 text-white">
        <b-row class="row h-100 justify-content-center align-items-center">
          <b-col lg="12">
            <h1>PEMIRA FMIPA UNS 2020</h1>
            <div class="inner">
              <span>
                #fmipamemilih<br />
                #suaramipa<br />
                #suksespemira2020
              </span>
            </div>
            <b-container class="mt-5">
              <router-link class="mt-5" :to="{ name: 'Method' }">
                <b-button class="btn mt-5">
                  <i class="fas fa-vote-yea"></i>
                  Vote
                </b-button>
              </router-link>
            </b-container>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="sub-page" id="timeline">
      <Timeline
        data-aos="fade-in"
        data-aos-duration="1000"
        data-aos-delay="200"
      />
    </div>
    <div class="sub-page" id="announcement">
      <Announcement
        data-aos="fade-in"
        data-aos-duration="1000"
        data-aos-delay="200"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Timeline from "@/components/Timeline.vue";
import Announcement from "./Announcement.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Welcome",
  components: {
    NavBar,
    Timeline,
    Announcement,
    Footer,
  },
  created() {
    document.title = "PEMIRA FMIPA UNS 2020";
  },
};
</script>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

* {
  font-family: "Poppins", sans-serif;
  scroll-behavior: smooth;
}

.page {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.sub-page {
  min-height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

b-button {
  margin-top: 50px;
}

.inner {
  position: absolute;
  height: 55px;
  line-height: 55px;
  font-size: 50px;
  font-weight: bold;
  overflow: hidden;
  display: inline-block;
  left: calc(50% - 290px);
}
.inner span {
  animation: animate 6s ease infinite;
  position: relative;
  color: white;
}
@keyframes animate {
  0% {
    opacity: 1;
    top: -160px;
  }
  25% {
    top: -105px;
  }
  30% {
    top: -105px;
  }
  50% {
    top: -55px;
  }
  55% {
    top: -55px;
  }
  75% {
    top: 0px;
  }
  80% {
    top: 0px;
    opacity: 1;
  }
  100% {
    top: 50px;
  }
}
#timeline {
  background: #000;
  padding-top: 100px;
  padding-bottom: 20px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgb(0, 0, 0, 0.7) 80%
    ),
    url("https://drive.google.com/uc?export=download&id=1A08sfz0Ah2Vy4RgWt2L-_e2DS35Z30XD");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
#announcement {
  padding-top: 60px;
  padding-bottom: 20px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgb(0, 0, 0, 0.7) 80%
    ),
    url("https://drive.google.com/uc?export=download&id=1jSLPu9SkDrG4z4Y5liTO3GpKH_mb2pmR");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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

@media only screen and (min-width: 1200px) and (max-width: 1920px) {
  h1 {
    font-size: 50px;
  }
  .inner {
    font-size: 55px;
  }
  #home {
    padding-top: 250px;
  }
  #home h1 {
    margin-top: 30px;
  }
}
@media only screen and (max-width: 767px) {
  h1 {
    font-size: 30px;
  }
  .inner {
    font-size: 30px;
    left: calc(50% - 155px);
  }
  #home {
    padding-top: 160px;
  }
  #home h1 {
    margin-top: 30px;
  }
}
</style>

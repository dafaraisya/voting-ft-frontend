<template>
    <div class="detail page">
        <b-container>
            <img src="" alt="">
            <transition name="slide-fade">
            <div v-if="show">
            <h1 class="text-white mb-3 tittle">Detail Kandidat</h1>
            <b-row>
                <b-col lg="1"></b-col>
                <b-col lg="10">
                    <div class="sub-detail-black p-5 mb-4 rounded shadow-sm">
                        <b-row>
                            <b-col lg="3">
                                <img class="img-profile img-profile-circle" v-bind:src="getImage(detail.image)"/>
                            </b-col>
                            <b-col lg="9" class="text-left pt-4 pl-5">
                                <h3>{{ detail.name }}</h3>
                                <b>Nomor urut  {{ detail.number }} </b><br/>
                                <a class="mt-3" style="display:block;" target="_blank" v-bind:href="'http://localhost/'+this.$route.params.id+'.pdf'">
                                    <b-button href="" variant="success">
                                        <i class="far fa-file-alt text-white"></i>
                                        CV
                                    </b-button>
                                </a><br/>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="sub-detail bg-white p-5 mb-5 text-left rounded shadow-sm">
                        <h2>Deskripsi</h2>
                        <div v-html="detail.description.short"/>
                    </div>
                    <div class="sub-detail bg-white p-5 mb-5 text-left rounded shadow-sm">
                        <h2>Visi</h2>
                        <div v-html="detail.description.vision"/>
                    </div>
                    <div class="sub-detail bg-white p-5 mb-5 text-left rounded shadow-sm">
                        <h2>Misi</h2>
                        <div v-html="detail.description.mission"/>
                    </div>
                    <b-button @click="klik=true" class="mt-2 mb-3 ml-2" href="" variant="primary">
                        <i class="fas fa-arrow-left text-white"></i>
                        Kembali
                    </b-button>
                    <router-link v-if="klik" :to="this.$router.go(-1)">
                    </router-link>
                </b-col>
            </b-row>
            </div>
            </transition>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'DetailCandidateVoting',
    data() {
        return {
            klik: false,
            detail: {
                description: {
                    short: '',
                    vision: '',
                    mission: ''
                }
            },
            show: false
        }
    },
    methods:{
        getImage(url) {
            return '../../'+url;
        }
    },
    created() {
        axios
            .get("http://localhost:3000/api/v1/candidate/"+this.$route.params.id)
            .then(res => (this.detail = res.data.data))
            .catch(err => console.log(err));
    }, 
    mounted() {
        this.show = true;
    }
}
</script>
<style>
.tittle, h1 {
    margin-top: -70px;
    font-weight: bold;
}
.page {
    margin-top: 80px;
}
.img-profile-circle {
    height: 200px;
    width: 200px;
    border-radius: 100px;
}
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .8s ease;
  animation-delay: .8s;
}
.slide-fade-enter {
  transform: translateY(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.sub-detail-black {
    background: rgba(0,0,0,0.8);
    color: white;
}
.sub-detail-white {
    text-align:center;
    background: rgba(200,200,200,0.8);
    color: black;
}
.detail {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgb(0, 0, 0, 0.7) 80%
    ),
    url("https://drive.google.com/uc?export=download&id=1COIP91BUDc2z0l_Bl2OFYQIFNnGXuS83");
    background-size: cover;
}
</style>
<template>
    <b-container>
        <b-row>
            <b-col class="mb-3" lg="12">
                <div class="container bg-success p-4 text-left rounded-lg shadow">
                    <h3 class="text-white"> Selamat datang di Dashboard PEMIRA FMIPA UNS 2020! </h3>
                </div>
            </b-col>
            <b-col lg="3">
                <div class="container bg-white p-3 text-center rounded-lg shadow">
                    <p>
                        <i class="far fa-calendar-alt fa-1x"></i> 
                        Sesi
                    </p>
                    <h2>{{ outline.session }}</h2>
                </div>
            </b-col>
            <b-col lg="3">
                <div class="container bg-white p-3 text-center rounded-lg shadow">
                    <p>
                        <i class="fas fa-users"></i> 
                        Peserta
                    </p>
                    <h2>{{ outline.participant }}</h2>
                </div>
            </b-col>
            <b-col lg="3">
                <div class="container bg-white p-3 text-center rounded-lg shadow">
                    <p>
                        <i class="fas fa-user-alt"></i> 
                        Kandidat
                    </p>
                    <h2>{{ outline.candidate }}</h2>
                </div>
            </b-col>
            <b-col lg="3">
                <div class="container bg-white p-3 text-center rounded-lg shadow">
                    <p>
                        <i class="fas fa-vote-yea"></i> 
                        Suara masuk
                    </p>
                    <h2>{{ outline.participantVoted }}</h2>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Main',
    data() {
        return {
            outline: {}
        }
    },
    methods:{
        getOutline() {
            axios
                .get("http://localhost:3000/api/v1/outline")
                .then(res => (this.outline = res.data.data))
                .catch(err => console.log(err));
        }
    },
    created() {
        this.getOutline();
    }
}
</script>
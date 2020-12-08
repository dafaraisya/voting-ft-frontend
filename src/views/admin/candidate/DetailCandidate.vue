<template>
    <b-container>
        <b-row>
            <b-col lg="6">
                <div class="bg-white p-3 rounded-sm shadow">
                    <h3>{{ detail.name }}</h3>
                    <img class="img-profile img-profile-circle" v-bind:src="getImage(detail.image)"/><br/><br/>
                    <b>Nomor urut </b><br/>{{ detail.number }}<br/>
                    <b>Deskripsi</b>
                    <div v-html="detail.description.short"/>
                    <b>Visi</b>
                    <div v-html="detail.description.vision"/>
                    <b>Misi</b>
                    <div v-html="detail.description.mission"/><br/>
                    <a v-bind:href="'http://localhost/'+this.$route.params.id+'.pdf'">
                        <b-button class="ml-2" href="" variant="primary">
                            <i class="far fa-file-alt text-white"></i>
                            CV
                        </b-button>
                    </a>
                    <router-link :to="'edit/'+detail._id">
                        <b-button class="ml-2" href="" variant="primary">
                            <i class="far fa-edit text-white"></i>
                            Ubah
                        </b-button>
                    </router-link>
                    <b-button @click="del();" class="ml-2" href="" variant="primary">
                        <i class="far fa-trash-alt text-white"></i>
                        Hapus
                    </b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'CandidateDetail',
    data() {
        return {
            detail: {
                description: {
                    short: '',
                    vision: '',
                    mission: ''
                }
            }
        }
    },
    methods:{
        del(){
            Swal.fire({
                title: 'Apakah anda yakin menghapus kandidat ini?',
                showDenyButton: true,
                confirmButtonText: `Ya`,
                denyButtonText: `Tidak`,
            }).then((result) => {
                if (result.isConfirmed) {            
                    axios
                        .delete("http://localhost:3000/api/v1/candidate/"+this.$route.params.id)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Kandidat berhasil dihapus',
                                showConfirmButton: true
                            }).then(()=>{
                                this.$router.push({name: 'ListCandidate'});
                            })
                        })
                        .catch( err => console.log(err));
                    Swal.fire('Saved!', '', 'success')
                } 
            })
        },
        getImage(url) {
            return '../../'+url;
        }
    },
    created() {
        axios
            .get("http://localhost:3000/api/v1/candidate/"+this.$route.params.id)
            .then(res => (this.detail = res.data.data))
            .catch(err => console.log(err));
    }
}
</script>
<style>
.img-profile-circle {
    height: 200px;
    width: 200px;
    border-radius: 100px;
}
</style>
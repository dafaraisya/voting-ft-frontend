<template>
    <b-container>
        <b-row>
            <b-col lg="6">
                <div class="container bg-white mt-2 p-3 shadow-sm rounded">
                    <div id="pemira-card" class="p-3 bg-white" style="border: 2px inset #aaa">
                        <img src="@/assets/logo kpr.png" style="height:50px; width:50px;"/>
                        <h2 class="text-bold">Kartu Pemilihan<br/>PEMIRA 2020</h2>
                        <vue-qr v-bind:text="detail._id"></vue-qr><br/>
                        <b>Nama</b><br/> {{ detail.name }}<br/>
                        <b>NIM</b><br/> {{ detail.nim }}<br/>
                        <b>Email</b><br/> {{ detail.email }}<br/>
                        <b>Sesi</b><br/> {{ detail.session.number }}<br/>
                    </div><br/>
                    <b-button @click="send(detail.email, detail.name, detail.nim, detail._id)" class="ml-2" href="" variant="primary">
                        <i class="fas fa-paper-plane"></i>
                        Kirim
                    </b-button>
                    <b-button @click="download('Kartu Pemilihan Pemira 2020_'+detail.name+'_'+detail.nim)" class="ml-2" href="" variant="primary">
                        <i class="fas fa-file-download"></i>
                        Unduh
                    </b-button>
                    <router-link :to="{name:'EditParticipant', params:{id:detail._id}}">
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
import VueQr from 'vue-qr'
import htmlToImage from 'html-to-image'

export default {
    name: 'ParticipantDetail',
    components: {
        VueQr
    },
    data() {
        return {
            detail: {
                session: {
                    number: 0,
                },
                logoSrc: ""
            },
        }
    },
    methods:{
        del(){
            Swal.fire({
                title: 'Apakah anda yakin menghapus peserta ini?',
                showDenyButton: true,
                confirmButtonText: `Ya`,
                denyButtonText: `Tidak`,
            }).then((result) => {
                if (result.isConfirmed) {            
                    axios
                        .delete("http://localhost:3000/api/v1/participant/"+this.$route.params.id)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Peserta berhasil dihapus',
                                showConfirmButton: true
                            }).then(()=>{
                                this.$router.go(-1);
                            })
                        })
                        .catch( err => console.log(err));
                } 
            })
        },
        send(to, name, nim, id) {
            Swal.fire({
                title: 'Loading',
                text: 'Sedang mengirimkan email...',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false
            })

            htmlToImage.toPng(document.getElementById('pemira-card')) 
            .then(function (image) {
                const data = {
                    to: to,
                    name: name,
                    nim: nim,
                    image: image,
                    participantId: id
                }
                
                axios
                    .post("http://localhost:3000/api/v1/mail/", data)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Email berhasil dikirim',
                            showConfirmButton: true
                        }).then(()=>{
                            
                        })
                    })
                    .catch( err => console.log(err));
            });
        },
        download(cardName) {
            htmlToImage.toPng(document.getElementById('pemira-card')) 
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = cardName;
                link.href = dataUrl;
                link.click();
            });
        }
    },
    mounted() {
        axios
            .get("http://localhost:3000/api/v1/participant/"+this.$route.params.id)
            .then(res => (this.detail = res.data.data))
            .catch(err => console.log(err));
    }
}
</script>
<template>
    <b-container>
        <b-row>
            <b-col lg="8">
                <div class="container bg-white mt-2 p-3 shadow-sm rounded">
                    <b-form class="text-left ml-5 mt-4 mr-5">
                        <b-form-group label="Nama lengkap :" label-for="namaLengkap">
                            <b-form-input type="text" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama" v-model="dataParticipant.name"></b-form-input>
                        </b-form-group>
                        <b-form-group label="NIM :" label-for="nim">
                            <b-form-input type="text" id="nim" aria-describedby="namaHelp" placeholder="Masukan NIM" v-model="dataParticipant.nim"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Email :" label-for="email">
                            <b-form-input type="text" id="email" aria-describedby="namaHelp" placeholder="Masukan Email" v-model="dataParticipant.email"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Sesi :" label-for="session" :v-if="sessions==0">
                            <div v-for="(session, index) in sessions" :key="index">
                                <input type="radio" v-bind:id="index+1" v-bind:value="index+1" v-model="dataParticipant.session.number"/>
                                <label class="ml-2" v-bind:for="index+1">{{ index+1 }}</label>
                            </div>
                        </b-form-group>
                        <a @click="editData();" class="btn btn-primary" type="submit">
                            <i class="far fa-save text-white"></i>
                            Simpan
                        </a>
                    </b-form>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'EditParticipant',
    data() {
        return {
            dataParticipant: {
                name: '',
                nim: '',
                email: '',
                session:{
                    number: 0
                }
            },
            sessions: [],
        }
    },
    methods: {
        editData() {
            let data = {
                'name': this.dataParticipant.name,
                'nim': this.dataParticipant.nim,
                'email': this.dataParticipant.email,
                'sessionId': this.sessions[this.dataParticipant.session.number - 1]._id,
                'sessionNumber': this.dataParticipant.session.number,
                'sessionMin': this.sessions[this.dataParticipant.session.number - 1].start,
                'sessionMax': this.sessions[this.dataParticipant.session.number - 1].end,
            };

            Swal.fire({
                    title: 'Apakah anda yakin mengubah data peserta ini?',
                    showDenyButton: true,
                    confirmButtonText: `Ya`,
                    denyButtonText: `Tidak`,
                }).then((result) => {
                    if (result.isConfirmed) {            
                        axios
                            .put("http://localhost:3000/api/v1/participant/"+this.$route.params.id, data)
                            .then(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Data peserta berhasil diperbarui',
                                    showConfirmButton: true
                                }).then(()=>{
                                    this.$router.go(-1);
                                })
                            })
                            //eslint-disable-next-line no-console
                            .catch( err => console.log(err));
                    } 
            })
        } 
    },
    created() {
        axios
        .get('http://localhost:3000/api/v1/session/all')
        .then(res => (this.sessions = res.data.data))
        .catch(error => console.log(error))

        axios
        .get('http://localhost:3000/api/v1/participant/'+this.$route.params.id)
        .then(res => (this.dataParticipant = res.data.data))
        .catch(error => console.log(error))
    }
}
</script>

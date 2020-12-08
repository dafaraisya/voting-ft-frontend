<template>
    <b-container>
        <b-row>
            <b-col lg="8">
                <div class="container bg-white mt-2 p-3 shadow-sm rounded">
                    <b style="font-size:26px;">Edit sesi</b><br/>
                    <b-form class="text-left ml-5 mt-4 mr-5">
                        <b-form-group label="Sesi ke :" label-for="session_number">
                            <b-form-input type="number" id="session_number" v-model="dataSession.number"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Tanggal mulai :" label-for="started_date">
                            <b-form-input type="date" id="started_date" v-model="dataSession.start.date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Jam mulai :" label-for="started_time">
                            <b-form-input type="time" id="started_time" v-model="dataSession.start.time"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Tanggal berakhir :" label-for="ended_date">
                            <b-form-input type="date" id="ended_date" v-model="dataSession.end.date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Jam berakhir :" label-for="ended_time">
                            <b-form-input type="time" id="ended_time" v-model="dataSession.end.time"></b-form-input>
                        </b-form-group>
                        <a @click="editData();" href="#" class="btn btn-primary" type="submit">
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
    name: 'EditSession',
    data() {
        return {
        dataSession: {
            number: 0,
            start: {
                date: '',
                time: '',
            },
            end: {
                date: '',
                time: '',
            },
            total_participant: 0,
        }
        }
    },
    methods: {
        editData() {
            let data = {
                'number': this.dataSession.number,
                'start': this.dataSession.start.date + "T" + this.dataSession.start.time + "Z",
                'end': this.dataSession.end.date + "T" + this.dataSession.end.time + "Z"
            };

            Swal.fire({
                    title: 'Apakah anda yakin mengubah sesi ini?',
                    showDenyButton: true,
                    confirmButtonText: `Ya`,
                    denyButtonText: `Tidak`,
                }).then((result) => {
                    if (result.isConfirmed) {            
                        axios
                            .put("http://localhost:3000/api/v1/session/"+this.$route.params.id, data)
                            .then(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Sesi berhasil diperbarui',
                                    showConfirmButton: true
                                }).then(()=>{
                                    this.$router.push({name: 'ListSession'});
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
        .get('http://localhost:3000/api/v1/session/'+this.$route.params.id)
        .then((res) => {
            const session = res.data.data;
            this.dataSession.number = session.number;
            this.dataSession.start.date = session.start.slice(0,10);
            this.dataSession.start.time = session.start.slice(11,16);
            this.dataSession.end.date = session.end.slice(0,10);
            this.dataSession.end.time = session.end.slice(11,16);
            this.dataSession.total_participant = session.total_participant;
            })
        .catch(error => console.log(error))
    }
}
</script>

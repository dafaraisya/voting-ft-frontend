<template>
    <b-container>
        <b-row>
            <b-col lg="8">
                <div class="container bg-white p-4 text-left rounded-sm shadow">
                    <h3> Pengumuman </h3>
                    <b-form-group label="Tanggal :" label-for="announcement_date">
                        <b-form-input type="date" id="announcement_date" v-model="dataSetting.announcement.date"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Jam :" label-for="announcement_time">
                        <b-form-input type="time" id="announcement_time" v-model="dataSetting.announcement.time"></b-form-input>
                    </b-form-group>         
                    <br/>
                    <h3> Kredensial </h3>
                    <b-form-group label="Username :" label-for="authentication_username">
                        <b-form-input id="authentication_username" v-model="dataSetting.authentication.username"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Password :" label-for="setting_number">
                        <b-form-input id="authentication_password" v-model="dataSetting.authentication.password"></b-form-input>
                    </b-form-group>
                    <br/>
                    <h3> Email </h3>
                    <b-form-group label="Email :" label-for="email_username">
                        <b-form-input id="email_email" v-model="dataSetting.email.email"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Password :" label-for="email_password">
                        <b-form-input id="email_password" v-model="dataSetting.email.password"></b-form-input>
                    </b-form-group>
                    <br/>
                    <h3> Prosedur </h3>
                    <b-form-group label-for="procedure">
                        <input id="procedure" ref="procedure" type="file" v-on:change="handleFileUpload()"/>
                    </b-form-group>
                    <br/>
                    <b-button variant="primary" @click="editData()">
                        <i class="far fa-save text-white"></i>
                        Simpan
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
    name: 'EditSetting',
    data() {
        return {
            dataSetting: {
                announcement: {
                    date: '',
                    time: ''
                },
                authentication: {
                    username: '',
                    password: '',
                },
                email: {
                    email: '',
                    password: '',
                }
            }
        }
    },
    methods: {
        editData() {
            let data = {
                'announcement': this.dataSetting.announcement.date + "T" + this.dataSetting.announcement.time + "Z",
                'authenticationUsername': this.dataSetting.authentication.username,
                'authenticationPassword': this.dataSetting.authentication.password,
                'emailEmail': this.dataSetting.email.email,
                'emailPassword': this.dataSetting.email.password,
            };

                Swal.fire({
                        title: 'Apakah anda yakin mengubah data pengaturan?',
                        showDenyButton: true,
                        confirmButtonText: `Ya`,
                        denyButtonText: `Tidak`,
                    }).then((result) => {
                        if (result.isConfirmed) {    
                            axios
                            .put("http://localhost:3000/api/v1/setting/"+this.dataSetting.id, data)
                            .then(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Pengaturan berhasil diperbarui',
                                    showConfirmButton: true
                                }).then(()=>{
                                    this.$router.push("/admin/setting")
                                })
                            })
                            //eslint-disable-next-line no-console
                            .catch( err => console.log(err));
                        } 
                })
            },
        handleFileUpload(){
            let formData = new FormData();

            formData.append('file', this.$refs.procedure.files[0]);
            
            Swal.fire({
                    title: 'Apakah anda yakin mengubah file prosedur?',
                    showDenyButton: true,
                    confirmButtonText: `Ya`,
                    denyButtonText: `Tidak`,
                }).then((result) => {
                    if (result.isConfirmed) {            
                        axios
                            .put("http://localhost:3000/api/v1/setting/upload-procedure", formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Prosedur berhasil diperbarui',
                                    showConfirmButton: true
                                }).then(()=>{
                                    
                                })
                            })
                            //eslint-disable-next-line no-console
                            .catch( err => console.log(err));
                    } 
            })
        }, 
    },
    created() {
    axios
        .get('http://localhost:3000/api/v1/setting/all')
        .then((res) => {
            const setting = res.data.data[0];
            this.dataSetting.id = setting._id;
            this.dataSetting.announcement.date = setting.announcement.slice(0,10);
            this.dataSetting.announcement.time = setting.announcement.slice(11,16);
            this.dataSetting.email.email = setting.email.email;
            this.dataSetting.email.password = setting.email.password;
            this.dataSetting.authentication.username = setting.authentication.username;
            this.dataSetting.authentication.password = setting.authentication.password;
        })
        .catch(error => console.log(error))
    }
}
</script>

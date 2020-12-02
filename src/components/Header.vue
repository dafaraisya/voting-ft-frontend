<style>
.header {
    background-color: #21bf73;
    color: #ffffff;
}
.text-bold {
    font-weight: bold;
}
.text-normal {
    font-weight: normal;
}
.inline {
    display: inline;
}
</style>
<template>
    <b-container>
        <b-navbar class="header bg-secondary rounded-lg">
            <b-navbar-brand class="text-white text-bold">{{ location }}</b-navbar-brand>
            <b-collapse id="nav-text-collapse" is-nav>
            </b-collapse>

            <a class="text-white" href="" @click="logout()">
                <i class="fas fa-arrow-left mr-2"></i>
                Keluar
            </a>
        </b-navbar>
        
    </b-container>
</template>

<script>
export default {
    name : 'Header',
    data() {
        return {
            textBold: 'text-bold',
            location: '',
        }
    },
    methods: {
        setLocation() {
            if(window.location.href.includes("session"))
                this.location = "Sesi";
            else if(window.location.href.includes("participant"))
                this.location = "Peserta";
            else if(window.location.href.includes("candidate"))
                this.location = "Kandidat";
            else if(window.location.href.includes("setting")) 
                this.location = "Pengaturan";
            else
                this.location = "Beranda"
        },
        logout() {
            this.$store.commit("setAuthentication", false);
            this.$router.push('../login');
        }
    },
    watch:{
        $route (){           
            this.setLocation();
        }
    }, 
    created() {
        this.setLocation();
    }
}
</script>
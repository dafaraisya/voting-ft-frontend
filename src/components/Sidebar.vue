<template>
    <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>PEMIRA FMIPA UNS 2020 </h3>
            </div>

            <ul class="list-unstyled components text-white">
                <li @click="selectedItem=0" v-bind:class="[selectedItem == 0 ? 'active' : '']">
                    <router-link class="text-white" :to="{name: 'DashboardMain'}">
                        <div class="inline"><i class="fas fa-home"></i></div>
                        <b-nav-text class="mr-4 ml-2">Beranda</b-nav-text>
                    </router-link>
                </li>
                <li @click="selectedItem=1" v-bind:class="[selectedItem == 1 ? 'active' : '']">
                    <router-link class="text-white" :to="{name: 'ListSession'}">
                        <div class="inline"><i class="far fa-calendar-alt" ></i></div>
                        <b-nav-text class="mr-4 ml-2">Sesi</b-nav-text>
                    </router-link>
                </li>
                <li @click="selectedItem=2" v-bind:class="[selectedItem == 2 ? 'active' : '']">
                    <router-link class="text-white" :to="{name: 'ListParticipant', params:{page: 1}}">
                        <div class="inline"><i class="fas fa-users"></i></div>
                        <b-nav-text class="mr-4 ml-2">Peserta</b-nav-text>
                    </router-link>
                </li>
                <li @click="selectedItem=3" v-bind:class="[selectedItem == 3 ? 'active' : '']">
                    <router-link class="text-white" :to="{name: 'ListCandidate'}">
                        <div class="inline"><i class="fas fa-user-alt"></i></div>
                        <b-nav-text class="mr-4 ml-2">Kandidat</b-nav-text>
                    </router-link>
                </li>
                <li @click="selectedItem=4" v-bind:class="[selectedItem == 4 ? 'active' : '']">
                    <router-link class="text-white" :to="{name: 'DetailSetting'}">
                        <div class="inline"><i class="fas fa-cogs"></i></div>
                        <b-nav-text class="mr-4 ml-2">Pengaturan</b-nav-text>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name : 'Sidebar',
    data() {
        return {
            textBold: 'text-bold',
            selectedItem: 0,
            scrollY: 0,
        }
    },
    created() {
        if(window.location.href.includes("session"))
            this.selectedItem = 1;
        else if(window.location.href.includes("participant"))
            this.selectedItem = 2;
        else if(window.location.href.includes("candidate"))
            this.selectedItem = 3;
        else if(window.location.href.includes("setting"))
            this.selectedItem = 4;
        else
            this.selectedItem = 0;

        window.addEventListener('scroll', this.handleScroll);
    }
}
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

* {
    font-family: 'Poppins', sans-serif;
}

.wrapper {
    display: flex;
    align-items: stretch;
    position: fixed;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    min-height: 100vh;
}

#sidebar.active {
    margin-left: -250px;
}


p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

#sidebar {
    /* don't forget to add all the previously mentioned styles here too */
    background: #555;
    color: #fff;
    transition: all 0.3s;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #444;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
#sidebar ul li a:hover {
    color: #454545;
    background: #aaa;
}

#sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #fff;
    background: #454545;
}
ul ul a {
    font-size: 0.9em !important;    
    padding-left: 30px !important;
    background: #454545;
    color: white;
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
<template>
  <div>
    <nav v-bind:class="[scrollPosition > 50 ? 'black' : '']">
      <div @click="toggle()" class="menu-icon">
        <i class="fa fa-bars fa-2x"></i>
      </div>
      <div class="logo">
        <img class="rounded-circle" src="@/assets/logo kpr.png" alt="" />
      </div>
      <div class="menu">
        <ul>
          <li>
            <a href="#home" v-smooth-scroll="{ duration: 1000 }">
              <i class="fas fa-home"></i>
              Home
            </a>
          </li>
          <li>
            <a href="#timeline" v-smooth-scroll="{ duration: 1000 }">
              <i class="far fa-calendar-alt"></i>
              Timeline
            </a>
          </li>
          <li>
            <a href="#announcement" v-smooth-scroll="{ duration: 1000 }">
              <i class="fas fa-bullhorn"></i>
              Pengumuman
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="menu-min" v-if="show" style="z-index: 9999999999">
      <ul>
        <li>
          <a href="#home" @click="toggle()" v-smooth-scroll="{ duration: 1000 }">
            <i class="fas fa-home"></i>
            Home
          </a>
        </li>
        <li>
          <a href="#timeline" @click="toggle()" v-smooth-scroll="{ duration: 1000 }">
            <i class="far fa-calendar-alt"></i>
            Timeline
          </a>
        </li>
        <li>
          <a href="#announcement" @click="toggle()" v-smooth-scroll="{ duration: 1000 }">
            <i class="fas fa-bullhorn"></i>
            Pengumuman
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollPosition: null,
      show: false,
    };
  },

  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    toggle() {
      this.show = !this.show;
    }
  },

  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>
<style scoped>
.logo {
  line-height: 60px;
  position: fixed;
  float: left;
  margin: 16px 46px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
}

.logo img {
  width: 40px;
  height: 40px;
}

nav {
  position: fixed;
  top: 0;
  width: 100%;
  line-height: 60px;
  z-index: 99999;
}

nav ul {
  line-height: 60px;
  list-style: none;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
  color: #fff;
  padding: 0;
  text-align: right;
  margin: 0;
  transition: 1s;
}

nav.black ul {
  background: rgba(20, 20, 20, 0.7);
}

nav ul li {
  display: inline-block;
  padding: 16px 40px;
}

nav ul li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}

nav ul li a:hover {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}

.menu-min {
  color:white;
  text-decoration: none;
  background: rgb(0,0,0);
  width: 100%;
  height: 100%;
  position:fixed;
  top: 80px;
  display: none;
  transition: 1s;
}

.menu-min ul {
  line-height: 60px;
  list-style: none;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
  color: #fff;
  padding: 0;
  text-align: center;
  margin: 0;
  padding-right: 40px;
  transition: 1s;
}

.menu-min.black ul {
  background: rgba(20, 20, 20, 0.74);
}

.menu-min ul li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}

.menu-icon {
  width: 100%;
  background:rgba(0,0,0,0.74);
  text-align: right;
  box-sizing: border-box;
  padding: 15px 24px;
  cursor: pointer;
  color: #fff;
  display: none;
}

@media (max-width: 786px) {
  .logo {
    position: fixed;
    top: 0;
    margin-top: 16px;
  }

  nav ul {
    max-height: 0px;
    background: rgba(0,0,0,0.74);
  }

  nav.black ul {
    background:rgba(0,0,0,0.74);
  }

  .showing {
    max-height: 34em;
  }

  nav ul li {
    box-sizing: border-box;
    width: 100%;
    padding: 24px;
    text-align: center;
  }

  .menu-icon {
    display: block;
  }

  .menu-min {
    display: block;
  }
}
</style>

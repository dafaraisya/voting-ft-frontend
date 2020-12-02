import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
// Admin
import HomeAdmin from "../views/admin/Home.vue";
import DashboardMain from "../views/admin/dashboard/DashboardMain.vue";
import LoginAdmin from "../views/admin/dashboard/Login.vue";
import IndexSession from "../views/admin/session/IndexSession.vue";
import ListSession from "../views/admin/session/ListSession.vue";
import CreateSession from "../views/admin/session/CreateSession.vue";
import EditSession from "../views/admin/session/EditSession.vue";
import DetailSession from "../views/admin/session/DetailSession.vue";
import IndexParticipant from "../views/admin/participant/IndexParticipant.vue";
import ListParticipant from "../views/admin/participant/ListParticipant.vue";
import CreateParticipant from "../views/admin/participant/CreateParticipant.vue";
import EditParticipant from "../views/admin/participant/EditParticipant.vue";
import DetailParticipant from "../views/admin/participant/DetailParticipant.vue";
import IndexCandidate from "../views/admin/candidate/IndexCandidate.vue";
import ListCandidate from "../views/admin/candidate/ListCandidate.vue";
import CreateCandidate from "../views/admin/candidate/CreateCandidate.vue";
import EditCandidate from "../views/admin/candidate/EditCandidate.vue";
import DetailCandidate from "../views/admin/candidate/DetailCandidate.vue";
import IndexSetting from "../views/admin/setting/IndexSetting.vue";
import EditSetting from "../views/admin/setting/EditSetting.vue";
import DetailSetting from "../views/admin/setting/DetailSetting.vue";
// Voting
import HomeVote from "../views/vote/Home.vue";
import Scan from "../views/vote/Scan.vue";
import Upload from "../views/vote/Upload.vue";
import Welcome from "../views/vote/Welcome.vue";
import Method from "../views/vote/Method.vue";
import Voting from "../views/vote/Voting.vue";
import DetailCandidateVoting from "../views/vote/Detail.vue";
import Announcement from "../views/vote/Announcement.vue";
import Error from "../views/vote/Error.vue";
import axios from "axios";

Vue.use(VueRouter);
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authenticated: false,
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    },
  },
});

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginAdmin,
  },
  {
    path: "/admin",
    name: "admin",
    component: HomeAdmin,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        var ip = [
          "36.81.8.39",
          "115.178.245.1",
          "120.188.87.161",
          "182.2.70.49",
          "36.82.16.96",
          "182.1.113.100",
          "36.72.212.123",
          "180.242.214.231",
          "182.2.41.152",
          "182.0.198.123",
          "36.65.160.63",
          "182.2.40.27",
          "36.74.208.155",
          "182.2.71.32",
          "182.0.237.81",
          "103.79.154.187",
          "114.5.109.44",
          "182.2.37.131",
          "120.188.74.160",
          "182.2.39.180"
        ];
        axios
          .get("https://api.ipify.org/?format=json")
          .then((res) => {
            console.log(res.data.ip);
            if (!ip.includes(res.data.ip)) {
              this.$router.push({ path: "/" });
            }
            next();
          })
          .catch((err) => console.log(err));
        //next();//next({ name: 'login'});
      } else {
        next();
      }
    },
    children: [
      {
        path: "",
        name: "DashboardMain",
        component: DashboardMain,
      },
      {
        path: "participant",
        name: "participant",
        component: IndexParticipant,
        children: [
          {
            path: ":page",
            name: "ListParticipant",
            component: ListParticipant,
          },
          {
            path: "add",
            name: "CreateParticipant",
            component: CreateParticipant,
          },
          {
            path: "edit/:id",
            name: "EditParticipant",
            component: EditParticipant,
          },
          {
            path: ":id",
            name: "DetailParticipant",
            component: DetailParticipant,
          },
        ],
      },
      {
        path: "candidate",
        name: "candidate",
        component: IndexCandidate,
        children: [
          {
            path: "",
            name: "ListCandidate",
            component: ListCandidate,
          },
          {
            path: "add",
            name: "CreateCandidate",
            component: CreateCandidate,
          },
          {
            path: "edit/:id",
            name: "EditCandidate",
            component: EditCandidate,
          },
          {
            path: ":id",
            name: "DetailCandidate",
            component: DetailCandidate,
          },
        ],
      },
      {
        path: "session",
        name: "session",
        component: IndexSession,
        children: [
          {
            path: "",
            name: "ListSession",
            component: ListSession,
          },
          {
            path: "add",
            name: "CreateSession",
            component: CreateSession,
          },
          {
            path: "edit/:id",
            name: "EditSession",
            component: EditSession,
          },
          {
            path: ":id",
            name: "DetailSession",
            component: DetailSession,
          },
        ],
      },
      {
        path: "setting",
        name: "Setting",
        component: IndexSetting,
        children: [
          {
            path: "",
            name: "DetailSetting",
            component: DetailSetting,
          },
          {
            path: "edit",
            name: "EditSetting",
            component: EditSetting,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    name: "vote",
    component: HomeVote,
    children: [
      {
        path: "",
        name: "Welcome",
        component: Welcome,
      },
      {
        path: "method",
        name: "Method",
        component: Method,
      },
      {
        path: "scan",
        name: "Scan",
        component: Scan,
      },
      {
        path: "upload",
        name: "Upload",
        component: Upload,
      },
      {
        path: "voting/:id",
        name: "Voting",
        component: Voting,
        beforeEnter: (to, from, next) => {
          if (store.state.authenticated == false) {
            next({ name: "Welcome" });
          } else {
            next();
          }
        },
      },
      {
        path: "detailcandidate/:id",
        name: "DetailCandidateVoting",
        component: DetailCandidateVoting,
        beforeEnter: (to, from, next) => {
          if (store.state.authenticated == false) {
            next({ name: "Welcome" });
          } else {
            next();
          }
        },
      },
      {
        path: "announcement",
        name: "Announcement",
        component: Announcement,
      },
      {
        path: "error/:error",
        name: "Error",
        component: Error,
      },
    ],
  },
];

export const router = new VueRouter({
  routes,
  mode: "history",
});

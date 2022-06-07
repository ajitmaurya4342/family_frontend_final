<template>
  <div id="app">
    <div v-if="onLine">
      

      <router-view></router-view>

      
    </div>
    <div v-else>
      <connectionLost />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import { Slide } from "vue-burger-menu"; // import the CSS transitions you wish to use, in this case we are using `Slide`
import Header from "@/components/partials/header.vue";
import Footer from "@/components/partials/footer.vue";
import VueYouTubeEmbed from "vue-youtube-embed";
import connectionLost from "./components/partials/connectionLost";

export default {
  data() {
    return {
      pageName: "",
      onLine: navigator.onLine,
      // onLine: false,
      showBackOnline: false
    };
  },
  mounted() {
    this.pageName = this.$route.name;

    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  components: {
    Header,
    Footer,
    Slide,
    connectionLost
  },

  name: "app",
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  methods: {
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    }
  }
};
</script>

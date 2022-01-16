<template>
  <v-app>
    <v-app-bar app color="white" dark v-if="isLoggedIn">
      <div class="d-flex align-center app-logo">
        <a href="/">
          <v-img
            alt="mailbutler Logo"
            class="shrink mr-2"
            contain
            src="./assets/mailbutlerLogo.svg"
            transition="scale-transition"
          />
        </a>
      </div>

      <div class="text-center menu">
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="black" dark v-bind="attrs" v-on="on" text>
              Features
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              class="test"
              @click="openMenu(index)"
              :disabled="index === 0 ? false : true"
            >
              <v-list-item-icon
                ><v-icon class="list-icon">
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>
      <div class="text-center menu">
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="black" dark v-bind="attrs" v-on="on" text>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="logout">
              <v-list-item-icon
                ><v-icon color="black">logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title color="black">LOGOUT</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";
import store from "@/store";
export default Vue.extend({
  name: "App",
  components: {},

  computed: {
    isLoggedIn() {
      return store.getters.isLoggedIn;
    },
  },
  data: () => ({
    items: [
      { title: "Notes", icon: "description" },
      { title: "Tasks", icon: "task" },
      { title: "Email Tracking", icon: "mail_outline" },
      { title: "Signatures", icon: "create" },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    openMenu(index: number) {
      if (index == 0) {
        router.push("/notes");
      }
    },
    goHome() {
      router.push("/");
    },
  },
});
</script>

<style scoped>
.app-logo {
  padding-left: 35px;
}

.test {
  color: black;
}
.test:hover {
  background: lightsteelblue;
}
.test:hover .list-icon {
  color: #4da386;
}
.menu {
  padding-left: 100px;
  padding-top: 10px;
}
</style>

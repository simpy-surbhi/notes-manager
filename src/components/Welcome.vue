<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/homeLogo.jpeg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col class="mb-4">
        <div class="text-h5 mb-4" style="color: #4da386">
          Hello {{ loggedUser }},
        </div>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Mailbutler</h1>
        <p class="subheading font-weight-regular">
          Mailbutler's great.Just look at all the
          <br />features it has!!
        </p>
        <v-btn color="primary" to="/notes">Check Your Notes</v-btn>
      </v-col>
      <v-col class="mb-4" cols="12">
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>
        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>
      <v-col class="mb-4" cols="12">
        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>
      <v-col class="mb-4" cols="12">
        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  name: "Welcome",
  computed: {
    loggedUser() {
      return store.state.loggedInUserEmail;
    },
  },
  data: () => ({
    ecosystem: [
      {
        text: "Notes $ Tasks",
      },
      {
        text: "Follow-up Reminders",
      },
    ],
    importantLinks: [
      {
        text: "Snooze",
      },
      {
        text: "Message Temlates",
      },
    ],
    whatsNext: [
      {
        text: "Tracking",
      },
      {
        text: "Send Later",
      },
      {
        text: "Signatures",
      },
    ],
  }),
});
</script>

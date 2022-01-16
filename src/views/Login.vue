<template>
  <v-img height="100vh" src="../assets/mailbutler.jpeg">
    <div class="login" style="margin-top: 175px">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="8">
            <v-card class="elevation-12">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h5 class="text-center text-h5">Log In</h5>
                    <v-form>
                      <v-text-field
                        prepend-icon="person"
                        v-model="email"
                        name="email"
                        label="Email"
                        type="email"
                        :rules="emailRules"
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        v-model="password"
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        type="password"
                        @keypress.enter="doLogin"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mb-5">
                    <div class="body2" style="color: red">
                      &nbsp;
                      {{ error }}
                    </div>
                    <v-btn
                      color="primary"
                      v-on:click="doLogin"
                      :loading="loading"
                      >Login</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="10" md="4" class="blue-grey darken-1 mx-auto">
                  <v-card-text>
                    <h3 class="text-center">Mailbutler: Email in no time</h3>
                    <h5 class="text-center">Extra features for your inbox</h5>
                    <v-img
                      src="../assets/LogoImage.jpeg"
                      class="pa-md-6 mx-lg-auto"
                      contain
                      height="200"
                    />
                    <v-rating
                      color="orange"
                      length="5"
                      size="20"
                      value="4.1"
                      class="text-center"
                      val
                    ></v-rating>
                    <h5 class="text-center">4.1• 114 Ratings</h5>
                    <h6 class="text-center">Free Offers In-App Purchases</h6>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-img>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";
import store from "@/store";
export default Vue.extend({
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    error: "",
    loading: false,
    emailRules: [(v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
  }),
  methods: {
    doLogin(): void {
      this.loading = true;
      this.error = "";
      const email = this.email;
      const password = this.password;
      store
        .dispatch("login", { email, password })
        .then(() => router.push("/"))
        .catch((err) => {
          this.error = err.response.data.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
</script>

<style></style>

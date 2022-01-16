<template>
  <div class="text-center">
    <v-dialog
      v-model="addDeleteDialog"
      width="300"
      @click:outside="cancelPress"
    >
      <v-card>
        <v-card-title class="headline">Delete</v-card-title>
        <v-card-text> Do you want to delete the note?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="okPress" :loading="loading">
            Ok
          </v-btn>
          <v-btn text color="secondary" @click="cancelPress"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ApiService from "@/services/ApiService";

export default Vue.extend({
  name: "Delete",
  props: {
    noteId: {
      type: String,
    },
    addDeleteDialog: {
      type: Boolean,
    },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    async okPress(): Promise<void> {
      this.loading = true;
      await ApiService.deleteNote(this.noteId)
        .then((res) => {
          this.$emit("clicked");
        })
        .catch((err) => {
          this.$emit("clicked", err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    cancelPress(): void {
      this.$emit("close");
    },
  },
});
</script>

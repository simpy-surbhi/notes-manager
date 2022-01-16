<template>
  <v-app>
    <v-content>
      <v-container>
        <v-progress-linear
          indeterminate
          color="#4da386"
          v-if="loading"
        ></v-progress-linear>
        <v-layout row wrap>
          <v-flex v-for="item in temp" :key="item.id" xs12 md6 lg4>
            <v-card style="margin: 10px" color="#f5cc75">
              <v-card-title primary-title>
                <span v-text="item.text"></span>
              </v-card-title>
              <v-card-actions class="text-align:right">
                <div class="text-overline">
                  {{ item.updated_at | formatDate }}
                </div>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  small
                  dark
                  plain
                  @click="openEditDialog(item.id, item.text)"
                  class="ma-0 pa-0"
                  style="min-width: 0"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  color="primary"
                  small
                  dark
                  plain
                  @click="openDeleteDialog(item.id)"
                  class="ma-0 pa-0"
                  style="min-width: 0"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <AddNotes
            @clicked="refetch"
            @close="dialogAction"
            :type="dialogType"
            :noteText="noteText"
            :noteId="noteId"
            :addNotesDialog="openDialog"
          />
          <Delete
            @close="deleteDialogAction"
            @clicked="refetch"
            :noteId="noteId"
            :addDeleteDialog="deleteDialog"
          />
          <v-snackbar v-model="snackbarFlag" timeout="2000" bottom left>
            {{ snackbarMessage }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="snackbarFlag = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-layout>
        <v-flex>
          <v-btn
            fab
            dark
            large
            color="#4da386"
            fixed
            right
            bottom
            style="margin-right: 50px"
            @click="openAddDialog()"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import ApiService from "@/services/ApiService";
import Note from "@/models/Note";
import Vue from "vue";
import AddNotes from "./dialog/AddNotes.vue";
import Delete from "./dialog/Delete.vue";
import moment from "moment";

export default Vue.extend({
  components: { AddNotes, Delete },
  name: "NotesContainer",
  filters: {
    formatDate: function (value: string) {
      if (value) {
        return moment(String(value)).format("MMM DD, YYYY hh:mm");
      }
      return "";
    },
  },
  data: () => ({
    temp: [] as Note[],
    dialog: false,
    loading: false,
    dialogType: "",
    noteText: "",
    noteId: "",
    openDialog: false,
    deleteDialog: false,
    snackbarMessage: "",
    snackbarFlag: false,
  }),
  computed: {
    getSelectedNote() {
      return this.noteId;
    },
  },
  mounted() {
    this.getNotes();
  },

  methods: {
    deleteDialogAction() {
      if (this.deleteDialog) {
        this.noteId = "";
      }
      this.deleteDialog = !this.deleteDialog;
    },

    dialogAction() {
      if (this.openDialog) {
        this.noteId = "";
        this.noteText = "";
        this.dialogType = "";
      }
      this.openDialog = !this.openDialog;
    },

    openEditDialog(id: string, text: string): void {
      this.dialogType = "Edit";
      this.noteId = id;
      this.noteText = text;
      this.dialogAction();
    },

    openAddDialog(): void {
      this.dialogType = "Add";
      this.noteId = "";
      this.noteText = "";
      this.dialogAction();
    },

    openDeleteDialog(id: string): void {
      this.noteId = id;
      this.deleteDialogAction();
    },

    refetch(error: string): void {
      this.openDialog = false;
      this.deleteDialog = false;
      if (!error) {
        this.snackbarMessage = "Action performed successfully!";
        this.snackbarFlag = true;
        this.getNotes();
      } else {
        this.snackbarMessage = "Action failed - " + error;
        this.snackbarFlag = true;
      }
    },

    async getNotes(): Promise<void> {
      this.loading = true;
      await ApiService.getNotes({ page: 1, per_page: 50 })
        .then((response) => {
          this.temp = response;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
</script>

<style></style>

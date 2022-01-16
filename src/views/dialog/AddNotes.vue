<template>
  <div class="text-center">
    <v-dialog v-model="addNotesDialog" width="500" @click:outside="closeDialog">
      <v-card>
        <v-card-title>
          <h2>{{ type }}</h2>
        </v-card-title>
        <v-card-text class="text-right">
          <v-form class="px-3">
            <v-text-field
              v-model="noteText"
              autofocus
              prepend-icon="notes"
            ></v-text-field>
            <v-btn
              text
              :disabled="isDisabled"
              :loading="loading"
              @click="updateNote"
              color="primary"
              >Ok</v-btn
            >
            <v-btn text @click="closeDialog" color="secondary">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import ApiService from "@/services/ApiService";
import Vue from "vue";
export default Vue.extend({
  props: {
    type: {
      type: String,
    },
    noteId: {
      type: String,
    },
    noteText: {
      type: String,
    },
    addNotesDialog: {
      type: Boolean,
    },
  },
  name: "AddNotes",
  computed: {
    isDisabled(): boolean {
      return (
        this.loading ||
        (this.noteText !== undefined && (this.noteText as string).length === 0)
      );
    },
  },
  data(): { loading: boolean } {
    return {
      loading: false,
    };
  },
  methods: {
    closeDialog(): void {
      this.$emit("close");
    },
    async updateNote(): Promise<void> {
      if (this.noteId !== "") {
        this.loading = true;
        const data = {
          context: {
            message_id: "minim sunt in labore",
            gmail_message_id: "proiden",
            gmail_draft_id: "id ea nulla in",
            mailbutler_message_id: "a79768e9-afa4-14f8-f103-960bb1b0a8f5",
            contact_id: "fugiat enim nulla do",
          },
          text: this.noteText,
          team_id: "4529cc48-e148-db2b-d328-17604e9eb22c",
          in8: false,
          consecteturb2: 7045950,
          doloreea5: 31879471,
          fugiata: -39717524.656902544,
        };
        await ApiService.updateNote(this.noteId, data)
          .then((res) => {
            this.$emit("clicked");
          })
          .catch((err) => {
            this.$emit("clicked", err);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.postNotes();
      }
    },

    async postNotes(): Promise<void> {
      this.loading = true;
      const data = {
        context: {
          message_id: "minim sunt in labore",
          gmail_message_id: "proiden",
          gmail_draft_id: "id ea nulla in",
          mailbutler_message_id: "a79768e9-afa4-14f8-f103-960bb1b0a8f5",
          contact_id: "fugiat enim nulla do",
        },
        text: this.noteText,
        team_id: "4529cc48-e148-db2b-d328-17604e9eb22c",
        in8: false,
        consecteturb2: 7045950,
        doloreea5: 31879471,
        fugiata: -39717524.656902544,
      };
      await ApiService.addNotes(data)
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
  },
});
</script>

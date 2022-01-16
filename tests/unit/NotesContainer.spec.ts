import { shallowMount } from "@vue/test-utils";

import NotesContainer from "@/views/NotesContainer.vue";

describe('NotesContainer.vue', () => {
    it('renders v-card tag into NotesContainer.vue', () => {
      const wrapper = shallowMount(NotesContainer)
      expect(wrapper.find('v-card').exists())
    })
  
    it('renders v-icon tag into NotesContainer.vue', () => {
      const wrapper = shallowMount(NotesContainer)
      expect(wrapper.find('v-icon').exists())
    })
  
    it('renders v-btn Button NotesContainer.vue', () => {
      const wrapper = shallowMount(NotesContainer)
      expect(wrapper.find('v-btn').exists())
    })
    it('renders AddNotes NotesContainer.vue', async() => {
        const wrapper = shallowMount(NotesContainer)
        expect(wrapper.find('AddNotes').exists());
      })      
  
  })



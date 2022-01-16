import { shallowMount } from "@vue/test-utils";

import Login from "@/views/login.vue";

describe('Login.vue', () => {
    it('renders h5 tag into Login.vue', () => {
      const wrapper = shallowMount(Login)
      expect(wrapper.find('h5').exists())
    })
  
    it('renders textfield tag into Login.vue', () => {
      const wrapper = shallowMount(Login)
      expect(wrapper.find('v-form').exists())
    })
  
    it('Login Button Login.vue', () => {
      const wrapper = shallowMount(Login)
      expect(wrapper.find('v-btn').exists())
    })
    it('Login Button Login.vue', async() => {
        const wrapper = shallowMount(Login)
        expect(wrapper.find('email').exists());
      })
    it('Login Button Login.vue', async() => {
        const wrapper = shallowMount(Login)
        expect(wrapper.find('password').exists());
      })
 
   })

import { createApp } from 'vue';
import App from './App.vue';

createApp(App)
  .directive('focus', {
    mounted(el) {
      el.focus();
      el.value = '';
      el.placeholder = 'Change todo...';
    }
  })
  .mount('#app');

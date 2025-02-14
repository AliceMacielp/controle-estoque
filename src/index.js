import { createApp } from 'vue';
import { Quasar } from 'quasar';
import router from './router';
import App from './App.vue';

import 'quasar/dist/quasar.css';

const app = createApp(App);

// Usando Quasar e Vue Router
app.use(Quasar, { config: {} });
app.use(router);

app.mount('#app');

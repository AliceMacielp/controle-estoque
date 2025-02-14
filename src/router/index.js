import { createRouter, createWebHistory } from 'vue-router';
import CadastroPage from 'src/components/CadastroPage.vue';
import EntradaPage from 'src/components/EntradaPage.vue';
import SaidaPage from 'src/components/SaidaPage.vue';
import ControleEstoque from 'src/components/ControleEstoque.vue';
import ComprasPage from 'src/components/ComprasPage.vue';

const routes = [
  {
    path: '/',
    component: ControleEstoque,
  },
  {
    path: '/cadastro',
    component: CadastroPage,
  },
  {
    path: '/entrada',
    component: EntradaPage,
  },
  {
    path: '/saida',
    component: SaidaPage,
  },
  {
    path: '/compras',
    component: ComprasPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

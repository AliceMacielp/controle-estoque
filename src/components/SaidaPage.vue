<template>
  <q-page class="flex justify-center items-center" style="height: 100vh;">
    <div class="q-pa-md" style="max-width: 400px; width: 100%; background-color: #fff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
      <q-form @submit="submit">
        <div class="q-mb-md">
          <q-input
            v-model="codigo_produto"
            label="Código do Produto"
            @blur="getProduct"
            required
            filled
            :dense="true"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            v-model="product.descricao"
            label="Descrição"
            :disable="true"
            filled
            :dense="true"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            v-model="data_saida"
            label="Data de Saída"
            type="date"
            required
            filled
            :dense="true"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            v-model="quantidade"
            label="Quantidade"
            type="number"
            required
            filled
            :dense="true"
          />
        </div>
        <div class="q-mt-md">
          <q-btn label="Registrar Saída" @click="submit" color="primary" class="full-width" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { getProducts, addExit } from 'src/store/estoque';

export default {
  data() {
    return {
      codigo_produto: '',
      quantidade: 0,
      data_saida: '',
      product: {}
    };
  },
  methods: {
    async getProduct() {
      const products = await getProducts();
      this.product = products.find((p) => p.codigo === this.codigo_produto);
    },
    async submit() {
      const exit = {
        codigo_produto: this.codigo_produto,
        descricao: this.product.descricao,
        data_saida: this.data_saida,
        quantidade: this.quantidade
      };
      await addExit(exit);
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
}

.q-btn.full-width {
  width: 100%;
}
</style>

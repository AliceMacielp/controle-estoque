<template>
  <q-page class="flex justify-center items-center" style="height: 100vh;">
    <div class="q-pa-md" style="max-width: 400px; width: 100%; background-color: #fff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
      <q-form @submit="submit">
        <div class="q-mb-md">
          <q-input
            v-model="product.codigo"
            label="Código do Produto"
            required
            filled
            :dense="true"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            v-model="product.descricao"
            label="Descrição"
            required
            filled
            :dense="true"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            v-model="product.informacoes"
            label="Informações Adicionais"
            filled
            :dense="true"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            v-model="product.qtdMinima"
            label="Quantidade Mínima"
            type="number"
            required
            filled
            :dense="true"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            v-model="product.qtdDesejavel"
            label="Quantidade Desejável"
            type="number"
            required
            filled
            :dense="true"
          />
        </div>
        <div class="q-mt-md">
          <q-btn label="Cadastrar" type="submit" color="primary" class="full-width" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { addProduct, initDB } from 'src/store/estoque';

export default {
  data() {
    return {
      product: {
        codigo: '',
        descricao: '',
        informacoes: '',
        qtdMinima: 0,
        qtdDesejavel: 0
      }
    };
  },
  methods: {
    async submit() {
      // Limpar o objeto para garantir que não contenha valores inválidos
      const cleanedProduct = {
        codigo: this.product.codigo || '',
        descricao: this.product.descricao || '',
        informacoes: this.product.informacoes || '',
        qtdMinima: this.product.qtdMinima || 0,
        qtdDesejavel: this.product.qtdDesejavel || 0
      };

      // Garantir que o DB está inicializado antes de adicionar o produto
      await initDB();
      await addProduct(cleanedProduct); // Passar o objeto limpo
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

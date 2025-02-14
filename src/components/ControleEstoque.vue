<template>
  <q-page class="flex justify-center items-center" style="height: 100vh; background-color: #f5f5f5;">
    <div class="q-pa-md" style="max-width: 800px; width: 100%; background-color: #fff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
      <div class="q-mb-md">
        <q-btn
          label="Cadastro de Produto"
          color="primary"
          @click="goToCadastro"
          class="full-width q-mb-md"
          rounded
          size="lg"
        />
      </div>
      <div class="q-mb-md">
        <q-btn
          label="Entrada de Produto"
          color="secondary"
          @click="goToEntrada"
          class="full-width q-mb-md"
          rounded
          size="lg"
        />
      </div>
      <div class="q-mb-md">
        <q-btn
          label="Saída de Produto"
          color="accent"
          @click="goToSaida"
          class="full-width q-mb-md"
          rounded
          size="lg"
        />
      </div>
      <div class="q-mb-md">
        <q-btn
          label="Compras"
          color="positive"
          @click="goToCompras"
          class="full-width q-mb-md"
          rounded
          size="lg"
        />
      </div>
      <q-table :rows="rows" :columns="columns" row-key="codigo" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script>
import { getProducts, getEntries, getExits, initDB } from 'src/store/estoque';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      rows: [],
      columns: [
        { name: 'codigo', label: 'Código', field: 'codigo' },
        { name: 'descricao', label: 'Descrição', field: 'descricao' },
        { name: 'entradas', label: 'Entradas Totais', field: 'entradas' },
        { name: 'saidas', label: 'Saídas Totais', field: 'saidas' },
        { name: 'estoque', label: 'Quantidade em Estoque', field: 'estoque' },
        { name: 'nivel', label: 'Nível de Estoque', field: 'nivel' }
      ]
    };
  },
  methods: {
    async fetchData() {
      // Garante que o banco de dados foi inicializado antes de buscar os dados
      await initDB();

      const products = await getProducts();
      const entries = await getEntries();
      const exits = await getExits();

      // Calculando as entradas e saídas corretamente
      this.rows = products.map(product => {
        const entradas = entries.filter(entry => entry.codigo === product.codigo)
                                .reduce((sum, entry) => sum + Number(entry.quantidade), 0);
        
        const saidas = exits.filter(exit => exit.codigo === product.codigo)
                            .reduce((sum, exit) => sum + Number(exit.quantidade), 0);

        const estoque = entradas - saidas;
        const nivel = estoque < product.qtdMinima ? 'Baixo' :
                      estoque >= product.qtdMinima && estoque < product.qtdDesejavel ? 'Médio' : 'Alto';
        
        return { ...product, entradas, saidas, estoque, nivel };
      });
    },
    goToCadastro() {
      this.$router.push('/cadastro');
    },
    goToEntrada() {
      this.$router.push('/entrada');
    },
    goToSaida() {
      this.$router.push('/saida');
    },
    goToCompras() {
      this.$router.push('/compras');
    }
  },
  mounted() {
    this.fetchData();
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

.q-table {
  margin-top: 16px;
  border-radius: 8px;
}

.q-table .q-table__rows {
  background-color: #f9f9f9;
}

.q-table .q-table__row:nth-child(even) {
  background-color: #fafafa;
}

.q-table .q-table__row:hover {
  background-color: #e0e0e0;
}
</style>

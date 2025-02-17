<template>
    <q-page>
      <q-table :rows="rows" :columns="columns" />
    </q-page>
  </template>
  
  <script>
  import { getProducts, getEntries, getExits, addPurchase } from 'src/store/estoque';
  
  export default {
    data() {
      return {
        rows: [],
        columns: [
          { name: 'codigo', label: 'Código', field: 'codigo' },
          { name: 'descricao', label: 'Descrição', field: 'descricao' },
          { name: 'quantidade', label: 'Quantidade a Comprar', field: 'quantidade' }
        ]
      };
    },
    methods: {
      async fetchData() {
        const products = await getProducts();
        const entries = await getEntries();
        const exits = await getExits();
        
        this.rows = products.filter(product => {
          const entradas = entries.filter(entry => entry.codigo_produto === product.codigo)
                                   .reduce((sum, entry) => sum + entry.quantidade, 0);
          const saidas = exits.filter(exit => exit.codigo_produto === product.codigo)
                              .reduce((sum, exit) => sum + exit.quantidade, 0);
          const estoque = entradas - saidas;
          return estoque < product.estoque_minimo;
        }).map(product => {
          const entradas = entries.filter(entry => entry.codigo_produto === product.codigo)
                                   .reduce((sum, entry) => sum + entry.quantidade, 0);
          const saidas = exits.filter(exit => exit.codigo_produto === product.codigo)
                              .reduce((sum, exit) => sum + exit.quantidade, 0);
          const estoque = entradas - saidas;
          const quantidadeComprar = product.estoque_desejavel - estoque;
          return { ...product, quantidade: quantidadeComprar };
        });
      }
    },
    mounted() {
      this.fetchData();
    }
  };
  </script>
  
import { supabase } from './supabase'; // Caminho corrigido

// Função para adicionar um produto
const addProduct = async (product) => {
  const { error } = await supabase.from('produtos').insert([product]);
  if (error) console.error('Erro ao adicionar produto:', error);
};

// Função para adicionar uma entrada de estoque
const addEntry = async (entry) => {
  const { error } = await supabase.from('entradas').insert([entry]);
  if (error) console.error('Erro ao adicionar entrada:', error);
};

// Função para adicionar uma saída de estoque
const addExit = async (exit) => {
  const { error } = await supabase.from('saidas').insert([exit]);
  if (error) console.error('Erro ao adicionar saída:', error);
};

// Função para buscar todos os produtos
const getProducts = async () => {
  const { data, error } = await supabase.from('produtos').select('*');
  if (error) console.error('Erro ao buscar produtos:', error);
  return data;
};

// Função para buscar todas as entradas
const getEntries = async () => {
  const { data, error } = await supabase.from('entradas').select('*');
  if (error) console.error('Erro ao buscar entradas:', error);
  return data;
};

// Função para buscar todas as saídas
const getExits = async () => {
  const { data, error } = await supabase.from('saidas').select('*');
  if (error) console.error('Erro ao buscar saídas:', error);
  return data;
};

// Função para buscar todas as compras
const getPurchases = async () => {
  const { data, error } = await supabase.from('compras').select('*');
  if (error) console.error('Erro ao buscar compras:', error);
  return data;
};

// Função para adicionar uma compra
const addPurchase = async (purchase) => {
  const { error } = await supabase.from('compras').insert([purchase]);
  if (error) console.error('Erro ao adicionar compra:', error);
};

export {
  addProduct,
  addEntry,
  addExit,
  getProducts,
  getEntries,
  getExits,
  getPurchases,
  addPurchase,
};

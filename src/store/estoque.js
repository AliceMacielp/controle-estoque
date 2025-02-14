import { openDB } from 'idb';

const DB_NAME = 'estoqueDB';
const DB_VERSION = 1;
const DB_STORE_PRODUCTS = 'produtos';
const DB_STORE_ENTRIES = 'entradas';
const DB_STORE_SAIDAS = 'saidas';
const DB_STORE_COMPRAS = 'compras';

let db;

// Função para inicializar o banco de dados
const initDB = async () => {
  if (!db) {
    db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(DB_STORE_PRODUCTS)) {
          db.createObjectStore(DB_STORE_PRODUCTS, { keyPath: 'codigo' });
        }
        if (!db.objectStoreNames.contains(DB_STORE_ENTRIES)) {
          db.createObjectStore(DB_STORE_ENTRIES, { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains(DB_STORE_SAIDAS)) {
          db.createObjectStore(DB_STORE_SAIDAS, { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains(DB_STORE_COMPRAS)) {
          db.createObjectStore(DB_STORE_COMPRAS, { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }
};

// Função para garantir que o banco de dados foi inicializado corretamente
const ensureDBInitialized = async () => {
  if (!db) {
    await initDB();
  }
};

// Funções de CRUD
const addProduct = async (product) => {
  await ensureDBInitialized();
  const tx = db.transaction(DB_STORE_PRODUCTS, 'readwrite');
  await tx.store.put(product);  // Adiciona ou atualiza o produto
  await tx.done;
};

const addEntry = async (entry) => {
  await ensureDBInitialized();
  const tx = db.transaction(DB_STORE_ENTRIES, 'readwrite');
  await tx.store.add(entry);  // Adiciona a entrada
  await tx.done;
};

const addExit = async (exit) => {
  await ensureDBInitialized();
  const tx = db.transaction(DB_STORE_SAIDAS, 'readwrite');
  await tx.store.add(exit);  // Adiciona a saída
  await tx.done;
};

const getProducts = async () => {
  await ensureDBInitialized();
  const tx = db.transaction(DB_STORE_PRODUCTS, 'readonly');
  return await tx.store.getAll();  // Recupera todos os produtos
};

const getEntries = async () => {
  await ensureDBInitialized();
  const tx = db.transaction(DB_STORE_ENTRIES, 'readonly');
  return await tx.store.getAll();  // Recupera todas as entradas
};

const getExits = async () => {
  await ensureDBInitialized();
  const tx = db.transaction(DB_STORE_SAIDAS, 'readonly');
  return await tx.store.getAll();  // Recupera todas as saídas
};

const getPurchases = async () => {
  await ensureDBInitialized();
  const tx = db.transaction(DB_STORE_COMPRAS, 'readonly');
  return await tx.store.getAll();  // Recupera todas as compras
};

const addPurchase = async (purchase) => {
  await ensureDBInitialized();
  const tx = db.transaction(DB_STORE_COMPRAS, 'readwrite');
  await tx.store.add(purchase);  // Adiciona a compra
  await tx.done;
};

export {
  initDB,
  addProduct,
  addEntry,
  addExit,
  getProducts,
  getEntries,
  getExits,
  getPurchases,
  addPurchase,
};

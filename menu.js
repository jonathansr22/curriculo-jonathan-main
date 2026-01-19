
let btnMenu = document.getElementById('btn-abrir')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click',()=>{
    menu.classList.add('abrir-menu')
})
menu.addEventListener('click',()=>{
    menu.classList.remove('abrir-menu')
})
overlay.addEventListener('click',()=>{
    menu.classList.remove('abrir-menu')
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
// ADICIONE ESTA LINHA:
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = { /* ... seu config ... */ };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Inicializa o Auth
const pedidosRef = collection(db, "pedidos");

// --- CONTROLE DE ACESSO ---

// 1. Função de Login
document.getElementById('btnLogar').onclick = async () => {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    try {
        await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
        document.getElementById('login-erro').style.display = 'block';
    }
};

// 2. Função de Sair
document.getElementById('btnSair').onclick = () => signOut(auth);

// 3. Observador de Estado (O Coração da Segurança)
onAuthStateChanged(auth, (user) => {
    const overlay = document.getElementById('login-overlay');
    const btnSair = document.getElementById('btnSair');

    if (user) {
        // Usuário Logado: Esconde login, mostra botão sair e carrega dados
        overlay.style.display = 'none';
        btnSair.style.display = 'inline-block';
        carregarDados();
    } else {
        // Usuário Deslogado: Mostra login e limpa a tela
        overlay.style.display = 'flex';
        btnSair.style.display = 'none';
        document.getElementById('containerPedidos').innerHTML = "";
    }
});

// Coloque sua lógica de onSnapshot dentro de uma função carregarDados()
function carregarDados() {
    onSnapshot(query(pedidosRef, orderBy("createdAt", "desc")), (snapshot) => {
        // ... (seu código de renderizar pedidos que já fizemos antes) ...
    });
}

// ... restante das funções (addDoc, deleteDoc, etc)
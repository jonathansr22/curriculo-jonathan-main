// MENU MOBILE
const btnMenu = document.getElementById('btn-menu');
const btnFechar = document.querySelector('.btn-fechar');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');

// Links do menu mobile para fechar ao clicar
const linksMenu = document.querySelectorAll('.menu-mobile nav ul li a');

function abrirMenu() {
    menu.classList.add('abrir');
    overlay.classList.add('abrir');
}

function fecharMenu() {
    menu.classList.remove('abrir');
    overlay.classList.remove('abrir');
}

btnMenu.addEventListener('click', abrirMenu);
btnFechar.addEventListener('click', fecharMenu);
overlay.addEventListener('click', fecharMenu);

// Fechar menu ao clicar em um link
linksMenu.forEach(link => {
    link.addEventListener('click', fecharMenu);
});

// SCROLL SUAVE (Opcional, pois o CSS scroll-behavior já ajuda, mas isso garante em browsers antigos)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if(targetSection){
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
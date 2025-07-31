
const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');

burgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

function updateKartQuantity() {
    const kartContainer = document.querySelector('.kart-container');

    const kart = JSON.parse(localStorage.getItem('kart')) || [];

    if (kart.length) {
        const quantityContainer = document.createElement('span');
        quantityContainer.id = 'kart-count';
        quantityContainer.innerText = kart.length;
        kartContainer.appendChild(quantityContainer);
    }
}

addEventListener('DOMContentLoaded', () => {
    updateKartQuantity();
    document.querySelector('.burger-btn').addEventListener('click', () => {
        const navBarList = document.querySelector('nav ul');

        if (navBarList.classList.contains('menu-active')) {
            navBarList.classList.remove('menu-active');
        }
        else {
            navBarList.classList.add('menu-active');
        }
    });
});


function updateproductsQuantity() {
    const quantityContainer = document.getElementById('products-count');
    if (quantityContainer) {
        quantityContainer.remove();
    }
    
    const productsContainer = document.querySelector('.products-container');

    const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log(products.length);
    if (products.length) {
        const quantityContainer = document.createElement('span');
        quantityContainer.id = 'products-count';
        quantityContainer.innerText = products.length;
        productsContainer.appendChild(quantityContainer);
    }
}

updateproductsQuantity()
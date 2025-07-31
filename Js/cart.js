function createCardItem(productsItem){
    const newCardItem = document.createElement('div');
    newCardItem.classList.add('products-item-container');

    newCardItem.innerHTML = `
        <div class="products-item-img-container">
            <img src=${productsItem.product.images[0]} alt=${productsItem.product.title}>
        </div>
        <div class="products-item-description">
            <span>${productsItem.product.title}</span>
        </div>
        <div class="products-item-price">
            <span>$${productsItem.product.price}</span>
        </div>
        <div class="products-item-quantity">
            <span>x${productsItem.quantity}</span>
        </div>
        <div class="products-item-subtotal">
            <span>$${productsItem.quantity * productsItem.product.price}</span>
        </div>`;

    return newCardItem
}

function createCardTotalAmount(products){

    const calculateAmount = (total, item) => total += item.product.price * item.quantity;
    const amount = products.reduce(calculateAmount, 0);

    const newCard = document.createElement('div');
    newCard.classList.add('products-total-amount-container');

    newCard.innerHTML = `
    <span id="products-total-title">TOTAL</span>
    <span id="products-total-amount">$${amount.toFixed(2)}</span>`;

    return newCard;
}

function getproducts(){
    return JSON.parse(localStorage.getItem('products')) || [];      
}

function emptyproducts(){
    localStorage.removeItem('products');
    const productsCount = document.getElementById('products-count');
    if(productsCount)
        productsCount.remove();
}

function renderActionButtons(){
    const btnContainer = document.querySelector('.products-btn-container');

    if(getproducts().length){
        btnContainer.style.display = 'flex';        
    }
    else{
        btnContainer.style.display = 'none';   
    }
}

function renderproducts(){
    let products = getproducts();    

    const productsItemsContainer = document.querySelector('.products-data-container');
    productsItemsContainer.innerHTML = '';

    if(products.length){
        products.forEach(item => {
            productsItemsContainer.appendChild(createCardItem(item));
        });

        productsItemsContainer.appendChild(createCardTotalAmount(products));
    }

    renderActionButtons();
}

function actionsBtnproductsEventSuscribe(){

    document.getElementById('empty-products-btn').addEventListener('click', () => {
        emptyproducts();
        renderproducts();
    });

    document.getElementById('buy-btn').addEventListener('click', () => {
        emptyproducts();
        renderproducts();
        alert('La compra se ha procesado con exito, en breve recibira un mail de nuestro equipo.\n¡¡¡Muchas gracias por su compra!!!');
    });
}


/* -------------------------------------------------------------------------- */
/*                               INICIALIZACION                               */
/* -------------------------------------------------------------------------- */

addEventListener('DOMContentLoaded', () =>{
    renderproducts();
    actionsBtnproductsEventSuscribe();
});
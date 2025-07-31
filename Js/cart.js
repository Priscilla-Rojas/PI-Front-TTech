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
            <button class="decrease-btn">-</button>
            <span class="quantity">x${productsItem.quantity}</span>
            <button class="increase-btn">+</button>
        </div>
        <div class="products-item-subtotal">
            <span>$${productsItem.quantity * productsItem.product.price}</span>
        </div>
        <div class="products-item-actions">
            <button class="remove-btn" id="remove-${productsItem.product.id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/>
                </svg>
            </button>    
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
        actionsQuantityEventSubscribe(); 
    }
    else{
        productsItemsContainer.innerHTML = '<h2 class="empty-products">No hay productos en el carrito</h2>';
    }
    updateproductsQuantity()
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

function updateQuantity(productId, change) {
    let products = getproducts();

    products = products.map(item => {
        if(item.product.id === productId) {
            item.quantity += change;
            if(item.quantity < 1) {
                if(confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                    return null; // marcar para eliminar
                }else{
                    item.quantity = 1; // revertir a 1 si se cancela
                }
            }
        }
        return item;
    }).filter(item => item !== null); // eliminar productos con cantidad 0

    localStorage.setItem('products', JSON.stringify(products));
    renderproducts();
}

function actionsQuantityEventSubscribe() {
    const productItems = document.querySelectorAll('.products-item-container');

    productItems.forEach(item => {
        const productId = parseInt(item.querySelector('.remove-btn').id.replace('remove-', ''));
        const increaseBtn = item.querySelector('.increase-btn');
        const decreaseBtn = item.querySelector('.decrease-btn');
        const removeBtn = item.querySelector('.remove-btn');

        increaseBtn.addEventListener('click', () => {
            updateQuantity(productId, 1);
        });

        decreaseBtn.addEventListener('click', () => {
            updateQuantity(productId, -1);
        });

        removeBtn.addEventListener('click', () => {
            updateQuantity(productId, -9999);
        });
    });
    updateproductsQuantity();
}


/* -------------------------------------------------------------------------- */
/*                               INICIALIZACION                               */
/* -------------------------------------------------------------------------- */

addEventListener('DOMContentLoaded', () =>{
    renderproducts();
    actionsBtnproductsEventSuscribe();
});
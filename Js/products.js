async function getAllProducts() {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/skin-care`)

        if (!response.ok)
            throw new Error(`[ERROR] - Error al intentar obtener los productos - Status Code: ${response.status}`);

        const data = await response.json();
        // console.log(data)
        return data.products.map(x => productData(x));
    }
    catch (error) {
        console.error(error.message);
        return null;
    }
}
async function getProductById(id) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok)
            throw new Error(`[ERROR] - El producto no esta disponible - Status Code: ${response.status}`);

        const data = await response.json();
        return productData(data);
    }
    catch (error) {
        console.error(error.message);
        return null;
    }
}

/* carrito */
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

function addProducts(productItem) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const existProduct = products.some(x => x.product.id == productItem.product.id);

    if (!existProduct) {
        products.push(productItem);
    }
    else {
        const existingItem = products.find(x => x.product.id === productItem.product.id);
        existingItem.quantity += productItem.quantity;
    }

    localStorage.setItem('products', JSON.stringify(products));
    updateproductsQuantity();
}

function productCardEventSuscribe(productCard) {
    const quantity = productCard.querySelector('.products-options-container input');

    productCard.querySelector('.min-btn').addEventListener('click', () => {
        if (Number(quantity.value) > 1)
            quantity.value = Number(quantity.value) - 1;
    });

    productCard.querySelector('.max-btn').addEventListener('click', () => {
        if (Number(quantity.value) < 10)
            quantity.value = Number(quantity.value) + 1;
    });

    productCard.querySelector('.products-btn-container button').addEventListener('click', async () => {
        const id = productCard.closest('.product-card').dataset.productId;

        const productItem = {
            product: await getProductById(id),
            quantity: Number(quantity.value)
        }

        addProducts(productItem);
    });
}



/* ------------------------------- Auxiliares ------------------------------- */
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.dataset.productId = product.id;
    productCard.innerHTML = `
        <div class="img-container">
            <img src=${product.images[0]} alt="">
        </div>
        <div class="description-container">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <span>$${product.price}</span>
        </div>
        <div class="products-options-container">
            <button class="min-btn">-</button>
            <input type="text" value="1" disabled>
            <button class="max-btn">+</button>
        </div> 
        <div class="products-btn-container">
            <button>Agregar al carrito</button>
        </div>`;

    productCardEventSuscribe(productCard);

    return productCard;
}

async function renderProducts(numberPage) {

    const products = await getAllProducts();

    const productsGrid = document.querySelector('.grid-products');

    productsGrid.innerHTML = '';

    products.forEach(product => {
        productsGrid.appendChild(createProductCard(product))
    });
}

function productData({ id, title, brand, price, images, description }) {
    return {
        id,
        title,
        brand,
        price,
        images,
        description
    };
}



/* -------------------------------------------------------------------------- */
/*                                INICIALIZADOR                               */
/* -------------------------------------------------------------------------- */

addEventListener('DOMContentLoaded', () => {
    // paginationButtonEventSuscribe();
    renderProducts(0);
});



const products = [
    {
        title: "Brie Mine 4Ever",
        description: "A book for cheese lovers",
        image: "imgs/Client3_Book1.png",
        alt: "Brie Mine 4Ever",
    },
    {
        title: "Glory Riders",
        description: "A book about bikers",
        image: "imgs/Client3_Book2.png",
        alt: "Glory Riders",
    },
    {
        title: "Sorcerer’s Shadowed Chronicles",
        description: "A fantasy book",
        image: "imgs/Client3_Book3.png",
        alt: "Sorcerer’s Shadowed Chronicles",
    },
    {
        title: "Ball",
        description: "A magazine about pickleball",
        image: "imgs/Client3_Magazine1.png",
        alt: "Ball",
    },
    {
        title: "Travel",
        description: "A magazine for travelers",
        image: "imgs/Client3_Magazine2.png",
        alt: "Travel",
    },
    {
        title: "Eat.",
        description: "A magazine for foodies",
        image: "imgs/Client3_Magazine3.png",
        alt: "Eat.",
    },
    {
        title: "ALL I DO IS READ READ READ",
        description: "A canvas tote bag",
        image: "https://sophialearning.s3.amazonaws.com/markup_pictures/42790/file/8429efc117f9e43a5f4ec887cb808a34.png",
        alt: "ALL I DO IS READ READ READ",
    },
    {
        title: "Book Haven Bookstore Notebook",
        description: "A notebook with the store logo",
        image: "https://sophialearning.s3.amazonaws.com/markup_pictures/42791/file/4f5d6556ca4b5aadc11cce74adadb9d0.png",
        alt: "Book Haven Bookstore Notebook",
    },
    {
        title: "Book Haven Stickers",
        description: "A set of four stickers that promote reading",
        image: "https://sophialearning.s3.amazonaws.com/markup_pictures/42792/file/b6514b40691664e175da8f51576c4f85.png",
        alt: "Book Haven Stickers",
    },
];

const galleryRow = document.getElementById("gallery-row");

galleryRow.innerHTML = ""; // Clear existing content

// Initialize cart from session storage or create an empty array
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

function updateSessionStorage() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    cart.push(product);
    updateSessionStorage();
    alert(`${product.title} has been added to your cart.`);
}

products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
<div class="card">
    <img src="${product.image}" class="card-img-top" alt="${product.alt}">
    <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <button class="btn btn-secondary">Add to Cart</button>
    </div>
</div>
`;

    const button = col.querySelector("button");
    button.addEventListener("click", () => addToCart(product));

    galleryRow.appendChild(col);
});

// Add modal functionality
const modalContainer = document.createElement('div');
modalContainer.innerHTML = `
<div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="cartModalLabel">Your Cart</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<ul id="cartItems" class="list-group mb-3">
</ul>
<button id="clearCart" class="btn btn-danger w-100 mb-3">Clear Cart</button>
<button id="orderCart" class="btn btn-success w-100">Order</button>
</div>
</div>
</div>
</div>
`;

document.body.appendChild(modalContainer);

// Populate modal with cart items
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${item.title} <button class="btn btn-sm btn-danger" data-index="${index}">Remove</button>`;

        li.querySelector('button').addEventListener('click', (e) => {
            const itemIndex = e.target.getAttribute('data-index');
            cart.splice(itemIndex, 1);
            updateSessionStorage();
            updateCartModal();
        });

        cartItems.appendChild(li);
    });
}

document.getElementById('clearCart').addEventListener('click', () => {
    cart = [];
    updateSessionStorage();
    updateCartModal();
});

document.getElementById('orderCart').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    cart = [];
    updateSessionStorage();
    updateCartModal();
    alert('Thank you for your purchase!');
});

// Update modal content whenever it is shown
const cartModal = document.getElementById('cartModal');
cartModal.addEventListener('show.bs.modal', updateCartModal);

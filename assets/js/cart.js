const displayCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Hiển thị thông tin sản phẩm
    const cartElement = document.querySelector('.my-cart');

    cartElement.innerHTML = '';
    if (cart.length === 0) {
        cartElement.innerHTML = 'Không có sản phẩm';

    } else {
        cart.forEach((item) => {
            const productInfo = `
            <div class="container">
                <div class="row">
                    <div class="col-12 col-sm-8 col-md-8 wrap-cart-left">
                        <div class="wrap-cart-top">
                            <img src="${item.image}" alt="sofa" />
                            <div class="detail-cart">
                                <h5>${item.name}</h5>
                                <a href="index.html">#hataghome</a>
                                <div class="star">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i><label for="">(${item.quantity})</label>
                                </div>
                                <h6>Lấy nó giữa Thu. 28 tháng 9 - Thứ bảy. 30/09 - Sân MIỄN PHÍ</h6>
                            </div>
                            <div class="price-cart">
                                <h2>${item.price}</h2>
                                <div class="number-cart">
                                    <button class="decrement-btn" data-product-id="${item.id}">-</button>
                                    <p class="quantitys">${item.quantity}</p>
                                    <button class="increment-btn" data-product-id="${item.id}">+</button>
                                </div>
                                <button class="remove-btn" data-product-id="${item.id}"> <i class="fa-regular fa-trash-can"></i>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            cartElement.innerHTML += productInfo;
        });

        updateTotalPrice();

        // Xóa sản phẩm
        const removeItem = document.querySelectorAll('.remove-btn');
        removeItem.forEach((item) => {
            item.addEventListener('click', () => {
                const productId = item.getAttribute('data-product-id');
                const index = cart.findIndex((cartItem) => cartItem.id === productId);
                if (index !== -1) {
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    const product = item.closest('.container');
                    if (product) {
                        product.remove();
                        updateCartQuantityDisplay();
                        updateTotalPrice();
                    }
                }
            });
        });

        updateTotalPrice();
    }
}

const cartQuantityElement = document.querySelector('.cart-quantity');
const updateCartQuantityDisplay = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartQuantityElement.textContent = totalQuantity;
};
updateCartQuantityDisplay();
document.addEventListener('DOMContentLoaded', () => {
    updateCartQuantityDisplay();
    updateTotalPrice();
    displayCart();

    // Nút điều chỉnh số lượng
    const decrementBtns = document.querySelectorAll('.decrement-btn');
    const incrementBtns = document.querySelectorAll('.increment-btn');
    const productCart = JSON.parse(localStorage.getItem('cart')) || [];

    decrementBtns.forEach((decrementBtn) => {
        decrementBtn.addEventListener('click', () => {
            const productId = decrementBtn.getAttribute('data-product-id');
            const productIndex = productCart.findIndex((item) => item.id === productId);
            if (productIndex !== -1 && productCart[productIndex].quantity > 1) {
                productCart[productIndex].quantity--;
                const quantityEle = decrementBtn.nextElementSibling;
                quantityEle.textContent = productCart[productIndex].quantity;
                updateProductPrice(productCart, productCart[productIndex]); 
                updateTotalPrice();
            }
        });
    });

    incrementBtns.forEach((incrementBtn) => {
        incrementBtn.addEventListener('click', () => {
            const productId = incrementBtn.getAttribute('data-product-id');
            const productIndex = productCart.findIndex((item) => item.id === productId);
            if (productIndex !== -1) {
                productCart[productIndex].quantity++;
                const quantityEle = incrementBtn.previousElementSibling;
                quantityEle.textContent = productCart[productIndex].quantity;
                updateProductPrice(productCart, productCart[productIndex]); 
                updateTotalPrice();
            }
        });
    });
});


function updateProductPrice(cart, product) {
    const price = parseFloat(product.price.replace('$', ''));
    if (!isNaN(price)) {
        product.totalPrice = price * product.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

const updateTotalPrice = () => {
    let total = 0;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach((item) => {
        const price = parseFloat(item.price.replace('$', ''));
        if (!isNaN(price)) {
            total += price * item.quantity;
        }
    });

    const totalPrice = document.querySelector('.total p');
    totalPrice.textContent = `$${total.toFixed(2)}`;
};

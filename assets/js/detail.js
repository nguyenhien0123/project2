const urlParams = new URLSearchParams(window.location.search);
const id=urlParams.get('id');
const API_DETAIL=`http://localhost:2712/posts/${id}`;

const elementD = document.querySelector(".detail-js");

const getApi=async(URL_API) => {
  const response = await axios.get(URL_API);
  showData(response.data);

}
getApi(API_DETAIL);


const showData=(data)=>{

 elementD.innerHTML=`<div class="col-12 col-sm-12 col-md-6">
 <div class="img-details">
       <div class="img-details-top">
       <div class="slide">
       <img class="cart-image" src="${data.img}" alt="" />
     </div>
     <div class="slide">
       <img class="cart-image" src="${data.img}" alt="" />
     </div>
     <div class="slide">
       <img class="cart-image" src="${data.img}" alt="" />
     </div>
     <button class="prev-btn"><i class="fa-solid fa-arrow-right fa-rotate-180"></i></i></button>
     <button class="next-btn"><i class="fa-solid fa-arrow-right"></i></i></button>     
       </div>

   </div>
 </div>
</div>
<!-- describe -->
<div class="col-12 col-sm-12 col-md-6">
 <div class="describe">
   <div class="infor-detail">
     <h3>
       ${data.title}
       <i class="fa-solid fa-bell fa-shake"></i>
     </h3>
     <p>Xem thêm bởi <a href="index.html">HashtagTrangchủ</a></p>
     <div class="start">
       <i class="fa-solid fa-star"></i>
       <i class="fa-solid fa-star"></i>
       <i class="fa-solid fa-star"></i>
       <i class="fa-solid fa-star"></i>
       <i class="fa-solid fa-star"></i><label for="">(5.0)</label>
     </div>
   </div>
   <!-- price-detail -->
   <div class="price-detail">
     <h2>${data.newPrice}</h2>
     <h6>${data.cost}</h6>
   </div>
   <!-- information -->
   <div class="information">
     <h5>
       $115/tháng. trong 6 tháng
       <a href="#">với thẻ tín dụng Wayfair</a
       ><i class="fa-solid fa-exclamation"></i>
     </h5>
     <h6>
       Giá chuyên nghiệp:
       <img src="./assets/img/infordetail.png" alt="" />
     </h6>
     <p>
       <a href="#">Đăng ký doanh nghiệp của bạn</a> MIỄN PHÍ để tiết
       kiệm cho các mặt hàng được chọn.
     </p>
     <h4>Miễn phí vận chuyển</h4>
   </div>
   <!-- style-box -->
   <div class="style-box">
     <div class="bt-heart">
       <button><i class="fa-solid fa-heart"></i></button>
     </div>
     <!-- bt-add -->
     <div class="bt-add">
       <button class="add-cart">Thêm vào giỏ hàng</button>
     </div>
   </div>
   <!--  -->
 </div>
</div>`;

// slide
let i = 0;
const slideImages = document.querySelectorAll('.slide');
const prev=document.querySelector('.prev-btn');
const next=document.querySelector('.next-btn');
function showSlide(index) {

  for (let i = 0; i < slideImages.length; i++) {
    slideImages[i].style.display = 'none';
  }

  slideImages[index].style.display = 'block';
}

function slideshow() {
  if (i < slideImages.length - 1) {
    i++;
  } else {
    i = 0;
  }
  showSlide(i);
}

showSlide(i);
setInterval(slideshow, 2000);
// 

prev.addEventListener('click',()=>{
  i=(i - 1 + slideImages.length) % slideImages.length;
  
  showSlide(i);

})
next.addEventListener('click',()=>{
  i=(i + 1) % slideImages.length;
  showSlide(i);

})

// chuc nang gio hang
waitForAddToCartButton().then((addToCart) => { 
  addToCart.addEventListener('click',()=>{
  const productId=id; //lay id
  const product={
    id:productId,
    name:data.title,
    price:data.newPrice,
    image:data.img,
    quantity:1 
  };
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!Array.isArray(cart)) {
    cart = []; // Nếu không phải mảng, thì tạo một mảng mới
  }
  
const cartItem=JSON.parse(localStorage.getItem('cart')) || [];
let isAdd=false;
cartItem.forEach((item)=>{
  // console.log(item);
  if(item.id === productId){
    alert('san pham da co trong gio hang');
    isAdd=true;
  }
})
if(!isAdd){
  const productId = id; // Lấy ID sản phẩm
  const product = {
      id: productId,
      name: data.title,
      price: data.newPrice,
      image: data.img,
      quantity: 1 // Số lượng mặc định khi thêm vào giỏ hàng
  };

  if (!Array.isArray(cart)) {
    cart = [];
}

// Thêm sản phẩm vào giỏ hàng
cart.push(product);
localStorage.setItem('cart', JSON.stringify(cart));

// Cập nhật số lượng sản phẩm trong giỏ hàng
updateCartQuantityDisplay();
}

  localStorage.setItem('cart',JSON.stringify(cart));

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartQuantityDisplay();
  });
});
}

const getProductDetail = async (id) => {
  const API_DETAIL = `http://localhost:2712/posts/${id}`;
  const response = await axios.get(API_DETAIL);
  showData(response.data);
}

const productLinks = document.querySelectorAll('.product-link');

productLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const newId = id;
    getProductDetail(newId); 
  });
});

getProductDetail(id);

// addto cart
// truy cap phan tu
const waitForAddToCartButton = () => {
  return new Promise((resolve) => {
    const addToCart = document.querySelector('.add-cart');
    if (addToCart) {
      resolve(addToCart);
    } else {
      setTimeout(() => {
        waitForAddToCartButton().then(resolve);
      }, 100);
    }
  });
};
const cartQuantityElement = document.querySelector('.cart-quantity');
const updateCartQuantityDisplay = () => {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  // Hiển thị số lượng sản phẩm trên trang web
  cartQuantityElement.textContent = totalQuantity;
};

updateCartQuantityDisplay();
document.addEventListener('DOMContentLoaded', () => {

  getApi(API_DETAIL);
  updateCartQuantityDisplay(); // Cập nhật số lượng sản phẩm ban đầu
});


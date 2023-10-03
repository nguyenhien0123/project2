const URL_API=`http://localhost:2712/posts`;
// truy cap phan tu
const itemInterior=document.querySelector('#render-js');
// console.log(itemInterior);

// getApi
const getApi=async(URL)=>{
// console.log(URL);
 const response =await axios.get(URL);
//  console.log(response.data);
 showData(response.data);
}
getApi(URL_API);

// showData
const showData=(data)=>{
// console.log(data);
// in du lieu ra man hinh
let HTML=``;

data.forEach((item) => {
    // console.log(item);
    HTML += `<div class="col-12 col-sm-6 col-md-4">
 <div class="product-right">
<div class="product-right-top">
       <a href="detail.html?id=1" class="product-link"><img src="${item.img}" alt="sofa1"></a>
       <button>sale</button>
       <p><i class="fa-regular fa-heart"></i></p>
   </div>
   <div class="product-right-bottom">
       <div class="text-title">
           <h5>${item.title}</h5></div>       
       <div class="text-price">
           <h6>${item.newPrice}</h6>
           <p>${item.cost}</p>
       </div>
       <div class="start">
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i> <label for="">(${item.quantity})</label>
       </div>
       <div class="bt-ship">
           <button>${item.btnShip}</button>
           <div class="add-cart">
           <i class="fa-regular fa-cart-shopping"></i>
         </div>
       </div>

      
       
   </div>
</div>
</div>`;
});
itemInterior.innerHTML=HTML;
}

// addto cart
// truy cap phan tu
const addToCart=document.querySelectorAll('.add-cart');
console.log(addToCart);









// tim kiem
const form=document.querySelector('.form-search');
const input=document.querySelector("#search");
form.addEventListener("submit",(event)=>{
event.preventDefault();
// alert('tim kiem')
let valueInput=input.value;
console.log(valueInput);
if(valueInput && valueInput !==""){
    console.log('loc tim kiem');
    const apiSearch=URL_API+`?title=${valueInput}`;
    console.log(apiSearch);
    getApi(apiSearch);
    input.value='';
}else{
    console.log("reload");
    window.location.reload();
}
})
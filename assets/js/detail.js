
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);
// Lấy phần tử HTML để hiển thị dữ liệu sản phẩm
const elementD = document.querySelector(".detail-js");
console.log(elementD);
// Hàm để gửi yêu cầu API và hiển thị dữ liệu sản phẩm
const getApi = async (id) => {
  try {
    const API_DETAIL = `http://localhost:2712/posts/${id}`;
    const response = await axios.get(API_DETAIL);
    const productData = response.data;

    if (productData) {
      showElement(productData);
    } else {
      console.error('Không tìm thấy dữ liệu sản phẩm.');
    }
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu API:', error);
  }
}

const showElement = (item) => {
  const HTML = `
    <div class="col-12 col-sm-12 col-md-6">
      <div class="img-details">
        <div class="owl-carousel owl-theme">
          <div class="item">
            <div class="img-details-top">
              <img src="${item.img}" alt="" />
            </div>
          </div>
          <div class="item">
            <div class="img-details-top">
              <img src="${item.img}" alt="" />
            </div>
          </div>
          <!-- Các hình ảnh khác -->
        </div>
      </div>
    </div>

    <div class="col-12 col-sm-12 col-md-6">
      <div class="describe">
        <div class="infor-detail">
          <h3>
            ${item.title}
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
          <h2>${item.newPrice}</h2>
          <h6>${item.cost}</h6>
        </div>
        <!-- information -->
        <div class="information">
          <h5>
            $115/tháng. trong 6 tháng
            <a href="#">với thẻ tín dụng Wayfair</a>
            <i class="fa-solid fa-exclamation"></i>
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
          <div class="number-product">
            <button><i class="fa-solid fa-minus"></i></button>
            <p>1</p>
            <button><i class="fa-solid fa-plus"></i></button>
          </div>
          <div class="bt-heart">
            <button><i class="fa-solid fa-heart"></i></button>
          </div>
          <!-- bt-add -->
          <div class="bt-add">
            <a href="cart.html"><button>Thêm vào giỏ hàng</button> </a>
          </div>
        </div>
        <!--  -->
      </div>
    </div>`;

  elementD.innerHTML = HTML;
}

// Kiểm tra xem có tham số "id" trong URL không
if (id) {
  getApi(id);
} else {
  console.error('Không tìm thấy tham số "id" trong URL.');
}

// Lấy tất cả các phần tử sản phẩm và gắn sự kiện click cho mỗi sản phẩm
const productLinks = document.querySelectorAll(".product-link");

productLinks.forEach((productLink) => {
  productLink.addEventListener("click", (event) => {
    event.preventDefault();
    const productId = productLink.getAttribute("data-id");
    getApi(productId);
  });
});

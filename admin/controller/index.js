const api = new Api();

function getEle(id){
  return document.getElementById(id);
}
function getListProduct() {
  const promise = api.fecthData();
  // Pending => show Loader
  document.getElementById("loader").style.display = "block";

  promise
    .then(function (result) {
      // success => hide Loader
      document.getElementById("loader").style.display = "none";
      renderUI(result.data);
    })
    .catch(function (error) {
      // error => hide Loader
      document.getElementById("loader").style.display = "none";
      console.log(error);
    });
}

getListProduct();

function renderUI(data) {
  let content = "";

  data.forEach(function (product) {
    content += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card cardPhone">
            <img src="${product.img}" class="card-img-top" alt="..." />
            <div class="card-body">
                <div class="d-flex justify-content-between">
                <div>
                    <h3 class="cardPhone__title">${product.name}</h3>
                    <p class="cardPhone__text">${product.desc}</p>
                </div>
                <div>
                    <h3 class="cardPhone__title">$${product.price}</h3>
                </div>
                </div>
                <div class="d-flex justify-content-between">
                <div class="cardPhone__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <div>
                    <button class="btnPhone-shadow">
                    <i class="fa fa-shopping-cart"></i> Buy Now
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    `;
  });

  document.getElementById("products__content_main").innerHTML = content;
}

/**
 * Filter Product
 */
getEle("selLoai").addEventListener("change", (event) => {
  //   const type = getEle("selLoai").value;
  const a = event.target.value;
  const type = a.toLowerCase();
  const promise = api.fecthData();
  promise
    .then((result) => {
      const listFood = result.data;
      let listFilter = [];
      if (type === "all") {
        listFilter = listFood;
      } else {
        listFilter = listFood.filter((listFood) => listFood.type === type);
      }
      renderUI(listFilter);
    })
    .catch((error) => {
      console.log(error);
    });
});


/**
 * Giỏ hàng
 */
function themGioHang(){
  console.log(123);
  
}

getEle("close").onclick();

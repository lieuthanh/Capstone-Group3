const api = new Api();
const validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function setLocalStorage() {
  // Chuyển mảng sinh viên thành chuỗi
  arr = api.fecthData();
  const arrString = JSON.stringify(arr);
  // Lưu xuống localStorage
  localStorage.setItem("Product", arrString);
}
/**
 * Lấy mảng sinh viên từ localStorage
 */
function getLocalStorage() {
  if (!localStorage.getItem("Product")) return;

  // Lấy mảng sinh viên từ localStorage
  const arrString = localStorage.getItem("Product");
  // Chuyển mảng sinh viên từ chuỗi => JSON
  const arrJSON = JSON.parse(arrString);
  // Phục hồi data cho dssv.arr
  product.arr = arrJSON;
  // Hiển thị danh sách sinh viên
  renderUI(product.arr);
}

function getListProduct() {
  const promise = api.fecthData();
  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

function layThongTinSanPham(id) {
  // Lấy thông tin từ form 
  const _tenSP = getEle("TenSP").value;
  const _giaSP = getEle("GiaSP").value;
  const _manhinhSP = getEle("ManHinhSP").value;
  const _cameraSau = getEle("CameraSau").value;
  const _cameraTruoc = getEle("CameraTruoc").value;
  const _hinhSP = getEle("HinhSP").value;
  const _moTa = getEle("MoTa").value;
  const _loaiSP = getEle("LoaiSP").value.toLowerCase();

  let isValid = true;

  //2. Kiểm tra tên sản phẩm
  isValid &= validation.kiemTraTong(_tenSP, "spanTenSP", "(*) Tên SP không được rỗng");
  //3. Kiểm tra giá sản phẩm
  isValid &= validation.kiemTraTong(_giaSP, "spanGiaSP", "(*) Giá SP không được rỗng") && validation.kiemTraSo(_giaSP, "spanGiaSP", "(*) Vui lòng nhập số ");
  //4. Kiểm tra màn hình
  isValid &= validation.kiemTraTong(_manhinhSP, "spanManHinhSP", "(*) Màn hình không được rỗng");
  //5. Kiểm tra camera sau
  isValid &= validation.kiemTraTong(_cameraSau, "spanCameraSau", "(*) Camera Sau không được rỗng");
  //6. Kiểm tra camera trước
  isValid &= validation.kiemTraTong(_cameraTruoc, "spanCameraTruoc", "(*) Camera trước không được rỗng");
  //7. Kiểm tra hình sản phẩm
  isValid &= validation.kiemTraTong(_hinhSP, "spanHinhSP", "(*) Hình SP không được rỗng");
  //8. Kiểm tra mô tả sản phẩm
  isValid &= validation.kiemTraTong(_moTa, "spanMoTa", "(*) Mô tả SP không được rỗng");
  //9. Kiểm tra loại SP
  isValid &= validation.kiemTraTong(_loaiSP, "spanLoaiSP", "(*) Loại SP không được rỗng");

  if (!isValid) return null;

  // Tọa đối tượng sản phẩm
  const product = new Product(
    id,
    _tenSP,
    _giaSP,
    _manhinhSP,
    _cameraSau,
    _cameraTruoc,
    _hinhSP,
    _moTa,
    _loaiSP
  );
  return product;
}

function renderUI(data) {
  let content = "";

  data.forEach(function (product, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>
                <img src="${product.img}" width="50" />
            </td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${product.id
      })">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id
      })">Delete</button>
            </td>
        </tr>
    `;
  });
  getEle("tblDanhSachSP").innerHTML = content;
}

/**
 * reset form
 */
function resetForm() {
  getEle("TenSP").value = "";
  getEle("GiaSP").value = "";
  getEle("ManHinhSP").value = "";
  getEle("CameraSau").value = "";
  getEle("CameraTruoc").value = "";
  getEle("HinhSP").value = "";
  getEle("MoTa").value = "";
  getEle("LoaiSP").value = "";
}
/**
 * Edit Product
 */
function editProduct(id) {
  // Change title model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";
  //create button "Update Product"
  const btnUpdate = `<button class="btn btn-primary" onclick="updateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  const promise = api.getProductById(id);
  promise
    .then(function (result) {
      const product = result.data;
      // Show thông tin ra ngoài các thẻ input
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("ManHinhSP").value = product.screen;
      getEle("CameraSau").value = product.backCamera;
      getEle("CameraTruoc").value = product.frontCamera;
      getEle("HinhSP").value = product.img;
      getEle("MoTa").value = product.desc;
      getEle("LoaiSP").value = product.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * Update Product
 */
function updateProduct(id) {
  // lấy thông tin từ người nhập liệu
  const product = layThongTinSanPham(id);
  if (!product) return;
  const promise = api.update(product);
  promise
    .then(function (result) {
      // close modal
      document.getElementsByClassName("close")[0].click();
      //re-fetch data
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * Delete Product
 */
function deleteProduct(id) {
  const promise = api.delete(id);
  promise
    .then(function (reslut) {
      // re-fetch new data
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").onclick = function () {
  resetForm();
  // Change title model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  //create button "Add Product"
  const btnAdd = `<button class="btn btn-primary" onclick="addProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};
/**
 * Add Product
 */
function addProduct() {

  const product = layThongTinSanPham();
  if (!product) return;

  const promise = api.add(product);
  promise
    .then(function () {
      // close modal
      document.getElementsByClassName("close")[0].click();
      //re-fetch data
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * Tìm kiếm SP
 * callback function: hàm có tham số, tham số là 1 hàm khác
 */
getEle("txtSearch").addEventListener("keyup", function () {
  //Lấy từ khóa tìm kiếm
  const promise = api.fecthData();
  let mangTimKiem = [];
  const keyword = getEle("txtSearch").value;
  promise
    .then(function (result) {
      const arr = result.data;
      for (let i = 0; i < arr.length; i++) {
        const sv = arr[i];
        const keywordLowerCase = keyword.toLowerCase();
        const tenSVLowerCase = sv.name.toLowerCase();
        if (tenSVLowerCase.indexOf(keywordLowerCase) !== -1) {
          mangTimKiem.push(sv);
        }
      }
      renderUI(mangTimKiem);
    })
    .catch(function (error) {
      console.log(error)
    });
})
/**
 * Filter Product
 */
getEle("selLoai").addEventListener("change", function () {
  const promise = api.fecthData();
  const keyword = getEle("selLoai").value;
  promise
    .then(function (result) {
      let arr = result.data;

      if (keyword === "giatang") {
        arr.sort(function (sv1, sv2) {
          return sv1.price - sv2.price;
        })

      } else if (keyword === "giagiam") {
        arr.sort(function (sv1, sv2) {
          return sv2.price - sv1.price;
        })
      } 
      renderUI(arr);
    })
    .catch(function (error) {
      console.log(error);
    });
})

/**
 * Filter Brand
 */
getEle("selLoai1").addEventListener("change", (event) => {
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
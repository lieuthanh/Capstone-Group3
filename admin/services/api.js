function Api() {
    // lấy ds products từ server
    this.arr = [];
    this.fecthData = function () {
      /**
       * Promise (lời hứa)
       *  - Pending: thời gian chờ
       *  - Resolve: lời hứa dc thực hiện (thành công)
       *  - Reject: lời hứa k thực hiên (thất bại)
       */
  
      const promise = axios({
        url: "https://65ecf8050ddee626c9b10e9e.mockapi.io/api/Product",
        method: "GET",
      });
  
      return promise;
    };
  
    this.delete = function (id) {
      const promise = axios({
        url: `https://65ecf8050ddee626c9b10e9e.mockapi.io/api/Product/${id}`,
        method: "DELETE",
      });
  
      return promise;
    };
  
    this.add = function (product) {
      const promise = axios({
        url: "https://65ecf8050ddee626c9b10e9e.mockapi.io/api/Product",
        method: "POST",
        data: product,
      });
  
      return promise;
    };
  
    this.getProductById = function (id) {
      const promise = axios({
        url: `https://65ecf8050ddee626c9b10e9e.mockapi.io/api/Product/${id}`,
        method: "GET",
      });
  
      return promise;
    };
  
    this.update = function (product) {
      const promise = axios({
        url: `https://65ecf8050ddee626c9b10e9e.mockapi.io/api/Product/${product.id}`,
        method: "PUT",
        data: product,
      });
  
      return promise;
    };
 
  }
  
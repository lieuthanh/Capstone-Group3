function Validation() {
    this.kiemTraTong = function (value, spanId, message) {
        if (value === "") {
            getEle(spanId).innerHTML = message;
            return false;
        }
        getEle(spanId).innerHTML = "";
        return true;
    };
    this.kiemTraChuoiKiTu = function (value, spanId, message) {
        const letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            //hợp lệ
            getEle(spanId).innerHTML = "";
            return true;
        }
        //không hợp lệ
        getEle(spanId).innerHTML = message;
        return false;
    };
    this.kiemTraSo = function (value, spanId, message) {
        const letter = /^[0-9]+$/;
        if (value.match(letter)) {
            //hợp lệ
            getEle(spanId).innerHTML = "";
            return true;
        }
        //không hợp lệ
        getEle(spanId).innerHTML = message;
        return false;
    };
    this.kiemTraEmail = function (value, spanId, mess) {
        const letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(letter)) {
            //hợp lệ
            getEle(spanId).innerHTML = "";
            return true;
        }
        //không hợp lệ
        getEle(spanId).innerHTML = mess;
        return false;

    };
    this.kiemTraMaSVTonTai = function (value, spanId, mess, dataList) {
        let exist = false;
        for (let i = 0; i < dataList.length; i++) {
            const sv = dataList[i];
            if (sv.maSV === value) {
                exist = true;
                break;
            }
        }
        if (exist) {
            //k hợp lệ
            getEle(spanId).innerHTML = mess;
            return false;
        }
        //hợp lệ
        getEle(spanId).innerHTML = "";
        return true;
    };

}

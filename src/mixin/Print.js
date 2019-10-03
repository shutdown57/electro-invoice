// Documentation: https://printjs.crabbly.com/
import printJS from "print-js";

/* ################################################################################## */
/* Client */
const oneCustomer = () => {
  printJS({
    printable: "single-client",
    type: "html",
    repeatTableHeader: false,
    gridHeaderStyle: "color: black;  border: 1px solid #3971A5;",
    gridStyle: "border: 1px solid #3971A5;  text-align: center;",
    header: ``,
    style: ``
  });
};

const allCustomers = data => {
  let json = [];
  data.forEach(el => {
    json.push({
      شماره: el.id,
      نام: el.name,
      "تلفن ثابت": el.phone,
      "تلفن همراه": el.mobile,
      "تاریخ ایجاد": el.created,
      "تاریخ بروزرسانی": el.updated,
      آدرس: el.address
    });
  });
  printJS({
    printable: json,
    type: "json",
    properties: [
      "شماره",
      "نام",
      "تلفن ثابت",
      "تلفن همراه",
      "تاریخ ایجاد",
      "تاریخ بروزرسانی",
      "آدرس"
    ],
    repeatTableHeader: true,
    gridHeaderStyle: "color: black;  border: 1px solid #3971A5;",
    gridStyle: "border: 1px solid #3971A5;  text-align: center;",
    header: '<h2 class="custom-h3">PDF data</h2>',
    style: ".custom-h3 { color: red; }"
  });
};

/* ################################################################################## */
/* Product */
const oneProduct = () => {
  printJS({
    printable: "single-product",
    type: "html",
    repeatTableHeader: false,
    gridHeaderStyle: "color: black;  border: 1px solid #3971A5;",
    gridStyle: "border: 1px solid #3971A5;  text-align: center;",
    header: ``,
    style: ``
  });
}

const allProducts = data => {
  let json = [];
  data.forEach(el => {
    json.push({
      "شماره": el.id,
      "نام محصول": el.name,
      "تاریخ ایجاد": el.created,
      "تاریخ بروزرسانی": el.updated
    });
  });
  printJS({
    printable: json,
    type: "json",
    properties: [
      "شماره",
      "نام محصول",
      "تاریخ ایجاد",
      "تاریخ بروزرسانی"
    ],
    repeatTableHeader: true,
    gridHeaderStyle: "color: black;  border: 1px solid #3971A5;",
    gridStyle: "border: 1px solid #3971A5;  text-align: center;",
    header: '<h2 class="custom-h3">PDF data</h2>',
    style: ".custom-h3 { color: red; }"
  });
}

export default {
  allCustomers,
  oneCustomer,
  oneProduct,
  allProducts
};

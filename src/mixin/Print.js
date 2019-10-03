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
};

const allProducts = data => {
  let json = [];
  data.forEach(el => {
    json.push({
      شماره: el.id,
      "نام محصول": el.name,
      "تاریخ ایجاد": el.created,
      "تاریخ بروزرسانی": el.updated
    });
  });
  printJS({
    printable: json,
    type: "json",
    properties: ["شماره", "نام محصول", "تاریخ ایجاد", "تاریخ بروزرسانی"],
    repeatTableHeader: true,
    gridHeaderStyle: "color: black;  border: 1px solid #3971A5;",
    gridStyle: "border: 1px solid #3971A5;  text-align: center;",
    header: '<h2 class="custom-h3">PDF data</h2>',
    style: ".custom-h3 { color: red; }"
  });
};

/* ################################################################################## */
/* Invoice */
const oneInvoice = () => {
  printJS({
    printable: "single-invoice",
    type: "html",
    repeatTableHeader: false,
    gridHeaderStyle: "color: black;  border: 1px solid #3971A5;",
    gridStyle: "border: 1px solid #3971A5;  text-align: center;",
    header: ``,
    style: ``
  });
};

const allInvoices = data => {
  let json = [];
  data.forEach(el => {
    json.push({
      "شماره": el.id,
      "هزینه اجناس": el.invoice_amount,
      "هزینه خسارت": el.damage_amount,
      "هزینه حمل و نقل": el.transport_amount,
      "هزینه کل": el.total_amount,
      "مدت اجاره": el.rent_period,
      "آدرس مراسم": el.ceremony_address,
      "تسویه": el.liquidation,
      "نام مشتری": el.user_id,
      "تاریخ شروع اجاره": el.rent_start,
      "تاریخ پایان اجاره": el.rent_end,
      "تاریخ بروزرسانی": el.updated,
      "تاریخ ایجاد": el.created,
      "توضیحات": el.description
    });
  });
  printJS({
    printable: json,
    type: "json",
    properties: [
      "شماره",
      "هزینه اجناس",
      "هزینه خسارت",
      "هزینه حمل و نقل",
      "هزینه کل",
      "مدت اجاره",
      "آدرس مراسم",
      "تسویه",
      "هزینه کل",
      "نام مشتری",
      "تاریخ شروع اجاره",
      "تاریخ پایان اجاره",
      "تاریخ بروزرسانی",
      "تاریخ ایجاد",
      "توضیحات"
    ],
    repeatTableHeader: true,
    gridHeaderStyle: "color: black;  border: 1px solid #3971A5;",
    gridStyle: "border: 1px solid #3971A5;  text-align: center;",
    header: '<h2 class="custom-h3">PDF data</h2>',
    style: ".custom-h3 { color: red; }"
  });
};

export default {
  allCustomers,
  oneCustomer,
  oneProduct,
  allProducts,
  oneInvoice,
  allInvoices
};

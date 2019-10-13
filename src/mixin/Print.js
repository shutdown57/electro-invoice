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
    style: `form#single-client { direction: rtl; text-align: right; }`
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
    style: `form#single-product { direction: rtl; text-align: right; }`
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
    style: `
      form#single-invoice {
        width: 210mm;
        height: 297mm; 
        direction: rtl;
        text-align: right;
        font-size: 12px;
        margin: 0;
        border: initial;
        border-radius: initial;
        width: initial;
        min-height: initial;
        box-shadow: initial;
        background: initial;
        page-break-after: always;
      }`
  });
};

const allInvoices = data => {
  let json = [];
  data.forEach(el => {
    json.push({
      شماره: el.id,
      "هزینه اجناس": el.invoice_amount,
      "هزینه خسارت": el.damage_amount,
      "هزینه حمل و نقل": el.transport_amount,
      "هزینه کل": el.total_amount,
      "مدت اجاره": el.rent_period,
      "آدرس مراسم": el.ceremony_address,
      تسویه: el.liquidation,
      "نام مشتری": el.user_id,
      "تاریخ پایان اجاره": el.rent_end,
      تخفیف: el.discount,
      بیعانه: el.deposit_amount,
      "مبلغ پرداختنی": el.payable_amount,
      "تاریخ ایجاد": el.created
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
      "تاریخ پایان اجاره",
      "تخفیف",
      "بیعانه",
      "مبلغ پرداختنی",
      "تاریخ ایجاد"
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

// Documentation: https://www.sqlitetutorial.net/
// Documentation: https://github.com/jalaali/moment-jalaali
//                https://talkhabi.github.io/vue-persian-datetime-picker/#/formatting
import * as sqlite from "sqlite3";
import * as mmj from "moment-jalaali";

const DB_NAME = "db.sqlite";

/* ############################################################## 
  Initialize
*/
const init = () => {
  let db = new sqlite.Database("db.sqlite");
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            mobile TEXT NOT NULL UNIQUE,
            created TEXT NOT NULL,
            updated TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            price REAL DEFAULT 0.0,
            description TEXT,
            created TEXT NOT NULL,
            updated TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY,
            description TEXT,
            invoice_amount REAL NOT NULL,
            payable_amount REAL NOT NULL,
            discount REAL,
            deposit_amount REAL,
            damage_amount REAL NOT NULL,
            transport_amount REAL NOT NULL,
            total_amount REAL NOT NULL,
            rent_period TEXT NOT NULL,
            rent_start TEXT NOT NULL,
            rent_end TEXT NOT NULL,
            ceremony_address TEXT NOT NULL,
            liquidation INTEGER DEFAULT 0,
            created TEXT NOT NULL,
            updated TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id))`);
    db.run(`CREATE TABLE IF NOT EXISTS invoice_product (
            fee REAL NOT NULL,
            price REAL NOT NULL,
            number INTEGER DEFAULT 0,
            description TEXT,
            user_id INTEGER,
            invoice_id INTEGER,
            product_id INTEGER,
            created TEXT,
            PRIMARY KEY (user_id, invoice_id, product_id, created),
            FOREIGN KEY (invoice_id) REFERENCES invoices (id),
            FOREIGN KEY (product_id) REFERENCES product (id))`);
    db.run(`PRAGMA foreign_keys = ON`);
  });
  db.close();
};

/* ############################################################## 
  Client
*/
const insertClient = ({ name, address, phone, mobile }) => {
  let db = new sqlite.Database("db.sqlite");
  let created = mmj(new Date()).format("jYYYY-jMM-jDD HH:mm");

  db.run(
    `INSERT INTO users
          (name, address, phone, mobile, created, updated)
          VALUES (?, ?, ?, ?, ?, ?)`,
    [name, address, phone, mobile, created, null],
    function(err) {
      if (err) {
        return console.log(err.message);
      }
    }
  );
  db.close();
};

const getClients = async () => {
  let db = new sqlite.Database("db.sqlite");
  let data = [];
  db.all(`SELECT * FROM users ORDER BY id desc`, [], (err, result) => {
    if (err) {
      console.log(err.message);
      return [];
    }
    result.forEach(row => {
      data.push({
        id: row.id,
        name: row.name,
        address: row.address,
        phone: row.phone,
        mobile: row.mobile,
        created: row.created,
        updated: row.updated
      });
    });
  });
  db.close();
  return data;
};

const getByID = (id, table) => {
  let db = new sqlite.Database("db.sqlite");
  let data = [];
  db.serialize(function() {
    db.each(`SELECT * FROM ${table} WHERE id=${id}`, function(err, row) {
      if (err) {
        console.log(err.message)
        return false;
      }
      data.push({ ...row });
    });
  });
  db.close();
  return data;
};

const updateClient = ({ id, name, address, phone, mobile, created }) => {
  let db = new sqlite.Database("db.sqlite");
  let updated = mmj(new Date()).format("jYYYY-jMM-jDD HH:mm");

  db.run(
    `UPDATE users 
          SET name=?, address=?, phone=?, mobile=?, created=?, updated=?
          WHERE id=${id}`,
    [name, address, phone, mobile, created, updated],
    function(err) {
      if (err) console.log(err.message);
    }
  );
  db.close();
};

const deleteClient = client_id => {
  let db = new sqlite.Database("db.sqlite");
  db.run(`DELETE FROM client WHERE id=${client_id}`, [], err =>
    err ? console.log(err.message) : []
  );

  db.close();
};

/* ############################################################## 
  Product
*/
const insertProduct = ({ name, price, description }) => {
  let db = new sqlite.Database("db.sqlite");
  let created = mmj(new Date()).format("jYYYY-jMM-jDD HH:mm");

  db.run(
    `INSERT INTO products
    (name, price, description, created, updated)
    VALUES (?, ?, ?, ?, ?)`,
    [name, price, description, created, null],
    err => {
      if (err) {
        console.log(err.message);
        return false;
      }
    }
  );
  db.close();
};

const updateProduct = ({ id, name, price, description, created }) => {
  let db = new sqlite.Database("db.sqlite");
  let updated = mmj(new Date()).format("jYYYY-jMM-jDD HH:mm");
  db.run(
    `UPDATE products 
          SET name=?, price=?, description=?, created=?, updated=?
          WHERE id=${id}`,
    [name, price, description, created, updated],
    err => {
      if (err) console.log(err.message);
    }
  );
  db.close();
};

const getProducts = async () => {
  let db = new sqlite.Database("db.sqlite");
  let data = [];
  db.all(`SELECT * FROM products ORDER BY id asc`, [], (err, result) => {
    if (err) {
      console.log(err.message);
      return [];
    }
    result.forEach(row => {
      data.push({
        id: row.id,
        name: row.name,
        price: row.price,
        description: row.description,
        created: row.created,
        updated: row.updated
      });
    });
  });
  db.close();
  return data;
};

const deleteProduct = product_id => {
  let db = new sqlite.Database("db.sqlite");

  db.run(`DELETE FROM products WHERE id=${product_id}`, [], err =>
    err ? console.log(err.message) : []
  );

  db.close();
};

const getProductByName = productName => {
  let db = new sqlite.Database("db.sqlite");
  let data = [];

  db.get(`SELECT * FROM products WHERE name=${productName}`, [], (err, result) => {
    if (err) {
      console.log(`ERR: ${err}`);
      return false;
    }

    data.push(result)
  });

  db.close();
  return data;
};

/* ############################################################## 
  Invoice
*/
const insertInvoice = async ({
  description,
  invoice_amount,
  damage_amount,
  transport_amount,
  total_amount,
  rent_period,
  rent_start,
  rent_end,
  ceremony_address,
  liquidation,
  payable_amount,
  discount,
  deposit_amount,
  user_id
}) => {
  let db = new sqlite.Database("db.sqlite");
  let created = mmj(new Date()).format("jYYYY-jMM-jDD HH:mm");
  let data = [];

  await db.run(
    `INSERT INTO invoices
    (description, invoice_amount, damage_amount,
      transport_amount, total_amount, rent_period,
      rent_start, rent_end, ceremony_address,
      payable_amount, discount, deposit_amount,
      liquidation, user_id, created, updated)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      description,
      invoice_amount,
      damage_amount,
      transport_amount,
      total_amount,
      rent_period,
      rent_start,
      rent_end,
      ceremony_address,
      payable_amount,
      discount,
      deposit_amount,
      liquidation,
      user_id,
      created,
      null
    ],
    err => {
      if (err) {
        console.log("FROM DB");
        console.log(err.message);
      }
    }
  );

  await db.get(`SELECT * FROM invoices ORDER BY id DESC LIMIT 1`, (err, row) => {
    if (err) console.log(err);
    else data.push({ ...row });
  });

  db.close();
  return data[0];
};

const insertInvoiceProduct = async ({
  productList,
  latestInvoiceId,
  user_id
}) => {
  let db = new sqlite.Database("db.sqlite");

  productList.forEach(async item => {
    await db.run(
      `INSERT INTO invoice_product
      (fee, price, number, description, invoice_id, product_id, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        item.fee,
        item.price,
        item.number,
        item.description,
        latestInvoiceId,
        item.product.id,
        user_id
      ],
      err => {
        if (err) console.log(err.message);
      }
    );
  });

  db.close();
};

const lastInvoiceId = async () => {
  let db = new sqlite.Database("db.sqlite");
  let invoice = [];

  db.get(`SELECT * FROM invoices ORDER BY id DESC LIMIT 1`, (err, row) => {
    if (err) console.log(err);
    else invoice.push({ ...row });
  });
  db.close();
  return invoice;
};

const getInvoices = async () => {
  let db = new sqlite.Database("db.sqlite");
  let data = [];

  db.all(
    `SELECT invoices.id, invoices.invoice_amount, invoices.damage_amount,
                invoices.transport_amount, invoices.total_amount,
                invoices.rent_period, invoices.rent_start, invoices.rent_end,
                invoices.ceremony_address, invoices.liquidation, invoices.user_id,
                invoices.payable_amount, invoices.discount, invoices.deposit_amount,
                invoices.description, invoices.created, invoices.updated, users.name
          FROM invoices, users WHERE invoices.user_id=users.id
          ORDER BY invoices.id DESC`,
    [],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return [];
      }
      result.forEach(row => {
        data.push({
          id: row.id,
          invoice_amount: row.invoice_amount,
          damage_amount: row.damage_amount,
          transport_amount: row.transport_amount,
          total_amount: row.total_amount,
          rent_period: row.rent_period,
          rent_start: row.rent_start,
          rent_end: row.rent_end,
          ceremony_address: row.ceremony_address,
          liquidation: row.liquidation,
          user_id: row.user_id,
          payable_amount: row.payable_amount,
          discount: row.discount,
          deposit_amount: row.deposit_amount,
          description: row.description,
          created: row.created,
          updated: row.updated,
          name: row.name
        });
      });
    }
  );
  db.close();
  return data;
};

const clientInvoices = async user_id => {
  let db = new sqlite.Database("db.sqlite");
  let data = [];
  db.all(
    `SELECT invoices.id, invoices.invoice_amount, invoices.damage_amount,
          invoices.transport_amount, invoices.total_amount,
          invoices.rent_period, invoices.rent_start, invoices.rent_end,
          invoices.ceremony_address, invoices.liquidation, invoices.user_id,
          invoices.payable_amount, invoices.discount, invoices.deposit_amount,
          invoices.description, invoices.created, invoices.updated, users.name
    FROM invoices, users WHERE invoices.user_id=users.id
    AND invoices.user_id=${user_id}
    ORDER BY invoices.id DESC`,
    [],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }

      result.forEach(row => {
        data.push({ ...row });
      });
    }
  );
  db.close();
  return data;
};

const getInvoiceProducts = async invoice_id => {
  let db = new sqlite.Database("db.sqlite");
  let data = [];
  // GET PRODUCTS AND INVOICES AND INVOICE_PRODUCT
  // -----------------------------------------------------------
  // SELECT * FROM invoices, invoice_product, products
  // WHERE invoices.id=invoice_product.invoice_id
  // AND products.id=invoice_product.product_id
  // AND invoices.id=${invoice_id}
  // -----------------------------------------------------------
  // SELECT * FROM invoice_product
  //         INNER JOIN
  //           invoices
  //           ON invoice_product.invoice_id=invoices.id
  //         INNER JOIN
  //           products
  //           ON invoice_product.product_id=products.id
  //         WHERE invoice_id=${invoice_id}
  db.all(
    `SELECT invoice_product.fee, invoice_product.price, invoice_product.number,
    invoice_product.description, invoice_product.user_id, invoice_product.invoice_id,
    invoice_product.product_id, products.name, products.id
          FROM invoice_product, products
          WHERE invoice_product.invoice_id=${invoice_id}
          AND invoice_product.product_id=products.id`,
    [],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return [];
      }
      result.forEach(row => {
        data.push(row);
      });
    }
  );
  db.close();
  return data;
};

const getInvoiceId = async invoice_id => {
  let db = new sqlite.Database("db.sqlite");
  let data = [];
  db.get(
    `SELECT * FROM invoices
          WHERE id=${invoice_id}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return [];
      }
      data.push(result);
    }
  );
  db.close();
  return data;
};

const updateInvoice = async ({ invoice, productList }) => {
  let db = new sqlite.Database("db.sqlite");
  let updated = mmj(new Date()).format("jYYYY-jMM-jDD HH:mm");

  await db.run(
    `UPDATE invoices
          SET description=?, invoice_amount=?, damage_amount=?,
          transport_amount=?, total_amount=?, rent_period=?,
          rent_start=?, rent_end=?, ceremony_address=?,
          payable_amount=?, discount=?, deposit_amount=?,
          liquidation=?, created=?, updated=?, user_id=?
          WHERE id=${invoice.id}`,
    [
      invoice.description,
      invoice.invoice_amount,
      invoice.damage_amount,
      invoice.transport_amount,
      invoice.total_amount,
      invoice.rent_period,
      invoice.rent_start,
      invoice.rent_end,
      invoice.ceremony_address,
      invoice.payable_amount,
      invoice.discount,
      invoice.deposit_amount,
      invoice.liquidation,
      invoice.created,
      updated,
      invoice.user_id
    ],
    err => {
      if (err) {
        console.log(err.message);
      }
    }
  );

  // await db.all(
  //   `SELECT * from invoice_product
  //         WHERE invoice_id=${invoice.id}`,
  //   [],
  //   (err, rows) => {
  //     if (err) {
  //       console.log(err.message);
  //       return [];
  //     }
  //     rows.forEach(row => {
  //       products.push({ ...row });
  //     });
  //   }
  // );
  await db.run(`DELETE FROM invoice_product
                WHERE invoice_id=${invoice.id}`);
  productList.forEach(item => {
    db.run(
      `INSERT INTO invoice_product
        (fee, price, number, description, invoice_id, product_id, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        item.fee,
        item.price,
        item.number,
        item.description,
        invoice.id,
        item.product_id,
        invoice.user_id
      ],
      err => {
        if (err) console.log(err.message);
      }
    );
  });
  // products.forEach(prod => {
  //   productList.forEach(el => {
  //     if (products.includes(el)) {
  //     db.run(
  //       `UPDATE invoice_product
  //             SET fee=?, price=?, number=?, description=?, user_id=?, invoice_id=?, product_id=?
  //             WHERE product_id=${el.product_id}
  //             AND invoice_id=${invoice.id}`,
  //       [
  //         el.fee,
  //         el.price,
  //         el.number,
  //         el.description,
  //         el.user_id,
  //         el.invoice_id,
  //         el.product_id
  //       ],
  //       err => {
  //         if (err) {
  //           console.log(err.message);
  //           return [];
  //         }
  //       }
  //     );
  //     } else {
  //       //
  //     }
  //   })
  // });

  db.close();
};

const deleteInvoice = invoice_id => {
  let db = new sqlite.Database("db.sqlite");
  db.run(
    `DELETE FROM invoice_product WHERE invoice_id=${invoice_id}`,
    [],
    err => (err ? console.log(err.message) : [])
  );

  db.run(`DELETE FROM invoices WHERE id=${invoice_id}`, [], err =>
    err ? console.log(err.message) : []
  );

  db.close();
};

const liquidationInvoices = async () => {
  let db = new sqlite.Database(DB_NAME);
  let data = [];
  await db.all(
    `SELECT invoices.id, invoices.invoice_amount, invoices.damage_amount,
          invoices.transport_amount, invoices.total_amount,
          invoices.rent_period, invoices.rent_start, invoices.rent_end,
          invoices.ceremony_address, invoices.liquidation, invoices.user_id,
          invoices.payable_amount, invoices.discount, invoices.deposit_amount,
          invoices.description, invoices.created, invoices.updated, users.name
      FROM invoices, users WHERE invoices.user_id=users.id
      AND invoices.liquidation=0
      ORDER BY invoices.id DESC`,
    [],
    (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      rows.forEach(row => {
        data.push({ ...row });
      });
    }
  );
  db.close();
  return data;
};

/* ############################################################## 
  Export Module
*/
export default {
  init,

  // Client
  insertClient,
  getClients,
  getByID,
  updateClient,
  deleteClient,

  // Product
  insertProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  getProductByName,

  // Invoice
  insertInvoice,
  insertInvoiceProduct,
  lastInvoiceId,
  getInvoices,
  clientInvoices,
  getInvoiceProducts,
  getInvoiceId,
  updateInvoice,
  deleteInvoice,
  liquidationInvoices
};

import * as sqlite from "sqlite3";
import * as mmj from "moment-jalaali";
// TODO: Implement error handling
// mmj.loadPersian({ dialect: "persian-modern" });

// let old = mmj("1398/06/31", 'jYYYY/jMM/jDD');
// console.log(old)
// let new_ = mmj("1398/07/01", 'jYYYY/jMM/jDD');
// console.log(new_.diff(old, 'days'))
// console.log(Math.round(new_.diff(old, "hours") / 24), new_.diff(old, "hours") % 24);
// console.log(mmj(new Date()).format("jYYYY/jMM/jDD HH:mm"));

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
            description TEXT,
            created TEXT NOT NULL,
            updated TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY,
            description TEXT,
            invoice_amount REAL NOT NULL,
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
            id INTEGER,
            fee REAL NOT NULL,
            price REAL NOT NULL,
            number INTEGER DEFAULT 0,
            invoice_id INTEGER,
            product_id INTEGER,
            PRIMARY KEY (invoice_id, product_id),
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
  let created = mmj(new Date()).format("jYYYY/jMM/jDD HH:mm");

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
      console.log(`${row}`);
      data = [...row];
    });
  });
  db.close();
  return data;
};

const updateClient = ({ id, name, address, phone, mobile, created }) => {
  let db = new sqlite.Database("db.sqlite");
  let updated = mmj(new Date()).format("jYYYY/jMM/jDD HH:mm");

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

/* ############################################################## 
  Product
*/
const insertProduct = ({ name, description }) => {
  let db = new sqlite.Database("db.sqlite");
  let created = mmj(new Date()).format("jYYYY/jMM/jDD HH:mm");

  db.run(
    `INSERT INTO products
    (name, description, created, updated)
    VALUES (?, ?, ?, ?)`,
    [name, description, created, null],
    err => {
      if (err) {
        console.log(err.message);
        return false;
      }
    }
  );
  db.close();
};

const updateProduct = ({ id, name, description, created }) => {
  let db = new sqlite.Database("db.sqlite");
  let updated = mmj(new Date()).format("jYYYY/jMM/jDD HH:mm");
  db.run(
    `UPDATE products 
          SET name=?, description=?, created=?, updated=?
          WHERE id=${id}`,
    [name, description, created, updated],
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
        description: row.description,
        created: row.created,
        updated: row.updated
      });
    });
  });
  db.close();
  return data;
};

/* ############################################################## 
  Client
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
  liquidation
}) => {
  let db = sqlite.Database("db.sqlite");
  let created = mmj(new Date()).format("jYYYY/jMM/jDD HH:mm");
  db.run(
    `INSERT INTO products
    (description, invoice_amount, damage_amount, transport_amount,
      total_amount, rent_period, rent_start, rent_end,
      ceremony_address, liquidation, created, updated)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      liquidation,
      created,
      null
    ],
    err => {
      if (err) {
        console.log(err.message);
        return false;
      }
    }
  );
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

  // Product
  insertProduct,
  updateProduct,
  getProducts,

  // Invoice
  insertInvoice
};

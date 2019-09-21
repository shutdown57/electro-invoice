import * as sqlite from "sqlite3";
import * as jalali from "jalaali-js";

// TODO: Implement error handling

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
            updated TEXT,
            invoice_id INTEGER)`);

    db.run(`CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY,
            description TEXT,
            created TEXT NOT NULL,
            updated TEXT,
            total REAL NOT NULL,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id))`);

    db.run(`CREATE TABLE IF NOT EXISTS invoice_product (
            id INTEGER,
            user_id INTEGER,
            invoice_id INTEGER,
            product_id INTEGER,
            PRIMARY KEY (invoice_id, product_id),
            FOREIGN KEY (invoice_id) REFERENCES invoices (id),
            FOREIGN KEY (product_id) REFERENCES product (id))`);
    db.run(`PRAGMA foreign_keys = ON`);
  });
  db.close();
};

const insertClient = ({ name, address, phone, mobile }) => {
  let db = new sqlite.Database("db.sqlite");
  let date = jalali.toJalaali(new Date());
  let created = `${date.jy}-${date.jm}-${date.jd}`;

  db.run(
    `INSERT INTO users
          (name, address, phone, mobile, created, updated)
          VALUES (?, ?, ?, ?, ?, ?)`,
    [name, address, phone, mobile, created, null],
    function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
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
  let date = jalali.toJalaali(new Date());
  let updated = `${date.jy}-${date.jm}-${date.jd}`;

  db.run(
    `UPDATE users 
          SET name=?, address=?, phone=?, mobile=?, created=?, updated=?
          WHERE id=${id}`,
    [name, address, phone, mobile, created, updated],
    function(err) {
      if (err) console.log(err.message);
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
  db.close();
};

const insertProduct = ({ name, description }) => {
  let db = new sqlite.Database("db.sqlite");
  let date = jalali.toJalaali(new Date());
  let created = `${date.jy}-${date.jm}-${date.jd}`;

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
  let date = jalali.toJalaali(new Date());
  let updated = `${date.jy}-${date.jm}-${date.jd}`;
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
  getProducts
};

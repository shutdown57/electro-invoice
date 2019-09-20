import * as sqlite from "sqlite3";
import * as jalali from "jalaali-js";

// TODO: Implement error handling
// let db = new sqlite.Database("db.sqlite");

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
                price REAL NOT NULL,
                description TEXT,
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
                invoice_id INTEGER,
                product_id INTEGER,
                PRIMARY KEY (invoice_id, product_id),
                FOREIGN KEY (invoice_id) REFERENCES invoices (id),
                FOREIGN KEY (product_id) REFERENCES product (id))`);
    db.run(`PRAGMA foreign_keys = ON`);
  });
  db.close();
};

// TODO: Implement data entry to insert into database
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
    // TODO: Add error handling
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

const updateUser = ({id, name, address, phone, mobile, created}) => {
  console.log(id)
  let db = new sqlite.Database("db.sqlite");
  let date = jalali.toJalaali(new Date());
  let updated = `${date.jy}-${date.jm}-${date.jd}`;

  db.run(`UPDATE users 
          SET name=?, address=?, phone=?, mobile=?, created=?, updated=?
          WHERE id=${id}`,
          [name, address, phone, mobile, created, updated],
          function (err) {
    if (err) console.log(err.message)
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  })
  db.close();
};

export default {
  init,
  insertClient,
  getClients,
  getByID,
  updateUser
};

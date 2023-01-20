import { Sequelize } from "sequelize";

const db = new Sequelize("mhs", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

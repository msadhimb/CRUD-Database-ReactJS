import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Mahasiswa = db.define(
  "mahasiswa",
  {
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

export default Mahasiswa;

(async () => {
  await db.sync();
})();

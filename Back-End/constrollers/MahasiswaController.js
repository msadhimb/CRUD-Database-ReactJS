import Mahasiswa from "../models/MahasiswaModel.js";

export const getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findAll();
    res.status(200).json(mahasiswa);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMahasiswaById = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(mahasiswa);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMahasiswa = async (req, res) => {
  try {
    await Mahasiswa.create(req.body);
    res.status(200).json({ message: "Mahasiswa berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMahasiswa = async (req, res) => {
  try {
    await Mahasiswa.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Mahasiswa telah berhasil di edit" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMahasiswa = async (req, res) => {
  try {
    await Mahasiswa.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Mahasiswa telah berhasil di dihapus" });
  } catch (error) {
    console.log(error.message);
  }
};

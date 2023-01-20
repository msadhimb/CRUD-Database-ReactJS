import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function AddData() {
  const navigate = useNavigate();
  const params = useParams();

  const [dataEdit, setDataEdit] = useState({
    nim: "",
    nama: "",
  });

  const handleChange = (e) => {
    setDataEdit({
      ...dataEdit,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getDataById();
  }, []);

  const getDataById = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/mahasiswa/${params.id}`
      );
      setDataEdit({
        nim: response.data.nim,
        nama: response.data.nama,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/mahasiswa/${params.id}`, dataEdit);
    } catch (err) {
      console.log(err);
    }
    setDataEdit({ nim: "", nama: "" });
    navigate("/");
  };

  return (
    <React.Fragment>
      <div style={{ width: "50%", margin: "0 auto", marginBottom: "5rem" }}>
        <h3 className="text-center">Edit Data</h3>
        <Form onSubmit={updateData}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>NIM</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter NIM"
              name="nim"
              onChange={(e) => handleChange(e)}
              value={dataEdit.nim}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Nama"
              name="nama"
              onChange={(e) => handleChange(e)}
              value={dataEdit.nama}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default AddData;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function AddData({ data }) {
  const navigate = useNavigate();
  const [dataAdd, setDataAdd] = useState({
    nim: "",
    nama: "",
  });

  const handleChange = (e) => {
    setDataAdd({
      ...dataAdd,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/mahasiswa", dataAdd);
    } catch (err) {
      console.log(err);
    }
    setDataAdd({ nim: "", nama: "" });
    navigate("/");
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          marginBottom: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <h3 className="text-center">Add Data</h3>
        <Form onSubmit={saveData}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>NIM</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter NIM"
              name="nim"
              onChange={(e) => handleChange(e)}
              value={dataAdd.nim}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Nama"
              name="nama"
              onChange={(e) => handleChange(e)}
              value={dataAdd.nama}
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

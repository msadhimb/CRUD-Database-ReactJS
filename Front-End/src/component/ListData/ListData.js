import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import axios from "axios";
import AddData from "../AddData/AddData";
import { Link, useNavigate } from "react-router-dom";

const ListData = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    nim: "",
    nama: "",
  });

  const [id, setId] = useState();
  const handleClose = () => setShow(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get("http://localhost:5000/mahasiswa");
    setData(response.data);
  };

  const deleteData = async (id) => {
    try {
      await axios.delete("http://localhost:5000/mahasiswa/" + id);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const getDataById = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/mahasiswa/${id}`
      );
      setDataEdit({
        nim: response.data.nim,
        nama: response.data.nama,
      });
      setId(response.data.id);
    } catch (err) {
      console.log(err);
    }
    setShow(true);
  };

  const handleChange = (e) => {
    setDataEdit({
      ...dataEdit,
      [e.target.name]: e.target.value,
    });
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/mahasiswa/${id}`, dataEdit);
    } catch (err) {
      console.log(err);
    }
    setDataEdit({ nim: "", nama: "" });
    navigate("/");
    handleClose(false);
    getData();
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>Per Page</h1>
        <div className="d-flex justify-content-start mb-3">
          <Link to="/add-data">
            <Button variant="success" className="me-3">
              Add Data
            </Button>
          </Link>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>NIM</th>
              <th>Nama</th>
              <th style={{ width: 250 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const i = index;
              return (
                <React.Fragment>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.nim}</td>
                    <td>{item.nama}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="me-3"
                        onClick={() => navigate(`/edit-data/${item.id}`)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => deleteData(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="container mt-5">
        <h1>Single Page</h1>
        <AddData />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>NIM</th>
              <th>Nama</th>
              <th style={{ width: 250 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const i = index;
              return (
                <React.Fragment>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.nim}</td>
                    <td>{item.nama}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="me-3"
                        onClick={() => getDataById(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteData(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>

                  <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={updateData}>
                      <Modal.Body>
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
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="success" type="submit">
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default ListData;

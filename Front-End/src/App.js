import logo from "./logo.svg";
import "./App.css";
import AddData from "./component/AddData/AddData";
import EditData from "./component/EditData/EditData";
import "bootstrap/dist/css/bootstrap.min.css";
import ListData from "./component/ListData/ListData";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListData />} />
            <Route path="/add-data" element={<AddData />} />
            <Route path="/edit-data/:id" element={<EditData />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

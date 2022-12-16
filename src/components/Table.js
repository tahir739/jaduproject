import React, { useEffect, useState } from "react";
import Form from "./Form";
import "./Table.css";
import axios from "axios";
import Model from "./Model";
import "bootstrap/dist/css/bootstrap.min.css";

const Table = () => {
  const [input, setInput] = useState({ name: "", age: 0, english: 0, math: 0 });
  const [employees, setEmployees] = useState([]);
  const [edit, setEdit] = useState(null);
  const [studentData, setStudentData] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const getData = async () => {
    const data = await axios.get("http://localhost:5000/employee");
    console.log("dataaaa", data.data);
    setEmployees(data.data.response);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (edit !== null) {
      const add = {
        name: input.name,
        age: input.age,
        english: input.english,
        math: input.math,
      };

      await axios.patch(`http://localhost:5000/employee/${edit}`, add);

      setInput({ name: "", age: 0, english: 0, math: 0 });
      setEdit(null);
    } else {
      const add = {
        name: input.name,
        age: input.age,
        english: input.english,
        math: input.math,
      };
      await axios.post("http://localhost:5000/employees/result", add);

      setInput({ name: "", age: 0, english: 0, math: 0 });
      setEdit(null);
    }
  };

  const deleteEmployee = async (employeeId) => {
    await axios.delete(`http://localhost:5000/employee/${employeeId}`);
  };

  const editEmployee = (emp) => {
    setEdit(emp._id);

    setInput({
      name: emp.name,
      age: emp.age,
      english: emp.english,
      math: emp.math,
    });
  };

  const openModel = (student) => {
    setStudentData(student);
    setShow(true);
  };

  return (
    <div>
      <div>
        <Model
          show={show}
          studentData={studentData}
          handleClose={handleClose}
        />
      </div>
      <div>
        <Form
          input={input}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="">
        <table className="main-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>English</th>
              <th>Math</th>
              <th>Total</th>
              <th>Status</th>
              <th>grade</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td onClick={() => openModel(emp)}>{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.english}</td>
                <td>{emp.math}</td>
                <td>{emp.total}</td>
                <td className={emp.status === "pass" ? "passed" : "failed"}>
                  {emp.status}
                </td>
                <td>{emp.grade}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp._id)}>del</button>
                  <button onClick={() => editEmployee(emp)}>edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

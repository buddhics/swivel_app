import { Button, Card, Form } from "react-bootstrap";
import classes from "./EmployeeForm.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addEmployees } from "../../slices/employeeSlice";

function EmployeeForm({ type }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
  });

  const [validation, setValidation] = useState({
    first_name: true,
    last_name: true,
    email: true,
    number: true,
  });

  const validationLogic = (name) => {
    console.log(name)
    switch(name){
      case 'first_name':
        const isValidFirstName =((employee.first_name.length >= 5) && (employee.first_name.length < 10));
        console.log(isValidFirstName);
        setValidation({ ...validation, [name]: isValidFirstName });
        break;
      case 'Mangoes':
      case 'Papayas':
        console.log('Mangoes and papayas are $2.79 a pound.');
      // Expected output: "Mangoes and papayas are $2.
    }
  };

  const handleChange = (e) => {
    validationLogic(e.target.name);
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const resetButton = () => {
    setEmployee({
      first_name: "",
      last_name: "",
      email: "",
      number: "",
      gender: "",
      photo: "",
    });
  };

  const submitButton = async (e) => {
    e.preventDefault();
    dispatch(addEmployees(employee));
    // resetButton();
    // router.push("/employee/list");
  };

  return (
    <div className={classes.alignment}>
      <Card
        style={{ width: "30rem" }}
        className="shadow-lg p-3 mb-5 bg-white rounded"
      >
        <Form className="m-3" onSubmit={submitButton}>
          <fieldset>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">First Name</Form.Label>
              <Form.Control
                className={`col-md-7 mr-3 ${validation.first_name ? "":classes.error}`}
                placeholder="First Name"
                value={employee.first_name}
                name="first_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Last Name</Form.Label>
              <Form.Control
                className="col-md-7 mr-3"
                placeholder="Last Name"
                value={employee.last_name}
                name="last_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Email</Form.Label>
              <Form.Control
                type="email"
                className="col-md-7 mr-3"
                placeholder="your@email.com"
                value={employee.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Phone</Form.Label>
              <Form.Control
                className="col-md-7 mr-3"
                placeholder="+9477663323"
                value={employee.number}
                name="number"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Status</Form.Label>
              <Form.Control
                className="col-md-7 mr-3"
                as="select"
                value={employee.gender}
                name="gender"
                defaultValue={employee.gender}
                onChange={(handleChange)}
              >
                <option value={"M"}>Male</option>
                <option value={"F"}>Female</option>
              </Form.Control>
            </Form.Group>
            <div className="row justify-content-end">
              <Button
                variant="outline-primary"
                className="mr-3"
                type="submit"
              >
                <strong>{type}</strong>
              </Button>
            </div>
          </fieldset>
        </Form>
      </Card>
    </div>
  );
}

export default EmployeeForm;

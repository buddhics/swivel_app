import { Button, Card, Form } from "react-bootstrap";
import classes from "./EmployeeForm.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addEmployees, editEmployees } from "../../slices/employeeSlice";

function EmployeeForm({ type, eid=0 }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentEmployees = useSelector(state => state.employees.employees.value.data);

  var employeeState = {
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
  };

  if(type === "Edit" && eid !== 0){
    let id = eid-1;;
    let curruntEmployee = {
      first_name: currentEmployees[id].first_name,
      last_name: currentEmployees[id].last_name,
      email: currentEmployees[id].email,
      number: currentEmployees[id].number,
      gender: currentEmployees[id].gender,
      photo: currentEmployees[id].photo,
    }
    employeeState = curruntEmployee;
  }

  const [employee, setEmployee] = useState(employeeState);


  const [isValidFirstName, setFirstNameState] = useState(true);
  const [isValidLastName, setLastNameState] = useState(true);
  const [isValidEmail, setEmaileState] = useState(true);
  const [isValidPhoneNumber, setPhoneNumberState] = useState(true);

  const validationLogic = (target) => {
    switch(target.name){
      case 'first_name':
        setFirstNameState(((target.value.length >= 5) && (target.value.length < 10)));
        break;
      case 'last_name':
        setLastNameState(((target.value.length >= 5) && (target.value.length < 10)));
        break;
      case 'email':
        let email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmaileState(email_regex.test(String(target.value).toLowerCase()));
        break;
      case 'number':
        let phone_regex = /^(0|\+94)[0-9]{9}$/;
        setPhoneNumberState(phone_regex.test(target.value));
        break;
    }
  };

  const handleChange = (e) => {
    validationLogic(e.target);
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

  const submit = async (e) => {
    switch(type){
      case "Add":
        if(isValidFirstName&&isValidLastName&&isValidEmail&&isValidPhoneNumber){
          e.preventDefault();
          dispatch(addEmployees(employee));
          resetButton();
          router.push("/employee/list");
        }
        break;
      case "Edit":
        e.preventDefault();
          dispatch(editEmployees({eid, employee}));
          resetButton();
          router.push("/employee/list");
        break;
    }
  };

  return (
    <div className={classes.alignment}>
      <Card
        style={{ width: "30rem" }}
        className="shadow-lg p-3 mb-5 bg-white rounded"
      >
        <Form className="m-3">
          <fieldset>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">First Name</Form.Label>
              <Form.Control
                className={`col-md-7 mr-3 ${isValidFirstName ? "":classes.error}`}
                placeholder="First Name"
                value={employee.first_name}
                name="first_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Last Name</Form.Label>
              <Form.Control
                className={`col-md-7 mr-3 ${isValidLastName ? "":classes.error}`}
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
                className={`col-md-7 mr-3 ${isValidEmail ? "":classes.error}`}
                placeholder="your@email.com"
                value={employee.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Phone</Form.Label>
              <Form.Control
                className={`col-md-7 mr-3 ${isValidPhoneNumber ? "":classes.error}`}
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
                onClick={submit}
                type="button"
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

import { Button, Card, Form, Select } from "react-bootstrap";
import classes from "./EmployeeForm.module.css";

function EmployeeForm({ type }) {
  var styles = {
    width: "100vw",
    height: "100vh",
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
                className="col-md-7 mr-3"
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Last Name</Form.Label>
              <Form.Control className="col-md-7 mr-3" placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Email</Form.Label>
              <Form.Control
                type="email"
                className="col-md-7 mr-3"
                placeholder="your@email.com"
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Phone</Form.Label>
              <Form.Control
                className="col-md-7 mr-3"
                placeholder="+9477663323"
              />
            </Form.Group>
            <Form.Group className="row justify-content-between">
              <Form.Label className="col-md-4">Status</Form.Label>
              <Form.Control className="col-md-7 mr-3" as="select">
                <option value={"M"}>Male</option>
                <option value={"F"}>Female</option>
              </Form.Control>
            </Form.Group>
            <div className="row justify-content-end">
              <Button variant="outline-primary" className="mr-3" type="submit">
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

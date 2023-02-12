import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import {
  BsFillGrid3X2GapFill,
  BsTable,
  BsFillPersonCheckFill,
  BsFillTrash2Fill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { wrapper } from "../../../store";
import { fetchEmployees } from "../../../slices/employeeSlice";

function Employees({ employees }) {
  const router = useRouter();
  const data = employees.value.data;

  return (
    <Container>
      <Row className="justify-content-end mt-3 mb-3">
        <Button
          variant="generic"
          className="mr-3"
          onClick={() => router.push("/employee/add")}
        >
          Add Employee
        </Button>
        <Button variant="generic" className="justify-content-center">
          <BsFillGrid3X2GapFill />
        </Button>
        <Button variant="generic" className="justify-content-center">
          <BsTable />
        </Button>
      </Row>
      <Row xs={1} md={3} className="g-4">
        {data &&
          data.map((employee, idx) => (
            <Col>
              <Card className="m-3" key={idx}>
                <Card.Img variant="top" src={employee.photo} />
                <ListGroup className="">
                  <div>
                    <ListGroup.Item
                      key={`${idx}1`}
                    >{`${employee.first_name} ${employee.last_name}`}</ListGroup.Item>
                    <ListGroup.Item key={`${idx}2`}>
                      {employee.email}
                    </ListGroup.Item>
                    <ListGroup.Item key={`${idx}3`}>
                      {employee.number}
                    </ListGroup.Item>
                    <ListGroup.Item key={`${idx}4`}>
                      {employee.gender === "M"
                        ? "Male"
                        : employee.gender === "F"
                        ? "Female"
                        : ""}
                    </ListGroup.Item>
                    <ListGroup.Item key={`${idx}5`}>
                      <Row className="justify-content-end">
                        <Button
                          variant="generic"
                          className="mr-3"
                          key={`${idx}51`}
                        >
                          <BsFillTrash2Fill />
                        </Button>
                        <Button
                          variant="generic"
                          onClick={() =>
                            router.push(`/employee/edit/${employee.id}`)
                          }
                          key={`${idx}52`}
                        >
                          <BsFillPersonCheckFill />
                        </Button>
                      </Row>
                    </ListGroup.Item>
                  </div>
                </ListGroup>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      await store.dispatch(fetchEmployees());
      const employees = store.getState().employees;
      return {
        props: {
          employees,
        },
      };
    }
);

export default Employees;

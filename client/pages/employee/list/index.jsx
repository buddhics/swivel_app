import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  ListGroup,
} from "react-bootstrap";
import {
  BsFillGrid3X2GapFill,
  BsTable,
  BsFillPersonCheckFill,
  BsFillTrash2Fill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";

function Employees({ data }) {
  const router = useRouter();

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
          data.map((employee) => (
            <Col>
              <Card className="m-3">
                <Card.Img variant="top" src={employee.photo} />
                <ListGroup className="">
                  <div>
                    <ListGroup.Item>{`${employee.first_name} ${employee.last_name}`}</ListGroup.Item>
                    <ListGroup.Item>{employee.email}</ListGroup.Item>
                    <ListGroup.Item>{employee.number}</ListGroup.Item>
                    <ListGroup.Item>
                      {employee.gender === 'M'
                        ? "Male"
                        : employee.gender === 'F'
                        ? "Female"
                        : ""}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row className="justify-content-end">
                        <Button variant="generic" className="mr-3">
                          <BsFillTrash2Fill />
                        </Button>
                        <Button
                          variant="generic"
                          onClick={() => router.push(`/employee/edit/${employee.id}`)}
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

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios({
    method: "get",
    url: "http://localhost:3001/employee",
    responseType: "json",
  });
  const data = res.data;

  // Pass data to the page via props
  return { props: { data } };
}

export default Employees;

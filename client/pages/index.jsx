import Head from "next/head";
import { Container, Row, Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="md-container">
      <Head>
        <title>Employee Manager</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <Row className="justify-content-md-center">
          <Link href={"/employee/list"}>
            <h1>
              <strong>Checkout Employees</strong>
            </h1>
          </Link>
        </Row>
      </Container>
    </Container>
  );
}

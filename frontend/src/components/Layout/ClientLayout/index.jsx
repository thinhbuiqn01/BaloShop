import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../../Footer";
import Header from "../../Header";
import "./index.css";

function Index({ children }) {
  return (
    <>
      <Header />
      <main className="py-3 main">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
}

export default Index;

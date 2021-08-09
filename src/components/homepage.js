import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Jumbotron } from "reactstrap";

const Home = () => {
  return (
    <div className="Home">
      <Jumbotron style={{ margin: "2rem" }}>
        <h1 className="display-3">The Great Linkerator</h1>
        <p className="lead">Start Linkin'</p>
      </Jumbotron>
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// import logo from "../../../logo.svg"
function Complete() {
  let history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 1000);
  }, []);
  return (
    <main id="complete">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <h1>Payment Complete.</h1>
    </main>
  );
}

export default Complete;

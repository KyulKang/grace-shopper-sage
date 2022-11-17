import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// import logo from "../../../logo.svg"
function Complete() {
  let history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, []);
  return (
    <main id="complete">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <h1>Your order is confirmed!</h1>
      <h3>Thanks for shopping</h3>
    </main>
  );
}

export default Complete;

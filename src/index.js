import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import FacebookLogin from "react-facebook-login";
import App from "./App";

const ReactFacebookLogin = () => {
  const [accessToken, setAccessToken] = useState('');

  const componentClicked = (data) => {
    console.log("data", data);
  };

  const responseFacebook = (response) => {
    // console.log(response.accessToken);
    setAccessToken(response.accessToken)
  };

  return (
    <div className="container">
      React Facebook Login
      <br/>
      <FacebookLogin
        appId={process.env.REACT_APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
      <br/>
      User Short-Lived Access Token:
      {accessToken}
      <App />
    </div>
  );
};

ReactDOM.render(<ReactFacebookLogin />, document.getElementById("root"));

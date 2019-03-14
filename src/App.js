import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

class App extends Component {

  login = () => {
    console.log(window.location);
  };

  render() {
    // var authurl =
    // "https://id.twitch.tv/oauth2/authorize?client_id=mhslann5zow8404zgxj85vjg1bs67e&redirect_uri=http://localhost:3000&response_type=token&scope=";

    console.log(window.location.hash.substr(1).substring(13));
    console.log(window.location.hash.substr(1).substring(0, 13));

    var thisHash = window.location.hash;

    if (thisHash === '') {

      console.log("no login");

      return (
        <div>
          <Login />
        </div>
      );

    } else {

      //cleans the information from twitch so the token is isolated
      var urlSplit = thisHash.split('&');

      return (
        <div>
          <Dashboard userToken={urlSplit[0].substring(14)} />
        </div>
      );

    }
  }
}

export default App;

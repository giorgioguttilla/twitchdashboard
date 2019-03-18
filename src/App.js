import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";

class App extends Component {

  login = () => {
    console.log(window.location);
  };

  componentWillMount() {
    //sets client id variable, should never change
    localStorage.setItem('Client-ID', 'mhslann5zow8404zgxj85vjg1bs67e');
  }

  render() {
    
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

      var token = urlSplit[0].substring(14);

      //sets local token variable
      localStorage.setItem('token', token);

      //window.location = 'http://localhost:3000';

      return (
        <div>
          <Dashboard />
        </div>
      );

    }
  }
}

export default App;

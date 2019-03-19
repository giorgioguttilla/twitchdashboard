import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";

class App extends Component {

  componentWillMount() {
    //sets client id variable, should never change
    localStorage.setItem('Client-ID', 'mhslann5zow8404zgxj85vjg1bs67e');
  }

  render() {
    
    var thisHash = window.location.hash;

    if (thisHash === '') {

      return (
        <div>
          <Login />
        </div>
      );

    } else {

      //cleans the information from twitch so the token is isolated
      var urlSplit = thisHash.split('&');

      var token = urlSplit[0].substring(14);

      //sets local token variable for api queries in dashboard
      localStorage.setItem('token', token);

      return (
        <div>
          <Dashboard />
        </div>
      );

    }
  }
}

export default App;

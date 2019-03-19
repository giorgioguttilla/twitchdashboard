import React, { Component } from "react";
import "./Login.css";

class Login extends Component {

    render() {

        //login screen, simply an href that returns the access token in the url when clicked
        var authurl =
            "https://id.twitch.tv/oauth2/authorize?client_id=mhslann5zow8404zgxj85vjg1bs67e&redirect_uri=http://localhost:3000&response_type=token&scope=";

        return (
            <div id="bg">
                <div id="logo">
                    <img src="https://www.freepnglogos.com/uploads/twitch-logo-png-6.png" width="35px"/>
                    <span id="dashboard">dashboard</span>
                </div>
                <span>
                    <a href={authurl}>Log In</a>
                </span>
            </div>
        );
    }
}

export default Login;

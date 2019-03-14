import React, { Component } from "react";

class Login extends Component {

    render() {

        var authurl =
            "https://id.twitch.tv/oauth2/authorize?client_id=mhslann5zow8404zgxj85vjg1bs67e&redirect_uri=http://localhost:3000&response_type=token&scope=";

        return (
            <div>
                <a href={authurl}>log in</a>
            </div>
        );
    }
}

export default Login;

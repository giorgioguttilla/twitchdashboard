import React, { Component } from "react";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {info: ""};
    }

    componentDidMount(){
        
        var searchurl = 'https://api.twitch.tv/kraken/search/channels?query=starcraft';
        
        fetch(searchurl, {method: 'GET', mode: 'no-cors', headers: {'Authorization': 'Bearer' + this.props.userToken}}).then((res)=>{
            console.log(res);
        });

    }

    render() {
        return (
            <div>
                {this.props.userToken}
            </div>
        );
    }
}

export default Dashboard;
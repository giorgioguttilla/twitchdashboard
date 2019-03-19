import React, { Component } from "react";
import './StreamDisplay.css';

class StreamDisplay extends Component {
    constructor(props){
        super(props);
        /*props should be:
        DisplayName
        Game_ID
        ViewCount
        Description
        ThumbnailURL
        */
       this.state = {
           name: ""
       }
    }

    getGameName = () => {
        var gamesurl = 'https://api.twitch.tv/helix/games?id=';
        gamesurl = gamesurl + this.props.Game_ID;

        //fetches game data, and sets gameid state
        fetch(gamesurl, {
            headers: {
                'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then((data) => {

            if(data.data !== undefined && data.data.length !== 0){
                this.setState({name: data.data[0].name});
            } else {
                this.setState({name: "No Game Provided"});
            }
            
        });

    }

    componentWillMount(){
        this.getGameName();
    }

    render() {
        return (
            <div id="BoundingBox">
                <img id="ThumbnailImage"src={this.props.ThumbnailURL} alt="Thumbnail"/>
                <div id="DisplayName">{this.props.DisplayName}</div>
                <div id="ViewCount">{this.state.name} - {this.props.ViewCount} viewers</div>
                <div id="Description">{this.props.Description}</div>
            </div>
        );
    }
}

export default StreamDisplay;

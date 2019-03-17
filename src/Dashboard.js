import React, { Component } from "react";
import StreamDisplay from "./StreamDisplay";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchBar: "",
            gameid: "",
            error: ""
        };
    }

    doGameSearch = () => {

        /*
        to search for streams by game title, we need to first get the id
        of the game we wish to find with the games portal and then
        use the id in a query to the streams portal to get corresponding streams
        */

        //first, check if input is blank and query all top posts if so
        if(this.state.searchBar === ""){
            this.doStreamSearch(false);
            return;
        }

        //base game endpoint
        var gamesurl = 'https://api.twitch.tv/helix/games?name=';

        //adds search term to url
        gamesurl = gamesurl + this.state.searchBar;

        //fetches game data, and sets gameid state
        fetch(gamesurl, {
            headers: {
                'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e'
            }
        })
        .then(response => response.json())
        .then((data) => {

            //if the data returned from the query is empty, error. 
            //if it is full, search by id and reset error
            if(data.data.length == 0){
                this.setState({error: "error: no such game exists"});
            } else {
                this.setState({gameid: data.data[0].id, error: ""});
                this.doStreamSearch(true);
            }

            console.log(data);

        });

    }



    doStreamSearch = (isQueryingById) => {
        
        var searchurl = 'https://api.twitch.tv/helix/streams/';
        
        if(isQueryingById){
            searchurl = searchurl + '?game_id=';
            searchurl = searchurl + this.state.gameid;
        }

        //fetches stream data with client id and puts it in json format
        fetch(searchurl, {
            headers: {
                'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e'
            }
        })
        .then(response => response.json())
        .then((data) => {

            this.setState({data: data.data});
            console.log(this.state.data);

        });
    }


    //keeps track of search bar text
    updateSearchBar = (e) => {
        this.setState({searchBar: e.target.value});
    }

    //displays top channels of all categories by default
    componentWillMount(){
        this.doStreamSearch();
    }

    render() {

        return (
            <div>
                
                Search a game:
                <input type="text" name="gameSearch" onChange={this.updateSearchBar}/>
                <button onClick={this.doGameSearch}>Search</button>
                {this.state.error}
                {this.props.userToken}
            </div>
        );
    }
}

export default Dashboard;
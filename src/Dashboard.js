import React, { Component } from "react";
import StreamDisplay from "./StreamDisplay";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchBar: "",
            gameid: "",
            cursor: "",
            prev: "",
            next: "",
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
                'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then((data) => {

            //if the data returned from the query is empty, error. 
            //if it is full, search by id and reset error
            if(data.data.length === 0){
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
                'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then((data) => {

            this.setState({data: data.data});
            console.log(data);

        });
    }



    createElements = () => {

        //creates a list of streamdisplay objects with information taken from 
        //data from the query

        var elems = [];

        this.state.data.forEach((entry) => {

            //thumbnail urls come in the form https://....-{width}x{height}.jpg, which needs to be 
            //changed to a resolution which is done below
            var repl = entry.thumbnail_url.replace("{width}", "200").replace("{height}", "200");

            //JSX object is created and appended to list
            var sd = (
                <StreamDisplay 
                    key={entry.id}
                    DisplayName={entry.user_name}
                    Game_ID={entry.game_id}
                    ViewCount={entry.viewer_count}
                    Description={entry.title}
                    ThumbnailURL={repl}
                />
            );

            elems.push(sd);
        });

        return (
            <div>
                {elems}
            </div>
        );
    }


    //keeps track of search bar text
    updateSearchBar = (e) => {
        this.setState({searchBar: e.target.value});
    }

    prevPage = () => {
        
    }

    nextPage = () => {

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
                <button onClick={this.prevPage}>{"<"}</button>
                <button onClick={this.nextPage}>{">"}</button>
                {this.state.error}
                {this.createElements()}
            </div>
        );
    }
}

export default Dashboard;
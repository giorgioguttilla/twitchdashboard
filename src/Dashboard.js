import React, { Component } from "react";
import StreamDisplay from "./StreamDisplay";
import "./Dashboard.css";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],       //current stream data from api
            searchBar: "",  //current value in search bar
            gameid: "",     //most recent game id fetched
            cursor: "",     //current page cursor from api call
            error: "",      //error if game name input is invalid
            displaying: ""  //text saying what is being displayed
        };
    }




    doGameSearch = () => {

        /*
        to search for streams by game title, we need to first get the id
        of the game we wish to find with the games portal and then
        use the id in a query to the streams portal to get corresponding streams
        */


        //initial check if saerch is empty
        if(this.state.searchBar === ""){
            this.setState({gameid: ""});
            this.doStreamSearch(false);
            return;
        }

        //base game endpoint
        var gamesurl = 'https://api.twitch.tv/helix/games?name=';

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
                this.setState({error: "No game found: " + this.state.searchBar});
            } else {
                this.setState({gameid: data.data[0].id, error: ""});
                this.doStreamSearch(true);
            }

        });

    }

    doStreamSearch = (isQueryingById) => {
        
        /*
        queries api for first page of results. if isQueryingById is false, the url is made to query 
        the top streams of all games
        */

        var searchurl = 'https://api.twitch.tv/helix/streams/';
        
        if(isQueryingById){
            searchurl = searchurl + '?game_id=';
            searchurl = searchurl + this.state.gameid;
        }

        this.executeStreamQuery(searchurl).then((len) => {
            
            //if query returns something, change display text according to what was search
            if(len !== 0){
                if(this.state.searchBar === ""){
                    this.setState({displaying: "Showing top streams:"});
                } else {
                    this.setState({displaying: "Showing top streams for " + this.state.searchBar + ":"});
                }
            }
            
        });

    }

    //gets prev/next page
    prevPage = () => {

        //creates url based on whether or not a game was specified
        var prevurl = 'https://api.twitch.tv/helix/streams/';
        
        if(this.state.gameid !== ''){
            prevurl = prevurl + '?game_id=';
            prevurl = prevurl + this.state.gameid;
            prevurl = prevurl + '&before=' + this.state.cursor;
        } else {
            prevurl = prevurl + '?before=' + this.state.cursor;
        }

        this.executeStreamQuery(prevurl);
    }

    nextPage = () => {

        //creates url based on whether or not a game was specified
        var nexturl = 'https://api.twitch.tv/helix/streams/';
        
        if(this.state.gameid !== ''){
            nexturl = nexturl + '?game_id=';
            nexturl = nexturl + this.state.gameid;
            nexturl = nexturl + '&after=' + this.state.cursor;
        } else {
            nexturl = nexturl + '?after=' + this.state.cursor;
        }

        this.executeStreamQuery(nexturl);

    }

    executeStreamQuery = (queryurl) => {

        /*
        this function handles all stream endpoint fetch requests and returns 
        the length of the data array returned from the api, or a 0
        if nothing could be fetched
        */

        return fetch(queryurl, {
            headers: {
                'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then((data) => {

            //both checks for valid data returned
            if(data.data != null && data.data.length !== 0){

                //sets new cursor and new data, resets error
                this.setState({data: data.data, cursor: data.pagination.cursor, error: ""});
                
                return data.data.length;

            } else {
                return 0;
            }
            
        });

    }


    

    








    createElements = () => {

        //creates a list of streamdisplay objects with information taken from 
        //data from the query

        var elems = [];

        this.state.data.forEach((entry) => {

            //thumbnail urls come in the form https://....-{width}x{height}.jpg, which needs to be 
            //changed to a resolution which is done below. I chose a 16:9 aspect ratio
            var repl = entry.thumbnail_url.replace("{width}", "356").replace("{height}", "200");

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






    //JSX page controls object
    pageControls = () => {
        return (
            <div className="pageControls">
                <button className="pageButton" onClick={this.prevPage}>{"<"}</button>
                <button className="pageButton" onClick={this.nextPage}>{">"}</button>
            </div>
        );
    }

    //displays top channels of all categories by default
    componentWillMount(){
        this.doStreamSearch();
    }

    //keeps track of search bar text
    updateSearchBar = (e) => {
        this.setState({searchBar: e.target.value});
    }

    //helper functions
    checkForEnter = (e) => {
        if(e.key === 'Enter'){
            this.doGameSearch();
        }
    }

    toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    updateResults = () => {
        if(this.state.searchBar === ""){
            this.setState({displaying: "Showing top streams:"});
        } else {
            this.setState({displaying: "Showing top streams for " + this.state.searchBar + ":"});
        }
    }

    render() {

        return (
            <div>
                <div id="topBar">
                    <div id="logo">
                        <img src="https://www.freepnglogos.com/uploads/twitch-logo-png-6.png" width="35px"/>
                        <span id="dashboard">dashboard</span>
                    </div>
                    <input placeholder="Search by game title" id="searchBar" type="text" name="gameSearch" onChange={this.updateSearchBar} onKeyPress={this.checkForEnter}/>
                </div>

                <div id="body">
                    <div id="error">{this.state.error}</div>
                    <div id="displaying">{this.state.displaying}</div>
                    {this.pageControls()}
                    {this.createElements()}
                    {this.pageControls()}
                    <button onClick={this.toTop} id="toTop">Back to top</button>
                    <br/>
                    <br/>
                </div>
                
            </div>
        );
    }
}

export default Dashboard;
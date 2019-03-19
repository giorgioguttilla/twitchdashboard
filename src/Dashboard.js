// import React, { Component } from "react";
// import StreamDisplay from "./StreamDisplay";

// class Dashboard extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             data: [],
//             searchBar: "",
//             gameid: "",
//             cursor: "",
//             pageNumber: 1,
//             error: ""
//         };
//     }

//     doGameSearch = () => {

//         /*
//         to search for streams by game title, we need to first get the id
//         of the game we wish to find with the games portal and then
//         use the id in a query to the streams portal to get corresponding streams
//         */


//         this.setState({pageNumber: 1});


//         //first, check if input is blank and query all top posts if so
//         if(this.state.searchBar === ""){
//             this.doStreamSearch(false);
//             return;
//         }

//         //base game endpoint
//         var gamesurl = 'https://api.twitch.tv/helix/games?name=';

//         //adds search term to url
//         gamesurl = gamesurl + this.state.searchBar;

//         //fetches game data, and sets gameid state
//         fetch(gamesurl, {
//             headers: {
//                 'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             }
//         })
//         .then(response => response.json())
//         .then((data) => {

//             //if the data returned from the query is empty, error. 
//             //if it is full, search by id and reset error
//             if(data.data.length === 0){
//                 this.setState({error: "error: no such game exists"});
//             } else {
//                 this.setState({gameid: data.data[0].id, error: ""});
//                 this.doStreamSearch(true);
//             }

//             console.log(data);

//         });

//     }



//     doStreamSearch = (isQueryingById) => {
        
//         var searchurl = 'https://api.twitch.tv/helix/streams/';
        
//         if(isQueryingById){
//             searchurl = searchurl + '?game_id=';
//             searchurl = searchurl + this.state.gameid;
//         }

//         // if(this.state.before){
//         //     searchurl = searchurl + '&before=' + this.state.cursor;
//         // } else if(this.state.after){
//         //     searchurl = searchurl + '&after=' + this.state.cursor;
//         // }

//         console.log(searchurl);

//         //fetches stream data with client id and puts it in json format
//         fetch(searchurl, {
//             headers: {
//                 'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             }
//         })
//         .then(response => response.json())
//         .then((data) => {

//             //gets data as well as cursor of current page
//             this.setState({data: data.data, cursor: data.pagination.cursor});
//             console.log(data);

//         });
//     }



//     createElements = () => {

//         //creates a list of streamdisplay objects with information taken from 
//         //data from the query

//         var elems = [];

//         this.state.data.forEach((entry) => {

//             //thumbnail urls come in the form https://....-{width}x{height}.jpg, which needs to be 
//             //changed to a resolution which is done below
//             var repl = entry.thumbnail_url.replace("{width}", "200").replace("{height}", "200");

//             //JSX object is created and appended to list
//             var sd = (
//                 <StreamDisplay 
//                     key={entry.id}
//                     DisplayName={entry.user_name}
//                     Game_ID={entry.game_id}
//                     ViewCount={entry.viewer_count}
//                     Description={entry.title}
//                     ThumbnailURL={repl}
//                 />
//             );

//             elems.push(sd);
//         });

//         return (
//             <div>
//                 {elems}
//             </div>
//         );
//     }


//     //keeps track of search bar text
//     updateSearchBar = (e) => {
//         this.setState({searchBar: e.target.value});
//     }

//     //gets prev/next page
//     prevPage = () => {

//         //prevents going past page 1
//         if(this.state.pageNumber === 1){
//             return;
//         }

//         var prevurl = 'https://api.twitch.tv/helix/streams/';
        
//         if(this.state.gameid !== ''){
//             prevurl = prevurl + '?game_id=';
//             prevurl = prevurl + this.state.gameid;
//             prevurl = prevurl + '&before=' + this.state.cursor;
//         } else {
//             prevurl = prevurl + '?before=' + this.state.cursor;
//         }

//         //fetches stream data with client id and puts it in json format
//         fetch(prevurl, {
//             headers: {
//                 'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             }
//         })
//         .then(response => response.json())
//         .then((data) => {

//             //gets data as well as cursor of current page
//             this.setState({data: data.data, cursor: data.pagination.cursor});
//             console.log(data);

//             this.setState({pageNumber: this.state.pageNumber - 1});

//         });
//     }



//     nextPage = () => {

//         var nexturl = 'https://api.twitch.tv/helix/streams/';
        
//         if(this.state.gameid !== ''){
//             nexturl = nexturl + '?game_id=';
//             nexturl = nexturl + this.state.gameid;
//             nexturl = nexturl + '&after=' + this.state.cursor;
//         } else {
//             nexturl = nexturl + '?after=' + this.state.cursor;
//         }

//         //fetches stream data with client id and puts it in json format
//         fetch(nexturl, {
//             headers: {
//                 'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             }
//         })
//         .then(response => response.json())
//         .then((data) => {

//             if(data.data.length === 0){
//                 console.log("asdfafsd");
//             } else {
//                 //gets data as well as cursor of current page
//                 this.setState({data: data.data, cursor: data.pagination.cursor});
                            
//                 this.setState({pageNumber: this.state.pageNumber + 1});
//             }
//         });
//     }

//     //displays top channels of all categories by default
//     componentWillMount(){
//         this.doStreamSearch();
//     }

//     render() {

//         console.log(this.state.cursor);

//         return (
//             <div>
//                 Search a game:
//                 <input type="text" name="gameSearch" onChange={this.updateSearchBar}/>
//                 <button onClick={this.doGameSearch}>Search</button>
//                 <button onClick={this.prevPage}>{"<"}</button>
//                 {this.state.pageNumber}
//                 <button onClick={this.nextPage}>{">"}</button>
//                 {this.state.error}
//                 {this.createElements()}
//             </div>
//         );
//     }
// }

// export default Dashboard;
///////////////////////////////////////////////////////////////////////////

import React, { Component } from "react";
import StreamDisplay from "./StreamDisplay";
import "./Dashboard.css";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchBar: "",
            gameid: "",
            cursor: "",
            error: "",
            displaying: ""
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
            this.setState({gameid: ""});
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
                this.setState({error: "No game found: " + this.state.searchBar});
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

        console.log(searchurl);

        this.executeStreamQuery(searchurl).then((len) => {
            
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

        var prevurl = 'https://api.twitch.tv/helix/streams/';
        
        if(this.state.gameid !== ''){
            prevurl = prevurl + '?game_id=';
            prevurl = prevurl + this.state.gameid;
            prevurl = prevurl + '&before=' + this.state.cursor;
        } else {
            prevurl = prevurl + '?before=' + this.state.cursor;
        }

        this.executeStreamQuery(prevurl).then((len) => {
            console.log(len);
        });
    }

    nextPage = () => {

        var nexturl = 'https://api.twitch.tv/helix/streams/';
        
        if(this.state.gameid !== ''){
            nexturl = nexturl + '?game_id=';
            nexturl = nexturl + this.state.gameid;
            nexturl = nexturl + '&after=' + this.state.cursor;
        } else {
            nexturl = nexturl + '?after=' + this.state.cursor;
        }

        this.executeStreamQuery(nexturl).then((len) => {
            console.log(len);
        });

    }

    executeStreamQuery = (queryurl) => {

        return fetch(queryurl, {
            headers: {
                'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then((data) => {

            if(data.data != null && data.data.length !== 0){
                this.setState({data: data.data, cursor: data.pagination.cursor, error: ""});
                
                console.log(data);
                return data.data.length;
            } else {
                console.log("no more pages in this direction");
                console.log(data);
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

        console.log(this.state.cursor);

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
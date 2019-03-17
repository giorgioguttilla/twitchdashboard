import React, { Component } from "react";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchBar: ""
        };
    }

    doSearch = () => {
        
        var searchurl = 'https://api.twitch.tv/helix/streams/?';
        searchurl += this.state.searchBar;
        
        console.log(searchurl);

        fetch(searchurl, {
            headers: {
                'Client-ID': 'mhslann5zow8404zgxj85vjg1bs67e'
            }
        })
        .then(response => response.json())
        .then((data) => {

            console.log(data);

            var names = [];

            data.data.forEach(element => {
                names.push(element.user_name);
            });            

            this.setState({data: names});

            console.log(this.state.data);
            console.log(this.state.searchBar);

        });

    }

    updateSearchBar = (e) => {
        this.setState({searchBar: e.target.value});
    }

    render() {

        return (
            <div>
                <form>
                    Search a game:
                    <input type="text" name="gameSearch" onChange={this.updateSearchBar}/>
                    <input type="submit" name="Search" onClick={this.doSearch} />
                </form>
                {this.props.userToken}
                {this.state.data}
            </div>
        );
    }
}

export default Dashboard;
import React, { Component } from "react";

class StreamDisplay extends Component {
    constructor(props){
        super(props);
        /*props should be:
        DisplayName
        GameName
        ViewCount
        Description
        ThumbnailURL
        */

    }

    render() {
        return (
            <div id="BoundingBox">
                <img src={this.props.ThumbnailURL} alt="Thumbnail"/>
                <div id="DisplayName">{this.props.DisplayName}</div>
                <div id="ViewCount">{this.props.GameName} - {this.props.ViewCount} viewers</div>
                <div id="Description">{this.props.Description}</div>
            </div>
        );
    }
}

export default StreamDisplay;

import React from "react";
import ReactDom from "react-dom";
import io from "socket.io-client";
import RTC from "./RTCMultiConnection";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: io.connect(),
            onMessageCallbacks: {}
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.state.socket.on('message', (data)=> {
            if (data.sender === connection.userid) return;
            if (this.state.onMessageCallbacks[data.channel]) {
                this.state.onMessageCallbacks[data.channel](data.message);
            }
        })
    }

    handleClick() {



        console.log("handleClick fired!");
        let connection = new RTCMultiConnection();
        console.log(connection, "THIS IS THE CONNECTION CREATED FROM A USER CLICK!");


        connection.body = this.refs.videos_container;



    }

    render() {
        return (
            <div>
                <div ref="videos_container"></div>


                <input type="text" id="broadcast-id" placeholder="broadcast-id" defaultValue="room-xyz"/>
                <select id="broadcast-options">
                    <option>Audio+Video</option>
                    <option title="Works only in Firefox.">Audio+Screen</option>
                    <option>Audio</option>
                    <option>Video</option>
                    <option
                        title="Screen capturing requries HTTPs. Please run this demo on HTTPs to make sure it can capture your screens.">
                        Screen
                    </option>
                </select>
                <button id="open-or-join" onClick={this.handleClick}>Open or Join Broadcast</button>
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector("#app"));


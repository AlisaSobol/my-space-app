import React, { Component } from "react";
import './Styles/index.scss';
import Astronauts from "./Components/Astronauts";
import SpaceStationOnMap from "./Components/SpaceStation";
import { isEmpty } from 'lodash';

const APIS = {
    ASTRONAUTS_API: 'http://api.open-notify.org/astros.json',
    COORDINATES_API: 'http://api.open-notify.org/iss-now.json',
};

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            Astronauts: [],
            Coordinates: {},
            AstronautsError: false,
            CoordinatesError: false
        }
    }

    fetchApi = async function(url) {
        const response = await fetch(url);
        return await response.json();
    }

    fetchAstronauts = async function() {
        try {
            const data = await this.fetchApi(APIS.ASTRONAUTS_API);
            this.setState({
                Astronauts: data.people,
                AstronautsError: false
            })
        } catch {
            this.setState({ AstronautsError: true })
        }
    }

    fetchCoordinates = async function() {
        try {
            const data = await this.fetchApi(APIS.COORDINATES_API)
            this.setState({
                Coordinates: data.iss_position,
                CoordinatesError: false
            })
        } catch {
            this.setState({ CoordinatesError: true })
        }
    }

    fetchCoordinatesWIthInterval = () => {
        setInterval(async () => {
            await this.fetchCoordinates();
        }, 3000);
    }

    async componentDidMount() {
        await this.fetchAstronauts();
        this.fetchCoordinatesWIthInterval();
    }

    render() {
        return (
            <div className="App">
                <div className="head-section">
                    <h1>Space Station</h1>
                </div>
                <SpaceStationOnMap
                    coordinates={this.state.Coordinates}
                    error={this.state.CoordinatesError}
                    loading={isEmpty(this.state.Coordinates)}
                />
                <Astronauts
                    astronauts={this.state.Astronauts}
                    error={this.state.AstronautsError}
                />
            </div>
        )
    }
}

export default App;

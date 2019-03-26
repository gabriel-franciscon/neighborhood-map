import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const LOCATIONS = [
    { title: 'Restaurante Angelo', location: { lat: -23.1207456, lng: -46.5541011 } },
    { title: `McDonald's`, location: { lat: -23.1212862, lng: -46.5545281 } },
]

class Maps extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = props => {
        this.state.showingInfoWindow && (
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        )
    }

    render() {
        return (
            <div id='map' role='application'>
                <Map
                    className='map'
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{
                        lat: -23.1207456,
                        lng: -46.5541011
                    }}>

                    {LOCATIONS.map((item, index) => (
                        <Marker
                            key={index}
                            title={item.title}
                            position={{ lat: item.location.lat, lng: item.location.lng }}
                            onClick={this.onMarkerClick}
                        />
                    ))}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.title}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default Maps
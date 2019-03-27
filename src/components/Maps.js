import React, { Component } from 'react'
import { Map, InfoWindow, Marker } from 'google-maps-react';

class Maps extends Component {

    state = {
        locations: this.props.places,
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
        
        const { locations } = this.state

        return (
            <div id='map' role='application'>
                <Map
                    className='map'
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{
                        lat: -23.1207456,
                        lng: -46.5541011
                    }}>

                    {locations.length && locations.map((item, index) => (
                        <Marker
                            key={index}
                            title={item.title}
                            position={{ lat: item.lat, lng: item.lng }}
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
import React, { Component } from 'react'
import { Map, InfoWindow, Marker } from 'google-maps-react'
import Filter from './Filter'

class Maps extends Component {

    state = {
        locations: this.props.places,
        locationsToShow: [],
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

    markerInfo = selectedPlace => {
        const { locations } = this.state

        if (locations.length) {
            for (const location of locations) {
                if (location.title === selectedPlace.title) {
                    return location.address
                }
            }
        }

        return ''
    }

    filterMarker = filteredPlaces => {
        const locationsToShow = filteredPlaces.length ? filteredPlaces : []
		this.setState({ locationsToShow: locationsToShow })
	}

    render() {
        
        const { locations } = this.state
        const locationsToShow = this.state.locationsToShow.length ? this.state.locationsToShow : locations

        return (
            <React.Fragment>
                <Filter
                    places={locations}
                    locationsToShow={this.state.locationsToShow}
                    filterMarker={this.filterMarker}
                />
                <div id='map' role='application'>
                    <Map
                        className='map'
                        google={this.props.google}
                        zoom={15}
                        initialCenter={{
                            lat: -23.1207456,
                            lng: -46.5541011
                        }}>

                        {locationsToShow.length && locationsToShow.map((item, index) => (
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
                                <h3>{this.state.selectedPlace.title}</h3>
                                <p>{
                                    this.markerInfo(this.state.selectedPlace)
                                }</p>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </React.Fragment>
        )
    }
}

export default Maps
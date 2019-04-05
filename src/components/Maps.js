import React, { Component } from 'react'
import { Map, InfoWindow, Marker } from 'google-maps-react'
import Filter from './Filter'

class Maps extends Component {

    state = {
        mapReady: false,
        map: {},
        google: {},
        locations: this.props.places,
        locationsToShow: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        emptyMarkers: false,
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    onMapClicked = () => {
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
                if (location.id === selectedPlace.id) {
                    return (
                        <div className="info-window">
                            <h3>{location.title}</h3>
                            <p>
                                <strong>Categorie: </strong> {location.categorie}
                            </p>
                            <p>
                                <strong>Address: </strong> {location.address}
                            </p>
                        </div>
                    )
                }
            }
        }

        return ''
    }

    filterMarker = filteredPlaces => {
        const locationsToShow = filteredPlaces.length ? filteredPlaces : []
		this.setState({ locationsToShow: locationsToShow })
    }
    
    setEmptyMarkers = filteredPlaces => {
        const emptyMarkers = !filteredPlaces.length ? true : false
        this.setState({ emptyMarkers: emptyMarkers })
    }

    infoWindowOnFilter = place => {
        this.setState({
            selectedPlace: place,
            activeMarker: new window.google.maps.Marker({
                map: this.state.map,
                position: place.location,
                title: place.title
            }),
            showingInfoWindow: true
        })
    }

    mapOnReady = (mapProps, map) => {
        const { google } = mapProps

        this.setState({
            mapReady: true,
            map: map,
            google: google
        })
    }

    windowHasClosed = () => {
        this.state.showingInfoWindow && this.state.activeMarker.setMap(null)
        
        this.setState({
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindowOnFilter: false,
            infoWindoPosition: undefined,
        })
    }

    render() {

        const { activeMarker, emptyMarkers, locations, selectedPlace, showingInfoWindow  } = this.state
        const locationsToShow = this.state.locationsToShow.length ? this.state.locationsToShow : locations

        return (
            <React.Fragment>
                <Filter
                    places={locations}
                    locationsToShow={locationsToShow}
                    filterMarker={this.filterMarker}
                    emptyMarkers={emptyMarkers}
                    setEmptyMarkers={this.setEmptyMarkers}
                    infoWindowOnFilter={this.infoWindowOnFilter}
                />
                <div id='map' role='application'>
                    <Map
                        className='map'
                        google={this.props.google}
                        onReady={this.mapOnReady}
                        onClick={this.onMapClicked}
                        zoom={15}
                        initialCenter={{
                            lat: -23.1207456,
                            lng: -46.5541011
                        }}>

                        {!emptyMarkers && locationsToShow.length && locationsToShow.map(item => (
                            <Marker
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                position={{ lat: item.location.lat, lng: item.location.lng }}
                                onClick={this.onMarkerClick}
                            />
                        ))}

                        <InfoWindow
                            marker={activeMarker}
                            visible={showingInfoWindow}
                            onClose={this.windowHasClosed}>
                            <div>
                                {this.markerInfo(selectedPlace)}
                            </div>
                        </InfoWindow>
                        
                    </Map>
                </div>
            </React.Fragment>
        )
    }
}

export default Maps
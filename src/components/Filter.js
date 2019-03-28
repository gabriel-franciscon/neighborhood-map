import React, { Component } from 'react'
import { InfoWindow, Marker } from 'google-maps-react'

class Filter extends Component {

    state = {
        places: this.props.places,
        filteredPlaces: [],
        emptySearch: false
    }

    filterPlaces = query => {
		const filteredPlaces = this.state.places.filter(location => (
			location.title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
        )
        const emptySearch = query !== '' && !filteredPlaces.length ? true : false
        this.props.filterMarker(filteredPlaces)
        this.props.setEmptyMarkers(filteredPlaces)
		this.setState({ 
            filteredPlaces: filteredPlaces,
            emptySearch: emptySearch
        })
    }

    render() {
        const { places, filteredPlaces, emptySearch } = this.state
        const placesToShow = filteredPlaces.length ? filteredPlaces : places

        return (
            <aside className='filter'>
                <input
                    type='text'
                    placeholder='Search for places'
                    aria-label='Search for places'
                    onChange={event => this.filterPlaces(event.target.value)}
                />
                <ul>
                    {!emptySearch && placesToShow && placesToShow.map((place, index) => (
                        <li key={index}>
                            {place.title}
                        </li>
                    ))}
                </ul>
            </aside>
        )
    }

}

export default Filter
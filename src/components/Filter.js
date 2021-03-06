import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Filter extends Component {

    state = {
        places: this.props.places,
        filteredPlaces: [],
        emptySearch: false
    }

    // Filter the locations according to the text entered by the user.
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
        this.props.clearSelectedPlace()
    }

    render() {
        const { places, filteredPlaces, emptySearch } = this.state
        const placesToShow = filteredPlaces.length ? filteredPlaces : places

        return (
            <aside className='filter' tabIndex='0'>
                <input
                    type='text'
                    placeholder='Search for places'
                    aria-label='Search for places'
                    tabIndex="1"
                    onChange={event => {
                        this.props.clearSelectedPlace()
                        this.filterPlaces(event.target.value)
                    }}
                />
                <ul>
                    {!emptySearch && placesToShow && placesToShow.map((place, index) => (
                        <li
                            key={index}
                            aria-label={place.title}
                            tabIndex="1"
                            onClick={() => {
                                this.props.clearSelectedPlace()
                                this.props.infoWindowOnFilter(place)
                            }}>
                            {place.title}
                        </li>
                    ))}
                </ul>
                <div className="foursquare">
                    <a
                        href="https://pt.foursquare.com/"
                        title="Powered by Foursquare"
                        target="_blank"
                        rel="noopener noreferrer">
                        Powered by <FontAwesomeIcon icon={['fab', 'foursquare']} />
                    </a>
                </div>
            </aside>
        )
    }

}

export default Filter
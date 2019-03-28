import React, { Component } from 'react'

class Filter extends Component {

    state = {
        places: this.props.places,
        filteredPlaces: []
    }

    filterPlaces = query => {
		const filteredPlaces = this.state.places.filter(location => (
			location.title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
        )
        this.props.filterMarker(filteredPlaces)
		this.setState({ filteredPlaces: filteredPlaces })
	}

    render() {
        const { places } = this.state
        const { filteredPlaces } = this.state
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
                    {placesToShow && placesToShow.map((place, index) => (
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
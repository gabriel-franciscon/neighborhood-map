import React, { Component } from 'react'
import Header from './components/Header'
import MapWrapper from './components/MapWrapper'
import './App.css'

const FOURSQUARE_API = 'https://api.foursquare.com/v2/venues/explore'
const CLIENT_ID = 'LU1LLAIZXFGH4FPXI3SEWZK3ZVOZ1HCWWYDKXD2SOJJEXCAL'
const CLIENT_SECRET = 'SDSRLHHRFLY1SNZBXWD2MNRWEAV51VS3BGRTUDM20X22FD4E'

class App extends Component {

	state = {
		allPlaces: [],
	}

	getPlaces = () => {
		const url = new URL(FOURSQUARE_API)

		url.search = new URLSearchParams({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			near: 'Atibaia',
			radius: 5000,
			section: 'food',
			v: '20190326'
		})

		fetch(url).then(response => response.json())
			.then(result => {
				this.setState({
					allPlaces: result.response.groups[0].items.map(item => {
						const { venue } = item
						return {
							title: venue.name,
							location: { lat: venue.location.lat, lng: venue.location.lng },
							address: venue.location.formattedAddress.join(' - '),
						}
					})
				})
			})
			.catch(err => {
				console.error('Failed retrieving information', err);
			})
	}

	componentDidMount() {
		this.getPlaces()
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				<div className="App">
					<MapWrapper
						places={this.state.allPlaces}
						filterPlaces={this.filterPlaces}
						filteredPlaces={this.state.filteredPlaces}
					/>
				</div>
			</React.Fragment>
		)
	}
}

export default App

import React, { Component } from 'react'
import Header from './components/Header'
import MapWrapper from './components/MapWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFoursquare } from '@fortawesome/free-brands-svg-icons'
import { faBars, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import './App.css'

library.add(faBars, faSpinner, faExclamationTriangle, faFoursquare)

const FOURSQUARE_API = 'https://api.foursquare.com/v2/venues/explore'
const CLIENT_ID = 'LU1LLAIZXFGH4FPXI3SEWZK3ZVOZ1HCWWYDKXD2SOJJEXCAL'
const CLIENT_SECRET = 'SDSRLHHRFLY1SNZBXWD2MNRWEAV51VS3BGRTUDM20X22FD4E'

class App extends Component {

	state = {
		allPlaces: [],
		error: false,
		errorMessage: ''
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
				console.log(result.response)
				this.setState({
					allPlaces: result.response.groups[0].items.map(item => {
						const { venue } = item
						return {
							id: venue.id,
							title: venue.name,
							location: { lat: venue.location.lat, lng: venue.location.lng },
							address: venue.location.formattedAddress.join(' - '),
							categorie: venue.categories[0].shortName
						}
					})
				})
			})
			.catch(err => {
				console.error('Failed retrieving information', err)
				this.setState({
					error: true,
					errorMessage: err
				})
			})
	}

	componentDidMount() {
		this.getPlaces()
	}

	render() {
		const loadingContainer = () => (
			<div className="loading flex-container">
				<div className="loading-icon">
					<FontAwesomeIcon icon={faSpinner}/>
				</div>
				<p>Loading, please wait...</p>
			</div>
		)

		return (
			<React.Fragment>
				<Header />
				<div className="App">
					{this.state.error ? (
						<div className="error flex-container">
							<div className="error-icon">
								<FontAwesomeIcon icon={faExclamationTriangle}/>
							</div>
							<p>Sorry, there was an error loading the map. Please try again later.</p>
							<div>{`${this.state.errorMessage}`}</div>
						</div>
					) : (
						<MapWrapper
							places={this.state.allPlaces}
							filterPlaces={this.filterPlaces}
							filteredPlaces={this.state.filteredPlaces}
							loadingContainer={loadingContainer}
						/>
					)}
				</div>
			</React.Fragment>
		)
	}
}

export default App

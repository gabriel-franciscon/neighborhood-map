import React, { Component } from 'react'

const API_KEY = 'AIzaSyCesVJpjlbv8EnZ70nsPWFMl3QQ9tAvzZc'
const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`

class Maps extends Component {

    state = {
        map: '',
        loaded: false,
        error: false
    }

    loadMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -23.1207456, lng: -46.5541011 },
            zoom: 13,
        })
        this.setState({
            map: map,
        });
    }

    componentDidMount() {

        if (!window.google) {
            const script = document.createElement('script')
            script.src = API_URL
            script.async = true
            script.defer = true

            script.addEventListener('load', () => {
                this.setState({ loaded: true })
                this.loadMap()
            })
            script.addEventListener('error', () => {
                this.setState({ error: true })
            })

            document.body && document.body.appendChild(script)
        }

    }

    render() {
        if (this.state.error) {
            return <div>Error</div>
        }
        if (this.state.loaded) {
            return (
                <div id="map" role="application"></div>
            )
        } else {
            return <div>Loading</div>
        }
    }

}

export default Maps
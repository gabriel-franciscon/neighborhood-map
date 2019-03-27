import { GoogleApiWrapper } from 'google-maps-react'
import Maps from '../components/Maps'

export default GoogleApiWrapper(
    props => ({
        apiKey: 'AIzaSyCesVJpjlbv8EnZ70nsPWFMl3QQ9tAvzZc',
        places: props.places
    })
    // LoadingContainer: LoadingContainer
)(Maps)
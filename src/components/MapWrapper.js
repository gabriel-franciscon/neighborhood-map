import { GoogleApiWrapper } from 'google-maps-react'
import Maps from '../components/Maps'

// Helper to wrap around the Google maps API
export default GoogleApiWrapper(
    props => ({
        apiKey: 'AIzaSyCesVJpjlbv8EnZ70nsPWFMl3QQ9tAvzZc',
        places: props.places,
        LoadingContainer: props.loadingContainer
    })    
)(Maps)
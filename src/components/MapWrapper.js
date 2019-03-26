import { GoogleApiWrapper } from 'google-maps-react'
import Maps from '../components/Maps'

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCesVJpjlbv8EnZ70nsPWFMl3QQ9tAvzZc'),
    // LoadingContainer: LoadingContainer
})(Maps)
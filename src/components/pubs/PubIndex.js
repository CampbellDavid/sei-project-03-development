import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Authorization from '../../../lib/authorization'

import PubMapComp from './PubMapComp'
import PubCard from './PubCard'


export default class PubIndex extends React.Component {
  state = {
    postcodes: null,
    pubs: null,
    viewport: {
      latitude: 51.5074,
      longitude: 0.1278,
      zoom: 9
    }
  }
  mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
  mapRef = React.createRef()
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }
    this.setState({
      viewport: {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom
      }
    })
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }



  async componentDidMount() {
    try {
      const res = await axios.get('/api/pubs')
      this.setState({ pubs: res.data })
      this.getPostcodes()
    } catch (error) {
      console.log(error)
    }
  }
  async getPostcodes() {
    const postcodes = this.state.pubs.map(pub => {
      return pub.postcode
    })
    const res = await axios.post(
      'https://cors-anywhere.herokuapp.com/api.postcodes.io/postcodes',
      { postcodes }
    )
    this.setState({ postcodes: res.data.result })
  }
  render() {
    if (!this.state.postcodes) return null
    if (!this.state.pubs) return null
    return (
      <section>
        <div className="title">
          <h1 >Find a pub quiz near you!</h1>
        </div>

        <div className="index" >
          <div className="card-container">
            {this.state.pubs.map(pub => (
              <PubCard key={pub._id} {...pub} />
            ))}
          </div>


          <div className="map-container">
            <PubMapComp
              viewport={this.state.viewport}
              handleGeocoderViewportChange={this.handleGeocoderViewportChange}
              handleViewportChange={this.handleViewportChange}
              mapboxToken={this.mapboxToken}
              mapRef={this.mapRef}
              postcodes={this.state.postcodes}
              pubs={this.state.pubs}
            />
          </div>


          <div>
            {Authorization.isAuthenticated() ?
              <Link to="/pubs/new">
                <button
                  className="button"
                  type="button">New Pub</button>
              </Link>
              : null}
          </div>

        </div>
      </section>
    )
  }
}
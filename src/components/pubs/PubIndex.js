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
			zoom: 9,
		},
	}
	mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
	mapRef = React.createRef()
	handleViewportChange = (viewport) => {
		this.setState({
			viewport: { ...this.state.viewport, ...viewport },
		})
	}
	handleGeocoderViewportChange = (viewport) => {
		const geocoderDefaultOverrides = { transitionDuration: 1000 }
		this.setState({
			viewport: {
				latitude: viewport.latitude,
				longitude: viewport.longitude,
				zoom: viewport.zoom,
			},
		})
		return this.handleViewportChange({
			...viewport,
			...geocoderDefaultOverrides,
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
		const postcodes = this.state.pubs.map((pub) => {
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
			<div className='bg-image'>
				<div className='bg-fade-high'>
					<div className='body-div'>
						<section style={{ overflowX: 'hidden' }}>
							<div className='m-3'>
								<h1 className='text-center font text-1'>Find a pub near you</h1>
							</div>

							<div className='row'>
								<div className='col-md-6 scroll pr-0'>
									<div className='p-0 m-0 row center-x'>
										{this.state.pubs.map((pub) => (
											<PubCard key={pub._id} {...pub} />
										))}
									</div>

									<div className='p-0 m-0 row center-x'>
										{Authorization.isAuthenticated() ? (
											<Link to='/pubs/new'>
												<button type='button' className='m-5 font btn btn-dark'>
													New Pub
												</button>
											</Link>
										) : null}
									</div>
								</div>

								<div className='col-md-6 d-flex flex-wrap pl-0'>
									<PubMapComp
										viewport={this.state.viewport}
										handleGeocoderViewportChange={
											this.handleGeocoderViewportChange
										}
										handleViewportChange={this.handleViewportChange}
										mapboxToken={this.mapboxToken}
										mapRef={this.mapRef}
										postcodes={this.state.postcodes}
										pubs={this.state.pubs}
									/>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

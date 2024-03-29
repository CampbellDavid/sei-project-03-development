import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EventMapComp from './EventMapComp'
import EventCard from './EventCard'
import Authorization from '../../../lib/authorization'

export default class EventIndex extends React.Component {
	state = {
		postcodes: null,
		events: null,
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
			const res = await axios.get('/api/events')
			console.log('data', res.data)
			this.setState({ events: res.data })
			this.getPostcodes()
		} catch (err) {
			console.log(err)
		}
	}

	async getPostcodes() {
		const postcodes = this.state.events.map((event) => {
			return event.postcode
		})
		const res = await axios.post(
			'https://cors-anywhere.herokuapp.com/api.postcodes.io/postcodes',
			{ postcodes }
		)
		this.setState({ postcodes: res.data.result })
	}

	render() {
		if (!this.state.events) return null
		if (!this.state.postcodes) return null
		return (
			<div className='bg-image'>
				<div className='bg-fade-high'>
					<div className='body-div'>
						<section style={{ overflowX: 'hidden' }}>
							<div className='m-3'>
								<h1 className='text-center font text-1'>
									Find an event near you
								</h1>
							</div>

							<div className='row'>
								<div className='col-md-6 scroll pr-0'>
									<div className='p-0 m-0 row center-x'>
										{this.state.events.map((event) => (
											<EventCard key={event._id} {...event} />
										))}
									</div>

									<div className='p-0 m-0 row center-x'>
										{Authorization.isAuthenticated() ? (
											<Link to='/events/new'>
												<button type='button' className='m-5 font btn btn-dark'>
													New Event
												</button>
											</Link>
										) : null}
									</div>
								</div>

								<div className='col-md-6 d-flex flex-wrap pl-0'>
									<EventMapComp
										viewport={this.state.viewport}
										handleGeocoderViewportChange={
											this.handleGeocoderViewportChange
										}
										handleViewportChange={this.handleViewportChange}
										mapboxToken={this.mapboxToken}
										mapRef={this.mapRef}
										postcodes={this.state.postcodes}
										events={this.state.events}
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

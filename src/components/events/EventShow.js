import React from 'react'
import axios from 'axios'

import TeamCard from '../teams/TeamCard'
import { Link } from 'react-router-dom'
import Authorization from '../../../lib/authorization'

export default class EventShow extends React.Component {
	state = {
		event: null,
		teams: null,
	}

	async componentDidMount() {
		try {
			const eventId = this.props.match.params.id
			await axios
				.all([
					axios.get(`/api/events/${eventId}`),
					axios.get(`/api/events/${eventId}/teams`),
				])
				.then(
					axios.spread((eventReq, teamsReq) => {
						this.setState({
							event: eventReq.data,
							teams: teamsReq.data,
						})
					})
				)
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (!this.state.event) return null
		const eventId = this.props.match.params.id
		return (
			<div className='bg-image'>
				<div className='bg-fade-high'>
					<div className='body-div'>
						<section style={{ overflowX: 'hidden' }}>
							<div className='m-3'>
								<h1 className='text-center font text-1'>
									{this.state.event.pub}
								</h1>
								<h2 className='text-center font text-2'>
									Join a team at this event
								</h2>
							</div>

							<div className='row center-x'>
								{this.state.teams.teams.map((team) => (
									<TeamCard key={team._id} {...team} />
								))}
							</div>

							<div className='text-center'>
								{Authorization.isAuthenticated() ? (
									<Link to={`/events/${eventId}/teams/new`}>
										<button type='button' className='m-5 font btn btn-dark'>
											New Team
										</button>
									</Link>
								) : null}
							</div>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

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
				<div className='bg-fade'>
					<div className='body-div'>
						<div className='m-3'>
							<h1 className='text-center font text-1-white'>
								{this.state.event.pub}
							</h1>
							<h2 className='text-center font text-2-white'>
								Join a team at this event
							</h2>
						</div>
						<div className='row'>
							<div className='col-lg-12'>
								<div className='center-x'>
									{this.state.teams.teams.map((team) => (
										<TeamCard key={team._id} {...team} />
									))}
								</div>
							</div>
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
					</div>
				</div>
			</div>
		)
	}
}

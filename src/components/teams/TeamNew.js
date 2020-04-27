import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import TeamForm from './TeamForm'

export default class TeamNew extends React.Component {
	state = {
		team: {
			teamName: '',
		},
	}

	handleChange = ({ target: { name, value } }) => {
		const team = { ...this.state.team, [name]: value }
		this.setState({ team })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const eventId = this.props.match.params.id
		try {
			await axios.post(`/api/events/${eventId}/teams`, this.state.team, {
				headers: { Authorization: `Bearer ${Authorization.getToken()}` },
			})
			this.props.history.push(`/events/${eventId}`)
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<div className='bg-image'>
				<div className='bg-fade center-x center-y'>
					<div className='body-div'>
						<section className='form text-center mt-5 mb-5'>
							<TeamForm
								team={this.state.team}
								handleChange={this.handleChange}
								handleSubmit={this.handleSubmit}
							/>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

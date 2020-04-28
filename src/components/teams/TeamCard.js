import React from 'react'
import Authorization from '../../../lib/authorization'
import axios from 'axios'
import { Link } from 'react-router-dom'

class TeamCard extends React.Component {
	state = {
		team: {
			teamName: '',
			members: [],
			captain: '',
			user: '',
			_id: '',
		},
		errors: {},
	}

	isOwner = () => Authorization.getPayload().sub === this.state.team._id

	async componentDidMount() {
		const teamId = this.props._id
		try {
			const res = await axios.get(`/api/teams/${teamId}`)

			this.setState({ team: res.data })
		} catch (error) {
			this.setState({ errors: error.res.data.errors })
		}
	}

	handleClick = async (e) => {
		e.preventDefault()

		const userId = Authorization.getPayload().sub

		const membersArr = this.state.team.members
		try {
			const response = await axios.get(`/api/profiles/${userId}`)
			const currentUser = membersArr.filter(
				(member) => member._id === userId
			)[0]
			const index = membersArr.indexOf(currentUser)
			membersArr.some((member) => member._id === userId)
				? membersArr.splice(index, 1)
				: membersArr.push(response.data)
			this.setState({
				members: membersArr,
				captain: membersArr[0],
			})
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const userId = Authorization.getPayload().sub
		const { team } = this.state

		return (
			<div className='team-card p-2 m-2 rounded'>
				<div>
					<h2 className='font text-2'>{team.teamName}</h2>
				</div>
				<p className='font text-3'>Captain: {team.captain.username}</p>
				<p className='font text-3'>
					Members:{' '}
					{team.members.map((member, i) => {
						return (
							<li key={i}>
								<Link to={`/profiles/${member._id}`}>{member.username}</Link>
							</li>
						)
					})}
				</p>

				{Authorization.isAuthenticated() ? (
					<div className='text-center'>
						{team.members.some((member) => member._id === userId) ? (
							<button
								type='button'
								className='m-5 font btn btn-dark'
								onClick={this.handleClick}
							>
								Leave Team
							</button>
						) : (
							<button
								type='button'
								className='m-5 font btn btn-dark'
								onClick={this.handleClick}
							>
								Join Team
							</button>
						)}
						{this.isOwner() && (
							<button type='button' className='m-5 font btn btn-dark'>
								Edit Team
							</button>
						)}
					</div>
				) : null}
			</div>
		)
	}
}

export default TeamCard

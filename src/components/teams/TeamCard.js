import React from 'react'
import Authorization from '../../../lib/authorization'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

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
			<Card
				className='mb-4 mr-3 ml-3'
				bg='dark'
				style={{ width: '16rem', height: '24rem' }}
			>
				<Card.Header className='font text-light bg-secondary'>
					{team.teamName}
				</Card.Header>
				<Card.Body>
					<Card.Text
						className='font text-light'
						style={{ overflowX: 'hidden' }}
					>
						Captain:
						<br />
						<Link to={`/profiles/${team.captain._id}`}>
							{team.captain.username}
						</Link>
						<br />
						<br />
						Members:{' '}
						<ul className='no-style-list'>
							{team.members.map((member, i) => {
								return (
									<li key={i}>
										<Link to={`/profiles/${member._id}`}>
											{member.username}
										</Link>
									</li>
								)
							})}
						</ul>
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					{Authorization.isAuthenticated() ? (
						<div className='text-center'>
							{team.members.some((member) => member._id === userId) ? (
								<Button
									variant='light'
									className='font text-dark'
									onClick={this.handleClick}
								>
									Leave Team
								</Button>
							) : (
								<Button
									variant='light'
									className='font text-dark'
									onClick={this.handleClick}
								>
									Join Team
								</Button>
							)}
							{this.isOwner() && (
								<Button variant='light' className='font text-dark'>
									Edit Team
								</Button>
							)}
						</div>
					) : null}
				</Card.Footer>
			</Card>
		)
	}
}

export default TeamCard

import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
	state = {
		user: {
			username: '',
			favouriteDrinks: [],
			quizStrengths: [],
			email: '',
			bio: '',
			personalityType: '',
			_id: '',
			profileImage: '',
		},
	}

	isOwner = () => Authorization.getPayload().sub === this.state.user._id

	async componentDidMount() {
		const userId = this.props.match.params.id
		try {
			const res = await axios.get(`/api/profiles/${userId}`)
			this.setState({ user: res.data })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const userId = this.props.match.params.id
		const {
			username,
			favouriteDrinks,
			quizStrengths,
			email,
			bio,
			personalityType,
			profileImage,
		} = this.state.user
		return (
			<div className='bg-image'>
				<div className='bg-fade-high'>
					<div className='body-div'>
						<section style={{ overflowX: 'hidden' }}>
							<div className='m-3'>
								<h1 className='text-center font text-1'>
									{username.charAt(0).toUpperCase() +
										username.slice(1, username.length)}
									's profile
								</h1>
							</div>

							<div className='row center-y'>
								<div className='col-md-6 center-x p-0'>
									<img className='profile-img m-4' src={profileImage} />
								</div>

								<div className='col-md-6 text-left font text-3 p-0'>
									<div className='m-4 p-4'>
										<p className='text-justify'>
											<h3 className='font text-3 font-weight-bold mb-1'>
												About{' '}
												{username.charAt(0).toUpperCase() +
													username.slice(1, username.length)}
												:{' '}
											</h3>
											<p>{bio}</p>
										</p>
										<p className='mt-4'>
											<h3 className='font text-3 font-weight-bold mb-1'>
												Favourite Drinks:{' '}
											</h3>
											<p>{favouriteDrinks}</p>
										</p>
										<p className='mt-4'>
											<h3 className='font text-3 font-weight-bold mb-1'>
												Quiz Strengths:{' '}
											</h3>
											<p>{quizStrengths}</p>
										</p>
										<p className='mt-4'>
											<h3 className='font text-3 font-weight-bold mb-1'>
												Peronality Type:{' '}
											</h3>
											<p>{personalityType}</p>
										</p>
									</div>
								</div>
							</div>
							<div className='text-center p-4'>
								{this.isOwner() && (
									<Link to={`/profiles/${userId}/edit`}>
										<button type='button' className='m-2 font btn btn-dark'>
											Edit Profile
										</button>
									</Link>
								)}
							</div>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile

import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import ProfileForm from './ProfileForm'

class ProfileEdit extends React.Component {
	state = {
		user: {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			favouriteDrinks: '',
			personalityType: '',
			bio: '',
			age: 0,
			gender: '',
			quizStrengths: '',
			profileImage: '',
		},
		errors: {},
	}

	async componentDidMount() {
		const userId = this.props.match.params.id
		try {
			const res = await axios.get(`/api/profiles/${userId}`)
			this.setState({ user: res.data })
		} catch (error) {
			console.log(error)
		}
	}
	handleChange = (e) => {
		const user = { ...this.state.user, [e.target.name]: e.target.value }
		const errors = { ...this.state.errors, [e.target.name]: '' }
		this.setState({ user, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const userId = this.props.match.params.id
		try {
			const { user } = await axios.put(
				`/api/profiles/${userId}`,
				this.state.user,
				{
					headers: { Authorization: `Bearer ${Authorization.getToken()}` },
				}
			)
			this.props.history.push(`/profiles/${user._id}`)
		} catch (error) {
			this.setState({ errors: error.response.data.errors })
		}
	}

	render() {
		console.log('rendering')
		const { user } = this.state
		return (
			<div className='bg-image'>
				<div className='bg-fade center-x center-y'>
					<div className='body-div'>
						<section className='form text-center mt-5 mb-5'>
							{Authorization.isAuthenticated() && (
								<ProfileForm
									user={this.state.user}
									handleChange={this.handleChange}
									handleSubmit={this.handleSubmit}
									errors={this.state.errors}
								/>
							)}
						</section>
					</div>
				</div>
			</div>
		)
	}
}

export default ProfileEdit

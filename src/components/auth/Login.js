import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'

export default class Login extends React.Component {
	state = {
		data: {
			email: '',
			password: '',
		},
		error: '',
	}

	handleChange = ({ target: { name, value } }) => {
		const data = { ...this.state.data, [name]: value }
		this.setState({ data, error: '' })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post('/api/login', this.state.data)
			Authorization.setToken(res.data.token)
			this.props.history.push('/')
		} catch (error) {
			this.setState({ error: 'Invalid Credentials' })
		}
	}

	render() {
		return (
			<div className='bg-image'>
				<div className='bg-fade center-x center-y'>
					<section className='form text-center'>
						<h1 className='font text-1'>Login Here</h1>
						<form onSubmit={this.handleSubmit} className='text-center'>
							<div>
								<input
									className='p-2 m-2 font'
									placeholder='Email'
									name='email'
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<input
									className='p-2 m-2 font'
									type='password'
									placeholder='Password'
									name='password'
									onChange={this.handleChange}
								/>
							</div>

							<button className='m-2 font btn btn-dark' type='submit'>
								Login
							</button>
						</form>
					</section>
				</div>
			</div>
		)
	}
}

import React from 'react'
import axios from 'axios'

import FormErrors from './FormErrors'
import ImageUpload from '../common/ImageUpload'

export default class Register extends React.Component {
	state = {
		data: {
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
		emaiValid: false,
		formValid: false,
		passwordValid: false,
		formErrors: { email: '', password: '' },
	}

	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		const data = { ...this.state.data, [name]: value }
		this.setState({ data }, () => {
			this.validateField(name, value)
		})
	}

	validateField(fieldName, value) {
		const fieldValidationErrors = this.state.formErrors
		let emailValid = this.state.emailValid
		let passwordValid = this.state.passwordValid

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
				fieldValidationErrors.email = emailValid ? '' : ' is invalid'
				break
			case 'password':
				passwordValid = value.length >= 1
				fieldValidationErrors.password = passwordValid ? '' : ' is too short'
				break
			default:
				break
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				emailValid: emailValid,
				passwordValid: passwordValid,
			},
			this.validateForm
		)
	}

	validateForm() {
		this.setState({
			formValid: this.state.emailValid && this.state.passwordValid,
		})
	}

	errorClass(error) {
		return error.length === 0 ? '' : 'has-error'
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/api/register', this.state.data)
			this.props.history.push('/login')
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
							<h1 className='font text-1'>Register Here</h1>
							<form onSubmit={this.handleSubmit} className='text-center'>
								<div className='panel panel-default'>
									<FormErrors formErrors={this.state.formErrors} />
								</div>

								<div>
									<input
										className='p-2 m-2 font no-line width-80 rounded'
										onChange={this.handleChange}
										placeholder='Username'
										name='username'
										required
									/>
								</div>
								<div className='form-div'>
									<input
										className='p-2 m-2 font no-line width-80 rounded'
										onChange={this.handleChange}
										type='email'
										placeholder='Email'
										name='email'
										required
									/>
								</div>
								<div className='form-div'>
									<input
										className='p-2 m-2 font no-line width-80 rounded'
										onChange={this.handleChange}
										type='password'
										placeholder='Password'
										name='password'
										required
									/>
								</div>
								<div className='form-div'>
									<input
										className='p-2 m-2 font no-line width-80 rounded'
										onChange={this.handleChange}
										type='password'
										placeholder='Confirm Password'
										name='passwordConfirmation'
										required
									/>
								</div>
								<p className='font mt-3'>Additional Information (optional)</p>
								<div>
									<input
										className='p-2 m-2 font no-line width-80 rounded'
										onChange={this.handleChange}
										placeholder='Add Drinks'
										name='favouriteDrinks'
									/>
								</div>
								<div>
									<input
										className='p-2 m-2 font no-line width-80 rounded'
										onChange={this.handleChange}
										placeholder='Personality Type'
										name='personalityType'
									/>
								</div>
								<div className='form-div'>
									<textarea
										className='p-2 m-2 font no-line width-80 rounded'
										rows='5'
										cols='30'
										onChange={this.handleChange}
										placeholder='Bio'
										style={{ resize: 'none' }}
										name='bio'
									/>
								</div>
								<div className='form-div'>
									<input
										className='p-2 m-2 font no-line width-80 rounded'
										type='number'
										onChange={this.handleChange}
										placeholder='Age'
										name='age'
									/>
								</div>
								<div className='form-div'>
									<select
										className='p-2 m-2 font no-line width-80 rounded'
										onChange={this.handleChange}
										placeholder='Gender'
										name='gender'
										defaultValue='choose-gender'
									>
										<option value='choose-gender' disabled>
											Gender
										</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
										<option value='non-binary'>Non Binary</option>
									</select>
								</div>
								<div className='form-div'>
									<input
										className='p-2 m-2 font no-line width-80 rounded'
										onChange={this.handleChange}
										placeholder='Quiz Strengths'
										name='quizStrengths'
									/>
								</div>
								<div>
									<ImageUpload
										handleChange={this.handleChange}
										fieldName='image'
									/>
								</div>
								<div className='button-div'>
									<button
										className='m-2 font btn btn-dark'
										type='submit'
										disabled={!this.state.formValid}
									>
										Register
									</button>
								</div>
							</form>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

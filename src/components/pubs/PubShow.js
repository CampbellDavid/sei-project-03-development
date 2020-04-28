import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import StarRating from '../common/StarRating'

import Authorization from '../../../lib/authorization'

export default class PubShow extends React.Component {
	state = {
		pub: null,
		text: '',
		errors: {},
	}

	async componentDidMount() {
		const pubId = this.props.match.params.id
		try {
			const res = await axios.get(`/api/pubs/${pubId}`)
			this.setState({ pub: res.data })
		} catch (err) {
			console.log(err)
		}
	}

	handleDelete = async () => {
		const pubId = this.props.match.params.id
		try {
			await axios.delete(`/api/pubs/${pubId}`, {
				headers: { Authorization: `Bearer ${Authorization.getToken()}` },
			})
			this.props.history.push('/pubs')
		} catch (err) {
			this.props.history.push('/unknown')
		}
	}

	handleDeleteReview = async (e) => {
		e.preventDefault()
		const pubId = this.props.match.params.id
		const reviewId = e.target.name
		try {
			await axios.delete(`/api/pubs/${pubId}/reviews/${reviewId}`, {
				headers: { Authorization: `Bearer ${Authorization.getToken()}` },
			})
		} catch (err) {
			console.log(err)
		}
		this.componentDidMount()
	}

	handleSubmitReview = async (event) => {
		event.preventDefault()
		const pubId = this.props.match.params.id
		try {
			await axios.post(
				`/api/pubs/${pubId}/reviews`,
				{ text: this.state.text },
				{
					headers: { Authorization: `Bearer ${Authorization.getToken()}` },
				}
			)
			this.setState({ text: '' })
		} catch (err) {
			this.setState({ errors: err.response.data.errors })
		}
		this.componentDidMount()
	}

	handleChange = (e) => {
		const text = e.target.value
		this.setState({ text })
	}

	isPubOwner = () => {
		return Authorization.getPayload().sub === this.state.pub.user._id
	}

	render() {
		if (!this.state.pub) return null
		const { pub, text } = this.state
		const pubId = this.props.match.params.id

		return (
			<div className='bg-image'>
				<div className='bg-fade-high'>
					<div className='body-div'>
						<section style={{ overflowX: 'hidden' }}>
							<div className='m-3'>
								<h1 className='text-center font text-1'>{pub.name}</h1>
							</div>

							<div className='row font text-3'>
								<div className='col-md-6 p-5'>
									<img
										src={pub.image}
										alt={pub.name}
										className='img-responsive rounded mb-3 w-100'
									/>

									{Authorization.isAuthenticated() && (
										<form
											className='review-form'
											onSubmit={this.handleSubmitReview}
										>
											<div>
												<textarea
													className='w-100 p-2 rounded no-line'
													placeholder='Add a review'
													onChange={this.handleChange}
													value={text}
													rows='3'
													style={{ resize: 'none' }}
												/>
											</div>

											<div>
												<button
													className='mt-2 font btn btn-dark'
													type='submit'
												>
													Add
												</button>
											</div>
										</form>
									)}
								</div>

								<div className='col-md-6 p-5'>
									<StarRating />
									<p className='text-justify'>{pub.description}</p>

									<a
										className='mt-2 mr-1 font btn btn-dark'
										href={pub.website}
										type='button'
										target='_blank'
									>
										Visit Pub Website
									</a>

									{Authorization.isAuthenticated() ? (
										<Link to='/events/new'>
											<button
												className='mt-2 ml-1 mr-1 font btn btn-dark'
												type='button'
											>
												New Event
											</button>
										</Link>
									) : null}

									{Authorization.isAuthenticated() ? (
										<div>
											{this.isPubOwner() && (
												<div>
													<Link to={`/pubs/${pubId}/edit`}>
														<button
															className='mt-2 ml-1 font btn btn-dark'
															type='button'
														>
															Edit Pub
														</button>
													</Link>
													<button
														className='mt-2 ml-1 font btn btn-danger'
														onClick={this.handleDelete}
													>
														Delete Pub
													</button>
												</div>
											)}
										</div>
									) : null}

									<div className='m-2'>
										<h2 className='text-2'>Address</h2>
										<p className='m-0 p-0'>{pub.name}</p>
										<p className='m-0 p-0'>{pub.streetName}</p>
										<p className='m-0 p-0'>{pub.city}</p>
										<p className='m-0 p-0'>{pub.postcode}</p>
										<p className='m-0 p-0'>{pub.phone}</p>
									</div>

									<div className='m-2'>
										<h2 className='text-2'>Additional information</h2>
										<p className='p-0 m-0'>
											Maximum team size: {pub.maxTeamSize}
										</p>
										<p className='p-0 m-0'>Day of quiz: {pub.quizDay}</p>
										<p className='p-0 m-0'>Time of quiz: {pub.quizTime}</p>
										<p className='p-0 m-0'>
											Average cost of a pint: {pub.averagePintCost}
										</p>
									</div>
								</div>
								<div className='reviews'>
									<ul>
										{pub.reviews.length < 1
											? null
											: pub.reviews.map((review) => (
													<li key={review._id}>
														{review.text}

														<button
															onClick={this.handleDeleteReview}
															name={review._id}
															type='submit'
															className='mt-2 font btn btn-danger'
														>
															Delete
														</button>
													</li>
											  ))}
									</ul>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

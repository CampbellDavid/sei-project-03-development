import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'

import EventForm from './EventForm'

export default class EventNew extends React.Component {
	state = {
		data: {
			entryFee: '',
			quizDay: '',
			quizTime: '',
			pub: '',
			postcode: '',
		},
	}

	handleChange = ({ target: { name, value } }) => {
		const data = { ...this.state.data, [name]: value }
		this.setState({ data })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post('/api/events', this.state.data, {
				headers: { Authorization: `Bearer ${Authorization.getToken()}` },
			})
			this.props.history.push(`/events/${res.data._id}`)
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
							<EventForm
								data={this.state.data}
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

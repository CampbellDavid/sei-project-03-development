import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import PubForm from './PubForm'

export default class PubEdit extends React.Component {
	state = {
		data: {
			name: '',
			image: '',
			city: '',
			streetName: '',
			postcode: '',
			phone: '',
			website: '',
			description: '',
			maxTeamSize: 0,
			quizDay: '',
			quizTime: '',
			averagePintCost: '',
		},
		errors: {},
	}

	async componentDidMount() {
		const pubId = this.props.match.params.id
		try {
			const res = await axios.get(`/api/pubs/${pubId}`)
			this.setState({ data: res.data })
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = (e) => {
		const data = { ...this.state.data, [e.target.name]: e.target.value }
		const errors = { ...this.state.errors, [e.target.name]: '' }
		this.setState({ data, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const pubId = this.props.match.params.id
		try {
			const { data } = await axios.put(`/api/pubs/${pubId}`, this.state.data, {
				headers: { Authorization: `Bearer ${Authorization.getToken()}` },
			})
			this.props.history.push(`/pubs/${data._id}`)
		} catch (error) {
			this.setState({ errors: error.response.data.errors })
		}
	}

	render() {
		return (
			<div className='bg-image'>
				<div className='bg-fade center-x center-y'>
					<div className='body-div'>
						<section className='form text-center mt-5 mb-5'>
							<PubForm
								data={this.state.data}
								handleChange={this.handleChange}
								handleSubmit={this.handleSubmit}
								errors={this.state.errors}
							/>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

import React, { Component } from 'react'
import BeautyStars from 'beauty-stars'

export default class App extends Component {
	state = {
		starRatingVal: null,
		starRatingArr: [0],
	}

	render() {
		return (
			<div>
				<BeautyStars
					value={this.state.starRating}
					onChange={(starRating) => {
						this.state.starRatingArr.push(starRating)
						this.setState({ starRatingVal: starRating })
					}}
				/>

				<p className='font text-3'>
					Average rating:{' '}
					{this.state.starRatingArr.length === 0
						? null
						: Math.round(
								this.state.starRatingArr.reduce((a, b) => {
									return a + b / this.state.starRatingArr.length
								})
						  )}
				</p>
			</div>
		)
	}
}

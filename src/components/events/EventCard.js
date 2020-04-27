import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Image from '../../assets/images/wine-glass.png'

const EventCard = ({ pub, entryFee, quizDay, quizTime, _id }) => (
	<Card className='m-3' style={{ width: '18rem' }}>
		{/* <Card.Img style={{ height: '50%' }} variant='top' src={Image} /> */}
		<Card.Body className='d-flex flex-column'>
			<Card.Title>{pub}</Card.Title>

			<div className='mt-auto'>
				<Card.Subtitle className='pt-2 pb-2'>{entryFee}</Card.Subtitle>
				<Card.Subtitle className='pt-2 pb-2'>
					{quizDay} | {quizTime}
				</Card.Subtitle>
				<div className='center-item-screen'>
					<Button variant='dark' href={`/events/${_id}`}>
						View Event
					</Button>
				</div>
			</div>
		</Card.Body>
	</Card>
)
export default EventCard

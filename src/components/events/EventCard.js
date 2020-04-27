import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Image from '../../assets/images/wine-glass.png'

const EventCard = ({ pub, entryFee, quizDay, quizTime, _id }) => (
	<Card bg='secondary' style={{ width: '18rem' }}>
		<Card.Header className='font text-light'>{pub}</Card.Header>
		<Card.Body>
			<Card.Title className='font text-light'>{entryFee}</Card.Title>
			<Card.Text className='font text-light'>
				{quizDay} | {quizTime}
			</Card.Text>
		</Card.Body>
		<Card.Footer>
			{' '}
			<div className='text-center'>
				<Button
					className='font text-light'
					variant='dark'
					href={`/events/${_id}`}
				>
					View Event
				</Button>
			</div>
		</Card.Footer>
	</Card>
)
export default EventCard

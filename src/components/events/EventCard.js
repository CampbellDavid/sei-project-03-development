import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Image from '../../assets/images/wine-glass.png'

const EventCard = ({ pub, entryFee, quizDay, quizTime, _id }) => (
	<Card className='m-3' bg='dark' style={{ width: '16rem' }}>
		<Card.Header className='font text-light'>{pub}</Card.Header>
		<Card.Body>
			<Card.Title className='font text-light'>{entryFee}</Card.Title>
			<Card.Text className='font text-light'>
				{quizDay}s | {quizTime}
			</Card.Text>
		</Card.Body>
		<Card.Footer>
			{' '}
			<div className='text-center'>
				<Button
					className='font text-dark'
					variant='light'
					href={`/events/${_id}`}
				>
					View Event
				</Button>
			</div>
		</Card.Footer>
	</Card>
)
export default EventCard

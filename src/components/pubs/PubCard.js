import React from 'react'
import { Card, Button } from 'react-bootstrap'

const PubCard = ({ _id, name, image }) => (
	<>
		<Card
			className='mb-4 mr-3 ml-3'
			bg='dark'
			style={{ width: '16rem', height: '20rem' }}
		>
			<Card.Img style={{ height: '60%' }} variant='top' src={image} />
			<Card.Body className='font text-light'>{name}</Card.Body>
			<Card.Footer>
				<div className='text-center'>
					<Button
						className='font text-dark'
						variant='light'
						href={`/pubs/${_id}`}
					>
						View Pub
					</Button>
				</div>
			</Card.Footer>
		</Card>
	</>
)

export default PubCard

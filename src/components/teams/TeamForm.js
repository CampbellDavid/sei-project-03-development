import React from 'react'

const TeamForm = ({ handleChange, handleSubmit }) => {
	return (
		<div>
			<h1 className='font text-1 mb-3'>Create a new team for this event</h1>
			<form onSubmit={handleSubmit} className='text-center'>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Team Name'
						name='teamName'
						required
					/>
				</div>

				<button className='m-2 font btn btn-dark' type='submit'>
					Submit
				</button>
			</form>
		</div>
	)
}

export default TeamForm

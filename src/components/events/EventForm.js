import React from 'react'

const EventForm = ({ data, handleChange, handleSubmit }) => {
	return (
		<div>
			<h1 className='font text-1 mb-3'>Create/edit a quiz event at this pub</h1>
			<form onSubmit={handleSubmit} className='text-center'>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Pub'
						name='pub'
						value={data.pub}
						required
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='£'
						name='entryFee'
						value={data.entryFee}
						required
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						type='date'
						placeholder='DD/MM/YY'
						name='quizDay'
						value={data.quizDay}
						required
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						type='time'
						onChange={handleChange}
						placeholder='Time'
						name='quizTime'
						value={data.quizTime}
						required
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Postcode'
						name='postcode'
						value={data.postcode}
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

export default EventForm

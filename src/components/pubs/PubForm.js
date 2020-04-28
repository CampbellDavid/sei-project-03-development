import React from 'react'

import ImageUpload from '../common/ImageUpload'

const PubForm = ({ data, handleChange, handleSubmit }) => {
	return (
		<div>
			<h1 className='font text-1 mb-3'>Create a new pub/edit pub details</h1>
			<form onSubmit={handleSubmit} className='text-center'>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Pub name'
						name='name'
						value={data.name}
						required
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Street address'
						name='streetName'
						value={data.streetName}
						required
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='City'
						name='city'
						value={data.city}
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
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Phone number'
						name='phone'
						value={data.phone}
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Website'
						name='website'
						value={data.website}
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Pub description'
						name='description'
						value={data.description}
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						type='number'
						onChange={handleChange}
						placeholder='Maximum team size'
						name='maxTeamSize'
						value={data.maxTeamSize}
						required
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Quiz day'
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
						placeholder='Quiz time'
						name='quizTime'
						value={data.quizTime}
						required
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Average pint cost'
						name='averagePintCost'
						value={data.averagePintCost}
						required
					/>
				</div>
				<div>
					<ImageUpload handleChange={handleChange} fieldName='image' required />
				</div>

				<button className='m-2 font btn btn-dark' type='submit'>
					Submit
				</button>
			</form>
		</div>
	)
}

export default PubForm

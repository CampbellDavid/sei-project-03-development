import React from 'react'

import ImageUpload from '../common/ImageUpload'

const ProfileForm = ({ user, handleChange, handleSubmit }) => {
	return (
		<div>
			<h1 className='font text-1 mb-3'>Edit your profile</h1>
			<form onSubmit={handleSubmit} className='text-center'>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Email'
						name='email'
						value={user.email}
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Favourite drinks'
						name='favouriteDrinks'
						value={user.favouriteDrinks}
					/>
				</div>
				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Personality type'
						name='personalityType'
						value={user.personalityType}
					/>
				</div>

				<div>
					<textarea
						className='p-2 m-2 font no-line width-80 rounded'
						rows='5'
						cols='30'
						onChange={handleChange}
						placeholder='Bio'
						style={{ resize: 'none' }}
						name='bio'
					/>
				</div>

				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						type='number'
						onChange={handleChange}
						placeholder='Age'
						name='age'
						value={user.age}
					/>
				</div>

				<div>
					<select
						className='p-2 m-2 font no-line width-80 rounded'
						style={{ height: '40px' }}
						onChange={handleChange}
						placeholder='Gender'
						name='gender'
						value={user.gender}
					>
						<option value='choose-gender' disabled>
							Gender
						</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
						<option value='non-binary'>Non-binary</option>
					</select>
				</div>

				<div>
					<input
						className='p-2 m-2 font no-line width-80 rounded'
						onChange={handleChange}
						placeholder='Quiz strengths'
						name='quizStrengths'
						value={user.quizStrengths}
					/>
				</div>
				<div>
					<ImageUpload handleChange={handleChange} fieldName='image' />
				</div>

				<button className='m-2 font btn btn-dark' type='submit'>
					Submit
				</button>
			</form>
		</div>
	)
}

export default ProfileForm

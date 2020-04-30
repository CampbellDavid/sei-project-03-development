import React from 'react'

const FormErrors = ({ formErrors }) => (
	<div className='font text-3 text-danger'>
		{Object.keys(formErrors).map((fieldName, i) => {
			if (formErrors[fieldName].length > 0) {
				return (
					<p key={i}>
						{fieldName} {formErrors[fieldName]}
					</p>
				)
			} else {
				return ''
			}
		})}
	</div>
)

export default FormErrors

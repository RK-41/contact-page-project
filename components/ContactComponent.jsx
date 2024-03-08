// Directive to make React treat this component and its dependencies as client-side only
'use client';

import { useState } from 'react';
import Image from 'next/image'; // Import for optimized image handling in Next.js
import FormComponent from './FormComponent'; // Import the form component

const ContactComponent = () => {
	// State variables for loading and submitted states
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	return (
		<div className='parent-container'>
			<div className='container'>
				<div className='heading'>Contact Us</div>

				{/* Conditionally render content based on loading state */}
				{!loading ? (
					<FormComponent
						// Pass loading and submitted states to FormComponent for coordination
						loading={loading}
						setLoading={setLoading}
						submitted={submitted}
						setSubmitted={setSubmitted}
					/>
				) : (
					<div className='loading-container'>
						<div className='loading-message'>Submitting your form...</div>
						<div className='spinner-container'>
							{/* Render a spinner image while loading */}
							<Image
								src='/asset/spinner.svg'
								alt='spinner'
								width={100}
								height={100}
								className='spinner'
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

// Export the component for use in other parts of the application
export default ContactComponent;

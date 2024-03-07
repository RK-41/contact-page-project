'use client';

import { useState } from 'react';
import Image from 'next/image';
import FormComponent from './FormComponent';

const Contact = () => {
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	return (
		<div className='parent-container'>
			<div className='container'>
				<div className='heading'>Contact Us</div>

				{!loading ? (
					<FormComponent
						loading={loading}
						setLoading={setLoading}
						submitted={submitted}
						setSubmitted={setSubmitted}
					/>
				) : (
					<div className='loading-container'>
						<div className='loading-message'>Submitting your form...</div>

						<div className='animate-spin'>
							<Image
								src='/asset/spinner.svg'
								alt='spinner'
								width={100}
								height={100}
								className='animate-spin text-center text-5xl m-auto invert'
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Contact;

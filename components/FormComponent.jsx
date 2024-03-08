// Import necessary libraries and components for form handling and validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import validator from 'validator'; // For phone number validation

// Import custom UI components for buttons, forms, and inputs
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Define the validation schema using Zod for form fields
const FormSchema = z.object({
	Name: z.string().min(2, 'Name must contain at least 2 characters'), // Set custom error message
	Email: z.string().email('Email must be of the format example@email.domain'), // Set custom error message
	Phone: z
		.string()
		.refine(validator.isMobilePhone, 'Enter a valid phone number'), // Use validator.isMobilePhone for phone number validation
	Message: z.string(),
});

// Get the web app URL from environment variables
const webAppURL = process.env.NEXT_PUBLIC_WEB_APP_URL;

const FormComponent = ({ loading, setLoading, submitted, setSubmitted }) => {
	// Use the `useForm` hook from react-hook-form to manage form state and validation
	const {
		register,
		handleSubmit,
		formState: { errors },
		...form
	} = useForm({
		resolver: zodResolver(FormSchema), // Set the Zod schema for validation
		defaultValues: {
			Name: '',
			Email: '',
			Phone: '',
			Message: '',
		},
	});

	// Async function to handle form submission
	async function onSubmit(data) {
		setLoading(true); // Set loading state to true while submitting

		// Create a form element to manually submit data
		const formElement = document.createElement('form');

		// Loop through each field in the schema and create input elements
		for (const [key, value] of Object.entries(FormSchema.shape)) {
			const input = document.createElement('input');
			input.name = key;
			input.value = data[register(key).name]; // Get the value from form data using register
			formElement.appendChild(input);
		}

		// Send a POST request with form data using FormData and handle response
		await fetch(webAppURL, {
			method: 'POST',
			body: new FormData(formElement), // Create form data from the created form element
			mode: 'no-cors', // Handle CORS if necessary
		})
			.then((response) => {
				setLoading(false); // Set loading state to false after successful submission
				setSubmitted(true); // Set submitted state to true to display success message
			})
			.catch((error) => {
				alert('Error occured');
				console.log('Error:', error);
			});
	}

	// Render the form component
	return (
		<Form {...form} className='form'>
			{/* Conditionally render form if not submitted */}
			{!submitted ? (
				<form
					onSubmit={handleSubmit(onSubmit)} // Handle form submission using handleSubmit
					className='form'
					name='contact-form'
				>
					{/* Render form field using FormField component */}
					<FormField
						control={form.control} // Pass form control to FormField
						name='Name'
						render={({ field }) => (
							<FormItem className='form-item'>
								<FormLabel className='form-label'>
									Name <span className='span'>*</span>
								</FormLabel>

								<FormControl className='form-control'>
									<Input placeholder='Enter your full name' {...field} />
								</FormControl>

								{/* Display validation error message if any */}
								<FormMessage
									msg={'Name must contain at least 2 characters'}
									className='form-message'
								/>
							</FormItem>
						)}
					/>

					{/* Render form field using FormField component */}
					<FormField
						control={form.control} // Pass form control to FormField
						name='Email'
						render={({ field }) => (
							<FormItem className='form-item'>
								<FormLabel className='form-label'>
									Email <span className='span'>*</span>
								</FormLabel>

								<FormControl className='form-control'>
									<Input placeholder='example@email.domain' {...field} />
								</FormControl>

								{/* Display validation error message if any */}
								<FormMessage
									msg={'Email must be of the fomat example@email.domain'}
									className='form-message'
								/>
							</FormItem>
						)}
					/>

					{/* Render form field using FormField component */}
					<FormField
						control={form.control} // Pass form control to FormField
						name='Phone'
						render={({ field }) => (
							<FormItem className='form-item'>
								<FormLabel className='form-label'>
									Phone <span className='span'>*</span>
								</FormLabel>

								<FormControl className='form-control'>
									<Input placeholder='Enter your phone number' {...field} />
								</FormControl>

								{/* Display validation error message if any */}
								<FormMessage
									msg={'Enter a valid phone number'}
									className='form-message'
								/>
							</FormItem>
						)}
					/>

					{/* Render form field using FormField component */}
					<FormField
						control={form.control} // Pass form control to FormField
						name='Message'
						render={({ field }) => (
							<FormItem className='form-item'>
								<FormLabel className='form-label'>Message</FormLabel>

								<FormControl className='form-control'>
									<Textarea
										placeholder='Your message for us...'
										className='textarea'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className='button-container'>
						<Button type='submit' className='button' disabled={loading}>
							Submit
						</Button>
					</div>
				</form>
			) : (
				// Display submission confirmation message
				<>
					<div className='submission-container'>
						<div className='submission-message'>
							We&apos;ve received your details, and
							<br />
							we&apos;ll get back to you shortly.
						</div>

						{/* A button for submittin another form */}
						<div className='button-container'>
							<Button className='button' disabled={loading}>
								<a href='/'>Submit Another Form</a>
							</Button>
						</div>
					</div>
				</>
			)}
		</Form>
	);
};

export default FormComponent;

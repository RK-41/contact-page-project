import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import validator from 'validator';

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

const FormSchema = z.object({
	Name: z
		.string({
			required_error: 'Name is required',
			invalid_type_error: 'Name must be a string',
		})
		.min(2),
	Email: z
		.string({
			required_error: 'Email is required',
			invalid_type_error: 'Email must be of format example@mail.domain',
		})
		.email(),
	Phone: z.string().refine(validator.isMobilePhone),
	Message: z.string(),
});

const webAppURL = process.env.NEXT_PUBLIC_WEB_APP_URL;

const FormComponent = ({ loading, setLoading, submitted, setSubmitted }) => {
	const { register, ...form } = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			Name: '',
			Email: '',
			Phone: '',
			Message: '',
		},
	});

	async function onSubmit(data) {
		setLoading(true);

		const formElement = document.createElement('form');

		for (const [key, value] of Object.entries(FormSchema.shape)) {
			const input = document.createElement('input');
			input.name = key;
			input.value = data[register(key).name];
			formElement.appendChild(input);
		}

		await fetch(webAppURL, {
			method: 'POST',
			body: new FormData(formElement),
			mode: 'no-cors',
		})
			.then((response) => {
				setLoading(false);
				setSubmitted(true);
			})
			.catch((error) => {
				alert('Error occured');
				console.log('Error:', error);
			});
	}

	return (
		<Form {...form} className='form'>
			{!submitted ? (
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='form'
					name='contact-form'
				>
					<FormField
						control={form.control}
						name='Name'
						render={({ field }) => (
							<FormItem className='form-item'>
								<FormLabel className='form-label'>
									Name <span className='span'>*</span>
								</FormLabel>

								<FormControl className='form-control'>
									<Input placeholder='Enter your full name' {...field} />
								</FormControl>

								<FormMessage
									msg={'Name must contain atleast 2 characters'}
									className='form-message'
								/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='Email'
						render={({ field }) => (
							<FormItem className='form-item'>
								<FormLabel className='form-label'>
									Email <span className='span'>*</span>
								</FormLabel>

								<FormControl className='form-control'>
									<Input placeholder='example@email.domain' {...field} />
								</FormControl>

								<FormMessage
									msg={'Email must be of the fomat example@email.domain'}
									className='form-message'
								/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='Phone'
						render={({ field }) => (
							<FormItem className='form-item'>
								<FormLabel className='form-label'>
									Phone <span className='span'>*</span>
								</FormLabel>

								<FormControl className='form-control'>
									<Input placeholder='Enter your phone number' {...field} />
								</FormControl>

								<FormMessage
									msg={'Enter a valid phone number'}
									className='form-message'
								/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
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
				<>
					<div className='submission-container'>
						<div className='submission-message'>
							We&apos;ve received your details, and
							<br />
							we&apos;ll get back to you shortly.
						</div>
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

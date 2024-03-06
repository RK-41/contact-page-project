'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import validator from 'validator';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
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

export default function Contact() {
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const { register } = useForm({ resolver: zodResolver(FormSchema) });

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			Name: '',
			Email: '',
			Phone: '',
			Message: '',
		},
	});

	const webAppURL = process.env.NEXT_PUBLIC_WEB_APP_URL;

	async function onSubmit(data) {
		setLoading(true);

		const formElement = document.createElement('form');

		for (const [key, value] of Object.entries(FormSchema.shape)) {
			// Extract value from form data using register name
			const input = document.createElement('input');
			input.name = key;
			input.value = data[register(key).name];
			formElement.appendChild(input);
			console.log(
				`Key: ${key}, Value: ${input.value}, Type: ${value._def.typeName}`
			);
		}

		console.log('form: ', form);
		console.log('formElement: ', formElement);

		await fetch(webAppURL, {
			method: 'POST',
			body: new FormData(formElement),
			mode: 'no-cors',
		})
			.then((response) => {
				setSubmitted(true);
				setLoading(false);
				console.log(response);
			})
			.then(() => {
				// window.location.reload();
			})
			.catch((error) => {
				console.log('Error:', error.message);
			});
	}

	return (
		<div className='w-full min-h-screen md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden '>
			<div className='flex-col items-start justify-center px-6'>
				<div className='max-h-[128px] text-3xl min-[360px]:text-5xl sm:text-7xl px-6 py-5 text-center bg-clip-text text-transparent bg-gradient-to-b from-purple-700 to bg-neutral-50 bg-opacity-50'>
					Contact Us
				</div>

				{loading ? (
					<div className='text-3xl md:text-5xl flex items-center justify-center flex-col px-8 w-120 py-20'>
						<div className='text-white font-light text-center justify-center mx-auto py-10 animate-pulse'>
							Submitting your form...
						</div>
						<div className='animate-spin text-white'>❄️</div>
					</div>
				) : (
					<>
						<Form {...form}>
							{!submitted ? (
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='space-y-4 h-full border rounded-xl p-3 min-[400px]:p-5 mb-5 sm:w-4/5 sm:min-w-[590px] mx-auto'
									name='contact-form'
								>
									<FormField
										control={form.control}
										name='Name'
										render={({ field }) => (
											<FormItem className='items-center justify-center w-full'>
												<FormLabel className='text-sm bg-clip-text text-neutral-200 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'>
													Name <span className='text-red-600'>*</span>
												</FormLabel>

												<FormControl>
													<Input
														placeholder='Enter your full name'
														{...field}
													/>
												</FormControl>

												<FormMessage className='bg-white border-red-600 border-2 rounded-[4px] w-[100px] p-1 z-10 shadow-red-600 shadow-md text-black relative -top-3 left-3' />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='Email'
										render={({ field }) => (
											<FormItem className='items-center justify-center w-full'>
												<FormLabel className='text-sm bg-clip-text text-neutral-200 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'>
													Email <span className='text-red-600'>*</span>
												</FormLabel>

												<FormControl>
													<Input
														placeholder='example@email.domain'
														{...field}
													/>
												</FormControl>

												<FormMessage className='bg-white border-red-600 border-2 rounded-[4px] w-[100px] p-1 z-10 shadow-red-600 shadow-md text-black relative -top-3 left-3' />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='Phone'
										render={({ field }) => (
											<FormItem className='items-center justify-center w-full'>
												<FormLabel className='text-sm bg-clip-text text-neutral-200 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'>
													Phone <span className='text-red-600'>*</span>
												</FormLabel>

												<FormControl>
													<Input
														placeholder='Enter your phone number'
														{...field}
													/>
												</FormControl>

												<FormMessage className='bg-white border-red-600 border-2 rounded-[4px] w-[100px] p-1 z-10 shadow-red-600 shadow-md text-black relative -top-3 left-3' />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='Message'
										render={({ field }) => (
											<FormItem className='items-center justify-center w-full'>
												<FormLabel className='text-sm bg-clip-text text-neutral-200 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'>
													Message
												</FormLabel>

												<FormControl>
													<Textarea
														placeholder='Your message for us...'
														style={{ height: '100px' }}
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<div className='flex items-center gap-4 animate-bounce'>
										<Button
											type='submit'
											className='text-sm font-light bg-gradient-to-b from-purple-700 to bg-neutral-50 bg-opacity-5'
											disabled={loading}
											onClick={() => form.handleSubmit(onSubmit)}
										>
											Submit
										</Button>
									</div>

									{loading && <p className='bg-white'>submitting...</p>}
								</form>
							) : (
								<>
									<div className='text-xl min-[360px]:text-3xl md:text-5xl flex items-center justify-center flex-col px-8 bg-inherit border-white w-120 py-10 md:py-20'>
										<div className='text-white font-light text-center justify-center mx-auto py-10 animate-pulse'>
											We&apos;ve received your details, and
											<br />
											We will.. we will.. rock you...
										</div>

										<div className='flex items-center gap-4 animate-bounce my-10'>
											<Button
												className='text-sm font-light mx-auto bg-gradient-to-b from-purple-700 to bg-neutral-50 bg-opacity-5'
												disabled={loading}
											>
												<a href='/'>Submit Another Form</a>
											</Button>
										</div>
									</div>
								</>
							)}
						</Form>
					</>
				)}
			</div>
		</div>
	);
}

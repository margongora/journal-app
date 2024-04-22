'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';

const JournalSchema = z.object({
	title: z.string().min(2, {
		message: 'Please leave a title with more than 1 character.'
	}).max(20, {
		message: 'Titles shouldn\'t be this long.'
	}),
	content: z.string().min(1, {
		message: 'No blank journals!'
	})
});

const JournalForm = () => {
	// Hooks
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof JournalSchema>>({
		resolver: zodResolver(JournalSchema),
		defaultValues: {
			title: '',
			content: ''
		}
	});

	const onSubmit = async (values: z.infer<typeof JournalSchema>) => {

		// Send form values using JSON
		await fetch('/api/journals/', {
			body: JSON.stringify(values),
			method: 'POST'
		});

		// Add a toast notification
		toast({
			title: 'Submitted journal!',
			description: 'Journal submitted to database.',
			className: 'm-2 p-2 shadow-lg bg-green-50 border border-black'
		});

		// Refresh data on page
		router.refresh();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 mx-2 px-2'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Title' {...field} />
							</FormControl>
							<FormDescription>
								This is the title of your journal. It can be anything.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator />
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea placeholder='Write here c:' {...field} />
							</FormControl>
							<FormDescription>
								This is the content of your journal. Write about whatever you want!
							</FormDescription>
							<FormMessage />
						</FormItem>

					)}
				/>
				<Button className='my-4' type='submit'>Submit Journal</Button>
			</form>
		</Form>
	)
}

export default JournalForm;
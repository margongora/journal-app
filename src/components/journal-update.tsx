'use client'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useToast } from './ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Journal } from '../db/schema/journal';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const UpdateSchema = z.object({
	id: z.number(),
	title: z.string().min(2, {
		message: 'Please leave a title with more than 1 character.'
	}).max(30, {
		message: 'Titles shouldn\'t be this long.'
	}),
	content: z.string().min(1, {
		message: 'No blank journals!'
	})
})

interface JournalUpdateProps {
	journal: Journal
}

const JournalUpdate = ({ journal }: JournalUpdateProps) => {

	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof UpdateSchema>>({
		resolver: zodResolver(UpdateSchema),
		defaultValues: {
			id: journal.id,
			title: journal.title as string | undefined,
			content: journal.content as string | undefined
		}
	});

	const onSubmit = async (values: z.infer<typeof UpdateSchema>) => {
		values.id = journal.id;
		await fetch('/api/journals/', {
			body: JSON.stringify(values),
			method: 'PUT'
		});

		toast({
			title: 'Updated journal!',
			description: 'Journal updated in database.',
			className: 'm-2 p-2 shadow-lg border border-black bg-green-50'
		})

		router.refresh();
	}
	return (
		<Dialog>
			<DialogTrigger>Edit</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{`Editing "${journal.title}"`}</DialogTitle>
					<DialogDescription>Edit your journal entry here c:</DialogDescription>
				</DialogHeader>
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
			</DialogContent>
		</Dialog>
	)
}

export default JournalUpdate;
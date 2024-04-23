'use client'
import { useRouter } from "next/navigation";
import { Journal } from "../db/schema/journal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface JournalDeleteProps {
	journal: Journal
}

const JournalDelete = ({ journal }: JournalDeleteProps) => {

	const { toast } = useToast();
	const router = useRouter();

	const onClick = async () => {
		await fetch('/api/journals/', {
			body: JSON.stringify(journal),
			method: 'DELETE'
		})

		toast({
			title: 'Deleted journal!',
			description: 'Journal deleted from database.',
			className: 'm-2 p-2 shadow-lg border border-black bg-green-50'
		});

		router.refresh();
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>Delete</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{`Are you sure you want to delete "${journal.title}"?`}</AlertDialogTitle>
					<AlertDialogDescription>You are about to delete a journal entry.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							variant='destructive'
							onClick={onClick}
						>Delete</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default JournalDelete;
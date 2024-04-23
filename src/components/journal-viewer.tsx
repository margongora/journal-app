import { Journal } from "../db/schema/journal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface JournalViewerProps {
	journal: Journal
}

const JournalViewer = ({ journal }: JournalViewerProps) => {
	return (
		<Dialog>
			<DialogTrigger>View</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{`Viewing "${journal.title}"`}</DialogTitle>
					<DialogDescription>View what you wrote c:</DialogDescription>
				</DialogHeader>
				<div className='p-2 m-2'>
					{journal.content}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default JournalViewer;
import { Journal } from "../db/schema/journal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import JournalUpdate from "./journal-update";
import JournalViewer from "./journal-viewer";
import { Separator } from "./ui/separator";
import JournalDelete from "./journal-delete";

interface JournalTableProps {
	journals: Journal[]
}

const JournalTable = ({ journals }: JournalTableProps) => {
	return (
		<Table className="px-2 mx-2">
			<TableHeader className="sticky">
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Time Created</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{(journals.length !== 0) ? journals.map((journal) => {
					console.log(journal);
					return (
						<TableRow key={journal.id}>
							<TableCell>{journal.title}</TableCell>
							<TableCell>{journal.date_created}</TableCell>
							<TableCell className="flex flex-row gap-2">
								<JournalViewer journal={journal} />
								<JournalUpdate journal={journal} />
								<JournalDelete journal={journal} />
							</TableCell>
						</TableRow>
					)
				}) : (
					<p>No journals available right now.</p>
				)}
			</TableBody>
		</Table>
	)
}

export default JournalTable;
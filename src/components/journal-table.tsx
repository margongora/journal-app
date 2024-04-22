import { Journal } from "../db/schema/journal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import JournalUpdate from "./journal-update";

interface JournalTableProps {
	journals: Journal[]
}

const JournalTable = ({ journals }: JournalTableProps) => {
	return (
		<Table className="m-2 p-2">
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Time Created</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="m-2 p-2">
				{(journals.length !== 0) ? journals.map((journal) => {
					console.log(journal);
					return (
						<TableRow key={journal.id}>
							<TableCell>{journal.title}</TableCell>
							<TableCell>{journal.date_created}</TableCell>
							<TableCell>
								<JournalUpdate journal={journal} />
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
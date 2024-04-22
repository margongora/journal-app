import JournalForm from "../components/journal-form";
import { ScrollArea } from "../components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Journal } from "../db/schema/journal";
import { Card } from "../ui/card";

const getJournals = async () => {
  const res = await fetch(`${process.env.URL}/api/journals`);
  return res.json().then((data) => data.data as Journal[]);
}

export default async function Home() {

  const journalData = getJournals();
  const [journals] = await Promise.all([journalData]);

  return (
    <div className="flex flex-col gap-4 h-full m-4 p-4 border border-black rounded shadow-lg hover:shadow-2xl transition">
      <Card>
        <ScrollArea>
          <Table className="m-2 p-2">
            <TableHeader>
              <TableRow>
                <TableHead>
                  Title
                </TableHead>
                <TableHead>
                  Time Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journals.map((journal) => {
                return (
                  <TableRow key={journal.id}>
                    <TableCell>{journal.title}</TableCell>
                    <TableCell>{journal.date_created}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
      <Card>
        <JournalForm />
      </Card>
    </div>
  );
}

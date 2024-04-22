import JournalForm from "../components/journal-form";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Journal } from "../db/schema/journal";
import { Card, CardHeader, CardTitle } from "../ui/card";

const getJournals = async () => {
  const res = await fetch(`${process.env.URL}/api/journals`, { cache: 'no-store' });
  return res.json().then((data) => data.data as Journal[]);
}

export default async function Home() {

  const journalData = getJournals();
  const [journals] = await Promise.all([journalData]);

  return (
    <div className="flex flex-col gap-4 h-full m-4 p-4 border border-black rounded shadow-lg hover:shadow-2xl transition">
      <Card>
        <CardHeader>
          <CardTitle>
            View your past journals here!
          </CardTitle>
        </CardHeader>
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
            <TableBody className="m-2 p-2">
              {(journals.length !== 0) ? journals.map((journal) => {
                console.log(journal);
                return (
                  <TableRow key={journal.id}>
                    <TableCell>{journal.title}</TableCell>
                    <TableCell>{journal.date_created}</TableCell>
                  </TableRow>
                )
              }) : (
                <p>No journals available right now.</p>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Write journals here!</CardTitle>
        </CardHeader>
        <JournalForm />
      </Card>
    </div>
  );
}

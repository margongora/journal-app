import JournalForm from "../components/journal-form";
import { ScrollArea } from "../components/ui/scroll-area";
import { Journal } from "../db/schema/journal";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import JournalTable from "../components/journal-table";

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
          <JournalTable journals={journals} />
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

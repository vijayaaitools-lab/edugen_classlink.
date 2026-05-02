import StudentSidebar from "@/components/layout/student-sidebar";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Library } from "lucide-react";
import { BOARD_LABELS } from "@/lib/topics-data";

interface BookResource {
  title: string;
  subject: string;
  grades: string;
  url: string;
  type: string;
}

const BOARD_BOOKS: Record<string, BookResource[]> = {
  CBSE: [
    { title: "NCERT Class 1-12 Textbooks", subject: "All Subjects", grades: "1-12", url: "https://ncert.nic.in/textbook/textbook.htm", type: "Textbook" },
    { title: "NCERT Solutions & Exemplar", subject: "Math & Science", grades: "6-12", url: "https://ncert.nic.in", type: "Solutions" },
    { title: "DIKSHA Digital Books", subject: "All Subjects", grades: "1-12", url: "https://diksha.gov.in", type: "Digital" },
    { title: "CBSE Sample Papers", subject: "All Subjects", grades: "9-12", url: "https://cbseacademic.nic.in", type: "Practice" },
  ],
  IGCSE: [
    { title: "Cambridge IGCSE Resources", subject: "All Subjects", grades: "9-10", url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/", type: "Official" },
    { title: "IGCSE Past Papers", subject: "All Subjects", grades: "9-10", url: "https://www.savemyexams.com/igcse/", type: "Practice" },
    { title: "IGCSE Study Resources", subject: "All Subjects", grades: "9-10", url: "https://www.cie.org.uk/", type: "Resource" },
  ],
  IB: [
    { title: "IB Official Resources", subject: "All Subjects", grades: "11-12", url: "https://www.ibo.org/", type: "Official" },
    { title: "IB Study Material", subject: "All Subjects", grades: "11-12", url: "https://www.ibresources.org/", type: "Study Guide" },
  ],
  ICSE: [
    { title: "CISCE Official Resources", subject: "All Subjects", grades: "1-12", url: "https://www.cisce.org/", type: "Official" },
    { title: "Selina Concise Solutions", subject: "Math & Science", grades: "1-10", url: "https://www.selinapublishers.com/", type: "Solutions" },
    { title: "ML Aggarwal Solutions", subject: "Math", grades: "6-10", url: "https://www.aplustopper.com/ml-aggarwal-solutions/", type: "Solutions" },
  ],
  STATE: [
    { title: "e-Balbharati (Maharashtra)", subject: "All Subjects", grades: "1-12", url: "https://ebalbharati.in/", type: "Textbook" },
    { title: "Samacheer Kalvi (Tamil Nadu)", subject: "All Subjects", grades: "1-12", url: "https://www.tntextbooks.in/", type: "Textbook" },
    { title: "AP SCERT Books", subject: "All Subjects", grades: "1-12", url: "https://scert.ap.gov.in/", type: "Textbook" },
    { title: "Karnataka Textbook Society", subject: "All Subjects", grades: "1-12", url: "https://ktbs.kar.nic.in/", type: "Textbook" },
  ],
};

const FREE_BOOKS = [
  { title: "Project Gutenberg", desc: "60,000+ free classic books and literature", url: "https://www.gutenberg.org/", category: "Fiction & Literature" },
  { title: "Open Library", desc: "Free access to millions of books — borrow digitally", url: "https://openlibrary.org/", category: "Library" },
  { title: "Internet Archive", desc: "Universal access to books, movies, music and more", url: "https://archive.org/details/texts", category: "Digital Archive" },
  { title: "Khan Academy", desc: "Free courses, books and exercises for all subjects", url: "https://www.khanacademy.org/", category: "Education" },
  { title: "National Digital Library India", desc: "Millions of learning resources across all levels", url: "https://ndl.iitkgp.ac.in/", category: "Digital Library" },
  { title: "Pratham Books (Storyweaver)", desc: "Free children's books in many Indian languages", url: "https://storyweaver.org.in/", category: "Children's Books" },
];

export default function StudentBooks() {
  const { user } = useAuth();
  const board = user?.board || "CBSE";
  const boardBooks = BOARD_BOOKS[board] || BOARD_BOOKS.CBSE;

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Books Library</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Textbooks, resources and free books for your learning</p>
        </div>

        {/* Board-specific books */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Library className="w-5 h-5 text-primary" />
            {BOARD_LABELS[board] || board} Resources
            <Badge variant="secondary">Your Board</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {boardBooks.map(b => (
              <Card key={b.title} className="hover:shadow-md transition-shadow" data-testid={`card-book-${b.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-xl">
                      📘
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold">{b.title}</h3>
                        <Badge variant="outline" className="text-xs">{b.type}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">{b.subject} · Grades {b.grades}</div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 gap-2 text-xs w-full"
                        onClick={() => window.open(b.url, "_blank")}
                        data-testid={`button-open-${b.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <ExternalLink className="w-3 h-3" /> Open Resource
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Free Books */}
        <section>
          <h2 className="text-lg font-semibold mb-4">📚 Free Books & Libraries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FREE_BOOKS.map(b => (
              <Card key={b.title} className="hover:shadow-md transition-shadow" data-testid={`card-free-book-${b.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs mb-2">{b.category}</Badge>
                    <h3 className="text-sm font-semibold">{b.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2 text-xs mt-2"
                    onClick={() => window.open(b.url, "_blank")}
                    data-testid={`button-open-free-${b.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <ExternalLink className="w-3 h-3" /> Open Library
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

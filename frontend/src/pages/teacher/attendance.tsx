import { useState, useEffect } from "react";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Trash2, Plus } from "lucide-react";

type Status = "present" | "absent" | "late";

export default function TeacherAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<number, Status>>(
    {},
  );

  // ✅ CLASSES STORAGE
  const [classes, setClasses] = useState<any[]>(() => {
    const saved = localStorage.getItem("classes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  // ✅ ADD CLASS
  const [newClass, setNewClass] = useState("");
  const [newDivision, setNewDivision] = useState("");

  const addClass = () => {
    if (!newClass || !newDivision) return;

    const newEntry = {
      id: Date.now(),
      name: `${newClass}${newDivision}`, // e.g. 1E
    };

    setClasses([...classes, newEntry]);
    setNewClass("");
    setNewDivision("");
  };

  const deleteClass = (id: number) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  // ✅ STUDENTS STORAGE
  const [students, setStudents] = useState<any[]>(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const [newStudent, setNewStudent] = useState("");

  const addStudent = () => {
    if (!newStudent || !selectedClassId) return;

    setStudents([
      ...students,
      {
        id: Date.now(),
        name: newStudent,
        classId: selectedClassId,
      },
    ]);

    setNewStudent("");
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // ✅ FILTER STUDENTS
  const myStudents = students.filter((s) => s.classId === selectedClassId);

  const handleStatusChange = (id: number, status: Status) => {
    setAttendanceMap((m) => ({ ...m, [id]: status }));
  };

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Attendance</h1>

        {/* ADD CLASS */}
        <div className="mb-6 border p-4 rounded">
          <h2 className="font-semibold mb-2">Add Class</h2>

          <div className="flex gap-2">
            <Input
              placeholder="Class (e.g. 1, 5, 10)"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
            />
            <Input
              placeholder="Division (e.g. A, B, C)"
              value={newDivision}
              onChange={(e) => setNewDivision(e.target.value)}
            />
            <Button onClick={addClass}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* SELECT CLASS */}
        <div className="mb-6">
          <Label>Select Class</Label>
          <select
            value={selectedClassId || ""}
            onChange={(e) => setSelectedClassId(Number(e.target.value))}
            className="border p-2 rounded ml-2"
          >
            <option value="">Select</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* SHOW CLASSES */}
        <div className="mb-6">
          <h3 className="font-semibold">Your Classes</h3>
          {classes.map((c) => (
            <div key={c.id} className="flex justify-between border p-2 mt-2">
              <span>{c.name}</span>
              <button onClick={() => deleteClass(c.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* ADD STUDENT */}
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Enter student name"
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
          />
          <Button onClick={addStudent}>Add</Button>
        </div>

        {/* STUDENTS */}
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            {!myStudents.length ? (
              <p>No students</p>
            ) : (
              myStudents.map((s) => (
                <div key={s.id} className="flex justify-between border p-2">
                  <span>{s.name}</span>

                  <div className="flex gap-2 items-center">
                    {(["present", "absent", "late"] as Status[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(s.id, st)}
                        className="border px-2"
                      >
                        {st}
                      </button>
                    ))}

                    <button onClick={() => deleteStudent(s.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Button className="mt-4">
          <Save className="w-4 h-4 mr-2" /> Save Attendance
        </Button>
      </main>
    </div>
  );
}

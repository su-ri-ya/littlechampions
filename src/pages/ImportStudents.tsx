import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileSpreadsheet, CheckCircle, XCircle } from "lucide-react";
import { useSchool } from "@/contexts/SchoolContext";
import { Student } from "@/types";
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ImportRow {
  name: string;
  email: string;
  phone: string;
  grade: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  status?: string;
}

export default function ImportStudents() {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<ImportRow[]>([]);
  const [importing, setImporting] = useState(false);
  const { addStudent } = useSchool();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcelFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls"))) {
      setFile(droppedFile);
      readExcelFile(droppedFile);
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const readExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<ImportRow>(worksheet);
        setPreviewData(jsonData);
        toast({
          title: "File loaded",
          description: `${jsonData.length} students found in the file`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to read the Excel file",
          variant: "destructive",
        });
      }
    };
    reader.readAsBinaryString(file);
  };

  const validateRow = (row: ImportRow): boolean => {
    return !!(
      row.name &&
      row.email &&
      row.phone &&
      row.grade &&
      row.dateOfBirth &&
      row.address &&
      row.parentName &&
      row.parentPhone
    );
  };

  const handleImport = async () => {
    setImporting(true);
    let successCount = 0;
    let errorCount = 0;

    for (const row of previewData) {
      if (validateRow(row)) {
        const student: Omit<Student, "id"> = {
          name: row.name,
          email: row.email,
          phone: row.phone,
          grade: row.grade,
          dateOfBirth: row.dateOfBirth,
          address: row.address,
          parentName: row.parentName,
          parentPhone: row.parentPhone,
          enrollmentDate: new Date().toISOString().split("T")[0],
          status: (row.status as "Active" | "Inactive") || "Active",
        };
        addStudent(student);
        successCount++;
      } else {
        errorCount++;
      }
    }

    setImporting(false);
    toast({
      title: "Import complete",
      description: `Successfully imported ${successCount} students. ${errorCount} rows skipped due to missing data.`,
    });

    setFile(null);
    setPreviewData([]);
  };

  const downloadTemplate = () => {
    const template = [
      {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        grade: "10th Grade",
        dateOfBirth: "2008-01-15",
        address: "123 Main St",
        parentName: "Jane Doe",
        parentPhone: "0987654321",
        status: "Active",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "student_import_template.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground">Import Students</h2>
          <p className="text-muted-foreground mt-1">Upload an Excel file to import multiple students at once</p>
        </div>
        <Button variant="outline" onClick={downloadTemplate}>
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Excel File</CardTitle>
          <CardDescription>
            Upload a .xlsx or .xls file with student data. Make sure the columns match the template.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {file ? file.name : "Choose a file or drag it here"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Supports .xlsx and .xls files
            </p>
          </div>
        </CardContent>
      </Card>

      {previewData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview ({previewData.length} students)</CardTitle>
            <CardDescription>
              Review the data before importing. Rows with missing required fields will be skipped.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Parent Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.slice(0, 10).map((row, index) => {
                    const isValid = validateRow(row);
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {isValid ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{row.name || "-"}</TableCell>
                        <TableCell>{row.email || "-"}</TableCell>
                        <TableCell>{row.phone || "-"}</TableCell>
                        <TableCell>{row.grade || "-"}</TableCell>
                        <TableCell>{row.dateOfBirth || "-"}</TableCell>
                        <TableCell>{row.parentName || "-"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {previewData.length > 10 && (
              <p className="text-sm text-muted-foreground mt-4">
                Showing first 10 rows. {previewData.length - 10} more rows will be imported.
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null);
                  setPreviewData([]);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleImport} disabled={importing}>
                <Upload className="w-4 h-4 mr-2" />
                {importing ? "Importing..." : `Import ${previewData.length} Students`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

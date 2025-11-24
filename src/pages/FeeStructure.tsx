import { useState } from "react";
import { useSchool } from "@/contexts/SchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FeeStructureDialog } from "@/components/FeeStructureDialog";

export default function FeeStructure() {
  const { feeStructures, deleteFeeStructure } = useSchool();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState<string | undefined>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Fee Structure</CardTitle>
            <Button onClick={() => { setSelectedStructure(undefined); setDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Fee Structure
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructures.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No fee structures found
                  </TableCell>
                </TableRow>
              ) : (
                feeStructures.map((structure) => (
                  <TableRow key={structure.id}>
                    <TableCell className="font-medium">{structure.name}</TableCell>
                    <TableCell>{structure.grade}</TableCell>
                    <TableCell>${structure.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{structure.frequency}</Badge>
                    </TableCell>
                    <TableCell>{structure.dueDate}</TableCell>
                    <TableCell className="max-w-xs truncate">{structure.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedStructure(structure.id);
                            setDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteFeeStructure(structure.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <FeeStructureDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        structureId={selectedStructure}
      />
    </div>
  );
}

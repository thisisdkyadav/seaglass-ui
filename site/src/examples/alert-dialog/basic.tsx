import { AlertDialog, Button, toast } from "seaglass-ui";
import { Trash2, TriangleAlert } from "lucide-react";

export default function Basic() {
  return (
    <AlertDialog
      trigger={<Button tone="danger" icon={<Trash2 />}>Delete project</Button>}
      tone="danger"
      icon={<TriangleAlert />}
      title="Delete “Q4 launch”?"
      description="This removes the project, its 24 tasks and all files. It can't be undone."
      confirmLabel="Delete project"
      onConfirm={async () => {
        await new Promise((r) => setTimeout(r, 600)); // the confirm button waits for a promise
        toast.error("Project deleted");
      }}
    />
  );
}

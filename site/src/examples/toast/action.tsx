import { Button, toast } from "seaglass-ui";

export default function Action() {
  return (
    <Button
      tone="clear"
      onClick={() =>
        toast("Conversation archived", {
          action: { label: "Undo", onClick: () => toast.success("Restored") },
        })
      }
    >
      Archive with undo
    </Button>
  );
}

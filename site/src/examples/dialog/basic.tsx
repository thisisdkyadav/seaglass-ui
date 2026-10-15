import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogClose,
  Button, Field, Input, Switch, toast,
} from "seaglass";
import { Pencil } from "lucide-react";

export default function Basic() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button tone="primary" icon={<Pencil />}>Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Edit profile" description="Changes show up on your public page." />
        <DialogBody>
          <Field label="Name"><Input defaultValue="Ava Thompson" /></Field>
          <Field label="Handle"><Input defaultValue="ava" leading="@" /></Field>
          <Switch label="Show email publicly" />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button tone="clear">Cancel</Button></DialogClose>
          <DialogClose asChild><Button tone="primary" onClick={() => toast.success("Profile saved")}>Save</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Button, ButtonGroup } from "seaglass-ui";
import { Plus, ArrowRight, Trash2 } from "lucide-react";

export default function IconsAndLoading() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };
  return (
    <ButtonGroup>
      <Button tone="primary" icon={<Plus />}>Create</Button>
      <Button tone="mint" iconEnd={<ArrowRight />}>Continue</Button>
      <Button tone="danger" icon={<Trash2 />}>Delete</Button>
      <Button tone="lilac" loading={saving} onClick={save}>Save changes</Button>
      <Button disabled>Disabled</Button>
    </ButtonGroup>
  );
}

import { Tooltip, IconButton, ButtonGroup } from "seaglass-ui";
import { Archive, Bell, Trash2 } from "lucide-react";

export default function Basic() {
  return (
    <ButtonGroup>
      <Tooltip content="Archive" shortcut="e">
        <IconButton aria-label="Archive" tone="clear" shape="circle"><Archive /></IconButton>
      </Tooltip>
      <Tooltip content="Notifications" side="bottom">
        <IconButton aria-label="Notifications" tone="clear" shape="circle"><Bell /></IconButton>
      </Tooltip>
      <Tooltip content="Delete" shortcut="mod+backspace" side="right">
        <IconButton aria-label="Delete" tone="coral" shape="circle"><Trash2 /></IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}

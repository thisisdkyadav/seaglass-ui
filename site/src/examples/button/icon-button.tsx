import { IconButton, ButtonGroup, Tooltip } from "seaglass";
import { Pencil, Share2, Bookmark, Heart, MoreHorizontal } from "lucide-react";

export default function IconButtons() {
  return (
    <ButtonGroup>
      <Tooltip content="Edit" shortcut="e">
        <IconButton aria-label="Edit" tone="clear" shape="circle"><Pencil /></IconButton>
      </Tooltip>
      <IconButton aria-label="Share" tone="periwinkle"><Share2 /></IconButton>
      <IconButton aria-label="Bookmark" tone="seafoam" shape="circle"><Bookmark /></IconButton>
      <IconButton aria-label="Like" tone="coral"><Heart /></IconButton>
      <IconButton aria-label="More" variant="ghost" tone="clear" shape="circle"><MoreHorizontal /></IconButton>
    </ButtonGroup>
  );
}

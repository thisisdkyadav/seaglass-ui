import { Button } from "seaglass-ui";
import { ArrowRight } from "lucide-react";

// asChild renders your own element (a router link, an <a>) with button styles.
export default function AsChild() {
  return (
    <Button asChild tone="primary" iconEnd={<ArrowRight />}>
      <a href="#installation">Read the docs</a>
    </Button>
  );
}

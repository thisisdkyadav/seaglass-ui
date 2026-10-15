import { Accordion, AccordionItem } from "seaglass-ui";
import { Waves, Palette, Code } from "lucide-react";

export default function Joined() {
  return (
    <Accordion type="single" collapsible defaultValue="a" style={{ width: "min(520px, 100%)" }}>
      <AccordionItem value="a" title="What is sea glass?" icon={<Waves />}>
        Frosted pebbles of glass, tumbled smooth by the sea. Here: a UI material.
      </AccordionItem>
      <AccordionItem value="b" title="Can I use my own colours?" icon={<Palette />}>
        Yes. Every tone is one hue / saturation / lightness triple — set --h, --s and --l on any pebble.
      </AccordionItem>
      <AccordionItem value="c" title="Does it work without React?" icon={<Code />}>
        The stylesheet does. Behaviour comes from Radix, so other frameworks need their own bindings.
      </AccordionItem>
    </Accordion>
  );
}

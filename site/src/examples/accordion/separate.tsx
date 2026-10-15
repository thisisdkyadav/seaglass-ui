import { Accordion, AccordionItem } from "seaglass-ui";

export default function Separate() {
  return (
    <Accordion type="multiple" variant="separate" tone="seafoam" style={{ width: "min(520px, 100%)" }}>
      <AccordionItem value="shipping" title="Shipping">Free over $50, otherwise $4.90.</AccordionItem>
      <AccordionItem value="returns" title="Returns">30 days, no questions asked.</AccordionItem>
      <AccordionItem value="warranty" title="Warranty">Two years on everything we make.</AccordionItem>
    </Accordion>
  );
}

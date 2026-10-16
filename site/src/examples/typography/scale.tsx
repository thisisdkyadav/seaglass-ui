import { Heading, Link, Text } from "seaglass-ui";

export default function Scale() {
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 560 }}>
      <Heading level={2} size="3xl">Tide tables</Heading>
      <Heading level={3}>Low water at 06:42</Heading>
      <Text>
        Body text sits at 14px with a 1.5 line height. Read the <Link href="#scale">full forecast</Link> for
        the rest of the week.
      </Text>
      <Text size="sm" color="muted">Muted text for secondary details.</Text>
      <Text size="xs" color="faint">Updated 4 minutes ago · faint, and still 4.5:1 contrast</Text>
      <Text truncate style={{ maxWidth: 280 }}>A very long line that does not fit gets an ellipsis at the end.</Text>
      <Text numeric weight="strong">1,204.50 · 98.10 · 12.00</Text>
    </div>
  );
}

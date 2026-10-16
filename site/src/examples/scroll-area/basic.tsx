import { ScrollArea, Separator } from "seaglass-ui";

const tags = Array.from({ length: 40 }, (_, i) => `v1.${40 - i}.0`);

export default function Basic() {
  return (
    <ScrollArea aria-label="Releases" maxHeight={220} className="sg-well" style={{ width: 220, borderRadius: 14 }}>
      <div style={{ padding: "12px 16px" }}>
        <h4 style={{ margin: "0 0 8px", fontSize: 13 }}>Releases</h4>
        {tags.map((t, i) => (
          <div key={t}>
            <div style={{ fontSize: 13, padding: "6px 0" }}>{t}</div>
            {i < tags.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

import { Link } from "../router";
import { groups, registry } from "../content/registry";

const groupTone = { Foundations: "aqua", Layout: "seafoam", Primitives: "periwinkle", Forms: "mint", Overlays: "lilac", Navigation: "sky", "Data display": "amber", Utilities: "sand" } as const;

export function ComponentGrid() {
  return (
    <div className="site-groups">
      {groups.map((g) => (
        <section key={g} className="site-group" aria-labelledby={`g-${g}`}>
          <h2 id={`g-${g}`}>{g}</h2>
          <div className="site-cards">
            {registry.filter((e) => e.group === g).map((e) => (
              <Link key={e.slug} to={`/components/${e.slug}`} className="site-card sg-pebble" data-tone={groupTone[g]} data-depth="sm">
                <b>{e.name}</b>
                <span>{e.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

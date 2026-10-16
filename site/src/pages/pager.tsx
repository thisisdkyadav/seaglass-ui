import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { sections } from "../content/nav";

const order = sections.flatMap((s) => s.items).filter((i) => i.href && i.href !== "/components");

/** Previous / next links in sidebar order. */
export function Pager({ current }: { current: string }) {
  const i = order.findIndex((o) => o.href === current);
  const prev = order[i - 1], next = order[i + 1];
  return (
    <nav className="site-pager" aria-label="Previous and next page">
      {prev ? <Link to={prev.href!} className="site-pager-link"><small><ArrowLeft size={14} /> Previous</small><b>{prev.label}</b></Link> : <span />}
      {next ? <Link to={next.href!} className="site-pager-link site-pager-next"><small>Next <ArrowRight size={14} /></small><b>{next.label}</b></Link> : <span />}
    </nav>
  );
}

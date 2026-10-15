import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import type { Tone } from "../lib/types";
import { ArrowDown, ArrowUp } from "../lib/icons";

export interface SparklineProps { data: number[]; width?: number; height?: number; strokeWidth?: number; className?: string; area?: boolean }

/** A tiny trend line in the current text colour. */
export function Sparkline({ data, width = 96, height = 34, strokeWidth = 2.4, className, area }: SparklineProps) {
  if (data.length < 2) return null;
  const max = Math.max(...data), min = Math.min(...data), span = max - min || 1, pad = strokeWidth;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * width, pad + (1 - (v - min) / span) * (height - pad * 2)] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <svg className={cx("sg-sparkline", className)} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      {area && <path d={`${d} L${width} ${height} L0 ${height}Z`} fill="currentColor" opacity=".12" />}
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity=".75" />
    </svg>
  );
}

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  icon?: ReactNode;
  /** Change vs the previous period, e.g. "+12.5%". */
  delta?: ReactNode;
  /** Whether the change is good ("up", green) or bad ("down", red). Defaults to the delta's direction. */
  trend?: "up" | "down";
  /** Values for a sparkline in the corner. */
  data?: number[];
  tone?: Tone;
}

/** A KPI pebble: label, big number, change and a sparkline. */
export function Stat({ label, value, icon, delta, trend, data, tone = "periwinkle", className, ...rest }: StatProps) {
  // the arrow follows the number; the colour says whether that is good news (a falling bounce rate is)
  const dir = typeof delta === "string" && /^[−-]/.test(delta.trim()) ? "down" : "up";
  const t = trend ?? dir;
  return (
    <div data-tone={tone} data-depth="lg" className={cx("sg-stat sg-pebble", className)} {...rest}>
      <div className="sg-stat-head">{icon && <span className="sg-stat-icon" aria-hidden>{icon}</span>}<span>{label}</span></div>
      <div className="sg-stat-value">{value}</div>
      <div className="sg-stat-foot">
        {delta != null && <span className="sg-delta" data-trend={t}>{dir === "up" ? <ArrowUp width={14} height={14} /> : <ArrowDown width={14} height={14} />}{delta}</span>}
        {data && <Sparkline data={data} />}
      </div>
    </div>
  );
}

export interface BarChartProps { data: Array<{ label: string; value: number }>; height?: number; tone?: Tone; highlight?: "max" | number; format?: (v: number) => string; className?: string }

/** Each bar is its own small pebble. */
export function BarChart({ data, height = 170, tone = "amber", highlight = "max", format = String, className }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const hi = highlight === "max" ? data.findIndex((d) => d.value === max) : highlight;
  return (
    <div className={cx("sg-bars", className)} style={{ height: height + 28 }} role="img" aria-label={data.map((d) => `${d.label}: ${format(d.value)}`).join(", ")}>
      {data.map((d, i) => (
        <div key={i} className="sg-bars-col">
          <span className="sg-pebble sg-bar" data-tone={i === hi ? "rose" : tone} data-depth="sm" style={{ height: Math.max(8, (d.value / max) * height) }} title={`${d.label}: ${format(d.value)}`} />
          <span className="sg-bars-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

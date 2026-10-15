export interface Order {
  id: string;
  customer: string;
  email: string;
  date: Date;
  total: number;
  status: "Paid" | "Pending" | "Refunded" | "Failed";
  items: number;
}

const names = ["Ava Thompson", "Leo Martins", "Mia Chen", "Noah Patel", "Isla Romero", "Kai Nakamura", "Zara Okafor", "Ethan Brooks", "Maya Singh", "Oscar Lindqvist", "Lena Fischer", "Ravi Kumar", "Sofia Rossi", "Jonah Weiss", "Amara Diallo", "Hugo Laurent", "Nina Petrova", "Theo Walsh", "Yara Haddad", "Felix Wagner"];
const statuses: Order["status"][] = ["Paid", "Paid", "Paid", "Pending", "Paid", "Refunded", "Paid", "Failed", "Pending", "Paid"];

// deterministic pseudo-random so screenshots are stable
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

export const orders: Order[] = Array.from({ length: 48 }, (_, i) => {
  const name = names[i % names.length];
  return {
    id: `#${(10482 - i).toString()}`,
    customer: name,
    email: name.toLowerCase().replace(" ", ".") + "@mail.com",
    date: new Date(2026, 9, 15 - Math.floor(i / 3), 9 + (i % 9), (i * 17) % 60),
    total: Math.round((24 + rnd() * 480) * 100) / 100,
    status: statuses[i % statuses.length],
    items: 1 + Math.floor(rnd() * 6),
  };
});

export const weekly = [
  { label: "Mon", value: 4200 }, { label: "Tue", value: 5100 }, { label: "Wed", value: 4700 },
  { label: "Thu", value: 6800 }, { label: "Fri", value: 7900 }, { label: "Sat", value: 6100 }, { label: "Sun", value: 3900 },
];

export const team = [
  { name: "Ava Thompson", role: "Owner", status: "online" as const },
  { name: "Leo Martins", role: "Admin", status: "away" as const },
  { name: "Mia Chen", role: "Designer", status: "online" as const },
  { name: "Noah Patel", role: "Engineer", status: "busy" as const },
  { name: "Isla Romero", role: "Support", status: "offline" as const },
];

export const countries = [
  "Australia", "Brazil", "Canada", "Denmark", "Egypt", "France", "Germany", "India", "Italy", "Japan", "Kenya",
  "Mexico", "Netherlands", "Norway", "Portugal", "Singapore", "Spain", "Sweden", "United Kingdom", "United States",
].map((c) => ({ value: c.toLowerCase().replace(/ /g, "-"), label: c, group: c < "M" ? "A – L" : "M – Z" }));

export const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

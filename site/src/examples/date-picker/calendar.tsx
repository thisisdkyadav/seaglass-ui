import { useState } from "react";
import { Calendar } from "seaglass-ui";

export default function CalendarExample() {
  const [date, setDate] = useState<Date | null>(new Date());
  return <Calendar value={date} onValueChange={setDate} />;
}

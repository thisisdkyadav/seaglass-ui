import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, Pebble } from "seaglass";
import { Calendar, Smile, Calculator, User, CreditCard, Settings } from "lucide-react";

export default function Inline() {
  return (
    <Pebble tone="clear" style={{ width: "min(440px, 100%)", padding: 12 }}>
      <Command loop>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem icon={<Calendar />}>Calendar</CommandItem>
            <CommandItem icon={<Smile />}>Search emoji</CommandItem>
            <CommandItem icon={<Calculator />} disabled>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem icon={<User />} shortcut="mod+p">Profile</CommandItem>
            <CommandItem icon={<CreditCard />} shortcut="mod+b">Billing</CommandItem>
            <CommandItem icon={<Settings />} shortcut="mod+,">Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Pebble>
  );
}

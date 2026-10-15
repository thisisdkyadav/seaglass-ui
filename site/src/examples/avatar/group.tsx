import { Avatar, AvatarGroup } from "seaglass";

const people = ["Kai Nakamura", "Zara Okafor", "Ethan Brooks", "Maya Singh", "Oscar Lindqvist", "Lena Fischer"];

export default function Group() {
  return (
    <AvatarGroup max={4}>
      {people.map((name) => <Avatar key={name} name={name} />)}
    </AvatarGroup>
  );
}

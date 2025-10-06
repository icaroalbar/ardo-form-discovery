import { icons } from "lucide-react";

export type IconNames = keyof typeof icons;

type IconsProps = {
  name: IconNames;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon = (props: IconsProps) => {
  const LucideIcon = icons[props.name];

  if (!LucideIcon) {
    return null;
  }

  return (
    <LucideIcon
      color={props.color}
      size={props.size}
      className={props.className}
    />
  );
};

export default Icon;

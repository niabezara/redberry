interface PropertyInfoProps {
  Icon: React.ElementType;
  value: string | number;
  staticText: string;
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({
  Icon,
  value,
  staticText,
}) => (
  <span className="flex items-center gap-1 mb-4">
    <Icon />
    <p className="text-[#808A93] text-[24px] font-normal">
      {staticText}
      {value}
    </p>
  </span>
);

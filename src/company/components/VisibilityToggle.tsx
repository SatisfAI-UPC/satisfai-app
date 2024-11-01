import React from "react";
import { Switch } from "@nextui-org/switch";

type Props = {
  isPublic: boolean;
  onToggle: () => void;
};

const VisibilityToggle: React.FC<Props> = ({ isPublic, onToggle }) => {
  return (
    <div className="flex items-center gap-2 my-3">
      <Switch 
        isSelected={isPublic}
        onChange={onToggle} 
        size="sm" 
        color="primary" 
      />
      <span className="text-black text-sm">Company profile visibility</span>
    </div>
  );
};

export default VisibilityToggle;

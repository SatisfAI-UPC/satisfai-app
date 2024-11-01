import React from "react";

type Props = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  multiline?: boolean;
  height?: string;
};

const EditableField: React.FC<Props> = ({ label, value, onChange, multiline = false, height }) => {
  return (
    <div className="w-full mb-2">
      <label className="text-[#949CA9] text-sm font-medium">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className="w-full mt-1 p-[15px] border border-gray-300 rounded text-[#282828] text-sm resize-none"
          style={{ height: height || "72px" }} // Aplicar la altura específica para Description
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className="w-full mt-1 p-[15px] border border-gray-300 rounded text-[#282828] text-sm h-[40px]"
        />
      )}
    </div>
  );
};

export default EditableField;
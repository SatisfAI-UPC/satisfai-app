import React from "react";

type Props = {
  onSave: () => void;
  onCancel: () => void;
};

const SaveCancelButtons: React.FC<Props> = ({ onSave, onCancel }) => {
  return (
    <div className="flex gap-4 mt-4 w-full max-w-[944px]">
      <button
        onClick={onSave}
        className="bg-[#55D6B0] text-white text-base font-semibold py-2 rounded-[6px] w-full h-[52px]"
      >
        Save changes
      </button>
      <button
        onClick={onCancel}
        className="bg-[#FF3D00] text-white text-base font-semibold py-2 rounded-[6px] w-full h-[52px]"
      >
        Log out
      </button>
    </div>
  );
};

export default SaveCancelButtons;

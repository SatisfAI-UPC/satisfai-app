import React from "react";
import {Button} from "@nextui-org/react";

type Props = {
  onSave: () => void;
  onCancel: () => void;
};

const SaveCancelButtons: React.FC<Props> = ({ onSave, onCancel }) => {
  return (
    <div className="flex gap-4 mt-4 w-full max-w-[944px]">
      <Button
        onClick={onSave}
        className="w-full"
        color={"primary"}
      >
        Save changes
      </Button>
      <Button
        onClick={onCancel}
        className="w-full"
        color={"danger"}
      >
        Log out
      </Button>
    </div>
  );
};

export default SaveCancelButtons;

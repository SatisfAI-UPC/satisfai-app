import React from "react";
import { Button } from "@nextui-org/react";

type Props = {
  onSave: () => void;
  onCancel: () => void;
};

const SaveCancelButtons: React.FC<Props> = ({ onSave, onCancel }) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <Button onClick={onSave} className="w-full" color="primary">
        Save changes
      </Button>
      <Button onClick={onCancel} className="w-full" color="danger">
        Log out
      </Button>
    </div>
  );
};

export default SaveCancelButtons;

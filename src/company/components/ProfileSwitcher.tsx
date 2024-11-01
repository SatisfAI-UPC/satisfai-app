import React from "react";

type Props = {
  onSelect: (view: string) => void;
  activeTab: string;
};

const ProfileSwitcher: React.FC<Props> = ({ onSelect, activeTab }) => {
  const handleTabClick = (tab: string) => {
    onSelect(tab);
  };

  return (
    <div className="flex justify-center gap-8 mb-6">
      {["Profile", "Reviews"].map((tab) => (
        <h1
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`cursor-pointer text-lg font-bold transition-colors ${
            activeTab === tab ? "text-[#55D6B0] border-b-2 border-[#55D6B0]" : "text-black"
          }`}
        >
          {tab}
        </h1>
      ))}
    </div>
  );
};

export default ProfileSwitcher;

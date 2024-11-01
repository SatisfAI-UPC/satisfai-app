import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileSwitcher from "../components/ProfileSwitcher";
import EditableField from "../components/EditableField";
import VisibilityToggle from "../components/VisibilityToggle";
import SaveCancelButtons from "../components/SaveCancelButtons";
import { fetchCompanyById, updateCompany } from "../services/CompanyService";
import { Company } from "../model/Company";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearToken } from "../../authentication/services/AuthSlice";

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [company, setCompany] = useState<Company | null>(null);
  const [isPublic, setIsPublic] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const data = await fetchCompanyById(user.id);
        setCompany(data);
        setIsPublic(data.isProfilePublic);
      } catch (error) {
        toast.error("Error fetching company data");
      }
    };
    fetchData();
  }, [user]);
  

  const handleSave = async () => {
    if (!company) return;
    try {
      const updatedCompany = { ...company, isProfilePublic: isPublic };
      await updateCompany(user.id, updatedCompany);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
    toast.info("Logged out successfully");
  };

  return (
    <div className="w-full max-w-[944px] mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <ProfileSwitcher onSelect={setActiveTab} activeTab={activeTab} />
      {company && (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "Profile" && (
            <>
              <div className="flex flex-col items-center mb-4">
                <img
                  src={company.profilePictureUrl}
                  alt="Profile"
                  className="w-[195px] h-[195px] rounded-full mb-4"
                />
                <h2 className="text-[#282828] text-2xl font-semibold">{company.name}</h2>
                <p className="text-[#282828] text-base font-medium mb-2">{company.email}</p>
                <VisibilityToggle isPublic={isPublic} onToggle={() => setIsPublic(!isPublic)} />
              </div>
              <div className="space-y-3">
                <EditableField
                  label="Company Name"
                  value={company.name}
                  onChange={(value) => setCompany({ ...company, name: value })}
                />
                <EditableField
                  label="Description"
                  value={company.description}
                  multiline={true}
                  onChange={(value) => setCompany({ ...company, description: value })}
                  height="100px"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <EditableField
                    label="Address"
                    value={company.address}
                    onChange={(value) => setCompany({ ...company, address: value })}
                  />
                  <EditableField
                    label="Country"
                    value={company.country}
                    onChange={(value) => setCompany({ ...company, country: value })}
                  />
                  <EditableField
                    label="Phone Number"
                    value={company.phoneNumber}
                    onChange={(value) => setCompany({ ...company, phoneNumber: value })}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <SaveCancelButtons onSave={handleSave} onCancel={handleLogout} />
              </div>
            </>
          )}
          {activeTab === "Reviews" && <div className="text-center mt-8">No reviews available</div>}
        </motion.div>
      )}
    </div>
  );
};

export default CompanyProfile;

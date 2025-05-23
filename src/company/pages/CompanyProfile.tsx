// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import ProfileSwitcher from "../components/ProfileSwitcher";
import VisibilityToggle from "../components/VisibilityToggle";
import SaveCancelButtons from "../components/SaveCancelButtons";
import {fetchCompanyById, updateCompanyById} from "../services/CompanyService";
import { Company } from "../model/Company";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearToken } from "../../authentication/services/AuthSlice";
import {Avatar, Card, Input, Textarea} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {CompanyUpdateRequest} from "../model/CompanyUpdateRequest.ts";
import { storage } from "../../firebase/FireBaseConfig.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CompanyReviewsList from "./CompanyReviewsList.tsx";

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [company, setCompany] = useState<Company | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {

      setSelectedImage(file); // Guarda el archivo real
      const previewUrl = URL.createObjectURL(file); // Previsualiza la imagen
      setProfilePic(previewUrl); // Actualiza la previsualización
      /*const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);*/
    }
  };

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const data = await fetchCompanyById(user.id);
        setCompany({
          ...data,
          name: data.name || user.name,
        });
        setIsPublic(data.isProfilePublic);
        setProfilePic(data.profilePictureUrl);
      } catch (error) {
        toast.error("Error fetching company data");
      }
    };
    fetchData();
  }, [user]);

  const uploadImageToFirebase = async () => {
    if (!selectedImage) return null; // Verifica que haya una imagen seleccionada

    try {
      setUploading(true);

      // Crear una referencia de almacenamiento en Firebase
      const storageRef = ref(storage, `profile_pictures/${user.id}/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage); // Sube el archivo seleccionado

      // Obtén la URL pública
      const downloadURL = await getDownloadURL(storageRef);
      setUploading(false);

      return downloadURL;
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };


  const handleSave = async () => {
    if (!company) return;
    try {
      // Upload image if a new one is selected
      let profilePictureUrl = company.profilePictureUrl;

      if (selectedImage) {
        const uploadedImageUrl = await uploadImageToFirebase();
        if (uploadedImageUrl) {
          profilePictureUrl = uploadedImageUrl; // Actualiza con la URL de Firebase
        }
      }

      const updatedCompany = { ...company,profilePictureUrl, isProfilePublic: isPublic };
      const updateCompanyRequestData: CompanyUpdateRequest = {
        name: updatedCompany.name,
        phoneNumber: updatedCompany.phoneNumber,
        country: updatedCompany.country,
        description: updatedCompany.description,
        address: updatedCompany.address,
        website: updatedCompany.website,
        profilePictureUrl: updatedCompany.profilePictureUrl,
        industry: updatedCompany.industry,
        isProfilePublic: updatedCompany.isProfilePublic,
      }
      await updateCompanyById(user.id || null, updateCompanyRequestData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
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
                    <Card className={"p-4 md:p-8"}>
                      <div className="flex flex-col items-center mb-4">
                        <Avatar
                            src={profilePic}
                            alt="Profile"
                            className="w-[195px] h-[195px] rounded-full mb-4"
                        />
                        <Input
                            type="file"
                            id="upload"
                            onChange={handleFileChange}
                            accept="image/*"
                            css={{ display: "none" }}
                        />
                        <h2 className="text-[#282828] text-2xl font-semibold pt-2">{company?.name}</h2>
                        <VisibilityToggle isPublic={isPublic} onToggle={() => setIsPublic(!isPublic)}/>
                      </div>
                      <div className="space-y-3">
                        <Input
                            label="Company Name"
                            defaultValue={company.name}
                            onChange={(e) => setCompany({...company, name: e.target.value})}
                        />
                        <Textarea
                            label="Description"
                            value={company.description}
                            onChange={(e) => setCompany({...company, description: e.target.value})}
                            height="100px"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                              label="Address"
                              value={company.address}
                              onChange={(e) => setCompany({...company, address: e.target.value})}
                          />
                          <Input
                              label="Country"
                              value={company.country}
                              onChange={(e) => setCompany({...company, country: e.target.value})}
                          />
                          <Input
                              label="Phone Number"
                              value={company.phoneNumber}
                              onChange={(e) => setCompany({...company, phoneNumber: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                              label="Website"
                              value={company.website}
                              onChange={(e) => setCompany({...company, website: e.target.value})}
                          />
                          <Input
                              label="Industry"
                              value={company.industry}
                              onChange={(e) => setCompany({...company, industry: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex justify-center mt-4">
                        <SaveCancelButtons onSave={handleSave} onCancel={handleLogout}/>
                      </div>
                    </Card>
                  </>
              )}
              {
                  activeTab === "Reviews" &&
                  <CompanyReviewsList company={company} />
              }
            </motion.div>
        )}
      </div>
  );
};

export default CompanyProfile;

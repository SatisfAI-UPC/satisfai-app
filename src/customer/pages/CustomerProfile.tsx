import { useDispatch, useSelector } from "react-redux";
import SaveCancelButtons from "../components/SaveCancelButtons";
import { fetchCustomerById, updateCustomer } from "../services/CustomerService";
import { motion } from "framer-motion";
import { clearToken } from "../../authentication/services/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar, Card, Input, Skeleton } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/FireBaseConfig.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {

      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setProfilePic(previewUrl);
    }
  };

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const data = await fetchCustomerById(user.id);
        setCustomer(data);
        setProfilePic(data.profilePictureUrl);
      } catch (error) {
        toast.error("Error fetching customer data");
      } finally {
        setIsLoading(false);
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
    if (!customer) return;
    try {
      let profilePictureUrl = company.profilePictureUrl;

      if (selectedImage) {
        const uploadedImageUrl = await uploadImageToFirebase();
        if (uploadedImageUrl) {
          profilePictureUrl = uploadedImageUrl; // Actualiza con la URL de Firebase
        }
      }
      await updateCustomer({
        id: user.id,
        name: customer.name,
        country: customer.country,
        phoneNumber: customer.phoneNumber,
        profilePictureUrl: profilePictureUrl,
      });
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
    <div className="w-full max-w-[500px] mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoading ? (
        <Card className="p-4 md:p-6">
          <div className="flex flex-col items-center mb-6">
            <Skeleton className="w-[160px] h-[160px] rounded-full mb-4">
              <div className="h-[160px] w-[160px] rounded-full bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-[50%] rounded-lg mb-2">
              <div className="h-6 w-[50%] rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-[60%] rounded-lg">
              <div className="h-4 w-[60%] rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <div className="space-y-4">
            <Skeleton className="rounded-lg">
              <div className="h-10 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-10 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-10 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <div className="mt-4">
            <Skeleton className="h-12 rounded-lg">
              <div className="h-12 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="h-12 rounded-lg mt-4">
              <div className="h-12 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ) : (
        customer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 md:p-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar
                  src={profilePic}
                  alt="Profile"
                  className="w-[160px] h-[160px] rounded-full mb-4"
                />
                <Input
                    type="file"
                    id="upload"
                    onChange={handleFileChange}
                    accept="image/*"
                    css={{ display: "none" }}
                />
                <h2 className="text-[#282828] text-2xl font-semibold pt-2">
                  {customer.name}
                </h2>
                <p className="text-[#666666] text-[16px] font-medium">
                  {customer.email}
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  label="Name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                />
                <Input
                  label="Country"
                  value={customer.country}
                  onChange={(e) =>
                    setCustomer({ ...customer, country: e.target.value })
                  }
                />
                <Input
                  label="Phone Number"
                  value={customer.phoneNumber}
                  onChange={(e) =>
                    setCustomer({ ...customer, phoneNumber: e.target.value })
                  }
                />
              </div>
              <SaveCancelButtons onSave={handleSave} onCancel={handleLogout} />
            </Card>
          </motion.div>
        )
      )}
    </div>
  );
};

export default CustomerProfile;

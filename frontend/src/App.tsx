import { useEffect, useState } from "react";
import { api } from "./api";
import type { Profile, ProfileType } from "./types/Profile";
import ProfileForm from "./components/ProfileForm";
import ProfileList from "./components/ProfileList";

export default function App() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileTypes, setProfileTypes] = useState<ProfileType[]>([]);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);


  const [errors, setErrors] = useState<string[]>([]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileTypeId: "",
    photo: null as File | null,
  });

  const getProfiles = async () => {
    const res = await api.get("/profiles");
    setProfiles(res.data);
  };

  const getProfileTypes = async () => {
    const res = await api.get("/profileTypes");
    setProfileTypes(res.data);
  };

  const submitProfile = async () => {
    try {
      setErrors([]); 

      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);

      if (!editingProfile) {
        formData.append("password", form.password);
        formData.append("confirmPassword", form.confirmPassword);
      }

       if (editingProfile && form.password.trim() !== "") {
        formData.append("password", form.password);
        formData.append("confirmPassword", form.confirmPassword);
      }

      formData.append("profileTypeId", form.profileTypeId.toString());

      if (form.photo) {
        formData.append("photo", form.photo);
      }

      if (editingProfile) {
        await api.patch(`/profiles/${editingProfile.id}`, formData);
      } else {
        await api.post("/profiles", formData);
      }

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileTypeId: "",
        photo: null,
      });

      setEditingProfile(null);
      getProfiles();
    } catch (err: any) {
      const messages = err.response?.data?.message;

      if (Array.isArray(messages)) {
        setErrors(messages);
      } else if (messages) {
        setErrors([messages]);
      } else {
        setErrors(["Unexpected error"]);
      }
    }
  };

  const deleteProfile = async (id: number) => {
    await api.delete(`/profiles/${id}`);
    getProfiles();
  };

  const editProfile = (profile: Profile) => {
    setEditingProfile(profile);
    setErrors([]); 

    setForm({
      username: profile.username,
      email: profile.email,
      password: "",
      confirmPassword: "",
      profileTypeId: profile.profileType.id.toString(),
      photo: null,
    });
  };

  useEffect(() => {
    getProfiles();
    getProfileTypes();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profiles</h1>

      {/* ---- FORM ---- */}
      <ProfileForm
        form={form}
        setForm={setForm}
        profileTypes={profileTypes}
        onSubmit={submitProfile}
        editing={Boolean(editingProfile)}
        errors={errors}  
      />

      {/* ---- TABLO ---- */}
      <ProfileList
        profiles={profiles}
        onEdit={editProfile}
        onDelete={deleteProfile}
      />
    </div>
  );
}


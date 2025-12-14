import {
  Button,
  Label,
  Select,
  TextInput,
  FileInput,
} from "flowbite-react";
import type { ChangeEvent, FormEvent } from "react";

interface Props {
  form: any;
  setForm: any;
  profileTypes: any[];
  onSubmit: () => void;
  editing: boolean;
  errors: string[]; 
}

export default function ProfileForm({
  form,
  setForm,
  profileTypes,
  onSubmit,
  editing,
  errors, 
}: Props) {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, profileTypeId: Number(e.target.value) });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, photo: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className="flex flex-col gap-4 bg-white shadow p-6 rounded mt-6"
      onSubmit={handleSubmit}
    >
      {/* 🔴 BACKEND VALIDATION HATALARI */}
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <ul className="list-disc list-inside">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <Label htmlFor="username">Username</Label>
        <TextInput
          id="username"
          name="username"
          value={form.username}
          onChange={handleTextChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleTextChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <TextInput
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleTextChange}
          required={!editing}
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <TextInput
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleTextChange}
          required={!editing}
        />
      </div>

      <div>
        <Label htmlFor="profileType">Profile Type</Label>
        <Select
          id="profileType"
          value={form.profileTypeId}
          onChange={handleSelectChange}
        >
          <option value="">Select...</option>
          {profileTypes.map((pt) => (
            <option key={pt.id} value={pt.id}>
              {pt.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="photo">Photo</Label>
        <FileInput id="photo" onChange={handleFileChange} />
      </div>

      <Button type="submit" color="blue" className="mt-2 visible block">
        {editing ? "Update Profile" : "Create Profile"}
      </Button>
    </form>
  );
}

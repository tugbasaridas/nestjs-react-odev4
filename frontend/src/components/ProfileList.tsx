import type { Profile } from "../types/Profile";

interface Props {
  profiles: Profile[];
  onEdit: (profile: Profile) => void;
  onDelete: (id: number) => void;
}

export default function ProfileList({ profiles, onEdit, onDelete }: Props) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 border rounded">
        <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Photo</th>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Profile Type</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {profiles.map((p) => (
            <tr key={p.id} className="border-b bg-white hover:bg-gray-50">
              <td className="px-4 py-3">
                {p.photo && (
                  <img
                    src={`http://localhost:3000${p.photo}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </td>

              <td className="px-4 py-3">{p.username}</td>
              <td className="px-4 py-3">{p.email}</td>
              <td className="px-4 py-3">{p.profileType?.name}</td>

              <td className="px-4 py-3 space-x-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>

                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {profiles.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Kayıt bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

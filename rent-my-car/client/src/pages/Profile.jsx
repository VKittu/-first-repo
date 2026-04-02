import { useEffect, useState } from 'react';
import API from '../api/axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/auth/profile').then((res) => setProfile(res.data));
  }, []);

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="rounded bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <div className="mt-4 space-y-2 text-slate-700">
          <p><span className="font-semibold">Name:</span> {profile.name}</p>
          <p><span className="font-semibold">Email:</span> {profile.email}</p>
          <p><span className="font-semibold">Role:</span> {profile.role}</p>
          <p><span className="font-semibold">Joined:</span> {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

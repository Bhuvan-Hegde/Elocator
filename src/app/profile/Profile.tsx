import React, { useState } from 'react';
import { getEmail, getPhoneNumber, getUserName, getfullname, getUserID } from '../sign-in/auth';
import Image from 'next/image';
import { getRecycleEvents } from '../../utils/recycleApi';

const Profile = () => {
  const username = getUserName();
  const email = getEmail();
  const fullname = getfullname();
  const phone = getPhoneNumber();
  const userId = getUserID();

  const [showRecycled, setShowRecycled] = useState(false);
  const [recycledData, setRecycledData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShowRecycled = async () => {
    setShowRecycled(true);
    setLoading(true);
    setError(null);
    if (!userId) {
      setError('User not found.');
      setLoading(false);
      return;
    }
    const { data, error } = await getRecycleEvents(userId);
    if (error) {
      setError('Failed to fetch recycled items.');
    } else {
      setRecycledData(data || []);
    }
    setLoading(false);
  };

  const handleCloseRecycled = () => {
    setShowRecycled(false);
    setRecycledData([]);
    setError(null);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/3 w-full">
          <div className="bg-white rounded-lg shadow-lg py-6">
            <div className="photo-wrapper p-2 flex justify-center">
              <div className="rounded-full border-4 border-emerald-500 bg-emerald-100 w-32 h-32 flex items-center justify-center">
                <span className="text-5xl font-bold text-emerald-700">{username ? username.charAt(0).toUpperCase() : "U"}</span>
              </div>
            </div>
            <div className="p-2 text-center">
              <h3 className="text-2xl text-gray-900 font-semibold">{username}</h3>
              <table className=" my-3 text-xl mx-auto">
                <tbody> <tr>
                    <td className="px-2 py-2 text-left text-gray-500 font-semibold">Email</td>
                    <td className="px-2 py-2 text-left">{email}</td>
                  </tr>
               <tr>
                    <td className="px-2 py-2 text-left text-gray-500 font-semibold">Full Name</td>
                    <td className="px-2 py-2 text-left">{fullname}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-left text-gray-500 font-semibold">Phone</td>
                    <td className="px-2 py-2 text-left">{phone}</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-center">
                <button
                  className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-lg font-semibold"
                  onClick={handleShowRecycled}
                >
                  Recently Recycled
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recycled Modal/Table */}
      {showRecycled && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
            <button className="absolute top-2 right-4 text-gray-500 text-2xl" onClick={handleCloseRecycled}>&times;</button>
            <h2 className="text-2xl font-semibold mb-4">Recently Recycled</h2>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Sl. No</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {recycledData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">No recycled items found.</td>
                    </tr>
                  ) : (
                    recycledData.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
                        <td className="py-2 px-4 border-b">{item.name}</td>
                        <td className="py-2 px-4 border-b">{item.pickup_date ? new Date(item.pickup_date).toLocaleDateString() : '-'}</td>
                        <td className="py-2 px-4 border-b">{item.location}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

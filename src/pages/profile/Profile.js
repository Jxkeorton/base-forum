import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileTabs from "../../components/profile/ProfileTabs";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const response = await axios.get(`/profile/${id}/`);
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [id]);

  const updateProfile = async (updatedData) => {
    try {
      await axios.put(`/profile/${id}/`, updatedData);
      setProfile((prevState) => ({
        ...prevState,
        ...updatedData
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      {profile ? (
        <ProfileCard
          username={profile.owner}
          src={profile.image}
          noOfBaseJumps={profile.no_of_base_jumps}
          isOwner={true}
          updateProfile={updateProfile}
        />
      ) : (
        <p>Loading profile...</p>
      )}
      <ProfileTabs />
    </div>
  );
};

export default Profile;
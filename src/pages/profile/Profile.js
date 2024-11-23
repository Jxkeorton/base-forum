import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileTabs from "../../components/profile/ProfileTabs";
import axios from 'axios';
import { useParams } from "react-router-dom";


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          // Use currentUser.pk to fetch the profile based on the user's ID
          const response = await axios.get(`/profile/${id}/`);
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [id]);
  return (
    <div>
      {profile ? (
        <ProfileCard username={profile.owner} src={profile.image} />
      ) : (
        <p>Loading profile...</p>
      )}
      <ProfileTabs />
    </div>
  );
};

export default Profile;
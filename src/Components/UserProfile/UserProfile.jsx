// src/components/UserProfile/UserProfile.jsx
import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="user-profile">
      <img src={user.profilePicture} alt={`${user.name}'s profile`} className="profile-picture" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={handleFollowToggle}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      {isFollowing && <p>You are following {user.name}.</p>}
    </div>
  );
};

export default UserProfile;

import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";

const Profile = () => {
  const { user, handleUpdateProfile } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleUpdateProfile(nickname);
    } catch (error) {
      console.error("닉네임 업데이트 실패", error);
      alert("닉네임 업데이트 실패!");
    }
  };

  return (
    <div>
      <div>
        <h1>프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="submit">닉네임 수정</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

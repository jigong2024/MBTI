import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";

const Profile = () => {
  const [nickname, setNickname] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userData = await getUserProfile(token);
      setNickname(userData.nickname);
    } catch (error) {
      console.error("닉네임 불러오기 실패", error);
      alert("닉네임 불러오기 실패!");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      await updateProfile(token, nickname);
      alert("닉네임이 성공적으로 업데이트 되었습니다!");
      await fetchProfile();
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

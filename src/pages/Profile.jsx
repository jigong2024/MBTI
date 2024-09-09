const Profile = () => {
  return (
    <div>
      <div>
        <h1>프로필 수정</h1>
        <form>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="nickname"
          />
          <button type="submit">닉네임 수정</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

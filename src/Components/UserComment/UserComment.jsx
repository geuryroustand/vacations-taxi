import Image from "next/image";
import styled from "./UserComment.module.css";

const UserComment = ({ userName, comment, avatar }) => {
  return (
    <div className={styled.userComment}>
      {avatar ? (
        <Image src={avatar} width="38" height="38" alt={userName} />
      ) : (
        <Image
          src={`https://ui-avatars.com/api/?name=${userName}`}
          width="38"
          height="38"
          alt={userName}
        />
      )}

      <div>
        <p className={styled.userName}>{userName}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default UserComment;

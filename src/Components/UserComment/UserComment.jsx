import Image from "next/image";
import styled from "./UserComment.module.css";

const UserComment = ({ userName, comment }) => {
  return (
    <div className={styled.userComment}>
      <Image src="/images/hero.JPG" width="38" height="38" alt="Flight tracking" />
      <div>
        <p className={styled.userName}>{userName}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default UserComment;

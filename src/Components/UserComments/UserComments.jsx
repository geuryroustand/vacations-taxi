import ContactTraveler from "../ContactTraveler/ContactTraveler";
import UserComment from "../UserComment/UserComment";
import styled from "./UserComments.module.css";

const UserComments = () => {
  return (
    <div className={styled.main}>
      <h3 className={styled.heading}>Comments</h3>
      <ul className={styled.list}>
        <li>
          <UserComment
            userName="John Does"
            comment=" Hi, I'm looking for 1 or 2 people who want to share the transportation with 2 more
          people."
          />
        </li>
        <li>
          <UserComment
            userName="Dolla King"
            comment=" Hi, I'm looking for 1 or 2 people who want to share the transportation with 2 more
          people."
          />
        </li>
        <li>
          <UserComment
            userName="Anna Thin"
            comment=" Hi, I'm looking for 1 or 2 people who want to share the transportation with 2 more
          people."
          />
        </li>
      </ul>

      <ContactTraveler />
    </div>
  );
};

export default UserComments;

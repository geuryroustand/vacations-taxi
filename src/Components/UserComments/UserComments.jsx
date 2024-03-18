import { useRouter } from "next/router";
import { useFetchUserCommentsQuery } from "../../redux/SharedRideEndpoints";
import ContactTraveler from "../ContactTraveler/ContactTraveler";
import UserComment from "../UserComment/UserComment";
import styled from "./UserComments.module.css";
import FallBackLoading from "../Loading/FallBackLoading";
import { baseURL } from "../../../environment";

const UserComments = ({ id, user }) => {
  const { query } = useRouter();

  const { data = [], isLoading } = useFetchUserCommentsQuery(
    `${baseURL}/comments/api::share-ride.share-ride:${query?.detailsId}`
  );

  if (isLoading) {
    return <FallBackLoading />;
  }

  return (
    <div className={styled.main}>
      <h3 className={styled.heading}>Comments</h3>
      <ul className={styled.list}>
        {data.map(({ id: commentId, content, author: { name, avatar } }) => (
          <li key={commentId}>
            <UserComment userName={name} comment={content} avatar={avatar} />
          </li>
        ))}
      </ul>

      <ContactTraveler id={id} user={user} />
    </div>
  );
};

export default UserComments;

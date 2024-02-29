import Link from "next/link";

const AuthLinks = ({ title }) => {
  return (
    <>
      <p>{title}</p>
      <Link href="/login">Sign In</Link>
      <p>or</p>
      <Link href="/signup">Create an Account</Link>
    </>
  );
};

export default AuthLinks;

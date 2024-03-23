import Link from "next/link";

const AuthLinks = ({ title, loginText, or, createText }) => {
  return (
    <>
      <p>{title}</p>
      <Link href="/login">{loginText}</Link>
      <p>{or}</p>
      <Link href="/signup">{createText}</Link>
    </>
  );
};

export default AuthLinks;

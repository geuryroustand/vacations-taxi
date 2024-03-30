import { useSelector } from "react-redux";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import FallBackLoading from "../Loading/FallBackLoading";

const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  loading: () => <FallBackLoading />
});
const DynamicNavigation = dynamic(() => import("../Navigation/Navigation"), {
  loading: () => <FallBackLoading />
});

const Layout = ({ children }) => {
  const { locale, pathname } = useRouter();
  const queryKey = `fetchCommonContent("${locale}")`;

  const {
    Company = [],
    Footer = [],
    topLocations = [],
    TopLocations = [],
    company = "",
    helpCenter = {},
    blogs = {},
    DRLink = {},
    carpool = "",
    carpoolLinks = [],
    loginText = "",
    signUpText = "",
    signOutText = "",
    movilNavHeadingText = ""
  } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );

  const isAuthPage = pathname === "/connect/[provider]/redirect";

  return (
    <>
      <DynamicNavigation
        displayNot={isAuthPage}
        helpCenter={helpCenter}
        blogs={blogs}
        companyHeading={company}
        topLocationHeading={topLocations}
        topLocations={TopLocations}
        company={Company}
        carpool={carpool}
        carpoolLinks={carpoolLinks}
        loginText={loginText}
        signUpText={signUpText}
        signOutText={signOutText}
        movilNavHeadingText={movilNavHeadingText}
      />
      <main className="main">{children}</main>
      <DynamicFooter
        displayNot={isAuthPage}
        footer={Footer}
        companyHeading={company}
        company={Company}
        topLocationHeading={topLocations}
        topLocations={TopLocations}
        helpCenter={helpCenter}
        blogs={blogs}
        DRLink={DRLink}
      />
    </>
  );
};

export default Layout;

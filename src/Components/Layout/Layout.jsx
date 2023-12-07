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
  const { locale } = useRouter();
  const queryKey = `getTranslation("${locale}")`;

  const {
    Company = [],
    Footer = [],
    topLocations = [],
    TopLocations = [],
    company = "",
    helpCenter = {},
    blogs = {},
    DRLink = {}
  } = useSelector((state) => state?.fetchApi?.queries[queryKey]?.data?.data?.attributes || {});

  return (
    <>
      <DynamicNavigation
        helpCenter={helpCenter}
        blogs={blogs}
        companyHeading={company}
        topLocationHeading={topLocations}
        topLocations={TopLocations}
        company={Company}
      />
      <main className="main">{children}</main>
      <DynamicFooter
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

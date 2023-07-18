import dynamic from "next/dynamic";
import FallBackLoading from "../Loading/FallBackLoading";
import DiscountShowcase from "../DiscountShowcase/DiscountShowcase";

const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  loading: () => <FallBackLoading />
});
const DynamicNavigation = dynamic(() => import("../Navigation/Navigation"), {
  loading: () => <FallBackLoading />
});

const Layout = ({ children }) => {
  return (
    <>
      <DiscountShowcase />
      <DynamicNavigation />
      <main className="main">{children}</main>
      <DynamicFooter />
    </>
  );
};

export default Layout;

import dynamic from "next/dynamic";
import FallBackLoading from "../Loading/FallBackLoading";
import { useGetTranslationQuery } from "../../redux/fetchApiSlice";

const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
  loading: () => <FallBackLoading />
});
const DynamicNavigation = dynamic(() => import("../Navigation/Navigation"), {
  loading: () => <FallBackLoading />
});

const Layout = ({ children }) => {
  const { data } = useGetTranslationQuery();

  console.log(data);

  return (
    <>
      <DynamicNavigation />
      <main className="main">{children}</main>
      <DynamicFooter />
    </>
  );
};

export default Layout;

/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFetchUserProviderQuery } from "../../../src/redux/AuthenticationEndpoints";
import FallBackLoading from "../../../src/Components/Loading/FallBackLoading";
import { setCookieToken } from "../../../src/Helper/auth";

const RedirectPage = () => {
  const router = useRouter();
  const { provider, access_token: accessToken } = router.query;
  // Todo: need to improve this page
  const { data, isSuccess, isError } = useFetchUserProviderQuery({
    providerName: provider,
    accessToken
  });

  useEffect(() => {
    if (isSuccess && data && !isError) {
      setCookieToken(data);
      router.replace("/");
    }

    // if (isError) {
    //   router.push("/login");
    // }
  }, [isSuccess, isError]);

  return <FallBackLoading />;
};

export default RedirectPage;

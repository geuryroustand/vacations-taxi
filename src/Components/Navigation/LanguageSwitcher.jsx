import { useRouter } from "next/router";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdLanguage } from "react-icons/md";

import styled from "./Navigation.module.css";

const getLanguageTitle = (language) => {
  return language === "en" ? "English" : "Español";
};
const getLanguagePath = (language, pathname) => {
  const basePath = `/${language}${pathname}`;

  return basePath;
};

const LanguageSwitcher = () => {
  const { locale, query, pathname } = useRouter();

  const currentLanguageTitle = getLanguageTitle(locale);
  const hasQueryValue = Object.keys(query).length > 0;

  return (
    !hasQueryValue && (
      <NavDropdown
        title={
          <>
            <MdLanguage size={16} className={styled.languageSwitcherIcon} />
            {currentLanguageTitle}
          </>
        }
        id="offcanvasNavbarDropdown-expand-lg-languages">
        <NavDropdown.Item href={getLanguagePath("en", pathname, query)}>English</NavDropdown.Item>
        <NavDropdown.Item href={getLanguagePath("es", pathname, query)}>Español</NavDropdown.Item>
      </NavDropdown>
    )
  );
};

export default LanguageSwitcher;
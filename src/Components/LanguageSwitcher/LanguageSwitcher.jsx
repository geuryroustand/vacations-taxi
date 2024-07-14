import { useRouter } from "next/router";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdLanguage } from "react-icons/md";

import styled from "./LanguageSwitcher.module.css";

const localesText = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français"
};
const getLanguagePath = (language, pathname) => {
  return pathname === "/" ? `/${language}` : `/${language}${pathname}`;
};

const LanguageSwitcher = (id) => {
  const { locale, query, pathname, locales } = useRouter();

  const hasQueryValue = Object.keys(query).length > 0;

  return (
    !hasQueryValue && (
      <NavDropdown
        title={
          <>
            <MdLanguage size={16} className={styled.languageSwitcherIcon} />
            {localesText[locale]}
          </>
        }
        id={`offcanvasNavbarDropdown-expand-lg-languages-${id}`}>
        {locales.map((language) => (
          <NavDropdown.Item key={language} href={getLanguagePath(language, pathname)}>
            {localesText[language]}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    )
  );
};

export default LanguageSwitcher;

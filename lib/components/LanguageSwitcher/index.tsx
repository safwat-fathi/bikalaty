"use client";

import { useChangeLocale, useScopedI18n } from "@/locales/client";
import { AppLocale } from "@/types/locale";

// import Dropdown from "../Dropdown";
// import { useNav } from "../Navbar/nav.context";

const LanguageSwitcher = () => {
  const tGlobal = useScopedI18n("global");

  const changeLocale = useChangeLocale({ preserveSearchParams: true });

  const handleChange = (locale: AppLocale) => {
    changeLocale(locale);
  };

  return (
    // <Dropdown
    //   trigger={
    //     <div className="flex items-center">
    //       <span className="text-sm font-semibold">language</span>
    //     </div>
    //   }
    //   triggerClassname="flex items-center"
    // >
    <div>
      <ul className="z-10 flex flex-col p-2">
        <li onClick={() => handleChange("ar")}>
          <span>{tGlobal("ar")}</span>
        </li>
        <li onClick={() => handleChange("en")}>
          <span>{tGlobal("en")}</span>
        </li>
      </ul>
    </div>
    //  </Dropdown>
  );
};

export default LanguageSwitcher;

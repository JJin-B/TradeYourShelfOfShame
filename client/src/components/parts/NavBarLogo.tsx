import logo_dark from "/images/logo-TYSS-dark.png";
import logo_light from "/images/logo-TYSS.png";

interface Props {
  isDarkMode?: Boolean;
}

const NavBarLogo: React.FC<Props> = ({ isDarkMode = false }) => {
  return (
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img
        src={isDarkMode ? logo_dark : logo_light}
        className="h-8"
        alt="TYSS Logo"
      />
      <span className="self-center text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-semibold whitespace-nowrap dark:text-white">
        Trade Your Shelf of Shame
      </span>
    </a>
  );
};

export default NavBarLogo;

import "./App.css";
import { MainLayout } from "./components/MainLayout";
import useMenu from "./store/menu/useMenu";
import AppRoutes from "./components/AppRoutes";
import Logout from "./components/Logout/Logout";
import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import {
  AiFillEnvironment,
  AiOutlineBarChart,
  AiOutlineFileText,
} from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { makeStyles } from "@mui/styles";
import Headers from "./components/Headers";
import { useNavigate } from "react-router";
import PopoverMenu from "./components/Popover/Menu";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@react-keycloak/web";
import { Assets } from "./components/Assets/Assets";
const useStyles = makeStyles(() => ({
  toolbarContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  container: {
    width: "100%",
  },
  menuContainer: {
    height: "initial",
    display: "flex",
  },
}));

function App() {
  // const keycloak = useKeycloak();
  const navigate = useNavigate();
  const { t: translate } = useTranslation("common");
  const navigateToHomePage = () => navigate("/");
  const classes = useStyles();
  const { toggleMainMenu } = useMenu();
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const Menus: any = [
    { title: "Dashboard" },
    { title: "Pages", icon: <AiOutlineFileText /> },
    { title: "Media", spacing: true, icon: <AiOutlineBarChart /> },
    {
      title: "Projects",
      submenu: true,
      submenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
        { title: "Submenu 3" },
      ],
    },
    { title: "Analytics" },
    { title: "Profile", spacing: true },
    { title: "Setting" },
    { title: "Logout" },
  ];
  return (
    <div className={classes.menuContainer}>
      <div
        className={`bg-dark-purple h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Tailwind
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ${
              open && "mr-2"
            }`}
          />
          <input
            type={"search"}
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>
        <ul className="pt-2">
          {Menus.map((menu: any, index: any) => (
            <>
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                }`}
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`${subMenuOpen && "rotate-180"}`}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                )}
              </li>
              {menu.submenu && subMenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem: any, index: any) => (
                    <li
                      key={index}
                      className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      {/* <div className={classes.toolbarContainer}>
        {
          <Header
            logo={AiOutlineFileText}
            onClickLogo={navigateToHomePage}
            headerActions={
              <>
                {/* {<Notifications />} */}
      {/* <PopoverMenu
                  dataTestId={"profile-menu-IRM"}
                  isTransparent={false}
                  icon={<Avatar alt="Avatar" src={"AiOutlineFileText"} />}
                  actions={actions}
                  label={translate("profilePicture")}
                  ariaLabel={translate("profilePicture")}
                  ariaDescription={translate("profilePictureAriaDescription")}
                />
              </> */}
      {/* }
          />
        }
      </div> */}
      <div className={classes.container}>
        <Headers></Headers>
        <AppRoutes />
        <MainLayout></MainLayout>
      </div>
    </div>
  );
}

export default App;

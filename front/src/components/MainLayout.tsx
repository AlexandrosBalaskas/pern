import useMenu from "../store/menu/useMenu";
import { Menu } from "./MainMenu";
import { useNavigate } from "react-router";
export const MainLayout = () => {
  const { toggleMainMenu, expanded, menuItems } = useMenu();
  const navigate = useNavigate();

  const selected = [
    {
      id: "REVENUE-CALENDARS",
      title: "Revenue Calendars",
      path: "page/dteForm/list",
      order: 60,
      children: [],
      securableObjectKey: "MENU/registration/revenue-calendars/",
      securableObjectOperation: "VIEW",
    },
  ];
  return (
    <Menu
      open={expanded}
      menuItems={selected}
      // selectedMenuItemId={""}
      onCloseAction={() => {}}
      onClickMenuItem={(item: any) => {
        // filterMenu({ target: { value: "" } });
        toggleMainMenu();
        // selectMainMenuItem(item.id);
        navigate(item.path);
      }}
    ></Menu>
  );
};

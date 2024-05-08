import React from "react";
import {
  ExitToApp,
  Notifications,
  Help,
  ArrowDropDown,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  InfoRounded,
  Close,
  ArrowDropUp,
  Edit,
  Delete,
  DeleteForever,
  Search,
  LastPage,
  FirstPage,
  ArrowRight,
  CheckBox,
  ErrorOutline,
  More,
  Save,
  SelectAllOutlined,
  Visibility,
  OpenInNew,
  Clear,
  Cancel,
  Menu,
  MoreVert,
} from "@mui/icons-material";

const defaultIcons: any = {
  MoreVert,
  InfoRounded,
  Close,
  ArrowDropUp,
  Edit,
  Delete,
  Clear,
  Menu,
  Search: Search,
  LastPage: LastPage,
  OpenInNew: OpenInNew,
  FirstPage: FirstPage,
  ArrowRight: ArrowRight,
  CheckBox,
  DeleteForever: DeleteForever,
  ErrorOutline,
  More,
  Save,
  SelectAllOutlined,
  Visibility: Visibility,
  Cancel,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ExitToApp,
  Notifications,
  Help,
  ArrowDropDown,
};

export const Assets = ({
  input,
  name,
  props,
}: {
  input: string;
  name: string;
  props?: any;
}) => {
  const IconComponent = defaultIcons[name];
  return <IconComponent {...props} />;
};

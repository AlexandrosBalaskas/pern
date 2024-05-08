import { Drawer, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { OpenInNew, ExpandLess, ExpandMore } from "@mui/icons-material";
import AppIconButton from "./AppIconButton/AppIconButton";
import { useState } from "react";

export interface HeaderMenuProps {
  menuItems?: Array<MenuItem>;
  selectedMenuItemId?: string;
  onClickMenuItem: (event: any) => void;
  open?: boolean;
  onCloseAction: () => void;
  children?: any;
}

export interface MenuItem {
  id: string;
  title: string;
  path: string;
  children?: Array<MenuItem>;
  component?: React.ElementType;
}

const NestedListItems = ({
  item,
  onClickMenuItem,
  level = 1,
  selectedId,
}: {
  item: any;
  onClickMenuItem: (item: any) => void;
  level?: number;
  selectedId?: string;
}) => {
  const hasSelectedLevel = (item: any) => {
    return (item.children || []).find(
      (child: any) => child.id === selectedId || !!hasSelectedLevel(child)
    );
  };

  const isSelected = item.id === selectedId;
  const hasSelectedChild = hasSelectedLevel(item);

  const [open, setOpen] = useState(isSelected || hasSelectedChild);

  const handleClick = () => {
    setOpen(!open);
  };

  if (item.children?.length) {
    return (
      <>
        <ListItem button selected={isSelected} onClick={handleClick}>
          <ListItemText primary={item.title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((subItem: any) => {
              return (
                <NestedListItems
                  key={subItem.id}
                  item={subItem}
                  onClickMenuItem={onClickMenuItem}
                  level={level + 1}
                  selectedId={selectedId}
                />
              );
            })}
          </List>
        </Collapse>
      </>
    );
  } else {
    return (
      <div style={{ display: "flex" }}>
        <ListItem
          href={item.path}
          component={item.component !== undefined && item.component}
          selected={isSelected}
          onClick={() => onClickMenuItem(item)}
        >
          <ListItemText primary={item.title} />
        </ListItem>
        <AppIconButton
          id="newWindow"
          label="new"
          onClick={() => window.open(`${item.path}`)}
          icon={<OpenInNew />}
        />
      </div>
    );
  }
};

export const Menu: React.FC<HeaderMenuProps> = ({
  open,
  onCloseAction,
  menuItems,
  onClickMenuItem,
  selectedMenuItemId,
  children,
}) => {
  return (
    <Drawer open={open} onClose={() => onCloseAction()}>
      {children}
      <List>
        {menuItems &&
          menuItems.map((item) => {
            return (
              <NestedListItems
                key={item.id}
                item={item}
                onClickMenuItem={onClickMenuItem}
                selectedId={selectedMenuItemId}
              />
            );
          })}
      </List>
    </Drawer>
  );
};

import { useEffect, useRef } from "react";

const { remote } = window.require("electron");

const { Menu, MenuItem } = remote;

const useContextMenu = (itemArr, targetSelect, deps) => {
  const clickedElement = useRef(null);
  useEffect(() => {
    const menu = new Menu();
    itemArr.forEach(item => {
      menu.append(new MenuItem(item));
    });
    const handleContextMenu = e => {
      if (!document.querySelector(targetSelect).contains(e.target)) return;
      clickedElement.current = e.target;
      menu.popup({
        window: remote.getCurrentWindow()
      });
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [itemArr, targetSelect, deps]);
  return clickedElement;
};

export default useContextMenu;

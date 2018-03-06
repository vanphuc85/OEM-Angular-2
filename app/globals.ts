import { Menu } from "app/menu";

export interface Global {
    menuList: Array<Menu>;
}

export var menuList : Array<Menu>= [
new Menu("device", "devices", true),
new Menu("hierarchy", "devices", true),
new Menu("alerts", "alerts", false),
new Menu("contacts", "contacts", false),
new Menu("login", "logout", false),
];    

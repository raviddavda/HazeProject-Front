import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.MYGAMES, children: "My Games" },
  { to: ROUTES.WISHLIST, children: "Wishlist" },
  { to: ROUTES.ADDGAME, children: "Add a game" },
  { to: ROUTES.SANDBOX, children: "Sandbox" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
];

const loggedInLinks = [
  { to: ROUTES.MYGAMES, children: "My Games" },
  { to: ROUTES.WISHLIST, children: "Wishlist" },
  { to: ROUTES.ADDGAME, children: "Add a game" },
];

const notLoggedInLinks = [
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
];

const adminLinks = [{ to: ROUTES.SANDBOX, children: "Sandbox" }];

export default myLinks;
export { adminLinks, alwaysLinks, loggedInLinks, notLoggedInLinks };

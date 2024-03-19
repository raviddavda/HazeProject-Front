import { Fragment } from "react";
import NavLinkComponent from "../NavLink";
import nextKey from "generate-my-key";
import { alwaysLinks, loggedInLinks, notLoggedInLinks } from "../../myLinks";
import { useSelector } from "react-redux";

const Links = () => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  return (
    <Fragment>
      {alwaysLinks.map((links) => (
        <NavLinkComponent key={nextKey()} to={links.to}>
          {links.children}
        </NavLinkComponent>
      ))}

      {loggedIn &&
        loggedInLinks.map((links) => (
          <NavLinkComponent key={nextKey()} to={links.to}>
            {links.children}
          </NavLinkComponent>
        ))}

      {!loggedIn &&
        notLoggedInLinks.map((links) => (
          <NavLinkComponent key={nextKey()} to={links.to}>
            {links.children}
          </NavLinkComponent>
        ))}
    </Fragment>
  );
};

export default Links;

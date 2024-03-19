import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Route, Routes, Link, matchPath, useLocation } from "react-router-dom";
import {
  adminLinks,
  alwaysLinks,
  loggedInLinks,
  notLoggedInLinks,
} from "../../myLinks";
import myLinks from "../../myLinks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  const routeMatch = useRouteMatch(myLinks.map((link) => link.to));
  const currentTab = routeMatch?.pattern?.path;
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  const adminAccount = useSelector(
    (bigPie) => bigPie?.authSlice?.userData?.isAdmin
  );

  useEffect(() => {
    if (loggedIn) {
      setIsloggedIn(true);
    }
    if (adminAccount) {
      setIsAdmin(true);
    }
  }, [loggedIn, adminAccount]);

  return (
    <Tabs
      value={currentTab || false}
      textColor="inherit"
      indicatorColor="secondary"
      variant="scrollable"
      scrollButtons={true}
      allowScrollButtonsMobile
    >
      {alwaysLinks.map((link, index) => (
        <Tab
          key={index}
          label={link.children}
          value={link.to}
          to={link.to}
          component={Link}
        />
      ))}
      {isLoggedIn &&
        loggedInLinks.map((link, index) => (
          <Tab
            key={index}
            label={link.children}
            value={link.to}
            to={link.to}
            component={Link}
          />
        ))}
      {!isLoggedIn &&
        notLoggedInLinks.map((link, index) => (
          <Tab
            key={index}
            label={link.children}
            value={link.to}
            to={link.to}
            component={Link}
          />
        ))}
      {isAdmin &&
        adminLinks.map((link, index) => (
          <Tab
            key={index}
            label={link.children}
            value={link.to}
            to={link.to}
            component={Link}
          />
        ))}
    </Tabs>
  );
}

function CurrentRoute() {
  //eslint-disable-next-line
  const location = useLocation();
}

export default function TabsRouter() {
  return (
    <Box>
      <Routes>
        <Route path="*" element={<CurrentRoute />} />
      </Routes>
      <MyTabs />
    </Box>
  );
}

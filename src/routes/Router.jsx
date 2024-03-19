import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import AuthGuard from "../Guard/AuthGuard";
import AuthGuardBiz from "../Guard/AuthGuardBiz";
import AboutPage from "../pages/about/AboutPage";
import MyGamesPage from "../pages/myGames/MyGamesPage";
import GamePage from "../pages/gamePage/GamePage";
import WishlistPage from "../pages/wishlist/WishlistPage";
import ProfilePage from "../pages/profile/ProfilePage";
import AdminGuard from "../Guard/AdminGuard";
import UpdateUser from "../pages/profile/UpdateUser";
import UserManagerPage from "../pages/userManagment/UserManagerPage";
import NotLoggedInGuard from "../Guard/NotLoggedInGuard";
import AddGamePage from "../pages/gameEdit/addGamePage";
import EditGamePage from "../pages/gameEdit/EditGamePage";
import ActionPage from "../pages/categories/actionPage/ActionPage";
import AdventurePage from "../pages/categories/adventurePage/AdventurePage";
import RpgPage from "../pages/categories/rpgPage/RpgPage";
import ShooterPage from "../pages/categories/shooterPage/ShooterPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.ACTION} element={<ActionPage />} />
      <Route path={ROUTES.ADVENTURE} element={<AdventurePage />} />
      <Route path={ROUTES.RPG} element={<RpgPage />} />
      <Route path={ROUTES.SHOOTER} element={<ShooterPage />} />
      <Route
        path={ROUTES.REGISTER}
        element={
          <NotLoggedInGuard>
            <RegisterPage />
          </NotLoggedInGuard>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <NotLoggedInGuard>
            <LoginPage />
          </NotLoggedInGuard>
        }
      />
      <Route
        path={`${ROUTES.GAMEEDIT}/:id`}
        element={
          <AuthGuard>
            <AuthGuardBiz>
              <EditGamePage />
            </AuthGuardBiz>
          </AuthGuard>
        }
      />
      <Route path={`${ROUTES.GAMEPAGE}/:id`} element={<GamePage />} />
      <Route
        path={ROUTES.WISHLIST}
        element={
          <AuthGuard>
            <WishlistPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYGAMES}
        element={
          <AuthGuard>
            <AuthGuardBiz>
              <MyGamesPage />
            </AuthGuardBiz>
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.ADDGAME}
        element={
          <AuthGuard>
            <AuthGuardBiz>
              <AddGamePage />
            </AuthGuardBiz>
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.PROFILE}/:id`}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.PROFILEEDIT}/:id`}
        element={
          <AuthGuard>
            <UpdateUser />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <AuthGuard>
            <AdminGuard>
              <UserManagerPage />
            </AdminGuard>
          </AuthGuard>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;

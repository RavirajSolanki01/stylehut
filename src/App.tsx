import { Routes, Route } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

import "./App.css";
import { LoginPage } from "./pages/Login";
import { VerifyOtpPage } from "./pages/VerifyOTP";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { HomePage } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { SavedCards } from "./components/UserProfile/SavedCards";
import { ProfileDetails } from "./components/UserProfile/ProfileDetails";
import { Overview } from "./components/UserProfile/Overview";
import { Orders } from "./components/UserProfile/Orders/index.tsx";
import { Coupons } from "./components/UserProfile/Coupons";
import { MyntraCredits } from "./components/UserProfile/Credits";
import { Myncash } from "./components/UserProfile/Myncash";
import { SavedUPI } from "./components/UserProfile/SavedUPI";
import { SavedWallets } from "./components/UserProfile/Wallets";
import { Addresses } from "./components/UserProfile/Addresses";
import { Insider } from "./components/UserProfile/Insider";
import { DeleteAccount } from "./components/UserProfile/DeleteAccount";
import { TermsOfUse } from "./components/UserProfile/TermsOfUse";
import { PrivacyPolicy } from "./components/UserProfile/PrivacyPolicy";
import { PublicRoute } from "./components/PublicRoutes.tsx";
import { ProductList } from "./pages/ProductList/index.tsx";
import { Wishlist } from "./pages/Wishlist/index.tsx";
import ProductDetailPage from "./pages/Product/index.tsx";
import "./style.css";
import { RootState } from "./store/index.ts";
import { ProductCart } from "./pages/Cart/index.tsx";
import { Reviews } from "./pages/Reviews/index.tsx";
import NotFoundPage from "./pages/not-found/index.tsx";
import Layout from "./components/Layout/index.tsx";

function App() {
  const { users } = useSelector((state: RootState) => ({
    users: state.users.user,
  }));
  const isAuthenticated: boolean = users.isAuthenticated;

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={PUBLIC_ROUTES.DASHBOARD} element={<HomePage />} />
          <Route path={PUBLIC_ROUTES.HOME} element={<HomePage />} />
          <Route
            path={PUBLIC_ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={PUBLIC_ROUTES.VERIFY_OTP}
            element={
              <PublicRoute>
                <VerifyOtpPage />
              </PublicRoute>
            }
          />
          <Route
            path={PUBLIC_ROUTES.DASHBOARD}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.PRODUCT_LIST}
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path={PUBLIC_ROUTES.PRODUCT_DETAIL}
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ProductDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.WISHLIST}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.CART}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} path="cart">
                <ProductCart />
              </ProtectedRoute>
            }
          />
          <Route
            path={PRIVATE_ROUTES.REVIEWS}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Reviews />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={PRIVATE_ROUTES.PROFILE}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route
              path={PRIVATE_ROUTES.MYPROFILE}
              element={<ProfileDetails />}
            />
            <Route path={PRIVATE_ROUTES.OVERVIEW} element={<Overview />} />
            <Route path={PRIVATE_ROUTES.ORDERS} element={<Orders />} />
            <Route path={PRIVATE_ROUTES.COUPONS} element={<Coupons />} />
            <Route path={PRIVATE_ROUTES.CREDIT} element={<MyntraCredits />} />
            <Route path={PRIVATE_ROUTES.MYNCASH} element={<Myncash />} />
            <Route path={PRIVATE_ROUTES.SAVEDCARDS} element={<SavedCards />} />
            <Route path={PRIVATE_ROUTES.SAVEDUPIS} element={<SavedUPI />} />
            <Route
              path={PRIVATE_ROUTES.SAVEDWALLETS}
              element={<SavedWallets />}
            />
            <Route path={PRIVATE_ROUTES.ADDRESSES} element={<Addresses />} />
            <Route path={PRIVATE_ROUTES.INSIDER} element={<Insider />} />
            <Route
              path={PRIVATE_ROUTES.DELETEACCOUNT}
              element={<DeleteAccount />}
            />
            <Route path={PRIVATE_ROUTES.TERMSOFUSE} element={<TermsOfUse />} />
            <Route
              path={PRIVATE_ROUTES.PRIVACYPOLICY}
              element={<PrivacyPolicy />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;

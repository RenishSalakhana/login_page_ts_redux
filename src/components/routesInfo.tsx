import React, { lazy, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/appStore";

interface Arrays {
  arrUsers: any[];
  loginUserIndex: number;
}

const RoutesInfo = () => {
  const [state, setState] = useState<Arrays>({
    arrUsers: [],
    loginUserIndex: -1,
  });

  const LoginLazy = lazy(() => import("./login"));

  const RegisterLazy = lazy(() => import("./register"));

  const ProfileLazy = lazy(() => import("./profile"));

  const InfoLazy = lazy(() => import("./info"));

  const Loading = () => {
    return <div>Loading Module...</div>;
  };

  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <LoginLazy />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <RegisterLazy />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loading />}>
              <ProfileLazy />
            </Suspense>
          }
        />
        <Route
          path="/info"
          element={
            <Suspense fallback={<Loading />}>
              <InfoLazy />
            </Suspense>
          }
        />
      </Routes>
    </Provider>
  );
};

export default RoutesInfo;

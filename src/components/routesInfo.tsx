import React, { lazy, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import { RoutesArrays } from "../interfaces/interface";
import Loader from "../common/Loader"

const RoutesInfo = () => {
  const [state, setState] = useState<RoutesArrays>({
    arrUsers: [],
    loginUserIndex: -1,
  });

  const LoginLazy = lazy(() => import("./login"));
  const RegisterLazy = lazy(() => import("./register"));
  const HomeLazy = lazy(() => import("./home"));

  // Check if the user is logged in (based on loginUserIndex)
  const isLoggedIn = state.loginUserIndex !== -1;

  return (
    <Provider store={store}>
      <Routes>
        {/* If user is not logged in, show the login page */}
        {!isLoggedIn && (
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}> {/* Use the Loader component here */}
                <LoginLazy />
              </Suspense>
            }
          />
        )}

        {/* If user is logged in, show the home page */}
        {isLoggedIn && (
          <Route
            path="/home"
            element={
              <Suspense fallback={<Loader />}> {/* Use the Loader component here */}
                <HomeLazy />
              </Suspense>
            }
          />
        )}

        {/* Common routes */}
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader />}> {/* Use the Loader component here */}
              <RegisterLazy />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <Suspense fallback={<Loader />}> {/* Use the Loader component here */}
              <HomeLazy />
            </Suspense>
          }
        />
      </Routes>
    </Provider>
  );
};

export default RoutesInfo;

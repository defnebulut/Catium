import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import admins from "./pages/admins/admins";
import { useState, useEffect } from 'react';
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Newcat from "./pages/new/Newcat"
import Newadmin from "./pages/new/Newadmin";
import Newsuperadmin from "./pages/new/Newsuperadmin";
import Catlist from "./pages/list/Catlisti";
import Adminlist from "./pages/list/Adminlist";
import Superadminlist from "./pages/list/Superadminlist";
import Reportuserlist from "./pages/list/Reportuserlist";
import Reportarticlelist from "./pages/list/Reportarticlelist";
import Reportcommentlist from "./pages/list/Reportcommentlist";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs, catInputs, adminInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import LoginForm from "./pages/login/Login";
import Layout from "./components/auth/Layout"
import RequireAuth from "./components/auth/RequireAuth";


const ROLES = {
  'User': "Admin",
  'Editor': "SuperAdmin",
  'Admin': "Moderator"
}

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<New />} />
          <Route path="linkpage" element={<New />} />
          <Route path="unauthorized" element={<New />} />

          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]}
                fallback={<Navigate to="/" replace />}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/users/:userId" element={<Single />} />
            <Route path="users" element={<List />} />

            <Route
              path="users/new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
            <Route path="userreports" element={<Reportuserlist />} />
            <Route path="articlereports" element={<Reportarticlelist />} />
            <Route path="commentreports" element={<Reportcommentlist />} />
            <Route path="category" element={<Catlist />} />
            <Route
              path="category/newcat"
              element={<Newcat inputs={catInputs} title="Add New Category" />}
            />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Editor, ROLES.Admin]}
                fallback={<Navigate to="/" replace />}
              />
            }
          >
            <Route path="admins" element={<Adminlist />} />
            <Route
              path="admins/newadmin"
              element={<Newadmin inputs={adminInputs} title="Add New Admin" />}
            />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Admin]}
                fallback={<Navigate to="/" replace />}
              />
            }
          >
            <Route path="superadmins" element={<Superadminlist />} />
            <Route
              path="superadmins/newsuperadmin"
              element={
                <Newsuperadmin
                  inputs={adminInputs}
                  title="Add New SuperAdmin"
                />
              }
            />
          </Route>

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

/*function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLoggedInStatus();
  }, []);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Routes>
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<List />} />
            <Route path="/users/:userId" element={<Single />} />
            <Route
              path="/users/new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
            <Route path="/admins" element={<List />} />
            <Route path="/admins/:adminId" element={<Single />} />
            <Route
              path="/admins/new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
            <Route path="/products" element={<List />} />
            <Route path="/products/:productId" element={<Single />} />
            <Route
              path="/products/new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace={true} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;*/

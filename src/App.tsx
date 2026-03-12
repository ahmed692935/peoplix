import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./routes/private";
import Dashboard from "./pages/Admin/Dashboard";
import UserDashboard from "./pages/Users/Dashboard";
import { Toaster } from "react-hot-toast";

// import admin pages
import Agents from "./pages/Admin/Agents";
import Users from "./pages/Admin/Users";
import Layout from "./Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/signin" element={<Login />} />

          {/* Admin Route */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/agents"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Agents />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Users />
                </PrivateRoute>
              }
            />
          </Route>
          
          {/* User Route */}
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;

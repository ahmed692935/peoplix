import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./routes/private";
import Dashboard from "./pages/Admin/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* <LandingPage /> */}
      {/* <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </Router> */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/signin" element={<Login />} />

          {/* Admin Route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* User Route */}
          {/* <Route
            path="/test"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <TestPage />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>

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

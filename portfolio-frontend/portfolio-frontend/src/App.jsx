import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";


//Helper component to protect admin routes (renders conditionally based on auth status and role)
const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  // If not authenticated, redirect to login page component
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated but not admin, redirect to home component
  if (role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  //IF admin, render the children components (admin pages)
  return children;
};

function App() {
  return (
    <>

      {/* Navigation bar always visible */}
      <Navbar />

      {/* Route definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Protected Admin Route */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

      </Routes>


    </>
  );
}


export default App


//Pages and routes are defined here, and the Navbar is included to be visible on all pages.

/*
Notes on Security and Access Control:
We are protecting the admin panel in three ways:
1. UI: The Navbar only shows the "Admin Panel" link if the user is authenticated and has the "ADMIN" role. 
So visually on the application, regular users won't even see the option to navigate to the admin panel.

2. Frontend Route Protection: The AdminRoute component checks if the user is authenticated and has the "ADMIN" role before rendering the admin page.
This ensures that even if a regular user tries to access the admin URL directly, they won't be able to see the admin content.
This is know as conditional rendering based on authentication and role.

3. Backend API Protection: It's crucial to note that the backend API endpoints for admin functions must also be protected.
Even if a user somehow accesses the admin panel on the frontend, they should not be able to perform any admin actions unless they have the proper authentication and role.
This is typically done by checking the user's token and role on the server side before allowing access to admin functionalities.
Done by implmenting @PreAuthorize("hasRole('ADMIN')") on the backend controller methods that handle admin actions.

JWT carries role claim, and since it's a context, it's somethign we can acess and read
from the user at any time.

*/
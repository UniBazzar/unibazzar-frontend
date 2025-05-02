import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailPage from "./pages/ListingDetails";
import MarketplacePage from "./pages/MarketplacePage";
import Account from "./pages/Accout";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard";
import SimilarItemsPage from "./pages/SimilarItemsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/listings" element={<MarketplacePage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/similar/:id" element={<SimilarItemsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Protected Routes */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateListingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

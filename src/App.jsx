import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailPage from "./pages/ListingDetails";
import MarketplacePage from "./pages/MarketplacePage";
import Account from "./pages/Accout";
import About from "./pages/About";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create" element={<CreateListingPage />} />
          <Route path="/listings" element={<MarketplacePage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;

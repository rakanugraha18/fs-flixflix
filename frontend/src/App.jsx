import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // Use the useLocation hook to get the current location
  const location = useLocation();

  // Conditionally render the Header and Footer based on the location
  // NavBar and Footer will not be rendered at account page
  const showHeader =
    location.pathname !== "/Login" && location.pathname !== "/Register"; // Example condition
  const showFooter =
    location.pathname !== "/Login" && location.pathname !== "/Register"; // Example condition

  return (
    <>
      {showHeader && <Header />}
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
  );
}

export default App;

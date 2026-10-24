import {
  Routes,
  Route,
  useParams,
  Link,
  NavLink,
  useNavigate,
} from "react-router";
import CatalogPage from "./pages/CatalogPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ShowPage from "./pages/ShowPage";
import Layout from "./components/Layout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/show/:id" element={<ShowPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

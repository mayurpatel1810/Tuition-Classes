import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { InstituteProvider } from "./context/InstituteContext";
import AppRoutes from "./routes/AppRoutes";
import "./assets/styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InstituteProvider>
          <AppRoutes />
        </InstituteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

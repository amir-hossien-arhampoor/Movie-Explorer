
import { BrowserRouter } from "react-router";
import AnimatedRoutes from "./ui/AnimatedRoutes";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;

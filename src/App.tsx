
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Question from "./pages/Question";
import NotFound from "./pages/NotFound";
// import { ToastProvider } from "./hooks/use-radix-toast";
import "./App.css";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/question" element={<Question />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;

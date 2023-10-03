import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notfound from "./pages/NotFound/Notfound";
import Auth from "./pages/Authentication/Index";
import ExpenseTracker from "./pages/Expense/Index";
// import { useAuthRedirect } from "./hooks/useAuthRedirect";

function App() {
  // useAuthRedirect();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Auth />} />
          <Route index path="/expense-tracker" element={<ExpenseTracker />} />
          <Route index path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

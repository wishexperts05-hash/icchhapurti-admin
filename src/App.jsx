import {
  BrowserRouter as Router
} from "react-router-dom";
import './App.css'
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Router>
      <PublicRoute />   
    </Router>
  );
}

export default App;

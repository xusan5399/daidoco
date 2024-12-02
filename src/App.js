import "./styles.css";
import Auth from "./Auth";
import Home from "./Home";
import Navbar from "./Navbar";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Auth />
        <Home />
      </div>
    </div>
  );
}

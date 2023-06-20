import "./App.css";
import { Router } from "@reach/router";
import AddPost from "./pages/AddPost";
import Home from "./components/Home";
import EditForm from "./components/EditPost";

function App() {
  return (
    <Router>
      <Home path="/" />
      <AddPost path="/new" />
      <EditForm path="/articles/:id/edit" />
    </Router>
  );
}

export default App;

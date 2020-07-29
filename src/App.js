import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Index from "./pages";
import { getStorage } from "./utils/helpers";
import Navbar from "./components/Home/Navbar";

function App() {
  const isAuthenticated = getStorage("login");
  return (
    <Router>
      {!isAuthenticated ? (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      )}
    </Router>
  );
}

export default App;

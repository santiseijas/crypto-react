import { makeStyles, withTheme } from "@material-ui/core";
import { BrowserRouter, Route, } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#505050",
      color: "white",
      minHeight: "100vh",
    },
  }));
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />

        <Route path="/" component={HomePage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />

      </div>
    </BrowserRouter>
  );
}

export default App;

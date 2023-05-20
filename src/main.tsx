import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import store from "./app/store.ts";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./mui.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer hideProgressBar autoClose={1000}></ToastContainer>
  </BrowserRouter>
);

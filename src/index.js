import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./component/GlobalStyle/GlobalStyle.js";
import { persistor } from "./redux/store";
import "react-awesome-lightbox/build/style.css";
import i18n from "./utils/i18n"; //change language
import { Suspense } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* <React.StrictMode> */}
            <BrowserRouter>
                <GlobalStyle>
                    <Suspense fallback="...is loading">
                        <App />
                    </Suspense>
                </GlobalStyle>
            </BrowserRouter>
            {/* </React.StrictMode> */}
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

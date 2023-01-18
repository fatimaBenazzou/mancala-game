import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import { Provider } from "react-redux";
import store from "app/store";

import "index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={Router} />
        </Provider>
    </React.StrictMode>
);

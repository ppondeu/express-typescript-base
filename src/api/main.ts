// --- package imports
import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// --- local imports
import { SERVER_HOST, SERVER_PORT, globalErrorHandler, routeNotFoundHandler } from "../core/index.js";
import rootRoute from "./root-route.js";
import { userRoute } from "./modules/index.js";
// ---

const app = express();

app.use(json())

app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/", rootRoute);

app.use("/users", userRoute);
app.use(routeNotFoundHandler);

app.use(globalErrorHandler);

app.listen(SERVER_PORT, SERVER_HOST!, () => console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`));
// packages
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

// setting up the server 
import express from 'express';
const app = express();
const port = process.env.DEVELOPMENT_PORT || process.env.PRODUCTION_PORT;

// db middleware
import "./databases/connection.js"

// session
app.use(session(
    {
        secret: "5fac284039f4f08d68a40021127ce91de9795c1eaa28d7f5b60725def39fc5925addfd8cecf6a22b1e3dcdb4f1a586ba0cf26235aedd669ab52fbe08bd563d5f",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
    }
))

// middlewares configuration
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));

// api rate limit middleware
import { apiRequestLimiter } from './middlewares/ratelimit.middleware.js';
app.use(apiRequestLimiter)

// route
app.get("/", (request, response) => {
    response.send("Gaditek");
})

// express middlewares
import { jwtVerification } from './middlewares/verification.middleware.js';

// api routes
import adminRoutes from "./routes/login.routes.js";
import userRoutes from "./routes/user.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import { authorizationMiddleware, authorizedMiddleware } from './middlewares/authorization.middleware.js';

app.use("/api", adminRoutes);
app.use("/api", jwtVerification, userRoutes);
app.use("/api/billing", jwtVerification, billingRoutes);

// 404 routes
app.use((request, response) => {
    response.status(404).send("404! Page not found")
})

// server running
app.listen(port, () => { console.log("server is running on port ", `http://localhost:${port}`); })

// exporting server
export default app;




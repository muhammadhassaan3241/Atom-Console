// packages
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from "morgan";
import cors from "cors";

// setting up the server
import express from 'express';
const app = express();
const port = process.env.DEVELOPMENT_PORT || process.env.PRODUCTION_PORT;

// db middleware
import './databases/connection.js';

// session
app.use(session(
  {
    secret: process.env.SESSION_SECRET_KEY,
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
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// api rate limit middleware
import { apiRequestLimiter } from './middlewares/ratelimit.middleware.js';
app.use(apiRequestLimiter);

// routes
app.get('/', (request, response) => {
  response.send('Gaditek');
});

// express middlewares
import { jwtVerification } from './middlewares/verification.middleware.js';

// api routes
import adminRoutes from "./routes/login.routes.js";
import userRoutes from "./routes/user.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import vpnManagementRoutes from "./routes/vpn-account-management.routes.js";
// import { authorizationMiddleware, authorizedMiddleware } from './middlewares/authorization.middleware.js';


app.use("/api", adminRoutes);
app.use("/api", jwtVerification, userRoutes);
app.use("/api/billing", jwtVerification, billingRoutes);
app.use("/api/dashboard", jwtVerification, dashboardRoutes);
app.use("/api/vpn", jwtVerification, vpnManagementRoutes);

// 404 routes
app.use((request, response) => {
  response.status(404).send('404! Page not found');
});

// server running
app.listen(port, () => {
  console.log('server is running on port ', `http://localhost:${port}`);
});

// exporting server
export default app;

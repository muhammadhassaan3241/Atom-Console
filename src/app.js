const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { development, production } = require("./config/config.js");
const { jwtVerification } = require("./helpers/verification.js");

const app = express();
const port = development.port || production.port;

require("./database/connection.js");

app.use(
  session({
    secret: development.session,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/user.js");
const dashboardRoutes = require("./routes/dashboard.js");
const partnerBillingRoutes = require("./routes/partner-billing.js");
const vpnAccountManagementRoutes = require("./routes/vpn-account-management.js");
app.use("/api/admin", adminRoutes);
app.use("/api/user", jwtVerification, userRoutes);
app.use("/api/dashboard", jwtVerification, dashboardRoutes);
app.use("/api/billing", jwtVerification, partnerBillingRoutes);
app.use("/api/vpn", jwtVerification, vpnAccountManagementRoutes);

app.listen(port, function () {
  console.log("http://localhost:", port);
});

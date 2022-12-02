const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const path = require("path");
var cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const port = process.env.PORT || 5000;
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

const YOUR_DOMAIN = "https://stayhealthy-frontend.onrender.com";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1MATAjSIf0U3atsp3wQ1gji3",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/BookSuccess`,
    cancel_url: `${YOUR_DOMAIN}/BookCancel`,
  });

  res.redirect(303, session.url);
});

app.get("/*", (req, res) =>
  res.redirect("https://stayhealthy-frontend.onrender.com")
);

app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));

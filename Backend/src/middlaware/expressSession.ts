import session from "express-session";

const expressSession = session({
  secret: "sujan", // use env in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3000000, // ~50 minutes
    sameSite: "lax",
    secure: false, // set to true if using HTTPS
  },
});

export default expressSession;

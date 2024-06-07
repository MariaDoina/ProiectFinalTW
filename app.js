var express = require("express");
var app = express();
const path = require("path");
const session = require("express-session");
const formidable = require("formidable");
const fs = require("fs");
const ejs = require("ejs");

//register view engine
app.set("view engine", "ejs");

app.use(
  session({
    secret: "abcdefg",
    resave: true,
    saveUninitialized: false,
  })
);

//middleware and static files(for style.css)
app.use(express.static("public"));
//app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", function (req, res) {
  res.render("login", { message: req.query.message });
});

app.get("/signup", function (req, res) {
  var username = req.query.username;
  var password = req.query.pass;

  // Verificăm dacă parola respectă pattern-ul
  var passwordPattern = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]).{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.render("login", {
      error:
        "Password must contain at least 8 characters and at least one special character.",
    });
  }

  var user = {
    username: username,
    pass: password,
  };

  if (fs.existsSync("users.json")) {
    var data = fs.readFileSync("users.json");
    var users = JSON.parse(data);
  } else {
    var users = [];
  }

  users.push(user);

  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  // Salvarea utilizatorului în fișierul JSON și redirecționarea către pagina de login cu un mesaj de succes
  res.redirect(
    "/?message=Account created successfully. Please login with your credentials."
  );
});

app.post("/login", function (req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    const user = checkUser(fields.username, fields.pass);
    if (user) {
      req.session.username = fields.username;
      res.redirect("/home");
    } else {
      req.session.username = false;
      res.render("login", { error: "Invalid username or password" });
    }
  });
});
app.get("/logout", function (req, res) {
  res.render("logout", { nume: req.session.username });
});

app.get("/signout", function (req, res) {
  req.session.username = false;
  res.redirect("/");
});

function checkUser(username, password) {
  if (fs.existsSync("users.json")) {
    const data = fs.readFileSync("users.json");
    const users = JSON.parse(data);

    for (i in users) {
      if (users[i].username === username[0] && users[i].pass === password[0]) {
        return username[0];
      }
    }
  }

  return false;
}

app.get("/home", (req, res) => {
  res.render("index", { username: req.session.username });
});

app.get("/shop", (req, res) => {
  res.render("shop", { username: req.session.username });
});

app.get("/sproduct", (req, res) => {
  fs.readFile("comments.json", (err, data) => {
    if (err) {
      console.error("Eroare la citirea fișierului JSON:", err);
      res.status(500).send("Eroare la citirea comentariilor");
      return;
    }

    const comments = JSON.parse(data);
    res.render("sproduct", {
      username: req.session.username,
      comments: comments,
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", { username: req.session.username });
});

app.get("/contact", (req, res) => {
  res.render("contact", { username: req.session.username });
});

app.get("/cart", (req, res) => {
  res.render("cart", { username: req.session.username });
});

app.listen(5000, () => {
  console.log("App is running on port 5000!");
});

// //404 page
app.use((req, res, next) => {
  //console.log(`Ruta solicitată: ${req.url}`);
  res.status(404).render("404", { title: "404" });
});

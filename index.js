const express = require("express");
const app = express();
const port = 5000;

app.set("view engine", "hbs");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

let projects = [
  {
    title: "Ini Contoh",
    descr: " Contoh Aaja",
    duration: [],
  },
];

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/home", function (req, res) {
  console.log(projects);
  res.render("index", { projects });
});

app.get("/add-project", function (req, res) {
  res.render("add-project");
});

app.post("/add-project", function (req, res) {
  let data = req.body;

  data = {
    title: data.projectName,
    descr: data.inputDesc,
    start: data.inputDateStart,
    end: data.inputDateEnd,
    duration: getDuration(data.inputDateStart, data.inputDateEnd),
    node: checkboxes(data.inputNode),
    react: checkboxes(data.inputReact),
    next: checkboxes(data.inputNext),
    type: checkboxes(data.inputType),
  };

  projects.push(data);
  console.log(projects);
  res.redirect("/home");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/edit-project/:index", function (req, res) {
  res.render("edit-project");
  let index = req.params.index;
  let dataProject = projects[index];

  res.render("edit-project", { project: dataProject, index });
});

app.post("/edit-project/:index", function (req, res) {
  let data = req.body;
  let index = req.params.index;

  projects[index].title = data.projectName;
  projects[index].descr = data.inputDesc;
  projects[index].start = data.inputDateStart;
  projects[index].end = data.inputDateEnd;
  projects[index].duration = getDuration(data.inputDateStart, data.inputDateEnd);
  projects[index].node = checkboxes(data.inputNode);
  projects[index].react = checkboxes(data.inputReact);
  projects[index].next = checkboxes(data.inputNext);
  projects[index].type = checkboxes(data.inputType);

  res.redirect("/home");
});

app.get("/project-detail/:index", function (req, res) {
  res.render("project-detail");
  let index = req.params.index;
  let home = projects[index];

  res.render("project-detail", home);
});

app.get("/delete-project/:index", function (req, res) {
  console.log(req.params.index);

  let index = req.params.index;

  projects.splice(index, 1);

  res.redirect("/home");
});

app.listen(port, function () {
  console.log(`server listen on port ${port}`);
});

function getDuration(start, end) {
  let sdate = new Date(start);
  let edate = new Date(end);
  let duration = edate.getTime() - sdate.getTime();
  let month = Math.ceil(duration / (1000 * 3600 * 24 * 30));
  let day = duration / (1000 * 3600 * 24);

  if (day < 30) {
    return day + " Hari";
  } else if (day > 30 && day <= 30) {
    return day + " bulan";
  } else if (month < 12) {
    return month + " Bulan";
  }
}

function checkboxes(condition) {
  if (condition === "on") {
    return true;
  } else {
    return false;
  }
}

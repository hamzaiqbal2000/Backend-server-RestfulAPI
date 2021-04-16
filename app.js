// restful API
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body); //object destructuring //equilant to result.error

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
//route parameters //query string parameters
// app.get("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id == parseInt(req.params.id));
//   if (!course)
//     req.status(404).send("The course with given id was not available");
//   res.send(course);
// });

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course you searched for is not available");
  }
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //look up for the course
  //if not existing, return 404
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course you for is not available");
  }

  //validate
  //If invalid, return 400 - Bad Request
  const { error } = validateCourse(req.body); //object destructuring //equilant to result.error

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //update course
  course.name = req.body.name;
  res.send(course);
  //Return the updated course
});

app.delete("/api/courses/:id", (req, res) => {
  //look uo the course
  const course = courses.find((c) => c.id == parseInt(req.params.id));

  //if not existing then return 404
  if (!course) {
    return res.status(404).send("Course is not existing");
  }

  //else delete it
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //return the course
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

// const os = require("os");

// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

// //modules, require, exports, __filename, __dirname

//path
// const path = require("path");

// var path1 = path.parse(__filename);

// console.log(path1);

//file system - module

// const fs = require("fs");

// // var files = fs.readdirSync("./");
// // console.log(files);
// //async redddir

// fs.readdir("./", function (err, files) {
//   if (err) {
//     console.log("Error", Error);
//   } else {
//     console.log("Result", files);
//   }
// });

//EVENTS

// const EventEmitter = require("events");
// const Logger = require("./logger");

// const logger = new Logger();

// //add a listener
// logger.on("messageLogged", (arg) => {
//   //e, eventarg
//   console.log("listener activated", arg);
// });

// logger.log("message");

// const EventEmitter = require("events"); //class
// var emitter = new EventEmitter(); //object

// //implement listener
// emitter.on("logging", (arg) => {
//   console.log("Listener activated", arg);
// });

// //raise an emit/signal/event
// emitter.emit("logging", { data: "message" });

//HTTP module

// const http = require("http"); //import
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("hello world");
//     res.end();
//   }

//   if (req.url === "/api/classes") {
//     res.write(JSON.stringify([1, 2, 3]));
//     res.end();
//   }
// });

// //request listener
// server.on("connection", (socket) => {
//   console.log("Connection..");
// });

//raise an event
// server.listen(3000);
// console.log("Listening on port 3000...");

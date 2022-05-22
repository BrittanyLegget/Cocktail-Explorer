const fs = require("fs");

export default async function handler(req, res) {
  //Write GET to microservice.txt file
  if (req.method === "POST") {
    return new Promise((resolve, reject) => {
      fs.writeFile("../microservice/microservice.txt", req.body, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("file written");
        resolve();
      });
    });
  }

  //Get data from microservice.txt file
  if (req.method === "GET") {
    return new Promise((resolve, reject) => {
      fs.readFile("../microservice/microservice.txt", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send({ data: data });
        resolve();
      });
    });
  }
  return;
}

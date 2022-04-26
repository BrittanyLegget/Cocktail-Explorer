const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const ds = require("./datastore");
const datastore = ds.datastore;

const LABELS = "Labels";

router.use(bodyParser.json());

/* ------------- Begin Spirit Model Functions ------------- */

//Create a Spirit
function post_label(name, spirit, description) {
  var key = datastore.key(LABELS);
  const data = {
    name: name,
    spirit: spirit,
    description: description,
  };
  return datastore.save({ key: key, data: data }).then(() => {
    return key;
  });
}

//Get all labels - paginated
function get_labels(req) {
  var q = datastore.createQuery(LABELS).limit(10);
  const results = {};
  if (Object.keys(req.query).includes("cursor")) {
    q = q.start(req.query.cursor);
  }
  return datastore.runQuery(q).then((entities) => {
    results.labels = entities[0].map(ds.fromDatastore);
    if (entities[1].moreResults !== ds.Datastore.NO_MORE_RESULTS) {
      results.next =
        req.protocol +
        "://" +
        req.get("host") +
        req.baseUrl +
        "?cursor=" +
        entities[1].endCursor;
    }
    return results;
  });
}

//Get label by id
function get_label(id) {
  const key = datastore.key([LABELS, parseInt(id, 10)]);
  return datastore.get(key).then((entity) => {
    if (entity[0] === undefined || entity[0] === null) {
      console.log(entity);
      // No entity found. Don't try to add the id attribute
      return entity;
    } else {
      entity = entity.map(ds.fromDatastore);
      return entity;
    }
  });
}

//update boat
function put_label(id, name, spirit, description) {
  const key = datastore.key([LABELS, parseInt(id, 10)]);
  const data = { name: name, spirit: spirit, description: description };
  return datastore.save({ key: key, data: data });
}

//delete spirit
function delete_label(id) {
  const key = datastore.key([LABELS, parseInt(id, 10)]);
  return datastore.delete(key);
}

/* ------------- End Model Functions ------------- */

/* ------------- Begin Controller Functions ------------- */

// Get all labels
router.get("/", function (req, res) {
  get_labels(req).then((data) => {
    res.status(200).json(data);
  });
});

// Get a label by id
router.get("/:id", function (req, res) {
  get_label(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      // The 0th element is undefined. This means there is no boat with this id
      res.status(404).json({ Error: "No label with this id exists" });
    } else {
      res.status(200).json({
        id: data[0].id,
        name: data[0].name,
        spirit: data[0].spirit,
        description: data[0].description,
        self:
          req.protocol +
          "://" +
          req.get("host") +
          req.baseUrl +
          "/" +
          data[0].id,
      });
    }
  });
});

router.post("/", function (req, res) {
  if (
    (req.body.name != null || req.body.name != undefined) &&
    (req.body.spirit != null || req.body.spirit != undefined) &&
    (req.body.description != null || req.body.description != undefined)
  ) {
    post_label(req.body.name, req.body.spirit, req.body.description).then(
      (key) => {
        console.log(key);
        res.status(201).send({
          id: key.id,
          name: req.body.name,
          type: req.body.spirit,
          length: req.body.description,
          self:
            req.protocol + "://" + req.get("host") + req.baseUrl + "/" + key.id,
        });
      }
    );
  } else {
    res.status(400).json({
      Error:
        "The request object is missing at least one of the required attributes",
    });
  }
});

//update label
router.put("/:id", function (req, res) {
  put_label(
    req.params.id,
    req.body.name,
    req.body.spirit,
    req.body.description
  ).then(res.status(200).end());
});

// //
// router.put("/:boat_id/loads/:load_id", function (req, res) {
//   get_boat(req.params.boat_id).then((boat) => {
//     get_load(req.params.load_id).then((load) => {
//       if (
//         boat[0] === undefined ||
//         boat[0] === null ||
//         load[0] === undefined ||
//         load[0] === null
//       ) {
//         // The 0th element is undefined. This means there is no boat with this id
//         res
//           .status(404)
//           .json({ Error: "The specified boat and/or load does not exist" });
//       } else if (load[0].carrier != null) {
//         // load is already on another boat
//         res
//           .status(403)
//           .json({ Error: "The load is already loaded on another boat" });
//       } else {
//         put_load_on_boat(req.params.boat_id, req.params.load_id).then(
//           put_carrier(
//             req.params.load_id,
//             load[0].volume,
//             load[0].item,
//             load[0].creation_date,
//             req.params.boat_id
//           ).then(res.status(204).end())
//         );
//       }
//     });
//   });
// });

//delete load from boat
// router.delete("/:boat_id/loads/:load_id", function (req, res) {
//   get_boat(req.params.boat_id).then((boat) => {
//     get_load(req.params.load_id).then((load) => {
//       if (
//         boat[0] === undefined ||
//         boat[0] === null ||
//         load[0] === undefined ||
//         load[0] === null
//       ) {
//         // The 0th element is undefined. This means there is no boat or load with this id
//         res.status(404).json({
//           Error:
//             "No boat with this boat_id is loaded with the load with this load_id",
//         });
//       } else if (load[0].carrier != boat[0].id) {
//         // load is already on another boat
//         res.status(404).json({
//           Error:
//             "No boat with this boat_id is loaded with the load with this load_id",
//         });
//       } else {
//         delete_load_on_boat(req.params.boat_id, req.params.load_id).then(
//           delete_carrier(
//             req.params.load_id,
//             load[0].volume,
//             load[0].item,
//             load[0].creation_date,
//             null
//           ).then(res.status(204).end())
//         );
//       }
//     });
//   });
// });

//reassign load to boat
// router.put("/:boat_id/loads/:load_id", function (req, res) {
//   get_boat(req.params.boat_id).then((boat) => {
//     get_load(req, req.params.load_id).then((load) => {
//       if (
//         boat[0] === undefined ||
//         boat[0] === null ||
//         load[0] === undefined ||
//         load[0] === null
//       ) {
//         // The 0th element is undefined. This means there is no boat or load with this id
//         res.status(404).json({
//           Error:
//             "No boat with this boat_id is loaded with the load with this load_id",
//         });
//       } else {
//         put_load_on_boat(req.params.boat_id, req.params.load_id).then(
//           put_carrier(
//             req.params.load_id,
//             load[0].volume,
//             load[0].item,
//             load[0].creation_date,
//             req.params.boat_id
//           ).then(res.status(204).end())
//         );
//       }
//     });
//   });
// });

//delete label
router.delete("/:id", function (req, res) {
  get_label(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      // The 0th element is undefined. This means there is no boat or load with this id
      res.status(404).json({
        Error: "No label with this id exists",
      });
    } else {
      delete_label(req.params.id).then(res.status(204).end());
    }
  });
});

/* ------------- End Controller Functions ------------- */

module.exports = router;

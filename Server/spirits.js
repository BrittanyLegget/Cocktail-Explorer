const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const ds = require("./datastore");
const datastore = ds.datastore;

const SPIRITS = "Spirits";
const LABELS = "Labels";

router.use(bodyParser.json());

/* ------------- Begin Spirit Model Functions ------------- */

//Create a Spirit
function post_spirit(name, description) {
  var key = datastore.key(SPIRITS);
  const data = {
    name: name,
    description: description,
  };
  return datastore.save({ key: key, data: data }).then(() => {
    return key;
  });
}

//Get all spirits - paginated
function get_spirits(req) {
  var q = datastore.createQuery(SPIRITS).limit(20);
  const results = {};
  if (Object.keys(req.query).includes("cursor")) {
    q = q.start(req.query.cursor);
  }
  return datastore.runQuery(q).then((entities) => {
    results.spirits = entities[0].map(ds.fromDatastore);
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

//Get spirit by id
function get_spirit(id) {
  const key = datastore.key([SPIRITS, parseInt(id, 10)]);
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

// // Get all spirit recipes
// function get_spirit_cocktails(req, id) {
//   const key = datastore.key([COCKTAILS, parseInt(id, 10)]);
//   return datastore
//     .get(key)
//     .then((entity) => {
//       const data = entity[0];
//       const keys = data.ingredients.map((g_id) => {
//         return datastore.key([LABELS, parseInt(g_id, 10)]);
//       });
//       return datastore.get(keys);
//     })
//     .then((ing) => {
//       ing = ing[0].map(ds.fromDatastore);
//       ing.forEach((object) => {
//         object.self =
//           req.protocol +
//           "://" +
//           req.get("host") +
//           "/cocktails" +
//           "/" +
//           object.id;
//       });
//       return ing;
//     });
// }

//delete spirit
function delete_spirit(id) {
  const key = datastore.key([SPIRITS, parseInt(id, 10)]);
  return datastore.delete(key);
}

/* ------------- End Model Functions ------------- */

/* ------------- Begin Controller Functions ------------- */

// Get all spirits
router.get("/", function (req, res) {
  get_spirits(req).then((data) => {
    res.status(200).json(data);
  });
});

// Get a spirit by id
router.get("/:id", function (req, res) {
  get_spirit(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      // The 0th element is undefined. This means there is no boat with this id
      res.status(404).json({ Error: "No spirit with this id exists" });
    } else {
      res.status(200).json({
        id: data[0].id,
        name: data[0].name,
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

// Get spirit cocktails
// router.get("/:id/cocktails", function (req, res) {
//   get_spirit(req.params.id).then((data) => {
//     if (data[0] === undefined || data[0] === null) {
//       // The 0th element is undefined. This means there is no boat with this id
//       res.status(404).json({ Error: "No spirit with this id exists" });
//     } else {
//       get_spirit_cocktails(req, req.params.id).then((result) => {
//         res.status(200).json({
//           cocktail: result,
//         });
//       });
//     }
//   });
// });

//Post spirit
router.post("/", function (req, res) {
  if (req.body.name != null || req.body.name != undefined) {
    post_spirit(req.body.name, req.body.description).then((key) => {
      console.log(key);
      res.status(201).send({
        id: key.id,
        name: req.body.name,
        description: req.body.description,
        self:
          req.protocol + "://" + req.get("host") + req.baseUrl + "/" + key.id,
      });
    });
  } else {
    res.status(400).json({
      Error:
        "The request object is missing at least one of the required attributes",
    });
  }
});

//Update spirit
// router.put("/:id", function (req, res) {
//   put_boat(req.params.id, req.body.name).then(res.status(200).end());
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

//delete spirit
router.delete("/:id", function (req, res) {
  get_spirit(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      // The 0th element is undefined. This means there is no boat or load with this id
      res.status(404).json({
        Error: "No spirit with this id exists",
      });
    } else {
      delete_spirit(req.params.id).then(res.status(204).end());
    }
  });
});

/* ------------- End Controller Functions ------------- */

module.exports = router;

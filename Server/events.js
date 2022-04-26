const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const ds = require("./datastore");
const datastore = ds.datastore;

const EVENTS = "Events";
const ATTENDEES = "Attendees";

router.use(bodyParser.json());

/* ------------- Begin Spirit Model Functions ------------- */

//Create an event
function post_event(name, date, location, attendee) {
  var key = datastore.key(EVENTS);
  const data = {
    name: name,
    date: date,
    location: location,
    attendee: [],
  };
  return datastore.save({ key: key, data: data }).then(() => {
    return key;
  });
}

//Create an attaendee
function post_attendee(first, last, email) {
  var key = datastore.key(ATTENDEES);
  const data = {
    first: first,
    last: last,
    email: email,
  };
  return datastore.save({ key: key, data: data }).then(() => {
    return key;
  });
}

//Get all events - paginated
function get_events(req) {
  var q = datastore.createQuery(SPIRITS).limit(10);
  const results = {};
  if (Object.keys(req.query).includes("cursor")) {
    q = q.start(req.query.cursor);
  }
  return datastore.runQuery(q).then((entities) => {
    results.events = entities[0].map(ds.fromDatastore);
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

//Get event by id
function get_event(id) {
  const key = datastore.key([EVENTS, parseInt(id, 10)]);
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
function put_event(id, name, date, location) {
  const key = datastore.key([EVENTS, parseInt(id, 10)]);
  const data = { name: name, date: date, location: location };
  return datastore.save({ key: key, data: data });
}

//delete spirit
function delete_event(id) {
  const key = datastore.key([EVENTS, parseInt(id, 10)]);
  return datastore.delete(key);
}

// // Add attendee to event
function put_event_attendee(eid, aid) {
  const key = datastore.key([EVENTS, parseInt(eid, 10)]);
  return datastore.get(key).then((data) => {
    if (typeof data[0].attendee === "undefined") {
      data[0].attendee = [];
    }
    data[0].attendee.push(aid);
    return datastore.save({ key: l_key, data: data[0] });
  });
}

// Get event attendees
function get_event_attendees(req, id) {
  const key = datastore.key([EVENTS, parseInt(id, 10)]);
  return datastore
    .get(key)
    .then((entity) => {
      const data = entity[0];
      const keys = data.attendee.map((a_id) => {
        return datastore.key([ATTENDEES, parseInt(a_id, 10)]);
      });
      return datastore.get(keys);
    })
    .then((results) => {
      results = results[0].map(ds.fromDatastore);
      results.forEach((object) => {
        object.self =
          req.protocol +
          "://" +
          req.get("host") +
          "/attendee" +
          "/" +
          object.id;
      });
      return results;
    });
}

/* ------------- Begin Controller Functions ------------- */

// Get all events
router.get("/", function (req, res) {
  get_events(req).then((data) => {
    res.status(200).json(data);
  });
});

// Get a event by id
router.get("/:id", function (req, res) {
  get_event(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      // The 0th element is undefined. This means there is no boat with this id
      res.status(404).json({ Error: "No event with this id exists" });
    } else {
      res.status(200).json({
        id: data[0].id,
        name: data[0].name,
        date: data[0].date,
        location: data[0].location,
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

// router.get("/:id/attendees", function (req, res) {
//   get_event(req.params.id).then((data) => {
//     if (data[0] === undefined || data[0] === null) {
//       // The 0th element is undefined. This means there is no boat with this id
//       res.status(404).json({ Error: "No event with this id exists" });
//     } else {
//       get_event_attendees(req, req.params.id).then((attend) => {
//         res.status(200).json({
//           attendee: attend,
//         });
//       });
//     }
//   });
// });

router.post("/", function (req, res) {
  if (
    (req.body.name != null || req.body.name != undefined) &&
    (req.body.date != null || req.body.date != undefined) &&
    (req.body.location != null || req.body.location != undefined)
  ) {
    post_event(req.body.name, req.body.date, req.body.location).then((key) => {
      console.log(key);
      res.status(201).send({
        id: key.id,
        name: req.body.name,
        type: req.body.date,
        length: req.body.location,
        attendee: [],
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

router.put("/:id", function (req, res) {
  put_event(
    req.params.id,
    req.body.name,
    req.body.date,
    req.body.location
  ).then(res.status(200).end());
});

// router.put("/:event_id/attendees", function (req, res) {
//   get_boat(req.params.event_id).then((event) => {
//     get_(req.params.attendee_id).then((attend) => {
//       if (
//         event[0] === undefined ||
//         event[0] === null

//       ) {
//         // The 0th element is undefined. This means there is no boat with this id
//         res
//           .status(404)
//           .json({ Error: "The specified event does not exist" });
//       }  else {
//         put_attendee(req.params.event_id, req.params.attendee_id).then(
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

//delete event
router.delete("/:id", function (req, res) {
  get_event(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      // The 0th element is undefined. This means there is no boat or load with this id
      res.status(404).json({
        Error: "No data with this id exists",
      });
    } else {
      delete_event(req.params.id).then(res.status(204).end());
    }
  });
});

/* ------------- End Controller Functions ------------- */

module.exports = router;

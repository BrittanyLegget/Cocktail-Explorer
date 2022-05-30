const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const ds = require("./datastore");
const datastore = ds.datastore;

const COCKTAILS = "Cocktails";
const SPIRITS = "Spirits";

router.use(bodyParser.json());

/* ------------- Begin Cocktail Model Functions ------------- */

//Create a cocktails
function post_cocktail(name, spirit, ingredients, instructions, image) {
  var key = datastore.key(COCKTAILS);
  const data = {
    name: name,
    spirit: spirit,
    ingredients: ingredients,
    instructions: instructions,
    image: image,
  };
  return datastore.save({ key: key, data: data }).then(() => {
    return key;
  });
}

//Get all cocktails - paginated
function get_cocktails(req) {
  var q = datastore.createQuery(COCKTAILS).limit(30);
  const results = {};
  if (Object.keys(req.query).includes("cursor")) {
    q = q.start(req.query.cursor);
  }
  return datastore.runQuery(q).then((entities) => {
    results.cocktails = entities[0].map(ds.fromDatastore);
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

//Get cocktail by id
function get_cocktail(id) {
  const key = datastore.key([COCKTAILS, parseInt(id, 10)]);
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

function get_cocktail_spirit(id) {
  var q = datastore.createQuery(COCKTAILS).filter("spirit", "=", id);
  const results = {};

  return datastore.runQuery(q).then((entities) => {
    results.cocktails = entities[0].map(ds.fromDatastore);
    return results;
  });
}

//Get spirit by id except current cocktail
function get_cocktail_spirit_excp(id) {
  var q = datastore.createQuery(COCKTAILS).filter("spirit", "=", id).limit(2);
  const results = {};

  return datastore.runQuery(q).then((entities) => {
    results.cocktails = entities[0].map(ds.fromDatastore);
    return results;
  });
}

//update cocktail
function put_cocktail(id, name, spirit, ingredients, instructions, image) {
  const key = datastore.key([COCKTAILS, parseInt(id, 10)]);
  const data = {
    name: name,
    spirit: spirit,
    ingredients: ingredients,
    instructions: instructions,
    image: image,
  };
  return datastore.save({ key: key, data: data });
}

//Delete cocktail
function delete_cocktail(id) {
  const key = datastore.key([COCKTAILS, parseInt(id, 10)]);
  return datastore.delete(key);
}

//Get spirit by id
function get_spirit(id) {
  const key = datastore.key([SPIRITS, parseInt(id, 10)]);
  return datastore.get(key).then((entity) => {
    if (entity[0] === undefined || entity[0] === null) {
      console.log(entity);
      return entity;
    } else {
      entity = entity.map(ds.fromDatastore);
      return entity;
    }
  });
}

/* ------------- End Model Functions ------------- */

/* ------------- Begin Controller Functions ------------- */

// Get all cocktails
router.get("/", function (req, res) {
  get_cocktails(req).then((data) => {
    res.status(200).json(data);
  });
});

// Get all cocktails
router.get("/featured", function (req, res) {
  get_cocktails(req).then((data) => {
    var num = Math.floor(Math.random() * data.cocktails.length);
    res.status(200).json(data.cocktails[num]);
  });
});

// Get a cocktail by id
router.get("/:id", function (req, res) {
  get_cocktail(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      res.status(404).json({ Error: "No label with this id exists" });
    } else {
      res.status(200).json({
        name: data[0].name,
        spirit: data[0].spirit,
        ingredients: data[0].ingredients,
        instructions: data[0].instructions,
        image: data[0].image,
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

// Get cocktails by spirit
router.get("/spirit/:id", function (req, res) {
  get_spirit(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      res.status(404).json({ Error: "No spirit with this id exists" });
    } else {
      get_cocktail_spirit(req.params.id).then((result) => {
        res.status(200).json(result);
      });
    }
  });
});

// Get cocktails by spirit
router.get("/spirit/excp/:id", function (req, res) {
  get_spirit(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      res.status(404).json({ Error: "No spirit with this id exists" });
    } else {
      get_cocktail_spirit_excp(req.params.id).then((result) => {
        res.status(200).json(result);
      });
    }
  });
});

//Post new cocktail
router.post("/", function (req, res) {
  if (
    (req.body.name != null || req.body.name != undefined) &&
    (req.body.spirit != null || req.body.spirit != undefined) &&
    (req.body.ingredients != null || req.body.ingredients != undefined) &&
    (req.body.instructions != null || req.body.instructions != undefined)
  ) {
    post_cocktail(
      req.body.name,
      req.body.spirit,
      req.body.ingredients,
      req.body.instructions,
      req.body.image
    ).then((key) => {
      console.log(key);
      res.status(201).send({
        id: key.id,
        name: req.body.name,
        spirit: req.body.spirit,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        image: req.body.image,
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

//update cocktail
router.put("/:id", function (req, res) {
  put_cocktail(
    req.params.id,
    req.body.name,
    req.body.spirit,
    req.body.ingredients,
    req.body.instructions,
    req.body.image
  ).then(res.status(200).end());
});

//delete cocktail
router.delete("/:id", function (req, res) {
  get_cocktail(req.params.id).then((data) => {
    if (data[0] === undefined || data[0] === null) {
      res.status(404).json({
        Error: "No label with this id exists",
      });
    } else {
      delete_cocktail(req.params.id).then(res.status(204).end());
    }
  });
});

/* ------------- End Controller Functions ------------- */

module.exports = router;

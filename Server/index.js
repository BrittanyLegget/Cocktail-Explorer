const router = (module.exports = require("express").Router());

router.use("/spirits", require("./spirits"));
router.use("/labels", require("./labels"));
router.use("/cocktails", require("./cocktails"));

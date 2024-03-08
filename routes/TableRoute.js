const {Router} = require("express");
const {saveTable,
    updateTable,
    deleteTable,
    getAllTables,
    getTableById} = require("../controllers/TableControllers");

    const { saveEntry,
        updateEntry,
        deleteEntry,} = require("../controllers/EntryControllers");


const router = Router()

router.post("/getTableById", getTableById)
router.post("/saveEntry",saveEntry)
router.post("/updateEntry",updateEntry)
router.post("/deleteEntry",deleteEntry)
router.get("/getAllTables", getAllTables)
router.post("/saveTable", saveTable)
router.post("/deleteTable", deleteTable)
router.post("/updateTable", updateTable)

module.exports = router;
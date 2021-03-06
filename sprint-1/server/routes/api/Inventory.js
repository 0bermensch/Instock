const express = require("express");
const inventoryFile = __dirname + "/../../models/Inventory.json";
const inventoryItems = require(inventoryFile);
const helper = require("../../helper/helper");
const router = express.Router();

router.get("/", (req, res) => {
  const inventoryList = inventoryItems.map(inventoryItem => {
    return {
      id: inventoryItem.id,
      productname: inventoryItem.productname,
      productdescription: inventoryItem.productdescription,
      lastordered: inventoryItem.lastordered,
      city: inventoryItem.city,
      country: inventoryItem.country,
      quantity: inventoryItem.quantity,
      status: inventoryItem.status,
      category: inventoryItem.category
    };
  });
  res.json(inventoryList);
});

router.post("/", (req, res) => {
  const newInventoryItem = {
    id: req.body.id,
    productname: req.body.productname,
    productdescription: req.body.productdescription,
    lastordered: req.body.lastordered,
    city: req.body.city,
    country: req.body.country,
    quantity: req.body.quantity,
    status: req.body.status,
    category: req.body.category
  };
  inventoryItems.push(newInventoryItem);
  helper.writeJSONFile(inventoryFile, inventoryItems);
  res.json(inventoryItems);
});

//delete inventory item by productname
router.delete("/:productname", (req, res) => {
  const newInventory = inventoryItems.filter(
    item =>
      item.productname.toLowerCase() !== req.params.productname.toLowerCase()
  );
  helper.writeJSONFile(inventoryFile, newInventory);
  res.json(newInventory);
});

//get single item by productname
router.get("/:productname", (req, res) => {
  const invItem = inventoryItems.filter(
    item =>
      req.params.productname.toLowerCase() === item.productname.toLowerCase()
  );
  res.json(invItem);
});

module.exports = router;

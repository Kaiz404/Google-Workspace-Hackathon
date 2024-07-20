function openRestockForm() {
    // handle html here
  
    // for order in orders
      createRestockRecord(supplier, orderID, items);
      // for item in items
        increaseStock(itemName, increaseQTY);
  }
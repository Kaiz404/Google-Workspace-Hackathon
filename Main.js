// Sync (button)
// Pull latest sales from online and change qty in spreadsheet
// (for now, parse sample json response and call function)
// Sales uses sale form


// Sale Form (Change in spreadsheet -> reduce stock on platforms, if error is encountered such as <0 stock, alert)
// If do irl sale, just save and change qty
// pushes change online

// Restock Form (Change in spreadsheet -> increase stock on platforms)
// change qty and create a record of it
// pushes change online

const MainInventorySheetName = 'Inventory';
const SalesRecordSheetName = 'Sales Record';

function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Inventory Syncer')
      .addItem('Sync From Platforms', 'syncFromPlatforms')
      .addItem('Open Sale Form', 'openSaleForm')
      .addItem('Open Restock Form', 'updateItem')
      .addItem('Test', 'test')
      .addToUi();
}

function syncFromPlatforms() {
  // call api
  const data = getShoppeeOrderDetails().response;
  console.log(data);
  // parse response
  // var json = response.getContentText();
  // var data = JSON.parse(json);
  // console.log(JSON.stringify(data));

  for (const order of data.order_list){
    const platform = 'Shopee';
    const buyerName = order.buyer_username;
    const orderID = order.order_sn;
    var items = [];

    order.item_list.forEach(item => {
      items.push({
        itemName: item.model_name,
        quantity: item.model_quantity_purchased
      })
    });
    createSaleRecord(platform, buyerName, orderID, items);
  }
}

function syncStockToPlatForms() {

}

function openSaleForm() {
  var html = HtmlService.createHtmlOutputFromFile('SalesForm')
      .setTitle('My custom sidebar');
  SpreadsheetApp.getUi().showSidebar(html);
  // handle html here


  // for order in orders
    //createSaleRecord(platform, buyerName, orderID, items);
    // for item in items
      //reduceStock(itemName, reduceQTY);
}

function createSaleRecord(platform, orderID, buyerName, itemList) {
  if (validateItems(itemList) == false) {
    return
  }

  console.log(itemList);
  var sheet = SpreadsheetApp.getActive().getSheetByName('Sales Record');
  var headerRow = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  console.log('headerRow: ' + headerRow);

  var platformColumnIndex = headerRow.indexOf('Platform');
  var orderIDColumnIndex = headerRow.indexOf('Order ID');
  var buyerNameColumnIndex = headerRow.indexOf('Buyer Name');
  var itemNameColumnIndex = headerRow.indexOf('Item Name');
  var stockBeforeSaleColumnIndex = headerRow.indexOf('Stock Before Sale');
  var quantityOrderedColumnIndex = headerRow.indexOf('QTY Ordered');
  var stockAfterSaleColumnIndex = headerRow.indexOf('Stock After Sale');
  var dateColumnIndex = headerRow.indexOf('Date');
  var timeColumnIndex = headerRow.indexOf('Time');

  var mergedColumnIndex = [platformColumnIndex, orderIDColumnIndex, buyerNameColumnIndex, dateColumnIndex, timeColumnIndex];
  for (const index of mergedColumnIndex){
    sheet.getRange(sheet.getLastRow()+1, index+1, itemList.length, 1).mergeVertically();
  }

  var table = sheet.getRange(sheet.getLastRow()+1, 1, itemList.length, sheet.getLastColumn());
  
  table.getCell(1, platformColumnIndex + 1).setValue(platform);
  table.getCell(1, orderIDColumnIndex + 1).setValue(orderID);
  table.getCell(1, buyerNameColumnIndex + 1).setValue(buyerName);
  const date = new Date();
  table.getCell(1, dateColumnIndex + 1).setValue(date);
  table.getCell(1, timeColumnIndex + 1).setValue(date.toLocaleTimeString());

  for (var i = 0; i < itemList.length; i++) {
    var itemName = itemList[i].itemName;
    var quantity = itemList[i].quantity;
    console.log(itemList[i]);
    table.getCell(i+1, itemNameColumnIndex + 1).setValue(itemName);
    table.getCell(i+1, stockBeforeSaleColumnIndex + 1).setValue(getItemStock(itemName));
    table.getCell(i+1, quantityOrderedColumnIndex + 1).setValue(itemList[i].quantity);

    changeStock(itemName, quantity, true);
    table.getCell(i+1, stockAfterSaleColumnIndex + 1).setValue(getItemStock(itemName));
  }
}

function validateItems(itemList) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Inventory');
  var headerRow = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  var itemNameColumnIndex = headerRow.indexOf('Item Name');
  var table = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn());
  
  var inventoryItems = [];

  for (var i=1; i<=table.getValues().length; i++){
    inventoryItems.push(table.getCell(i, itemNameColumnIndex+1).getDisplayValue());
  }

  for (const item of itemList){
    if (inventoryItems.indexOf(item.itemName) < 0){
      SpreadsheetApp.getUi().alert('ERROR: ' + item.itemName + ' does not exist in the inventory');
      return false;
    }
  }
  return true;
}

function openRestockForm() {
  // handle html here

  // for order in orders
    createRestockRecord(supplier, orderID, items);
    // for item in items
      increaseStock(itemName, increaseQTY);
}

function test(){
  var itemList = [
    {
      itemName: "Banana",
      quantity: '3',
    },
    {
      itemName: "Drugs",
      quantity: '7',
    },
    {
      itemName: "Weed",
      quantity: '1',
    }
  ]
  createSaleRecord('Shopee', '2l3jk1523', 'Tim', itemList)
  // changeStock('Banana', 5, false);
}

function changeStock(itemName, quantity, isSale) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Inventory');
  var headerRow = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  console.log('headerRow: ' + headerRow);

  var itemNameColumnIndex = headerRow.indexOf('Item Name');
  var quantityColumnIndex = headerRow.indexOf('QTY');

  var table = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn());

  for (var i=1; i<=table.getValues().length; i++){
    if (table.getCell(i, itemNameColumnIndex+1).getDisplayValue() == itemName) {
      originalStock = table.getCell(i, quantityColumnIndex+1).getValue();
      if (originalStock == '') {
        SpreadsheetApp.getUi().alert('ERROR: ' + itemName + ' has no stock value.')
        return;
      }
      var newStock = null;
      if (isSale) {
        newStock = originalStock - quantity;
      }
      else {
        newStock = originalStock + quantity;
      }

      table.getCell(i, quantityColumnIndex+1).setValue(newStock);
      console.log('Changed Stock of ' + itemName + ' from ' + originalStock + ' to ' + newStock);
    }
  }
}

function getItemStock(itemName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(MainInventorySheetName);
  var headerRow = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  console.log('headerRow: ' + headerRow);

  var itemNameColumnIndex = headerRow.indexOf('Item Name');
  var quantityColumnIndex = headerRow.indexOf('QTY');

  var table = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn());

  for (var i=1; i<=table.getValues().length; i++){
    if (table.getCell(i, itemNameColumnIndex+1).getDisplayValue() == itemName) {
      originalStock = table.getCell(i, quantityColumnIndex+1).getValue();
      if (originalStock == '') {
        SpreadsheetApp.getUi().alert('ERROR: ' + itemName + ' has no stock value.')
        return null;
      }
      return originalStock;
    }
  }
}

function getAllItems(){
  var sheet = SpreadsheetApp.getActive().getSheetByName(MainInventorySheetName);
  var headerRow = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  var itemNameColumnIndex = headerRow.indexOf('Item Name');

  var table = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn());
  var items = [];

  for (var i=1; i<=table.getValues().length; i++){
    items.push(table.getCell(i, itemNameColumnIndex+1).getDisplayValue());
  }
  console.log(items);

  return items;
}
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

function validateStock(itemList) {
  for (const item of itemList) {
    currentStock = getItemStock(item.itemName);
    orderedQTY = item.quantity;
    if (currentStock - orderedQTY < 0) {
      SpreadsheetApp.getUi().alert('ERROR: ' + item.itemName + ' has more orders than currently available stock.')
      return false;
    }
  }
  return true
}

function updateItem(prompt, changedValue) {
  const sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var range = sheet.getDataRange();
  const ui = SpreadsheetApp.getUi();
  console.log(data)
  for (var i = 0; i < data.length; i++) {
    if(data[i][0] == prompt) {
      range.getCell(i+1, 1).setValue(changedValue)
    }
  }
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
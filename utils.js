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
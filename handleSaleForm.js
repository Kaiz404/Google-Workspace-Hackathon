function openSaleForm() {
    var html = HtmlService.createHtmlOutputFromFile('SalesForm')
        .setTitle('Sales Form');
    html.data = getAllItems();
    SpreadsheetApp.getUi().showSidebar(html);
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
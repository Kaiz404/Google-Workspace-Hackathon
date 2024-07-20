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
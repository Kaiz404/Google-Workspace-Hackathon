function sign(api, parameters) {
    //===========================================================================
    // @param secret
    // @param parameters
    //===========================================================================
    
    // Sort the keys of the parameters
    var sortedKeys = Object.keys(parameters).sort();

    // Create the parameters string
    var parametersStr = api + sortedKeys.map(function(key) {
        return key + parameters[key];
    }).join('');

    // Create the HMAC using the secret and parameters string
    
    var signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, parametersStr)
    //var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, parametersStr, secret);
    var hash = signature.map(function(byte) {
        var v = (byte < 0 ? byte + 256 : byte).toString(16);
        return v.length == 1 ? '0' + v : v;
    }).join('');

    return hash.toUpperCase();
}

function generateTimestamp() {
    // Generate the current UTC timestamp in milliseconds
    var currentTimestamp = Date.now();
    
    // Calculate the 7200 seconds (2 hours) in milliseconds
    var twoHoursInMillis = 7200 * 1000;

    // Check if the timestamp is within 7200 seconds of the current UTC time
    if (Math.abs(currentTimestamp - Date.now()) <= twoHoursInMillis) {
        return currentTimestamp;
    } else {
        throw new Error('The timestamp is not within 7200 seconds of the current UTC time.');
    }
}

function test(){
    // Malaysian ENDPOINT: https://api.lazada.com.my/rest
    const endPoint = "https://api.lazada.com.my/rest";
    const appKey = '129927';
    const appSecret = 'mgHVNvjJCmL710AQWyfeQkL0fi5DLy7s';
    const accessToken = '50000001c07czSgXdCT17b69e0a5oxUlmDvk4dRToGaHpojRoVSmR4wgRbxzvXOK';
    const timeStamp = generateTimestamp();
    const api = '/order/get';
  
    const params = {
      'access_token': accessToken,
      'app_key': appKey,
      'timestamp': timeStamp,
      'sign_method': 'sha256',
    }
    signHash = sign(api, params);
    params.sign = signHash;
    console.log(UrlFetchApp.fetch('https://api.lazada.com.my/rest/orders/get?created_after=2017-02-10T09%3A00%3A00%2B08%3A00&limit=5&app_key=129927&sign_method=sha256&access_token=50000001c07czSgXdCT17b69e0a5oxUlmDvk4dRToGaHpojRoVSmR4wgRbxzvXOK&timestamp=1721803291592&sign=946409B420BD68DE62E94A9EC28FDC2E320B21CD4C5E2AFBF714319D5809CA48').getContent());
    console.log(UrlFetchApp.fetch(endPoint + api, params).getContent());
  
    //createSaleRecord('Shopee', '2l3jk1523', 'Tim', itemList)
    // changeStock('Banana', 5, false);
  }

  console.log(test());
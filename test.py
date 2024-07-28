import lazoq

url = "https://auth.lazada.com/rest"
appkey = 129927
appSecret = "mgHVNvjJCmL710AQWyfeQkL0fi5DLy7s"
access_token = "50000001c07czSgXdCT17b69e0a5oxUlmDvk4dRToGaHpojRoVSmR4wgRbxzvXOK"

client = lazop.LazopClient(url, appkey ,appSecret)
request = lazop.LazopRequest('/orders/get','GET')
response = client.execute(request, access_token)
print(response.type)
print(response.body)
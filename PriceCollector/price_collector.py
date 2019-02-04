import requests

URL="https://api.coindesk.com/v1/bpi/currentprice.json"

def fetchPriceFromService():
	req = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')
	print(req.json())



if __name__ == "__main__":
	fetchPriceFromService()
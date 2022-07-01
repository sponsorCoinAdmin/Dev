/*
function initTokenMap(tm) {
  tm = new TokenMap();
  var token;
  token = tm.setTokenProperty("aaaa", "Symbol", "ETH")
  token = tm.setTokenProperty("0xa36085F69e2889c224210F603D836748e7dC0088", "Symbol", "LINK")
  token = tm.setTokenProperty("0xf3e0d7bF58c5d455D31ef1c2d5375904dF525105", "Symbol", "USDT")
  token = tm.setTokenProperty("0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A", "Symbol", "SPCOIN")
  return tm;
}
*/

class TokenMap {
  constructor() {
    this.tokens = new Map([]);
  }

  get(_address) {
    var contract = this.tokens.get(_address)
    return contract;
  }

  getTokenKeys() {
    var tokenKeys = [...this.tokens.keys()];
    return tokenKeys;
  }

  setTokenProperty(address, propertyKey, propertyValue) {
    if (!isEmpty(address) && !isEmpty(propertyKey)) {
      var token = this.tokens.get(address);
      if (token == null || token == undefined || token == "")
        token = this.addNewContractAddressMap(address);
      if (token instanceof Map) {
        token.set(propertyKey, propertyValue)
        return token;
      }
    }
    return null;
  }

  addNewContractAddressMap(_address) {
    var token = new Map();
    token.set("address", _address)
    this.tokens.set(_address, token);
    return token;
  }

  addTokenContract(contract) {
    var contractAddress = contract.address;
    var name = contract.name;
    var symbol = contract.symbol;
    var totalSupply = contract.totalSupply;
    var decimals = contract.decimals;
    var tokenSupply = contract.tokenSupply;

    this.setTokenProperty(contractAddress, "contract",    contract);
    this.setTokenProperty(contractAddress, "name",        name);
    this.setTokenProperty(contractAddress, "symbol",      symbol);
    this.setTokenProperty(contractAddress, "totalSupply", totalSupply);
    this.setTokenProperty(contractAddress, "decimals",    decimals);
    this.setTokenProperty(contractAddress, "tokenSupply", tokenSupply);
    
    var contractMap = this.get(contractAddress);
    return contractMap;
  }

  getTokenProperty(address, propertyKey) {
    var propertyValue = null;
    if (!isEmpty(address) && !isEmpty(propertyKey)) {
      var token = this.tokens.get(address);
      if (token instanceof Map)
        propertyValue = token.get(propertyKey);
    }
    return propertyValue;
  }

  mapTokensToSelector(selector) {
    for (let [key] of this.tokens) {
      var tokenSymbol = this.getTokenProperty(key, "Symbol");
      selector.addTokenKeyToSelector(tokenSymbol, key);
    }
  }
}

function popupAddTokenForm(tokenSelect) {
  // alert("Add Token Form To Go Here");
  setWindowCentre();
}

function setWindowCentre() {
  var popupDiv = document.getElementById("addContractDiv");

  var windowCenterWidth = window.innerWidth / 2;
  var windowCenterHeight = window.innerHeight / 2;

  var popupCenterWidth = popupDiv.clientWidth;
  var popupCenterHeight = popupDiv.clientHeight;

  var leftWindowMargin = windowCenterWidth - (popupCenterWidth / 2);
  var topWindowMargin = windowCenterHeight - (popupCenterHeight / 2);

  popupDiv.style.top = topWindowMargin+"px";
  popupDiv.style.right = leftWindowMargin+"px";
}
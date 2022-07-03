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
    this.addrMapObjs = new Map([]);
  }

  get(_address) {
    var contract = this.addrMapObjs.get(_address)
    return contract;
  }

  getTokenKeys() {
    var tokenKeys = [...this.addrMapObjs.keys()];
    return tokenKeys;
  }

  setTokenProperty(address, propertyKey, propertyValue) {
    if (!isEmpty(address) && !isEmpty(propertyKey)) {
      var token = this.addrMapObjs.get(address);
      if (token == null || token == undefined || token == "")
        token = this.addNewAddressMapObject(address);
      if (token instanceof Map) {
        token.set(propertyKey, propertyValue)
        return token;
      }
    }
    return null;
  }

  addNewAddressMapObject(_address) {
    var objMap = new Map();
    objMap.set("address", _address)
    this.addrMapObjs.set(_address, objMap);
    return objMap;
  }

  mapWalletObjectByAddressKey(obj) {
    var addressKey = obj.address;
    var name = obj.name;
    var symbol = obj.symbol;
    var totalSupply = obj.totalSupply;
    var decimals = obj.decimals;
    var tokenSupply = obj.tokenSupply;

    this.setTokenProperty(addressKey, "contract",    obj);
    this.setTokenProperty(addressKey, "name",        name);
    this.setTokenProperty(addressKey, "symbol",      symbol);
    this.setTokenProperty(addressKey, "totalSupply", totalSupply);
    this.setTokenProperty(addressKey, "decimals",    decimals);
    this.setTokenProperty(addressKey, "tokenSupply", tokenSupply);
    
    var contractMap = this.get(addressKey);
    return this.getTokenMapValues(addressKey);
  }

  getTokenProperty(address, propertyKey) {
    var propertyValue = null;
    var tokenMap = getTokenMapValues(address)
    if (!isEmpty(tokenMap) && !isEmpty(propertyKey)) {
      propertyValue = tokenMap.get(propertyKey);
    }
    return propertyValue;
  }
  
  getTokenMapValues(address) {
    var tokenMap;
    if (!isEmpty(address)) {
      tokenMap = this.addrMapObjs.get(address);
    }
    return tokenMap;
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
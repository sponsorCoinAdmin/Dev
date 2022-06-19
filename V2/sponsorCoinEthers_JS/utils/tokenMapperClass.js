var tm;

function initTokenMap() {
  tm = new TokenMap();
  var token;
  token = tm.setTokenProperty("aaaa", "Symbol", "ETH")
  token = tm.setTokenProperty("0xa36085F69e2889c224210F603D836748e7dC0088", "Symbol", "LINK")
  token = tm.setTokenProperty("0x189c32fb32359a7c6a43b3be0e1bd2f5ce8e463c", "Symbol", "USDT")
  token = tm.setTokenProperty("0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A", "Symbol", "SPCOIN")
  return tm;
}

class TokenMap {
  constructor () {
    this.tokens = new Map([]);
  }

  getTokenKeys() {
    var tokenKeys = [...this.tokens.keys()];
    return tokenKeys;
  }

  addTokenContract(address) {
    var token = new Map();
    token.set("address", address)
    this.tokens.set(address, token);
    return token;
  }

  setTokenProperty(address, propertyKey, propertyValue) {
    if (!isEmpty(address) && !isEmpty(propertyKey)) {
      var token = this.tokens.get(address);
      if (isEmpty(token))
        token = this.addTokenContract(address);
      if (token instanceof Map) {
        token.set(propertyKey, propertyValue)
        return token;
      }
    }
    return null;
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
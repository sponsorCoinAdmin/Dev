var tm;

class tokenMap {
  tokens = new Map([]);
}


function initTokenMap() {
  tm = new tokenMap();
  var token;
  token = setTokenProperty("aaaa", "Symbol", "ETH")
  token = setTokenProperty("0xa36085F69e2889c224210F603D836748e7dC0088", "Symbol", "LINK")
  token = setTokenProperty("0x189c32fb32359a7c6a43b3be0e1bd2f5ce8e463c", "Symbol", "USDT")
  token = setTokenProperty("0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A", "Symbol", "SPCOIN")
}

function addTokenContract(address) {
  var token = new Map();
  token.set("address", address)
  tm.tokens.set(address, token);
  return token;
}

function getTokenProperty(address, propertyKey) {
  var propertyValue = null;
  if (!isEmpty(address) && !isEmpty(propertyKey)) {
    var token = tm.tokens.get(address);
    if (token instanceof Map)
      propertyValue = token.get(propertyKey);
  }
  return propertyValue;
}

function setTokenProperty(address, propertyKey, propertyValue) {
  if (!isEmpty(address) && !isEmpty(propertyKey)) {
    var token = tm.tokens.get(address);
    if (isEmpty(token))
      token = addTokenContract(address);
    if (token instanceof Map) {
      token.set(propertyKey, propertyValue)
      return token;
    }
  }
  return null;
}

function getTokenKeys() {
  var tokenKeys = [...tm.tokens.keys()];
  return tokenKeys;
}

function popupAddTokenForm(tokenSelect) {
  // alert("Add Token Form To Go Here");
  setWindowCentre();
  ts.setLastSelected();
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
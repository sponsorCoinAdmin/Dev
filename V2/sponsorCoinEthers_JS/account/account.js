const tokens = new Map([]);

function initTokenMap() {
  var token;
  token = setTokenProperty("0xa36085F69e2889c224210F603D836748e7dC0088", "Symbol", "LINK")
  token = setTokenProperty("0x189c32fb32359a7c6a43b3be0e1bd2f5ce8e463c", "Symbol", "USDT")
  token = setTokenProperty("0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A", "Symbol", "SPCOIN")
}

function addTokenContract(address) {
  var token = new Map();
  token.set("address", address)
  tokens.set(address, token);
  return token;
}

function getTokenProperty(address, propertyKey) {
  var propertyValue = null;
  if (!isEmpty(address) && !isEmpty(propertyKey)) {
    var token = tokens.get(address);
    if (token instanceof Map)
      propertyValue = token.get(propertyKey);
  }
  return propertyValue;
}

function setTokenProperty(address, propertyKey, propertyValue) {
  if (!isEmpty(address) && !isEmpty(propertyKey)) {
    var token = tokens.get(address);
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
  var tokenKeys = [...tokens.keys()];
  return tokenKeys;
}

function mapTokensToSelector(selectorId, tokenMap) {
  var selector = document.getElementById(selectorId);
  for (let [key] of tokens) {
    tokenSymbol = getTokenProperty(key, "Symbol");
    selector.options[selector.options.length] = new Option(tokenSymbol, key);
    //    alert (key + " = " + tokenSymbol);
  }
}

function processSelectedToken(selectorId, propertyKey) {
  tokenSelect = document.getElementById(selectorId);
  selIdx = tokenSelect.selectedIndex;
  selOption = tokenSelect.options[selIdx];
  tokenText = selOption.text;
  address = selOption.value;
  tokenValue = getTokenProperty(address, propertyKey);

  if (isEmpty(tokenValue))
    tokenValue = address;

  // Populate Address Text Field
  textFld_Id = selectorId.replace("_SEL", "_TX")
  txtFldObj = document.getElementById(textFld_Id);
  txtFldObj.value = tokenValue;
}
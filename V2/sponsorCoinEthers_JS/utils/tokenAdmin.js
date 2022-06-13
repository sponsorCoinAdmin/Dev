const tokens = new Map([]);

function initTokenMap() {
  var token;
  token = setTokenProperty("aaaa", "Symbol", "ETH")
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
  if (selIdx == 0) {
    popupAddTokenForm(tokenSelect);
  }
  else {
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
}

function setSelected(tokenSelect, token) {
  GUI_OpenAddCryptoForm();
  for (let idx = 0; idx < tokenSelect.options.length; idx++) {
    var tokenText = tokenSelect.options[idx].text;
    if (tokenText == token)
    {
      tokenSelect.selectedIndex = idx;
//      alert ("Found Token = " + tokenText);
      break;
    }
//    alert ("Current Token = " + tokenText)
  }
}

function popupAddTokenForm(tokenSelect) {
  // alert("Add Token Form To Go Here");
  setWindowCentre();
  setSelected(tokenSelect, "ETH");
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
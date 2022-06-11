var tokenList = {
    "ETH": {address: ""},
    "LINK": {address: "0xa36085F69e2889c224210F603D836748e7dC0088"},
    "USDT": {address: "0x189c32fb32359a7c6a43b3be0e1bd2f5ce8e463c"},
    "SPCOIN": {address: "0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A"}
  }

  const tokens = new Map([
 ]);

  function addTokenContract(address) {
    var token = new Map ();
    token.set ("address",address)
    tokens.set(address, token);
    return token;
  }

  function tokenSetSymbol(address,Symbol) {
    tokens.set(address, new Map());
    tokens.get(address).set("Symbol",Symbol);
  }
  
  function loadSelectorFromJSONList(selectorId, jSONList) {
    var token;
    token = addTokenContract("0xa36085F69e2889c224210F603D836748e7dC0088")
    token.set("Symbol","LINK")
    token = addTokenContract("0x189c32fb32359a7c6a43b3be0e1bd2f5ce8e463c")
    token.set("Symbol","USDT")
    token = addTokenContract("0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A")
    token.set("Symbol","SPCOIN")

    function getTokenProperty(address, key){
      token = tokens.get(address);
      if (token instanceof Map)
         return token.get(key)
      return null;
    }

    var tokenKeys = [...tokens.keys()];
  
    for (let [key] of tokens) {
      tokenSymbol = getTokenProperty(key, "Symbol");
      alert (key + " = " + tokenSymbol);
    }

    for (const [key, value] of Object.entries(tokens)) {
        console.log(key, value);
      }
 
    var selector = document.getElementById(selectorId);
    tokens.forEach (function(value, key) {
        selector.options[selector.options.length] = new Option(key, value);
    })
      
    // for (var textKey in jSONList) {
    //     valueObj = jSONList[textKey];
    //     selector.options[selector.options.length] = new Option(textKey, valueObj);
    //   }
    }

  function processSelectedToken(selectorId) {
    tokenSelect = document.getElementById(selectorId);
    selIdx = tokenSelect.selectedIndex;
    selOption = tokenSelect.options[selIdx];
    tokenText = selOption.text;
    tokenObject = selOption.value;
    alert(tokenObject.address);
    tokenAddress = tokenObject.address;
  
    // Populate Address Text Field
    textFld_Id = selectorId.replace("_SEL","_TX")
    txtFldObj = document.getElementById(textFld_Id);
    txtFldObj.value = tokenAddress;
  }
  
  
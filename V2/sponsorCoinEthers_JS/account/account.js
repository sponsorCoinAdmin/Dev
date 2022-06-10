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

  function tokenSetName(address,name) {
    tokens.set(address, new Map());
    tokens.get(address).set("name",name);
  }
  
  function loadSelectorFromJSONList(selectorId, jSONList) {
    var token;
    token = addTokenContract("0xa36085F69e2889c224210F603D836748e7dC0088")
    token.set("Name","LINK")
    token = addTokenContract("0x189c32fb32359a7c6a43b3be0e1bd2f5ce8e463c")
    token.set("Name","USDT")
    token = addTokenContract("0x334710ABc2Efcc3DF2AfdA839bF8d0dA923dB36A")
    token.set("Name","SPCOIN")

    var keys = [...tokens.keys()];
    alert(keys);

    alert(keys[0]);

    var token0 = tokens.get(keys[0]);
    var tokenName = token0.get("Name");

    for (let [key] of tokens) {
        alert (key + " = " + value);
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
  
  
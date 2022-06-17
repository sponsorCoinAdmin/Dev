class TokenSelector {
  constructor (select_ID) {
    this.tokenSelect = document.getElementById(select_ID);;
  }

  test() {
    alert("TokenSelector Test");
  }

  buttonPressed() {
    this.processSelectedToken(this.tokenSelect.id);
  }

  processSelectedToken(selectId) {
    var tokenSelect = document.getElementById(selectId);
    var selIdx = tokenSelect.selectedIndex;
    processSelectedTokenIndex(selectId, selIdx);
  }
}

  function processSelectedTokenIndex(selectId, selIdx) {
    textFld_Id = selectId.replace("_SEL", "_TX")
    var txtFldObj = document.getElementById(textFld_Id);
    var tokenSelect = document.getElementById(selectId);
    if (selIdx == 0) {
      GUI_OpenAddCryptoForm(tokenSelect);
      txtFldObj.value = "";
    }
    else {
      activeTokenIndex = tokenSelect.selectedIndex = selIdx;
      selOption = tokenSelect.options[selIdx];
      tokenText = selOption.text;
      address = selOption.value;
      tokenValue = getTokenProperty(address, SelectorPropertyKey);
  
      if (isEmpty(tokenValue))
        tokenValue = address;
  
      // Populate Address Text Field
      txtFldObj.value = tokenValue;
    }
  }
  
class TokenSelector {
  constructor (select_ID) {
    this.selector = document.getElementById(select_ID);
    this.selector_TX = document.getElementById(select_ID.replace("_SEL", "_TX"));
  }

  buttonPressed() {
    this.processSelectedToken1();
  }

  processSelectedToken1() {
    var selIdx = this.selector.selectedIndex;
    this.processSelectedTokenIndex1(this.selector.id, selIdx);
    processSelectedTokenIndex(this.selector.id, selIdx);
  }

  processSelectedTokenIndex1(selectId, selIdx) {
    // var tokenSelect = document.getElementById(selectId);
    // if (selIdx == 0) {
    //   GUI_OpenAddCryptoForm(tokenSelect);
    //   this.selector_TX.value = "";
    // }
    // else {
    //   activeTokenIndex = tokenSelect.selectedIndex = selIdx;
    //   selOption = tokenSelect.options[selIdx];
    //   tokenText = selOption.text;
    //   address = selOption.value;
    //   tokenValue = getTokenProperty(address, SelectorPropertyKey);
  
    //   if (isEmpty(tokenValue))
    //     tokenValue = address;
  
    //   // Populate Address Text Field
    //   this.selector_TX.value = tokenValue;
    // }
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
  
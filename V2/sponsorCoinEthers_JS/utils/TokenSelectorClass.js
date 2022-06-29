var ts;

function initTokenSelectorClass(selectedToken) {
    ts = new TokenSelectorClass("tokenContract_SEL", "tokenContract_TX");
    tm = initTokenMap();
    tm.mapTokensToSelector(ts);
    ts.setSelectedTokenText(selectedToken);
}

class TokenSelectorClass {
    constructor(selector_ID, selector_TX) {
        this.tm = initTokenMap();;
        this.selector = document.getElementById(selector_ID);
        this.selector_TX = document.getElementById(selector_TX);
        this.SelectorPropertyKey = "address";
        this.lastTokenIndex = -1;
    }

    init() {
        this.tm = initTokenMap();
        this.tm.mapTokensToSelector(ts);
        this.ts.setSelectedTokenText(selectedToken); 
    }

    buttonPressed() {
        var selIdx = this.selector.selectedIndex;
        if (selIdx == 0) {
            GUI_OpenAddCryptoForm();
            this.selector_TX.value = "";
        }
        else {
            this.setSelectedTokenIndex(selIdx);
        }
    }

    setSelectedTokenIndex(idx) {
        var size = this.selector.options.length;
        if (idx < size && idx > 0) {
            this.selector.selectedIndex = this.lastTokenIndex = idx;
            var selOption = this.selector.options[idx];
            var tokenText = selOption.text;
            var address = selOption.value;
            var tokenValue = tm.getTokenProperty(address, this.SelectorPropertyKey);

            if (isEmpty(tokenValue))
                tokenValue = address;

            // Populate Address Text Field
            this.selector_TX.value = tokenValue;
        }
        else
            alert("token Selector Index " + idx + " Out of Range")
    }

    setSelectedTokenText(tokenText) {
        var size = this.selector.options.length;
        var options = this.selector.options;
        for (let idx = 0; idx < size; idx++) {
            if (options[idx].text == tokenText) {
                this.setSelectedTokenIndex(idx);
                return;
            }
        }
        alert("token " + token + " Not Found In Drop Down List")
    }

    rebaseSelected() {
        this.setSelectedTokenIndex(this.lastTokenIndex);
    }

    addTokenKeyToSelector(tokenSymbol, tokenKey) {
        var selector = this.selector;
        selector.options[selector.options.length] = new Option(tokenSymbol, tokenKey);
    }

    AddTokenContract(_address) {
        var x = this.tm;
        var a = _address
        var abi = spCoinABI;
 //       var w = wallet;
        // var newContract = await this.tm.addValidTokenContract(_address, spCoinABI, wallet.signer);
        // var opt = tokenSelector.options;
        // var optionLength = opt.length;
        // var tokenSymbol = newContract.get("symbol");
        // tokenSelector.options[tokenSelector.options.length] = new Option(tokenSymbol, tokenContractAddress)
        // alert("Validating Token Contract " + tokenContractAddress);
    }

}
class TokenSelectorClass {
    constructor(_selector_ID, _selector_TX, _wallet) {
        this.wallet = _wallet;
        this.tm = this.wallet.tm;
        this.selector = document.getElementById(_selector_ID);
        this.selector_TX = document.getElementById(_selector_TX);
        this.SelectorPropertyKey = "address";
        this.selectedToken = "ETH";
        this.init();
    }

    init() {
        this.mapTokensToSelector(this.tm);
        this.setSelectedTokenText(this.selectedToken);
        this.lastTokenIndex = 0;
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
            var tokenValue = this.tm.getTokenProperty(address, this.SelectorPropertyKey);

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


    AddTokenContract(_address) {
        var x = this.tm;
        var a = _address
        var abi = spCoinABI;
        //       var w = wallet;
        // var newContract = await this.tm.mapWalletObjectByAddressKey(_address, spCoinABI, wallet.signer);
        // var opt = tokenSelector.options;
        // var optionLength = opt.length;
        // var tokenSymbol = newContract.get("symbol");
        // tokenSelector.options[tokenSelector.options.length] = new Option(tokenSymbol, tokenContractAddress);
        // alert("Validating Token Contract " + tokenContractAddress);
    }

    mapWalletToSelector(wallet) {
        this.wallet = wallet;
        this.clearSelector();
        this.mapTokensToSelector(wallet.tm)
    }

    mapTokensToSelector(tm) {
        this.tm = tm;
        for (let [addrKey] of tm.addrMapObjs) {
            var tokenSymbol = tm.getTokenProperty(addrKey, "symbol");
            this.addTokenKeyToSelector(tokenSymbol, addrKey);
        }
        this.sortSelector();
    }

    addTokenKeyToSelector(tokenSymbol, tokenKey) {
        var selector = this.selector;
        selector.options[selector.options.length] = new Option(tokenSymbol, tokenKey);
    }

    clearSelector() {
        var selector = this.selector;
        selector.innerHTML = "";
        selector.options[selector.options.length] = new Option("Connect Wallet");
    }

    sortSelector() {
        // Sort all Objects after the first 2 Objects
        var selector = this.selector;
        var selMap = new Map([]);

        var startIdx = 2;
        var size = this.selector.options.length;
        var options = this.selector.options;
        var idx = startIdx;
        for (idx; idx < size; idx++) {
            selMap.set(options[idx].text, options[idx].value);
        }

        var sortedMap = new Map([...selMap].sort((a, b) => String(a[0]).localeCompare(b[0])))

        var idx = startIdx;
        for (var [key, value] of sortedMap.entries()) {
            options[idx++] = new Option(key, value);
        }
    }
}
var ts;

function initTokenDropDown(selectedToken) {
    ts = new TokenSelector("tokenContract_SEL", "tokenContract_TX");
    initTokenMap();
    // mapTokensToSelector("tokenContract_SEL", tokens);
    ts.mapTokensToSelector(tokens);
    ts.setSelectedTokenText(selectedToken);    
}

class TokenSelector {
    constructor(selector_ID, selector_TX) {
        this.selector = document.getElementById(selector_ID);
        this.selector_TX = document.getElementById(selector_TX);
        this.SelectorPropertyKey = "address";
        this.lastTokenIndex = -1;
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
            var tokenValue = getTokenProperty(address, this.SelectorPropertyKey);

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

    setLastSelected() {
        this.setSelectedTokenIndex(this.lastTokenIndex);
    }

    mapTokensToSelector(tokenMap) {
        var selector = this.selector;
        for (let [key] of tokens) {
          var tokenSymbol = getTokenProperty(key, "Symbol");
          selector.options[selector.options.length] = new Option(tokenSymbol, key);
        }
      }
}
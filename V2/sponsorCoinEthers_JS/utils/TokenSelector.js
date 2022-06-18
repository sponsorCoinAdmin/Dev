class TokenSelector {
    constructor(selector_ID, selector_TX) {
        this.selector = document.getElementById(selector_ID);
        this.selector_TX = document.getElementById(selector_TX);
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

    setSelectedTokenIndex(selIdx) {
        var selOption = this.selector.options[selIdx];
        var tokenText = selOption.text;
        var address = selOption.value;
        var tokenValue = getTokenProperty(address, "address");

        if (isEmpty(tokenValue))
            tokenValue = address;

        // Populate Address Text Field
        this.selector_TX.value = tokenValue;
    }
}
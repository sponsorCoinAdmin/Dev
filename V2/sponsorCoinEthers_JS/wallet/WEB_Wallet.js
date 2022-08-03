var wallet;
var tm;
var ts;
var activePage = "home";
document
  .getElementById("tokenContract_SEL")
  .addEventListener("change", selectedTokenChanged);

function GUI_initPage() {
  clearContractFields();
  document.getElementById("popup_Wallet_Div").style.display = "none";
  window.addEventListener(
    "resize",
    function (event) {
      setWindowCentre();
    },
    true
  );
}

// 1. Connect Metamask with Dapp
async function GUI_connectWallet(id, _walletName) {
  try {
    wallet = new Wallet(_walletName);
    await wallet.init();
    changeElementIdColor(id, "green");
    ts = wallet.ts;
    tm = ts.tm;
    selectedTokenChanged();
  } catch (err) {
    alertLogError(err, id);
    document.getElementById("ethereumAccountBalance_TX").value = "";
  }
}

async function GUI_AddTokenContract(id) {
  try {
    var tokenSelectorStr = id.replace("_BTN", "_SEL");
    var tokenSelector = document.getElementById(id.replace("_BTN", "_SEL"));
    var addressKey = document.getElementById(id.replace("_BTN", "_ADR")).value;
    contractMap = await wallet.getContractMapByAddressKey(addressKey);
    ts.mapWalletToSelector(wallet);
    // ts.AddTokenContract(addressKey);

    // var opt = tokenSelector.options;
    // var optionLength = opt.length;
    // var tokenSymbol = contractMap.get("symbol");
    // tokenSelector.options[tokenSelector.options.length] = new Option(tokenSymbol, addressKey)
    // // alert("Validating Token Contract " + addressKey);

    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN", "_TX")).value = "";
    alertLogError(err, id);
  }
}

// 2. Connect Active Account
async function GUI_getActiveAccount(id) {
  try {
    // MetaMask requires requesting permission to connect users accounts
    accountAddress = await wallet.getActiveAccount();
    //    accountAddress = await getActiveAccount(signer);
    document.getElementById(id.replace("_BTN", "_TX")).value = accountAddress;
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN", "_TX")).value = "";
    alertLogError(err, id);
  }
}

// 3. Get Ethereum balance
/*
async function GUI_getEthereumAccountBalance(id) {
  try {
    const balance = await signer.getBalance();
    const convertToEth = 1e18;
    const ethbalance = balance.toString() / convertToEth;
    document.getElementById(id.replace("_BTN","_TX")).value = ethbalance;
    console.log(
      "account's balance in ether:",
      balance.toString() / convertToEth
    );
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN","_TX")).value = "";
    alertLogError(err, id);
  }
}
*/

function GUI_OpenPopupWallet() {
  document.getElementById("popup_Wallet_Div").style.display = "block";
  setWindowCentre();
}

function GUI_ClosePopupWallet(selectId) {
  document.getElementById("popup_Wallet_Div").style.display = "none";
  ts.rebaseSelected();
}

function selectedTokenChanged() {
  var selector = document.getElementById("tokenContract_SEL");
  var size = selector.options.length;
  var idx = selector.selectedIndex;
  if (idx == 0) {
    activateWalletPage("IMPORT_TOKENS");
  } else if (idx < size && idx > 0) {
    activateWalletPage("DISPLAY_TOKEN_DATA");
    var selOption = selector.options[idx];
    var tokenText = selOption.text;
    var selectorPropertyKey = selOption.value;
    var address = tm.getTokenProperty(selectorPropertyKey, "address");
    var name = tm.getTokenProperty(selectorPropertyKey, "name");
    var symbol = tm.getTokenProperty(selectorPropertyKey, "symbol");
    var totalSupply = tm.getTokenProperty(selectorPropertyKey, "totalSupply");
    var decimals = tm.getTokenProperty(selectorPropertyKey, "decimals");
    var tokenSupply = tm.getTokenProperty(selectorPropertyKey, "tokenSupply");

    document.getElementById("tokenAddress_TX").value = address;
    document.getElementById("contractName_TX").value = name;
    document.getElementById("contractSymbol_TX").value = symbol;
    document.getElementById("contractTotalSupply_TX").value = totalSupply;
    document.getElementById("contractDecimals_TX").value = decimals;
    document.getElementById("contractTokenSupply_TX").value =
      document.getElementById("balanceOf_TX").value = totalSupply;
    document.getElementById("AccountTokenBalance_TX").value = tokenSupply;
  } else alert("token Selector Index " + idx + " Out of Range");
}

function activateWalletPage(_activePage) {
  activePage = _activePage;
  clearWalletPages();
  switch (activePage.toUpperCase()) {
    case "ADD_CONTRACT":
      inportTokens_DIV.style.display = "block";
      break;
    case "ADMIN":
      admin_DIV.style.display = "block";
      break;
    case "IMPORT_TOKENS":
      inportTokens_DIV.style.display = "block";
      break;
    case "HOME":
      // code block
      break;
    case "DISPLAY_TOKEN_DATA":
      walletContainer_FORM.style.display = "block";
      selector_Div.style.display = "block";
      break;
    case "DISPLAY_TOKEN_SELECTOR":
      selector_Div.style.display = "block";
      break;
    case "TRANSASTION":
      transaction_Div.style.display = "block";
      // code block
      break;
    case "SELECTOR":
      selector_Div.style.display = "block";
      break;
    default:
      break;
  }
}

function toggleWalletPage(_activePage) {
  activePage = _activePage;
  switch (activePage.toUpperCase()) {
    case "ADD_CONTRACT":
      toggle(inportTokens_DIV);
      break;
    // case "ADMIN":
    //   if (admin_DIV.style.display == "block")
    //     inportTokens_DIV.style.display = "none";
    //   else admin_DIV.style.display = "block";
    //   break;
    case "IMPORT_TOKENS":
      toggle(inportTokens_DIV);
      break;
    case "HOME":
      // code block
      break;
    case "DISPLAY_TOKEN_DATA":
      toggle(walletContainer_FORM);
      break;
    case "DISPLAY_TOKEN_SELECTOR":
      toggle(selector_Div);
      break;
    case "TRANSASTION":
      toggle(transaction_Div);
      // code block
      break;
    case "SELECTOR":
      toggle(selector_Div);
      break;
    default:
      break;
  }
}

function toggle(element) {
  if (element.style.display == "block") {
    inportTokens_DIV.style.display = "none";
  } else {
    clearWalletPages();
    element.style.display = "block";
  }
}

function clearWalletPages() {
  var selectedClasses = document.getElementsByClassName("walletSubContainer");
  for (var i = 0; i < selectedClasses.length; i++) {
    selectedClasses[i].style.display = "none";
  }
}

var wallet;
var ts;

function GUI_initPage() {
  clearContractFields();
  document.getElementById("addContractDiv").style.display = "none";
  window.addEventListener('resize', function (event) {
    setWindowCentre();
  }, true);
}

// 1. Connect Metamask with Dapp
async function GUI_connectWallet(id, _walletName) {
  try {
    wallet = new Wallet(_walletName);
    await wallet.init();
    changeElementIdColor(id, "green");
    ts = new TokenSelectorClass("tokenContract_SEL", "tokenContract_TX", wallet);

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

function GUI_OpenAddCryptoForm() {
  document.getElementById("addContractDiv").style.display = "block";
  setWindowCentre();
}

function GUI_CloseAddCryptoForm(selectId) {
  document.getElementById("addContractDiv").style.display = "none";
  ts.rebaseSelected();
}
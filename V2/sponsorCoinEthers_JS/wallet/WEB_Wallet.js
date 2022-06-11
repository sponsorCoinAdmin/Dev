function GUI_initPage() {
  clearContractFields();
  initTokenMap();
  mapTokensToSelector("tokenContract_SEL",tokens);
}

// 1. Connect Metamask with Dapp
async function GUI_connectWallet(id, _walletName) {
  try {
    provider = await connectValidWalletProvider(_walletName);
    setWalletName(_walletName);
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById("ethereumAccountBalance_TX").value = "";
    disconnectWallet();
    alertLogError(err, id);
  }
}

// 2. Connect Active Account
async function GUI_getActiveAccount(id) {
  try {
    // MetaMask requires requesting permission to connect users accounts
    var signer = getValidatedSigner();
    accountAddress = await getActiveAccount(signer);
    document.getElementById(id.replace("_BTN","_TX")).value = accountAddress;
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN","_TX")).value = "";
    alertLogError(err, id);
  }
}

// 3. Get Ethereum balance
/*
async function GUI_getEthereumAccountBalance(id) {
  try {
    var signer = getValidatedSigner();
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

async function GUI_AddTokenContract(id) {
  try {
    var signer = getValidatedSigner();
    tokenContractAddress = document.getElementById(id.replace("_BTN","_ADR")).value;
    tokenSelectorStr= id.replace("_BTN","_SEL");
    tokenSelector = document.getElementById(id.replace("_BTN","_SEL"));
    tokenSelector.options[tokenSelector.options.length] = new Option("IT WORKS", );
    opt = tokenSelector.options;
    opt0 = opt[0];
    opt00 =opt[0,0];
    optionLength = opt.length;
    alert("tokenSelector.options = "+tokenSelector.options[0]);
    tokenSelector.options[tokenSelector.options.length] = tokenContractAddress;
    alert ("Validating Token Contract " + tokenContractAddress);

    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN","_TX")).value = "";
    alertLogError(err, id);
  }
}
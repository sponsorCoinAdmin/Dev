function GUI_initPage() {
  clearContractFields();
  initTokenSelectorClass("ETH");
  document.getElementById("addContractDiv").style.display = "none";
  window.addEventListener('resize', function (event) {
    setWindowCentre();
  }, true);
}

// 1. Connect Metamask with Dapp
async function GUI_connectWallet(id, _walletName) {
  try {
    wallet  = connectWallet(_walletName);
//    wallet = new Wallet(_walletName);
    acct = wallet.getActiveAccount();
    changeElementIdColor(id, "green");
  } catch (err) {                                                                                                                                                                                                               
    document.getElementById("ethereumAccountBalance_TX").value = "";
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

async function GUI_AddTokenContract(id) {
  try {
    tokenSelectorStr = id.replace("_BTN", "_SEL");
    tokenSelector = document.getElementById(id.replace("_BTN", "_SEL"));
    tokenSelector.options[tokenSelector.options.length] = new Option("IT WORKS",);
    tokenContractAddress = document.getElementById(id.replace("_BTN", "_ADR")).value;

    await tm.addValidTokenContract(tokenContractAddress, spCoinABI, wallet.signer);

    opt = tokenSelector.options;
    opt0 = opt[0];
    opt00 = opt[0, 0];
    optionLength = opt.length;
    alert("tokenSelector.options = " + tokenSelector.options[0]);
    tokenSelector.options[tokenSelector.options.length] = tokenContractAddress;
    alert("Validating Token Contract " + tokenContractAddress);

    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN", "_TX")).value = "";
    alertLogError(err, id);
  }
}

function GUI_OpenAddCryptoForm() {
  document.getElementById("addContractDiv").style.display = "block";
  setWindowCentre();
}

function GUI_CloseAddCryptoForm(selectId) {
  document.getElementById("addContractDiv").style.display = "none";
  ts.rebaseSelected();
}
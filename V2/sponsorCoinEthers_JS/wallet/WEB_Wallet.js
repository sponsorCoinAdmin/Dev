// 1. Connect Metamask with Dapp
async function GUI_connectWallet(_walletName) {
  try {
    provider = await connectValidWalletProvider(_walletName);
    setWalletName(_walletName);
    changeElementIdColor("connectWallet_BTN", "green");
  } catch (err) {
    document.getElementById("activeAccount_TX").value = "";
    document.getElementById("ethereumAccountBalance_TX").value = "";
    disconnectWallet();
    alertLogError(err, "connectWallet_BTN");
  }
}

// 2. Connect Active Account
async function GUI_getActiveAccount() {
  try {
    // MetaMask requires requesting permission to connect users accounts
    var signer = getValidatedSigner();
    accountAddress = await getActiveAccount(signer);
    document.getElementById("activeAccount_TX").value = accountAddress;
    changeElementIdColor("activeAccount_BTN", "green");
  } catch (err) {
    document.getElementById("activeAccount_TX").value = "";
    alertLogError(err, "activeAccount_BTN");
  }
}

// 3. Get Ethereum balance
async function GUI_getEthereumAccountBalance() {
  try {
    var signer = getValidatedSigner();
    const balance = await signer.getBalance();
    const convertToEth = 1e18;
    const ethbalance = balance.toString() / convertToEth;
    document.getElementById("ethereumAccountBalance_TX").value = ethbalance;
    console.log(
      "account's balance in ether:",
      balance.toString() / convertToEth
    );
    changeElementIdColor("ethereumAccountBalance_BTN", "green");
  } catch (err) {
    document.getElementById("ethereumAccountBalance_TX").value = "";
    alertLogError(err, "ethereumAccountBalance_BTN");
  }
}

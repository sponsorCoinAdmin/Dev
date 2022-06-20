// Connect contract
async function GUI_connectContract(id, _contractAddress) {
  try {
    contract = await connectValidContract(_contractAddress);
    changeElementIdColor(id, "green");
  } catch (err) {
    alertLogError(err, id);
  }
  return contract;
}

async function GUI_readContractName(id) {
  try {
    tokenName = await getContractName();
    document.getElementById(id.replace("_BTN", "_TX")).value = tokenName;
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN","_TX")).value = "";
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Valid Contract Required";
    else msg = "Error: readContractName() ";
    alertLogError(
      { name: "ReadNameFailure", message: msg }, id );
  }
}

async function GUI_readContractSymbol(id) {
  try {
    symbol = await getContractSymbol();
    document.getElementById(id.replace("_BTN", "_TX")).value = symbol;
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN","_TX")).value = "";
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContracSymbol() ";
    alertLogError(
      { name: "readContracSymbol", message: msg }, id);
  }
}

async function GUI_readContractTotalSupply(id) {
  try {
    spCoinWeiSupply = await getContractTotalSupply();
    document.getElementById(id.replace("_BTN", "_TX")).value = spCoinWeiSupply;
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN","_TX")).value = "";
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContractTotalSupply() ";
    alertLogError(
      { name: "readContractTotalSupply", message: msg }, id );
  }
}

async function GUI_readContractDecimals(id) {
  try {
    decimals = await getContractDecimals();
    document.getElementById(id.replace("_BTN", "_TX")).value = decimals;
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN","_TX")).value = "";
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContractDecimals() ";
    alertLogError(
      { name: "readContractDecimals", message: msg }, id);
  }
}

async function GUI_readContractTokenSupply(id) {
  try {
    tokenSupply = await getContractTokenSupply();
    alert("GUI_readContractTokenSupply(id) ");
    document.getElementById(id.replace("_BTN", "_TX")).value = tokenSupply;
    changeElementIdColor(id, "green");
  } catch (err) {
    document.getElementById(id.replace("_BTN","_TX")).value = "";
    console.log(err);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContractTotalSupply() ";
    alertLogError(
      { namereadContractTotalSupply: "", message: msg },id);
  }
}

async function GUI_balanceOf(id) {
  try {
    balance = await getContract().balanceOf(accountAddress);
    document.getElementById(id.replace("_BTN", "_TX")).value = balance;
    console.log("balanceOf " + accountAddress + " = " + balance);
    changeElementIdColor(id, "green");
  } catch (err) {
    console.log(err);
    alert(contract);
    if (contract == null || contract.length == 0)
      msg = "Error: Null/Empty Contract";
    else msg = "Error: readContractBalanceOfName() ";
    alertLogError(
      { name: "GetBalanceOfNameFailure", message: msg }, id);
  }
}

async function GUI_sendTokensToAccount(id, addr, tokkenAmount) {
  try {
    await sendTokensToAccount(addr, tokkenAmount);

    changeElementIdColor(id, "green");
  } catch (err) {
    alertLogError(err, id);
  }
}

async function GUI_contractToggleData(btn) {
  elmtStr_DIV = btn.id.replace("_BTN", "_DIV")
  elmtObj_DIV = document.getElementById(elmtStr_DIV);
  if (btn.innerText == "Show Contract Data")
  {
    btn.innerText = "Hide Contract Data";
    elmtObj_DIV.style.display = "block";
    loadContractFields();
  }  
  else
  if (btn.innerText == "Hide Contract Data") {
    btn.innerText = "Show Contract Data";
    elmtObj_DIV.style.display = "none";
    clearContractFields();
  }
}

function loadContractFields() {
  GUI_readContractName("contractName_BTN");
  GUI_readContractSymbol("contractSymbol_BTN");
  GUI_readContractTotalSupply("contractTotalSupply_BTN");
  GUI_readContractDecimals("contractDecimals_BTN");
  GUI_balanceOf("balanceOf_BTN");
}

function clearContractFields() {
  document.getElementById("contractName_TX").value = "";
  document.getElementById("contractSymbol_TX").value = "";
  document.getElementById("contractTotalSupply_TX").value = "";
  document.getElementById("contractDecimals_TX").value = "";
  document.getElementById("balanceOf_TX").value = "";
}
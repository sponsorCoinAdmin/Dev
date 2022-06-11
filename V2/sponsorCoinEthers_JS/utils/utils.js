function changeElementIdColor(name, color) {
  document.getElementById(name).style.backgroundColor = color;
}

function isEmpty(obj) {
  var isEmpty = false;
  if (obj == null || obj == undefined || obj == "")
    isEmpty = true;
  else
    isEmpty = JSON.stringify(obj) === "{}";
  return isEmpty;
}

function processError(err) {
  console.log(err);
  throw err;
}

function disconnectContract() {
  this.contractAddress = undefined;
  this.contract = undefined;
}

function alertLogError(err, element) {
  console.log(err.message);
  changeElementIdColor(element, "red");
  alert(err.message);
}

function changeElementIdColor(name, color) {
  document.getElementById(name).style.backgroundColor = color;
}

function toggle(elmtStr) {
  var elmtObj = document.getElementById(elmtStr);
  if (elmtObj.style.display === "none") {
    elmtObj.style.display = "block";
  } else {
    elmtObj.style.display = "none";
  }
}

function weiToToken(wei, decimals) {
  var mod = 10 ** decimals;
  var tokens = wei / mod;
  //    alert ("\nwei = " + wei + "\n mod = " + mod + "\ntokens = " + tokens);

  return tokens;
}

function tokensToWei(tokens, decimals) {
  var mod = 10 ** decimals;
  var wei = tokens * mod;
  //    alert ("\ntokens = " + tokens + "\n wei = " + wei + "\nwei = " + wei);
  return wei;
}

function clearFields() {
  document.onclicklocation.reload(true);
}
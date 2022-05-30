const { ethers } = require("ethers");

function changeElementIdColor(name, color) {
    document.getElementById(name).style.backgroundColor = color;
  }
  
  function isEmptyObj(object) {
    isEmpty = JSON.stringify(object) === "{}";
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

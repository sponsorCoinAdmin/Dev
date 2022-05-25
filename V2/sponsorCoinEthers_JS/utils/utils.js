
function changeElementIdColor(name, color) {
    document.getElementById(name).style.backgroundColor = color;
  }
  
  function isEmptyObj(object) {
    isEmpty = JSON.stringify(object) === "{}";
    return isEmpty;
  }
  
  function processError(err) {
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
    elmtObj = document.getElementById(elmtStr);
    if (elmtObj.style.display === "none") {
      elmtObj.style.display = "block";
    } else {
      elmtObj.style.display = "none";
    }
  }
  
  function WEB_isEmptyObj(object) {
    isEmpty = JSON.stringify(object) === "{}";
    return isEmpty;
  }
  
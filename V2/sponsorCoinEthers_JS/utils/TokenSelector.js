class TokenSelector {
  constructor (select_ID) {
    this.selector = document.getElementById(select_ID);;
  }

  test() {
    alert("TokenSelector Test");
  }

  buttonPressed() {
    alert("buttonPressed Test");
    GUI_processSelectedToken(this.selector.id);
  }
}

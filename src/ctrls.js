class Controls {
  constructor(maxCars, mock = false) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this._select = 0;
    this.maxCars = maxCars;
    this.mock = mock;

    this.#addKeyboardListeners();
  }

  #addKeyboardListeners() {
    if (!this.mock) {
      document.onkeydown = (event) => {
        switch (event.key) {
          case "ArrowLeft":
            this.left = true;
            break;
          case "ArrowRight":
            this.right = true;
            break;
          case "ArrowUp":
            this.forward = true;
            break;
          case "ArrowDown":
            this.reverse = true;
            break;
          case "+":
            if (this._select < this.maxCars) {
              this._select += 1;
              //console.log("key: + :: this._select:", this._select);
            }
            break;
          case "-":
            if (this._select > 0) {
              this._select -= 1;
              //console.log("key: - :: this._select:", this._select);
            }
            break;
        }
      };
      document.onkeyup = (event) => {
        switch (event.key) {
          case "ArrowLeft":
            this.left = false;
            break;
          case "ArrowRight":
            this.right = false;
            break;
          case "ArrowUp":
            this.forward = false;
            break;
          case "ArrowDown":
            this.reverse = false;
            break;
        }
      };
    }
  }

  get select() {
    return this._select;
  }

  set select(val) {
    this._select = val;
  }
}

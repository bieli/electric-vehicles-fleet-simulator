class Fleet {
  #cars;
  #controls;

  constructor(id, x, y, carsDistancePx, rows, cols, randomPowerLevelInCar) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.rows = rows;
    this.cols = cols;
    const maxCars = carsRows * carsCols - 1;
    this.controls = new Controls(maxCars);
    this.cars = [];
    this.carsDistancePx = carsDistancePx;
    this.randomPowerLevelInCar = randomPowerLevelInCar;
  }

  randomInteger(pow) {
    return Math.floor(Math.random() * pow);
  }

  *create() {
    let car_cnt = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        let powerLevel = 100;
        if (this.randomPowerLevelInCar) {
          powerLevel = this.randomInteger(100);
        }
        const car = new Car(
          car_cnt,
          this.x + this.carsDistancePx * c,
          this.y + this.carsDistancePx * r,
          30,
          50,
          powerLevel,
          this.controls,
        );
        console.log("car: ", car);
        this.cars.push(car);
        car_cnt++;
      }
    }
    /*
        this.cars = [
            new Car(0, 300, this.y, 30, 50, 100, this.controls),
            new Car(1, 400, this.y, 30, 50, 75, this.controls),
            new Car(2, 500, this.y, 30, 50, 50, this.controls),
            new Car(3, 600, this.y, 30, 50, 25, this.controls),
            new Car(4, 700, this.y, 30, 50, 0, this.controls),
        ];
        */
    return yield this.cars;
  }
}

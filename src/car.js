class Car {
  constructor(id, x, y, width, height, startPower, controls) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
    this.selected = false;
    this.startPower = startPower;
    this.acuPower = this.startPower;
    this.is_charging = false;

    this.controls = controls;
  }

  update(idx) {
    return this.#move(idx);
  }

  #move(idx) {
    this.selected = this.controls.select == idx;
    if (this.selected && this.acuPower > 0) {
      if (this.controls.forward) {
        this.speed += this.acceleration;
        this.acuPower -= 0.2;
      }
      if (this.controls.reverse) {
        this.speed -= this.acceleration;
        this.acuPower -= 0.1;
      }

      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed;
      }
      if (this.speed < -this.maxSpeed / 2) {
        this.speed = -this.maxSpeed / 2;
      }

      if (this.speed > 0) {
        this.speed -= this.friction;
      }
      if (this.speed < 0) {
        this.speed += this.friction;
      }
      if (Math.abs(this.speed) < this.friction) {
        this.speed = 0;
      }

      if (this.speed != 0) {
        const flip = this.speed > 0 ? 1 : -1;
        if (this.controls.left) {
          this.angle += 0.03 * flip;
        }
        if (this.controls.right) {
          this.angle -= 0.03 * flip;
        }
      }

      this.x -= Math.sin(this.angle) * this.speed;
      this.y -= Math.cos(this.angle) * this.speed;
    }
    return this.controls.select;
  }

  draw(ctx, anim) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    // body
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fill();

    /*
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/3,
            this.width/16,
            this.height/8
        );
        ctx.fillStyle = "orange";
        ctx.fill();    
        */
    if (this.acuPower > 50) {
      ctx.fillStyle = "lightgreen";
    } else if (this.acuPower <= 50) {
      ctx.fillStyle = "orange";
    } else if (this.acuPower <= 25) {
      ctx.fillStyle = "red";
    }
    let c = 0;
    let d = 0;

    // front lights
    ctx.beginPath();
    ctx.rect(c + -13, d + -25, 5, 2);
    ctx.rect(c + 8, d + -25, 5, 2);
    ctx.fillStyle = "yellow";
    ctx.fill();

    // wheels
    ctx.beginPath();
    ctx.setLineDash([0, 0]);
    ctx.fillStyle = "black";
    ctx.rect(c + -8, d + -27, 16, 2);
    ctx.rect(c + -16, d + -18, 2, 10);
    ctx.rect(c + 14, d + -18, 2, 10);
    ctx.rect(c + -16, d + 10, 2, 10);
    ctx.rect(c + 14, d + 10, 2, 10);
    ctx.fill();

    if (anim == true) {
      ctx.setLineDash([1, 1]);
      ctx.beginPath();
      ctx.rect(
        c + -10,
        d + -15 + 2,
        c + this.width / 2 + 5,
        d + this.height / 2 + 5,
      );
      ctx.fillStyle = "rgb(0 200 0 / 100%)";
      ctx.stroke();
    }
    if (anim == true) {
      ctx.beginPath();
      let cr1 = 25 - Math.floor((this.acuPower / 100) * 25);
      ctx.font = "12px serif";

      // animation fulfilling car battery
      if (this.is_charging) {
        if (this.acuPower < 100) {
          this.acuPower = this.acuPower + 1;
        }
      }

      ctx.fillText(
        Math.floor(
          this.acuPower < 100 ? this.acuPower + 1 : this.acuPower,
        ).toString() + " %",
        c + this.width / 2 - 28,
        d + this.height / 2 + 20,
      );
      ctx.fillText(
        "c [" + this.id.toString() + " ]",
        c + this.width / 2 - 28,
        d + this.height / 2 + 40,
      );
      ctx.rect(
        c + -10 + 2,
        d + -13 + 2 + cr1,
        c + this.width / 2 + 5 - 4,
        d + this.height / 2 + 5 - 4 - cr1,
      );
      // ctx.fillStyle = "green";
      ctx.fillStyle = "rgb(0 200 0 / 50%)";
      ctx.fill();
    }

    if (this.selected == true) {
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.strokeStyle = "brown";
      ctx.stroke();
    }

    if (this.is_charging == true) {
      ctx.setLineDash([0, 0]);
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.strokeStyle = "white";
      ctx.stroke();
    }

    ctx.restore();
  }

  charging(station) {
    this.is_charging = true;
  }

  discharge() {
    this.is_charging = false;
  }
}

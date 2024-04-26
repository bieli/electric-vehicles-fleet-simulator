class Station{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.is_used=false;
        this.is_used_cars_ids = []; 
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="grey";
        ctx.setLineDash([10,10]);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 10);
        ctx.lineTo(this.x, this.y + 120);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 120);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();


        ctx.lineWidth=2;
        ctx.strokeStyle="green";
        ctx.beginPath();
        ctx.moveTo(this.x - 66, this.y);
        ctx.lineTo(this.x + this.width - 30, this.y);
        ctx.stroke();


        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fillStyle = "lightgreen";
        ctx.fill();

        ctx.beginPath();
        ctx.rect(
            -this.width/4,
            -this.height/4,
            this.width / 2,
            this.height / 2
        );
        ctx.fillStyle = "green";
        ctx.fill();

        ctx.setLineDash([0,0]);
        ctx.lineWidth=4;
        ctx.strokeStyle="lightgreen";
        ctx.beginPath();
        let a = 5;
        let b = -25;
        ctx.moveTo(a + 0, b + 0);
        ctx.lineTo(a + -20, b + 30);
        ctx.lineTo(a + 5, b + 25);
        ctx.lineTo(a + -20, b + 50);
        ctx.moveTo(a + -20, b + 50);
        ctx.stroke();

        if (this.is_used == true) {
            ctx.fillStyle="orange";
        } else {
            ctx.fillStyle="lightgreen";
        }
        ctx.beginPath();
        ctx.arc(a - 30, b - 20, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(a + 20, b - 20, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(a - 30, b + 70, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(a + 20, b + 70, 10, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }

    used(state, car_id, station_id) {
        this.is_used = state;
        if (this.is_used_cars_ids.includes(car_id) == false) {
            this.is_used_cars_ids.push(car_id);
            console.log("CAR id:", car_id, "to STATION id: ", station_id, ", state: ", state);
        }
    }
}
class Arrow extends Shape{
  constructor(startPoint, thick, color){
    super(startPoint, thick, color);
  }

  draw(ctx) {
    if (this.startPoint == null || this.lastPoint == null ){
      return;
    }

    var pid10 = Math.PI / 5.0;
		//Calculating

		var RATIO1 = 1 / 12;
		var RATIO2 = 1 / 3;

		var xneck = (3 * this.lastPoint.x + this.startPoint.x) / 4;
		var yneck = (3 * this.lastPoint.y + this.startPoint.y) / 4;

		//One side
		var x1 = -(this.lastPoint.y - yneck) + xneck;
		var y1 = (this.lastPoint.x - xneck) + yneck;

		var x2 = (2 * xneck + x1) / 3;
		var y2 = (2 * yneck + y1) / 3;

		var xtemp = (this.lastPoint.x + 11 * this.startPoint.x) / 12;
		var ytemp = (this.lastPoint.y + 11 * this.startPoint.y) / 12;

		var x3 = -(ytemp - this.startPoint.y) + this.startPoint.x;
		var y3 = (xtemp - this.startPoint.x) + this.startPoint.y;

		//Other side
		var x1o = 2 * xneck - x1;
		var y1o = 2 * yneck - y1;

		var x2o = 2 * xneck - x2;
		var y2o = 2 * yneck - y2;

		var x3o = 2 * this.startPoint.x - x3;
		var y3o = 2 * this.startPoint.y - y3;


		ctx.beginPath();
    ctx.moveTo(x3, y3);
    ctx.lineTo(x2, y2);

    ctx.lineTo(x1, y1);

    ctx.lineTo(this.lastPoint.x, this.lastPoint.y);

    ctx.lineTo(x1o, y1o);

    ctx.lineTo(x2o, y2o);

    ctx.lineTo(x3o, y3o);

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thick;

    ctx.closePath();
    ctx.stroke();
  }
}

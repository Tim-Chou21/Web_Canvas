class Pentagon extends Shape{
  constructor(startPoint, thick, color){
    super(startPoint, thick, color);
  }

  draw(ctx) {
    if (this.startPoint == null || this.lastPoint == null ){
      return;
    }
    ctx.beginPath();
    var x1 = (this.startPoint.x + this.lastPoint.x) / 2;
    ctx.moveTo(x1, this.startPoint.y);
    var y1 = (this.lastPoint.y + 2 * this.startPoint.y) / 3;
    ctx.lineTo(this.startPoint.x, y1);
    x1 = (this.lastPoint.x + 5 * this.startPoint.x) / 6;
    ctx.lineTo(x1, this.lastPoint.y);
    x1 = (this.startPoint.x + 5 * this.lastPoint.x) / 6;
    ctx.lineTo(x1, this.lastPoint.y);
    ctx.lineTo(this.lastPoint.x, y1);
    x1 = (this.startPoint.x + this.lastPoint.x) / 2;
    ctx.lineTo(x1, this.startPoint.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thick;
    ctx.closePath();
    ctx.stroke();
  }
}

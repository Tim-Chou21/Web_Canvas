class Line extends Shape{

    constructor(startPoint, thick, color){
      super(startPoint, thick, color);
    }

    draw(ctx) {
      if (this.startPoint == null || this.lastPoint == null ){
        return;
      }
      ctx.moveTo(this.startPoint.x, this.startPoint.y);
      ctx.lineTo(this.lastPoint.x, this.lastPoint.y);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.thick;
      ctx.stroke();
    }
}

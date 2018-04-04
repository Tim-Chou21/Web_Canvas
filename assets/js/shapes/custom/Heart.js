class Star extends Shape{
  constructor(startPoint, thick, color){
    super(startPoint, thick, color);
  }

  draw(ctx) {
    if (this.startPoint == null || this.lastPoint == null ){
      return;
    }
    var height = Math.abs(this.lastPoint.y - this.startPoint.y);
    var width = Math.abs(this.lastPoint.x - this.startPoint.x);

    ctx.moveTo((this.startPoint.x + this.lastPoint.x)/2,this.startPoint.y);
    ctx.quadraticCurveTo(this.startPoint.x,this.startPoint.y,this.startPoint.x,(this.startPoint.y+this.lastPoint.y)/2);
    ctx.quadraticCurveTo(this.startPoint.x, this.startPoint.y+height*2/3, this.startPoint.x + width/4,this.startPoint.x + height*2/3);
    ctx.quadraticCurveTo(this.startPoint.x + width/4,this.startPoint.y + height*3/4,this.startPoint.x,this.lastPoint.y);
    ctx.quadraticCurveTo(this.startPoint.x + width*2/5,this.startPoint.y + height*3/4,this.startPoint.x+ width*2/5,this.startPoint.y + height*2/3);
    ctx.quadraticCurveTo(this.lastPoint.x,this.startPoint.y+height*2/3,this.lastPoint.x,(this.startPoint.y+this.lastPoint.y)/2);
    ctx.quadraticCurveTo(this.lastPoint.x, this.startPoint.y ,(this.startPoint.x + this.lastPoint.x)/2,this.startPoint.y);
    ctx.stroke();
    ctx.closePath();
  }
}

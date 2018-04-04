class Chatbox extends Shape{
  constructor(startPoint, thick, color){
    super(startPoint, thick, color);
  }

  draw(ctx) {
    if (this.startPoint == null || this.lastPoint == null ){
      return;
    }
    var x1,x2,y1,y2;
    if (this.startPoint.x > this.lastPoint.x){
      x1 = this.lastPoint.x;
      x2 = this.startPoint.x;
    }else{
      x1 = this.startPoint.x;
      x2 = this.lastPoint.x;
    }
    if (this.startPoint.y > this.lastPoint.y){
      y1 = this.lastPoint.y;
      y2 = this.startPoint.y;
    }else{
      y1 = this.startPoint.y;
      y2 = this.lastPoint.y;
    }
    var height = Math.abs(y2 - y1);
    var width = Math.abs(x2 - x1);

    ctx.moveTo((x1 + x2)/2,y1);
    ctx.quadraticCurveTo(x1,y1,x1,(y1+y2)/2);
    ctx.quadraticCurveTo(x1, y1 + height*2/3, x1 + width/4,y1 + height*2/3);
    ctx.quadraticCurveTo(x1 + width/4,y1 + height*3/4,x1,y2);
    ctx.quadraticCurveTo(x1 + width*2/5,y1+ height*3/4,x1+ width*2/5,y1 + height*2/3);
    ctx.quadraticCurveTo(x2 ,y1+height*2/3,x2,(y1+y2)/2);
    ctx.quadraticCurveTo(x2, y1 ,(x1 + x2)/2,y1);
    ctx.stroke();
    ctx.closePath();
  }
}

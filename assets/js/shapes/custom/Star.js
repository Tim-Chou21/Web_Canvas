class Star extends Shape{
  constructor(startPoint, thick, color){
    super(startPoint, thick, color);
  }

  draw(ctx) {
    if (this.startPoint == null || this.lastPoint == null ){
      return;
    }
    var a = (this.startPoint.x + this.lastPoint.x) / 2;
    var b = (this.startPoint.y + this.lastPoint.y) / 2;
    var pid10 = Math.PI / 5.0;
    ctx.beginPath();
    for (var i = 0; i <= 10; i++){
      var angle = i*pid10;
      var cosine = Math.cos(angle);
      var sine = Math.sin(angle);
      var cosine1 = Math.cos(angle + pid10);
      var sine1 = Math.sin(angle + pid10);
      var x1temp = (this.startPoint.x - a)*cosine - (this.startPoint.y - b)*sine + a;
      var y1temp = (this.startPoint.x - a)*sine + (this.startPoint.y - b)*cosine + b;
      var x2temp = (this.startPoint.x - a)*cosine1 - (this.startPoint.y - b)*sine1 + a;
      var y2temp = (this.startPoint.x - a)*sine1 + (this.startPoint.y - b)*cosine1 + b;
      if (i % 2 != 0)
      {
        x1temp = (x1temp+a)/2;
        y1temp = (y1temp + b)/2;
      }
      else{
        x2temp = (x2temp + a) / 2;
        y2temp = (y2temp + b) / 2;
      }
      if( i == 0)
        ctx.moveTo(x1temp, y1temp);
      ctx.lineTo(x2temp, y2temp);
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thick;
    ctx.stroke();
    ctx.closePath();
  }
}

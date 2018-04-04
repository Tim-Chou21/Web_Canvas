class Polygon  {

  constructor(startPoint, thick, color){
    this.thick = thick;
    this.color = color;
    this.linelist = [];
    this.linelist.push(new Line(startPoint,thick,color));
    this.isFinish = false;
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.linelist[0].startPoint.x,this.linelist[0].startPoint.y);
    for (var i = 0 ;  i < this.linelist.length ; i++){
      ctx.lineTo(this.linelist[i].lastPoint.x, this.linelist[i].lastPoint.y);
    }

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thick;
    if (this.isFinish == true)
    {
      ctx.closePath();
    }
    ctx.stroke();

  }

  setLastpoint(lastPoint){
    this.linelist[this.linelist.length - 1].lastPoint = lastPoint;
  }

  finish(){
    this.linelist.splice(this.linelist.length - 1,1);
    this.isFinish = true
  }


  addNewLine(ctx){
    if (this.linelist.length == 1){
        ctx.beginPath()
        ctx.moveTo(this.linelist[0].startPoint.x, this.linelist[0].startPoint.y);
    }
    ctx.lineTo(this.linelist[this.linelist.length - 1].lastPoint.x,this.linelist[this.linelist.length - 1].lastPoint.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thick;
    ctx.stroke();
    var line = new Line(this.linelist[this.linelist.length - 1].lastPoint, this.thick, this.color);
    this.linelist.push(line);
  }
}

class Curve extends Shape{
    constructor(startPoint, thick, color){
      super(startPoint, thick, color);
      this.midPoint = null;
      this.state = 0;
    }

    setMidPoint(midpoint){
      if (this.state == 0 && this.midPoint == null){
        this.setLastpoint(midpoint);
        return;
      }
      this.midPoint = midpoint;
    }

    curvingModeInc(value){
      this.state = value;
    }

    currentMode(){
      return this.state;
    }

    draw(ctx) {
      if (this.startPoint == null || this.lastPoint == null ){
        return;
      }

      if (this.midPoint == null){
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.lastPoint.x, this.lastPoint.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thick;
        ctx.stroke();
      }
      else{
        ctx.moveTo(this.startPoint.x,this.startPoint.y);
        ctx.quadraticCurveTo(this.midPoint.x,this.midPoint.y,this.lastPoint.x,this.lastPoint.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thick;
        ctx.stroke();
        console.log(this.startPoint.x + ":" + this.startPoint.y + " SS " + this.midPoint.x+ ":" +this.midPoint.y + " SS " + this.lastPoint.x + ":"  +this.lastPoint.y);
      }
    }


}

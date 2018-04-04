//***********
//***TOOLS***
//***********
function handleToolDown(e){
  curX = e.clientX - canvas.offsetLeft+110;
  curY = e.clientY - canvas.offsetTop + 50;//height of icon

  flagTool = true;
  preX = curX;
  preY = curY;

  var imgData = ctx.getImageData(curX, curY, 1, 1).data;
  if (currentTool == 'colorpicker'){
    curColor = RGBtoHex(imgData);
    curColorBox.style.background = curColor;
  }
  if (currentTool == 'eraser'){
    ctx.globalCompositeOperation = 'destination-out';
  }
  //cPush();
}

function handleToolUp(e){
  flagTool = false;
  preX = -1;
  preY = -1;
  if (currentTool == 'eraser'){
    ctx.globalCompositeOperation = 'source-over';
  }
  cPush();
}

function handleToolMove(e){
  curX = e.clientX - canvas.offsetLeft+110;
  curY = e.clientY - canvas.offsetTop + 50;//height of icon

  if (currentTool == 'pencil' && flagTool || currentTool == 'eraser' && flagTool){
    ctx.beginPath();
    ctx.lineWidth = curWidth;
    ctx.strokeStyle = curColor;
    ctx.moveTo(preX, preY);
    ctx.lineTo(curX, curY);
    ctx.stroke();

    preX = curX;
    preY = curY;
  }
}

function RGBtoHex(rgb){
  if (rgb[0] == '0' && rgb[1] == '0' && rgb[2] == '0' && rgb[3] == 0)
    return '#FFFFFF';
  return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

function HextoRGB(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b].join();
}

function isSameColor(src, des){
  return src[0] == des[0] && src[1] == des[1] && src[2] == des[2] && src[3] == des[3];
}

//***********
//***SHAPE***
//***********
function handleShapeDown(e){
  curX = e.clientX - canvas.offsetLeft ;
  curY = e.clientY - canvas.offsetTop;

  flagShape = true;

  canvasTmp.style.display = 'block';
  createShape(new Point(curX, curY));
  //cPush();
}

function handleShapeUp(e){

  flagShape = false;
  if (currentShape == 'polygon'){
    currentShapeObj.addNewLine(ctxTmp);
    return;
  }
  else if (currentShape == 'curve' && currentShapeObj.currentMode() < 1){
    console.log(currentShapeObj.currentMode());
    return;
  }


  currentShapeObj.draw(ctx);
  currentShapeObj = null;
  cPush();
}

function handleShapeMove(e){
  curX = e.clientX - canvas.offsetLeft ;
  curY = e.clientY - canvas.offsetTop + 18;//height of icon

  if (flagShape){
    ctxTmp.clearRect(0, 0, w, h);
    ctxTmp.beginPath();
    if (currentShape == 'curve')
    {
      currentShapeObj.setMidPoint(new Point(curX,curY));
    }else
      currentShapeObj.setLastpoint(new Point(curX, curY));
    currentShapeObj.draw(ctxTmp);
  }
}

function createShape(point){
  switch (currentShape) {
    case 'line':{
      currentShapeObj = new Line(point,curWidth,curColor);
      break;
    }
    case 'ellipse':{
      currentShapeObj = new Ellipse(point, curWidth, curColor);
      break;
    }
    case 'rectangle':{
      currentShapeObj = new Rectangle(point, curWidth, curColor);
      break;
    }
    case 'pentagon':{
      currentShapeObj = new Pentagon(point, curWidth, curColor);
      break;
    }
    
    case 'equilateral':{
      currentShapeObj = new Equilateral(point, curWidth, curColor);
      break;
    }
    
    case 'curve':{
      if (currentShapeObj instanceof Curve ){
        currentShapeObj.curvingModeInc(1);
        currentShapeObj.setMidPoint(point);
      }else{
        currentShapeObj = new Curve(point, curWidth, curColor);
      }
      break;
    }

    default:
  }
}

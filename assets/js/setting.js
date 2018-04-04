var canvas, canvasGrid, canvasTmp, ctx, ctxGrid, ctxTmp;
var curX = 0, curY = 0, preX = -1, preY = -1;
var curColorBox, curColor = '#000000', curWidth = 2;

var flagShape = false, flagTool = false;

var font = '14px sans-serif';
var hasInput = false;

if (currentShape == 'polygon'){
  currentShapeObj.finish()
  currentShapeObj.draw(ctx);
}

var currentTool = 'pencil';
var currentShape = '';
var currentShapeObj = null;

function chooseTool(name){
  currentTool = name;
  currentShape = '';
  canvasTmp.style.display = 'none';
  var link = document.getElementById(name).src;
  $('canvas').css('cursor', 'url(' + link + '), auto');
}

function chooseShape(name){
  ctxTmp.clearRect(0, 0, w, h);
  ctxTmp.beginPath();

  if (currentShape == 'polygon'){
    currentShapeObj.finish()
    currentShapeObj.draw(ctx);
  }

  if (currentShape == 'curve' && currentShapeObj != null){
    currentShapeObj.draw(ctx);
  }

  currentTool = '';
  currentShape = name;
  canvasTmp.style.display = 'block';
  var link = document.getElementById(name).src;
  $('canvas').css('cursor', 'url(' + link + '), auto');
}

function chooseColor(id){
  $('#' + id).addClass('active');

  curColorBox = document.getElementById(id);
  curColor = curColorBox.style.background;
}

function pickColor(id){
  curColor = id;
  curColorBox.style.background = id;
}

function changeThickness(value){
  curWidth = Math.round(parseInt(value)/10);
  if (curWidth == 0)
    curWidth = 1;
  document.getElementById('rangeDemo').style.height = curWidth + 'px';
  document.getElementById('rangeValue').innerHTML = curWidth + 'px';
}

function drawGrid(){
  ctxGrid.beginPath();
  ctxGrid.strokeStyle = 'rgba(220,220,220,1)';

  for (var x = 0; x < w; x += 10){
    ctxGrid.moveTo(x, 0);
    ctxGrid.lineTo(x, h);
  }
  for (var y = 0; y < h; y += 10){
    ctxGrid.moveTo(0, y);
    ctxGrid.lineTo(w, y);
  }
  ctxGrid.stroke();
  ctxGrid.closePath();
}

function init() {
  canvas = document.getElementById('canvas');
  canvasGrid = document.getElementById('canvasGrid');
  canvasTmp = document.getElementById('canvasTmp');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - document.getElementsByTagName('header')[0].offsetHeight;
  canvasGrid.width = canvas.width;
  canvasGrid.height = canvas.height;
  canvasTmp.width = canvas.width;
  canvasTmp.height = canvas.height;

  ctx = canvas.getContext('2d');
  ctxGrid = canvasGrid.getContext('2d');
  ctxTmp = canvasTmp.getContext('2d');

  w = canvas.width;
  h = canvas.height;

  canvas.addEventListener('mousedown', function (e){ handleToolDown(e) }, false);
  canvas.addEventListener('mouseup', function (e){ handleToolUp(e) }, false);
  canvas.addEventListener('mousemove', function (e){ handleToolMove(e) }, true);

  canvasTmp.addEventListener('mousedown', function (e){ handleShapeDown(e) }, false);
  canvasTmp.addEventListener('mouseup', function (e){ handleShapeUp(e) }, false);
  canvasTmp.addEventListener('mousemove', function (e){ handleShapeMove(e) }, false);

  document.getElementById("fileUpload").addEventListener("change",readImage,false);

  //Tmp layers
  canvasTmp.style.display = 'none';
  //Painting
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  //Grid
  ctxGrid.clearRect(0, 0, w, h);
  ctxGrid.beginPath();
  ctxGrid.rect(0, 0, w, h);
  ctxGrid.fillStyle = '#FFFFFF';
  ctxGrid.fill();
  drawGrid();
  cPush();
  //Cursor
  $('canvas').css( 'cursor', 'url(assets/img/tools/pencil.png), auto' );
  //Color box
  curColorBox = document.getElementById('color-quick-1');
}

function clearpad(){
  ctx.save();
  ctxTmp.clearRect(0,0,w,h);
  canvasTmp.style.display = 'none';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0,0,w,h);
  ctxGrid.clearRect(0, 0, w, h);
  drawGrid();
  ctx.restore();
}


var cPushArray = new Array();
var cStep = -1;

function cPush() {
  cStep++;
  if (cStep < cPushArray.length) { cPushArray.length = cStep; }
  cPushArray.push(canvas.toDataURL());
}

function cUndo() {
  if (cStep > 0) {
      cStep = cStep -1;
      var canvasPic = new Image();
      canvasPic.src = cPushArray[cStep];
      ctx.clearRect(0,0,w,h);
      ctxTmp.clearRect(0,0,w,h)
      canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
  }
}
function cRedo() {
  if (cStep < cPushArray.length-1) {
      cStep = cStep +1 ;
      var canvasPic = new Image();
      canvasPic.src = cPushArray[cStep];
      ctx.clearRect(0,0,w,h);
      ctxTmp.clearRect(0,0,w,h);
      canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
  }
}

function text(){
  canvas.onclick = function(e) {
    if (hasInput) return;
    addInput(e.clientX, e.clientY);
  }
}

function addInput(x, y) {

  var input = document.createElement('input');

  input.type = 'text';
  input.style.position = 'fixed';
  input.style.left = (x - 4) + 'px';
  input.style.top = (y - 4) + 'px';

  input.onkeydown = handleEnter;

  document.body.appendChild(input);

  input.focus();

  hasInput = true;
}

function handleEnter(e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
      drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
      document.body.removeChild(this);
      hasInput = false;
  }
}

function drawText(txt, x, y) {
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.font = font;
  ctx.fillText(txt, x - 4, y - 4);
}

function readImage(){
  canvas = document.getElementById('canvas');

  canvas.width = 1065;
  canvas.height = 600;
  canvasGrid.width = canvas.width;
  canvasGrid.height = canvas.height;
  canvasTmp.width = canvas.width;
  canvasTmp.height = canvas.height;

  ctx = canvas.getContext('2d');
  ctxGrid = canvasGrid.getContext('2d');
  ctxTmp = canvasTmp.getContext('2d');
  w = canvas.width;
  h = canvas.height;
  if(this.files&&this.files[0]){
    ctx.clearRect(0, 0,w, h);
    var FR = new FileReader();
    FR.onload = function(event) {
      var img = new Image();
      img.addEventListener("load", function() {
        ctx.drawImage(img, 0, 0,w, h);
        cPush();
      });
      img.src = event.target.result;
    };       
    FR.readAsDataURL( this.files[0] );
  }
}

function test1() 
{ 
  fileUpload.click();   
  textfield.value = upload.value;   
}
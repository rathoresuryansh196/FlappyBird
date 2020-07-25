var canvas=document.querySelector('canvas');
canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-40;
var c=canvas.getContext('2d');
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('keydown',function(event){
    var s;
    if(event.keyCode==32)//up
    {
        for(s=0;s<220;s++)
            ybird-=0.5;
        //ybird-=110;
    }
})
////////////////////////////////////////////////////////////////////////////////
//coordinates where frame will be drawn
var xbird=(canvas.width)/2-150;
var ybird=(canvas.height)/2-100;
var dybird=3.5;

//coordiantes of spreadsheet
var scrx=0;
var scry=0;

//spreadsheet actual dimensions
var sheetwidth=8192;
var sheetheight=288;

//no. of cols, rows in sheet
var cols=16;
var rows=1;

//width ,height of each frame in sheet
var framew=sheetwidth/cols;
var frameh=sheetheight/rows;

//nth frame of sheet
var currentframe=0;

//declaring object for sheet
var char=new Image();
char.src="sheet2.png";


function updateFrame(){
    currentframe=(currentframe+1)%cols;
    scrx=currentframe*framew;
    scry=0;
}

var birdw=(framew/2);
var birdh=(frameh/2);

var fgap=birdw/4;
var bgap=birdw/4;
var tgap=birdh/4;
var dgap=birdh/4;

function drawImage(){
    updateFrame();
    ybird+=dybird;
    if(ybird+tgap<=0 || ybird+birdh-dgap>=canvas.height)
        window.open("end.html","_self");
    c.drawImage(char,scrx,scry,framew,frameh,xbird,ybird,birdw,birdh);
}
////////////////////////////////////////////////////////////////////////////////
var wallcount=500;
var wallArray=[];
var score=0;

function wallBlock(i,x,y,dx,dir,hei,wid,color){
    this.i=i;
    this.x=x;
    this.dx=dx;
    this.dir=dir;
    this.height=hei;
    this.width=wid;
    this.color=color;
    this.y=y;

    this.draw=function(){
        c.beginPath();
        c.strokeStyle='black';
        c.fillStyle=this.color;
        c.fillRect(this.x,this.y,this.width,this.height);
        c.stroke();
        //c.fill();
        c.closePath();
    }
    this.update=function(){
        if(this.x+this.width<=xbird+birdw-fgap && score<(this.i+1)*5)
        {
            score+=5;
            document.getElementById("score").innerHTML="<b> &nbsp&nbsp YOUR SCORE:&nbsp&nbsp&nbsp"+score+"</b>";
        }

        if(score==5*wallcount)
        {
            window.open("end.html","_self");
        }

        if( xbird+birdw-fgap>=this.x && xbird+bgap<=this.x+this.width &&
           ybird+birdh-dgap>=this.y && ybird+tgap<=this.y+this.height )
        {
            window.open("end.html","_self");
        }

        this.x-=this.dx;
        this.draw();
    }
}

var p;
for(var i=0;i<wallcount;i++)
{
    //var x=canvas.width + i*( Math.random()*300 + 300);
    if(i==0)
    {
        var x=canvas.width;
        p=x;
    }
    else
    {
        var t=Math.random()*200 +350;
        var x=p+t;
        p=x;
    }
    var dx=4;
    var dir=i%2;
    var hei=Math.random()*((3*canvas.height)/10) + ((3*canvas.height)/10);
    var wid=40;
    var color='#4d2600';
    var y=dir*(canvas.height-hei);
    wallArray.push(new wallBlock(i,x,y,dx,dir,hei,wid,color));
}

////////////////////////////////////////////////////////////////////////////////
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);

    drawImage();

    for(var j=0;j<wallcount;j++)
    {
        wallArray[j].update();
    }    
}
animate();
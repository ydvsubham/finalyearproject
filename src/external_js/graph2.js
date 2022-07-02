const tech="Web Development";
const data=[
	{	
		id:1,
		name:"Node js",
		descr:"NodeLorem of type and scrambled"
	},
	{
		id:2,
		name:"react js",
		descr:"react Ipsum NodeL ore mNode LoremN odeLo rem"

	},
	{
		id:3,
		name:"spring boot",
		descr:"spring Ipsum is simply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled"

	},
	{
		id:4,
		name:"Angular",
		descr:"Angular Ipsum is simply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled"

	},
	{
		id:5,
		name:"Vanilla js",
		descr:"Vanilla Ipsum is simply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled"

	},];

var c = document.getElementById("myCanvas");
c.width=window.innerWidth;
c.height=window.innerHeight;
var ctx = c.getContext("2d");



const c_x=c.width/2;
const c_y=c.height/2;
const offset_plygn=100;
const rotate_lable={
	length : 400,
	width: 20,
}
const rotate_Slider={
	length:50,
	width:20,
}
const rotate_lable_center={
	x:c_x,
	y:650
}
var rotate_Slider_center={
	x:c_x,
	y:650,
}
var label_cordinate=[]
var scroll_cordinate=[]
var adjacent_plygn=[];
const sides=data.length;
var onclick_val_index=null

var adjacent_plygn_cordinates=[]
//ctx.lineWidth=5;
ctx.stroke();
function SliderLableCordinate_Cal(rotate_lable, rotate_Slider){
	 label_cordinate=[{
		x:rotate_lable_center.x-(rotate_lable.length/2),
		y:rotate_lable_center.y-(rotate_lable.width/2),
	},
	{
		x:rotate_lable_center.x-(rotate_lable.length/2),
		y:rotate_lable_center.y+(rotate_lable.width/2),
	},
	{
		x:rotate_lable_center.x+(rotate_lable.length/2),
		y:rotate_lable_center.y+(rotate_lable.width/2),
	},
	{
		x:rotate_lable_center.x+(rotate_lable.length/2),
		y:rotate_lable_center.y-(rotate_lable.width/2),
	}]

	scroll_cordinate=[{
		x:rotate_Slider_center.x-(rotate_Slider.width/2),
		y:rotate_Slider_center.y-(rotate_Slider.length/2),
	},
	{
		x:rotate_Slider_center.x-(rotate_Slider.width/2),
		y:rotate_Slider_center.y+(rotate_Slider.length/2),
	},
	{
		x:rotate_Slider_center.x+(rotate_Slider.width/2),
		y:rotate_Slider_center.y+(rotate_Slider.length/2),
	},
	{
		x:rotate_Slider_center.x+(rotate_Slider.width/2),
		y:rotate_Slider_center.y-(rotate_Slider.length/2),
	}]
	return [label_cordinate,scroll_cordinate]
}


function rotateShape(rotate_lable, rotate_Slider) {
	SliderLableCordinate_Cal(rotate_lable, rotate_Slider)
	draw_AdjRect2(label_cordinate,"#FF0000")
	draw_AdjRect2(scroll_cordinate,"#FF0000")
}

function draw_txt(ctx,txt,x,y,theta,color) {
	ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.translate(x,y);
	ctx.rotate(theta);
	ctx.fillStyle = color;
	ctx.fillText(txt, 0, 0);
	ctx.resetTransform();
}


function draw_AdjRect(thisItem) {
	ctx.beginPath()
	
	ctx.moveTo(thisItem[0][0],thisItem[0][1])
	for (var i = 1; i < thisItem.length; i++) {
		ctx.lineTo(thisItem[i][0],thisItem[i][1])
	}

	ctx.closePath();
	
	ctx.stroke();

}
function draw_AdjRect2(thisItem,color) {
	ctx.beginPath()
	ctx.fillStyle = color;
	ctx.moveTo(thisItem[0].x,thisItem[0].y)
	for (var i = 1; i < thisItem.length; i++) {
		ctx.lineTo(thisItem[i].x,thisItem[i].y)
	}

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

}
function perpendicular_point(x1,y1,x2,y2,d,x,y) {
	var dx = x1-x2
	var dy = y1-y2
	var dist = Math.sqrt(dx*dx + dy*dy)
	dx /= dist
	dy /= dist
	var x3 = x - (d/2)*dy
	var y3 = y + (d/2)*dx
	return [x3,y3]
}
function perpendicular_plygn(item) {
	var x1=item[0][0]
	var y1=item[0][1]
	var x2=item[item.length-1][0]
	var y2=item[item.length-1][1]
	var d=100
	var new_plygn=[]
	item.forEach((itm,index)=>{
		new_plygn.push(perpendicular_point(x1,y1,x2,y2,d,itm[0],itm[1]))
	})
	return new_plygn
}
function inside(ts ,x ,y) {
  	var vs=ts.layer2_ply    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
	};
function inside2(ts ,x ,y) {
  	var vs=ts
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
	};
function DrawCircle(x,y,r,theta1,theta2,line_Width) {
	ctx.beginPath();
	ctx.arc(x, y, r, theta1, theta2);
	//ctx.lineWidth=line_Width;
	
	ctx.stroke();

}
function txtLengthCmp(data) {
	var txtMaxLenght=0
	for (var i = 0; i < data.length; i++) {
		ctx.font = "20px Arial";
		var this_txt=data[i].name;
		if(ctx.measureText(this_txt).width>txtMaxLenght){
			
			txtMaxLenght=(ctx.measureText(this_txt).width);
		}
	}
	return txtMaxLenght
}
var txtLength= txtLengthCmp(data)
var polyR=txtLength/(2*Math.sin((Math.PI)/sides))





var txtCordinate=[]
//var temp_plygn=[]

var txtOffset=75
function polygon(ctx, x, y, radius, sides,initial_theta,p_dist) {
  if (sides < 3) return;
  var initial_angle=initial_theta;
  var a =((Math.PI * 2)/sides) ;
  ctx.beginPath();
  
  ctx.moveTo(x+radius*Math.cos(initial_angle),y+radius*Math.sin(initial_angle));
  
  txtCordinate.push({
  	data:data[0].name,
  	x:x+(polyR+txtOffset)*Math.cos(initial_angle+(a/2)),
  	y:y+(polyR+txtOffset)*Math.sin(initial_angle+(a/2)),
  	theta:initial_angle+((Math.PI/2)+(a/2))
  })
  

  adjacent_plygn.push([{
    	x:x+(radius+offset_plygn)*Math.cos(initial_angle),
    	y:y+(radius+offset_plygn)*Math.sin(initial_angle)
    },
    {
    	x:x+(radius)*Math.cos(initial_angle),
    	y:y+(radius)*Math.sin(initial_angle)
    },
    initial_angle+((Math.PI/2)+(a/2))
    ]);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(x+radius*Math.cos(initial_angle+(a*i)),y+radius*Math.sin(initial_angle+(a*i)));
    adjacent_plygn.push([{
    	x:x+(radius+offset_plygn)*Math.cos(initial_angle+(a*i)),
    	y:y+(radius+offset_plygn)*Math.sin(initial_angle+(a*i))
    },
    {
    	x:x+(radius)*Math.cos(initial_angle+(a*i)),
    	y:y+(radius)*Math.sin(initial_angle+(a*i))
    },
    initial_angle+((Math.PI/2)+(a/2)+(a*i))
    ]);
    
  var txt_rotate_angle=((Math.PI/2)+(a/2)+(a*i))
  txtCordinate.push({
  	data:data[i].name,
  	x:x+(polyR+txtOffset)*Math.cos(initial_angle+(a*i)+(a/2)),
  	y:y+(polyR+txtOffset)*Math.sin(initial_angle+(a*i)+(a/2)),
  	theta:initial_angle+((Math.PI/2)+(a/2)+(a*i))
  })
  
  
  }
  ctx.closePath();
  //console.log("yes")
  
	var theta90=Math.PI/4
	for (var i = 0; i < adjacent_plygn.length; i++) {
		ctx.beginPath();
		ctx.moveTo(adjacent_plygn[i][0].x,adjacent_plygn[i][0].y);
	  ctx.lineTo(adjacent_plygn[i][1].x,adjacent_plygn[i][1].y);
	  var x1=adjacent_plygn[i][0].x
	  var y1=adjacent_plygn[i][0].y
	  
	    if(i==adjacent_plygn.length-1){
	    	ctx.lineTo(adjacent_plygn[0][1].x,adjacent_plygn[0][1].y);
	    	ctx.lineTo(adjacent_plygn[0][0].x,adjacent_plygn[0][0].y);
	    	var x2=adjacent_plygn[0][0].x
	  		var y2=adjacent_plygn[0][0].y
				var p1=perpendicular_point(x1,y1,x2,y2,p_dist,x1,y1)
	    	var p2=perpendicular_point(x1,y1,x2,y2,p_dist,x2,y2)
	    	
	    	adjacent_plygn_cordinates.push({
	    		layer1:[[adjacent_plygn[i][0].x,adjacent_plygn[i][0].y],
	    		[adjacent_plygn[i][1].x,adjacent_plygn[i][1].y],
	    		[adjacent_plygn[0][1].x,adjacent_plygn[0][1].y],
	    		[adjacent_plygn[0][0].x,adjacent_plygn[0][0].y]],
	    		layer2_rect:[[x1,y1],[x2,y2],p2,p1],
	    		theta:adjacent_plygn[i][2]
				})
	    }else{
	    	ctx.lineTo(adjacent_plygn[i+1][1].x,adjacent_plygn[i+1][1].y);
	    	ctx.lineTo(adjacent_plygn[i+1][0].x,adjacent_plygn[i+1][0].y);
	    	var x2=adjacent_plygn[i+1][0].x
	  		var y2=adjacent_plygn[i+1][0].y
				var p1=perpendicular_point(x1,y1,x2,y2,p_dist,x1,y1)
	    	var p2=perpendicular_point(x1,y1,x2,y2,p_dist,x2,y2)
	    	adjacent_plygn_cordinates.push({
	    		layer1: [[adjacent_plygn[i][0].x,adjacent_plygn[i][0].y],
	    		[adjacent_plygn[i][1].x,adjacent_plygn[i][1].y],
	    		[adjacent_plygn[i+1][1].x,adjacent_plygn[i+1][1].y],
	    		[adjacent_plygn[i+1][0].x,adjacent_plygn[i+1][0].y]],
	    		layer2_rect:[[x1,y1],[x2,y2],p2,p1],
	    		theta:adjacent_plygn[i][2]
				})
	    }

	    ctx.closePath();
	  	ctx.stroke();
	  }
		adjacent_plygn_cordinates.forEach((item,i)=>{
			adjacent_plygn_cordinates[i].layer2_ply=perpendicular_plygn(item.layer1)
		})
		for (var i = 0; i < adjacent_plygn_cordinates.length; i++) {
			let x1=adjacent_plygn_cordinates[i].layer2_ply[0][0]
			let y1=adjacent_plygn_cordinates[i].layer2_ply[0][1]
			let x2=adjacent_plygn_cordinates[i].layer2_ply[3][0]
			let y2=adjacent_plygn_cordinates[i].layer2_ply[3][1]
			let p1=perpendicular_point(x1,y1,x2,y2,200,x1,y1)
			let p2=perpendicular_point(x1,y1,x2,y2,200,x2,y2)
			adjacent_plygn_cordinates[i].layer3=[[x1,y1],[x2,y2],p2,p1]
		}

		adjacent_plygn_cordinates.forEach((item,i)=>{
			//console.log(item.layer1)
			draw_AdjRect(item.layer2_ply)
			ctx.fillStyle = "#000000";
			ctx.fill();
			ctx.fillStyle = "#fffff";
		})
	if(onclick_val_index || onclick_val_index ===0){
		//console.log(adjacent_plygn_cordinates[onclick_val_index].layer3)
  	draw_AdjRect(adjacent_plygn_cordinates[onclick_val_index].layer3)
  	//draw_txt(ctx,data[onclick_val_index].descr,data[onclick_val_index].x,data[onclick_val_index].y,data[onclick_val_index].theta)
  	let thispoly=adjacent_plygn_cordinates[onclick_val_index].layer3
  	let x1=thispoly[0][0]
  	let y1=thispoly[0][1]
  	let x2=thispoly[1][0]
  	let y2=thispoly[1][1]
  	let l=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
  	let r=Math.sqrt(Math.pow(x2-c_x,2)+Math.pow(y2-c_y,2))
  	let d=Math.sqrt(Math.pow(r,2)-Math.pow((l/2),2))
  	//console.log(d)
  	
  	//DrawCircle((x1+x2)/2,(y1+y2)/2,20,0,Math.PI*2,1)
		


		let txt=data[onclick_val_index].descr
		let txtSplited=txt.split(" ");

		let final_txt_array=[]
		let i=0
		let this_txt=""
		while(i<txtSplited.length && final_txt_array.length<5){
			ctx.font = "16px Arial";
			let temp_txt=this_txt+" "+txtSplited[i]
			if(ctx.measureText(temp_txt).width<=l-10){
				this_txt+=" " +txtSplited[i]

			}else{
				final_txt_array.push(this_txt)
				this_txt=txtSplited[i]
			}
			i++
			console.log(i)
		}
		if(this_txt!==txtSplited[txtSplited.length-1] && final_txt_array.length<5){
			final_txt_array.push(this_txt)
		}
		let next_line_space=20
		//console.log(final_txt_array)
		final_txt_array.forEach((itm)=>{
			var p1=perpendicular_point(x1,y1,x2,y2,next_line_space,x1,y1)
			var p2=perpendicular_point(x1,y1,x2,y2,next_line_space,x2,y2)
			draw_txt(ctx,itm,(p1[0]+p2[0])/2,(p1[1]+p2[1])/2,adjacent_plygn_cordinates[onclick_val_index].theta,"#000000")
			next_line_space+=40
		})
		//draw_txt(ctx,data[onclick_val_index].descr,(p1[0]+p2[0])/2,(p1[1]+p2[1])/2,adjacent_plygn_cordinates[onclick_val_index].theta,"#000000")
  	//draw_txt(ctx,itm.data,itm.x,itm.y,itm.theta)

  }
//console.log(adjacent_plygn_cordinates)
  ctx.font = "20px Arial";

		txtCordinate.forEach((itm)=>{
				draw_txt(ctx,itm.data,itm.x,itm.y,itm.theta,"#FFFFFF")
			
			
		})
		rotateShape(rotate_lable, rotate_Slider)
}



polygon(ctx, c_x,c_y,polyR,sides,0,polyR+100);
var rotateTheta=0
c.addEventListener('click', function(ev) {
  var rect = c.getBoundingClientRect()
  var x = ev.clientX - rect.left
  var y = ev.clientY - rect.top
  //console.log(temp_plygn)
	adjacent_plygn_cordinates.forEach((item, index)=>{
		if(inside(item,x,y)){
			onclick_val_index=index;
			//console.log(index)
		}		
	})
	
	ctx.clearRect(0,0,c.width,c.height);
	txtCordinate=[]
	adjacent_plygn=[]
	adjacent_plygn_cordinates=[]
	polygon(ctx, c_x,c_y,polyR,sides,rotateTheta,200);
});

let isScroll=false

c.addEventListener('mousemove', function(ev) {
  var rect = c.getBoundingClientRect()
  var x = ev.clientX - rect.left
  var y = ev.clientY - rect.top

if (isScroll === true) {
	console.log(rotate_lable_center.x,rotate_Slider_center.x)
	if(Math.abs(rotate_lable_center.x-x)<rotate_lable.length/2  ){
  	ctx.clearRect(0,0,c.width,c.height);
		rotate_Slider_center.x=x
		rotateTheta=Math.PI*((rotate_lable_center.x- rotate_Slider_center.x)/(rotate_lable.length/2)) 
	  txtCordinate=[]
		adjacent_plygn=[]
		adjacent_plygn_cordinates=[]
		polygon(ctx, c_x,c_y,polyR,sides,rotateTheta,200);
		//console.log("yes")
  }
 }
})
c.addEventListener('mousedown', function(ev) {
  var rect = c.getBoundingClientRect()
  var x = ev.clientX - rect.left
  var y = ev.clientY - rect.top
  if(inside2(scroll_cordinate,x,y)){
  	isScroll=true
  }
//console.log(x,y)

});

Math.abs
c.addEventListener('mouseup', function(ev) {
  
  	isScroll=false
  
//console.log(x,y)

});
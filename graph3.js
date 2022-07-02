const api=[
	{
		id:1,
		name:"name1",
		related : [
			{
				id:11,
				name:"name11",
				related:[
					{
						id:111,
						name:"name111",
					},
				]
			},{
				id:12,
				name:"name12",
				related:[
					{
						id:121,
						name:"name121",
					},
					{
						id:122,
						name:"name122",
					},
				]
			},{
				id:13,
				name:"name13",
				related:[]
			}
		],
	},
	{
		id:1,
		name:"name1",
		related :[]
	},
	{
		id:3,
		name:"name1",
		related :[]
	},
	{
		id:4,
		name:"name1",
		related :[]
	},{
		id:5,
		name:"name1",
		related :[]
	},
]

const api1=[
	{
		prev:null,
		curr:1,
		data:"name1"
	},
	{
		prev:null,
		curr:2,
		data:"name2"		
	},
	{
		prev:null,
		curr:3,
		data:"name3"
	},
	{
		prev:null,
		curr:4,
		data:"name4"
	},
	{
		prev:null,
		curr:5,
		data:"name5"
	},
	//next level1
	{
		prev:1,
		curr:6,
		data:"name1/6"
	},
	{
		prev:1,
		curr:7,
		data:"name1/7"
	},
	{
		prev:1,
		curr:8,
		data:"name1/8"
	},
	{
		prev:1,
		curr:9,
		data:"name1/9"
	},
	//next level11
	{
		prev:6,
		curr:10,
		data:"name1/6/10"
	},
	{
		prev:6,
		curr:11,
		data:"name1/6/11"
	},
	{
		prev:6,
		curr:12,
		data:"name1/6/12"
	},

]


var tech={
		prev:null,
		curr:null,
		data:"web d"
	}

var thisData=[];
api1.forEach((item, index)=>{
	item.prev ? "" :thisData.push(item);
})

var c = document.getElementById("myCanvas");
c.width=window.innerWidth;
c.height=window.innerHeight;
var ctx = c.getContext("2d");
const c_x=c.width/2;
const c_y=c.height/2;
const circle_offset=17;
var track_filter=[]
var bacKbtncdnt=[]


//draw Arc at, centre(x,y), Starting and end angle(theta1,theta2) and line withd 
function DrawCircle(x,y,r,theta1,theta2,line_Width) {
	ctx.beginPath();
	ctx.arc(x, y, r, theta1, theta2);
	ctx.lineWidth=line_Width;
	
	ctx.stroke();

}

//Draw line
function DrawLine(x1,y1,x2,y2,line_Width) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineWidth=line_Width;
	ctx.stroke();
}

//Mouse position checking if it is present in given polygon or not
function plygnInside(vs ,x ,y) {
     var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    //console.log
    return inside;
};
//Mouse position checking if it is present in given circle or not

function circleInside(circle) {
	var dist = Math.sqrt( Math.pow((x-circle.x), 2) + Math.pow((y-circle.y), 2) );
	if(dist<=attach_circle_r){
		return true
	}
}

//Drawing back button
function drawBackBtn() {
	//console.log("yess")
	ctx.font = "20px Arial";
	var this_txt="Back"
	var bacKbtn=[[50,50],[50+(ctx.measureText(this_txt).width)+10,50],[50+(ctx.measureText(this_txt).width)+10,80],[50,80]]
	bacKbtncdnt=bacKbtn
	ctx.beginPath()
	ctx.moveTo(bacKbtn[0][0],bacKbtn[0][1])
	for (var i = 1; i < bacKbtn.length; i++) {
		ctx.lineTo(bacKbtn[i][0],bacKbtn[i][1])
	}

	ctx.closePath();
	ctx.stroke();
	ctx.fillText(this_txt,55 , 70);
//console.log(track_filter)
	var j=0;
	while(j<track_filter.length){
		//console.log(track_filter.length)
		this_txt=track_filter[j].data
		var temp_x=bacKbtn[bacKbtn.length-1][0]
		var temp_y=bacKbtn[bacKbtn.length-1][1]
		bacKbtn=[[temp_x,temp_y],[50+(ctx.measureText(this_txt).width)+10,temp_y],[50+(ctx.measureText(this_txt).width)+10,30+temp_y],[temp_x,30+temp_y]];
		ctx.beginPath()
		ctx.moveTo(bacKbtn[0][0],bacKbtn[0][1])
		for (var i = 1; i < bacKbtn.length; i++) {
			ctx.lineTo(bacKbtn[i][0],bacKbtn[i][1])
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fillText(this_txt , 55,temp_y+20);
		j++
	}
	
}
function txtLengthCmp(data) {
	var txtMaxLenght=0
	for (var i = 0; i < data.length; i++) {
		ctx.font = "20px Arial";
		var this_txt=data[i].data;
		if((((ctx.measureText(this_txt).width)/2)+10)>txtMaxLenght){
			txtMaxLenght=(((ctx.measureText(this_txt).width)/2)+10);
		}
	}
	return txtMaxLenght
}

	

var attach_circle_r=0;
var adjcent_circle=[];
var onclick_val={
	status:false,
	id:null,
}
var mouseOver_val={
	status:false,
	id:null,
}

var hvr_offset=50


//Drwaing graph
function DrawGraph(data) {
	console.log(data)
	
	ctx.font = "20px Arial";
	var txt = tech.data;
	const c_radius=((ctx.measureText(txt).width)/2)+10;

	DrawCircle(c_x, c_y, c_radius, 0, 2 * Math.PI,4)
	ctx.fillText(txt, c_x-c_radius+10, c_y+10)
	var theta=3*Math.PI/2;
	const theta_increment=(2*Math.PI)/data.length;
	var line_cordinates=[]
	const line_length=200;
	const adjt_circle_offset=20
	//Calculating coordinate of Adjacent lines
	for (var i = 0; i < data.length; i++) {
		var hover_offset=0
		if(mouseOver_val.status &&  (mouseOver_val.id==data[i].curr)){
			hover_offset+=hvr_offset
		}
		line_cordinates.push({
			x1:c_x+(c_radius+circle_offset+hover_offset)*Math.cos(theta),
			y1:c_y+(c_radius+circle_offset+hover_offset)*Math.sin(theta),
			x2:c_x + line_length* Math.cos(theta),
			y2:c_y + line_length * Math.sin(theta),
			theta:theta
		});
		theta=theta+theta_increment;
	}


	//Adjacent circle radius calculation And ploting tech.text in them
	attach_circle_r=txtLengthCmp(data)	



	for (var i = 0; i < data.length; i++) {
		//Calculating centre of Adject circles
		var this_center_x=line_cordinates[i].x2+(attach_circle_r+adjt_circle_offset)*Math.cos(line_cordinates[i].theta);
		var this_center_y=line_cordinates[i].y2+(attach_circle_r+adjt_circle_offset)*Math.sin(line_cordinates[i].theta);
		adjcent_circle.push({
			x:this_center_x,
			y:this_center_y,
			data_id:data[i].curr,
			
		})
		//Hover Effect
		hover_offset=hvr_offset
		var thisR=c_radius+circle_offset;
		(mouseOver_val.status &&  (mouseOver_val.id==data[i].curr)) ? thisR=c_radius+circle_offset+hover_offset : thisR=c_radius+circle_offset;
		if(mouseOver_val.status &&  (mouseOver_val.id==data[i].curr)){

		}

    	//lower Arcs
		DrawCircle(c_x, c_y, thisR, line_cordinates[i].theta-(Math.PI/(2*data.length)), line_cordinates[i].theta+(Math.PI/(2*data.length)),10)
		//adjacent line
		DrawLine(line_cordinates[i].x1,line_cordinates[i].y1,line_cordinates[i].x2,line_cordinates[i].y2,1)
		//Adjacent circle
		DrawCircle(this_center_x,this_center_y,attach_circle_r,0,2 * Math.PI,4)
		//Upper Arcs
		DrawCircle(this_center_x,this_center_y,attach_circle_r+adjt_circle_offset,line_cordinates[i].theta-(Math.PI/(data.length)) +Math.PI,line_cordinates[i].theta+(Math.PI/(data.length))+Math.PI,10)
		

		ctx.font = "20px Arial";
		var this_txt=data[i].data;
		ctx.fillText(this_txt,this_center_x-((ctx.measureText(this_txt).width)/2) , this_center_y+10);
	}
	drawBackBtn()
	console.log("animating")
	return adjcent_circle;
}
track_filter.push(tech)
DrawGraph(thisData)





c.addEventListener('click', function(ev) {
	var rect = c.getBoundingClientRect()
   	var x = ev.clientX - rect.left
   	var y = ev.clientY - rect.top
   	var inside_status=false 
   	if(plygnInside(bacKbtncdnt ,x ,y) && (track_filter.length-1)>0){
   		//console.log("yssss")
   		tech=track_filter[track_filter.length-2]
   		thisData.forEach((item, index)=>{
	    	item.curr===track_filter[track_filter.length-2].curr  ? tech= item : ""
	    })
   		thisData=[]
	    api1.forEach((item, index)=>{
			item.prev===track_filter[track_filter.length-2].curr ? thisData.push(item) : ""
		})
		track_filter.pop()
   		ctx.clearRect(0,0,c.width,c.height)
    	DrawGraph(thisData)
   	}else{
   		for (var i = 0; i < adjcent_circle.length; i++) {
			var dist = Math.sqrt( Math.pow((x-adjcent_circle[i].x), 2) + Math.pow((y-adjcent_circle[i].y), 2) );
			if(dist<=attach_circle_r){
				inside_status=true 
				onclick_val.status=true;
				onclick_val.id=adjcent_circle[i].data_id;
			}
		}
		thisData.forEach((item, index)=>{
	    	item.curr===onclick_val.id ? tech= item : ""
	    })
	    thisData=[]
	    api1.forEach((item, index)=>{
			item.prev===onclick_val.id ? thisData.push(item) : ""
		})
	    if (inside_status) {

	    	track_filter.push(tech)
			ctx.clearRect(0, 0, c.width, c.height);
		    DrawGraph(thisData)
	    }

   	}
	
	
	
    //circleInside(circle)
    
    
	
});
function temp_fun(argument) {
	console.log("animating")
	window.requestAnimationFrame(temp_fun);
}
function animate(thisData) {

	window.requestAnimationFrame(temp_fun);
}

c.addEventListener('mousemove', function(ev) {
  var rect = c.getBoundingClientRect()
   var x = ev.clientX - rect.left
    var y = ev.clientY - rect.top
    for (var i = 0; i < adjcent_circle.length; i++) {
    	var dist = Math.sqrt( Math.pow((x-adjcent_circle[i].x), 2) + Math.pow((y-adjcent_circle[i].y), 2) );
    	if(dist<=attach_circle_r){
    		mouseOver_val.status=true;
    		mouseOver_val.id=adjcent_circle[i].data_id;
    	}
    }

    //ctx.clearRect(0,0,c.width,c.height)
    animate(thisData)

    
});




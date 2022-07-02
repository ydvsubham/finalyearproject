var myImage = new Image();
myImage.src = '2.jpg';
/************************Prev btn***************************************/
let prev_btn_cordinate = {
	x: c_x+400,
	y: c_y,
	arrow_h: 50,
	arrow_b: 50,
	box_lx: 75,
	box_by: 75,
}
let next_btn_cordinate = {
	x: c_x-400,
	y: c_y,
	arrow_h: 50,
	arrow_b: 50,
	box_lx: 75,
	box_by: 75,
}




function builPrevBtn(center_cdnt, ctx, colorArrow, colorBox, zoom, type) {
	console.log("prev btn...")
	let center = {
		x: center_cdnt.x,
		y: center_cdnt.y,
		arrow_h: center_cdnt.arrow_h * zoom,
		arrow_b: center_cdnt.arrow_b * zoom,
		box_lx: center_cdnt.box_lx * zoom,
		box_by: center_cdnt.box_by * zoom
	}
	ctx.beginPath();
	ctx.fillStyle = colorBox;
	ctx.moveTo(center.x - center.box_lx, center.y - center.box_by)
	ctx.lineTo(center.x - center.box_lx, center.y + center.box_by)
	ctx.lineTo(center.x + center.box_lx, center.y + center.box_by)
	ctx.lineTo(center.x + center.box_lx, center.y - center.box_by)
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.resetTransform();

	ctx.beginPath();
	ctx.fillStyle = colorArrow;
	let arrow_cx = center.x - (center.arrow_h * 0.4)
	if (type === "NEXT") {
		arrow_cx = center.x + (center.arrow_h * 0.4)
		ctx.moveTo(arrow_cx - center.arrow_h, center.y);
	} else {
		ctx.moveTo(arrow_cx + center.arrow_h, center.y);
	}
	ctx.lineTo(arrow_cx, center.y + center.arrow_b);
	ctx.lineTo(arrow_cx, center.y - center.arrow_b);
	ctx.closePath()
	ctx.fill();
	ctx.stroke();
	ctx.resetTransform();

}
/***********************************************************/


/***********************************Draw Pages**************************************/
let pg_coordinate_param = {
	
	a: 100,
}
let pg_coordinate = []

function drawPg(ctx, pg_coordinate_param, total_pg,zoom, fillcolor, borderColor) {
	let thisPgSide=pg_coordinate_param.a*zoom
	let l = (thisPgSide * total_pg) / 2
	let thisPage = []
	for (let i = 0; i < total_pg; i++) {
		let Cdnt1 = { x: pg_coordinate_param.x - l+thisPgSide*i, y: pg_coordinate_param.y - thisPgSide / 2 }
		let Cdnt2 = { x: pg_coordinate_param.x - l+thisPgSide*i, y: pg_coordinate_param.y + thisPgSide / 2 }
		let Cdnt3 = { x: pg_coordinate_param.x - l+thisPgSide*i + thisPgSide, y: pg_coordinate_param.y + thisPgSide / 2 }
		let Cdnt4 = { x: pg_coordinate_param.x - l+thisPgSide*i + thisPgSide, y: pg_coordinate_param.y - thisPgSide / 2 }
		thisPage.push(Cdnt1)
		thisPage.push(Cdnt2)
		thisPage.push(Cdnt3)
		thisPage.push(Cdnt4)
		pg_coordinate.push(thisPage)
		draw_AdjRect2(ctx,thisPage,1,fillcolor,borderColor)
		let pgNoWidth=30*zoom
		ctx.font =pgNoWidth+ "px Arial";
		draw_txt(ctx, (i+1).toString(), (Cdnt1.x+Cdnt4.x)/2, pg_coordinate_param.y, 0, "#FFFFFF")
		ctx.resetTransform();
		thisPage=[]
	}


}



/***********************************************************************************/

/******************Graph2*****************/
let isScroll = false
const offset_plygn = 100;
var total_pg = 5
const projectPerPg = 6;


/************************Scroll Param *************************************/
const rotate_lable = {
	length: 400,
	width: 20,
}
const rotate_Slider = {
	length: 50,
	width: 20,
}
var rotate_lable_center = {
	temp:0,
}
var rotate_Slider_center = {
	temp:0,
}
var label_cordinate = []
var scroll_cordinate = []
/********************************************************* */


var adjacent_plygn = [];
var onclick_val_index = null

var adjacent_plygn_cordinates = []
var txtCordinate = []
var txtOffset = 75
var polyR = 100
var rotateTheta = 0
const graph2data = [
	{
		id: 1,
		name: "Project 1",
		descr: "NodeLorem of type and scrambled"
	},
	{
		id: 2,
		name: "Project 2",
		descr: "react Ipsum NodeL ore mNode LoremN odeLo rem"

	},
	{
		id: 3,
		name: "Project 3",
		descr: "spring Ipsum is simply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled"

	},
	{
		id: 4,
		name: "Project 4",
		descr: "Angular Ipsum is simply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled"

	},
	{
		id: 5,
		name: "Project 5",
		descr: "Vanilla Ipsum is simply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled"

	},];
/******************************************/




var c = null
var ctx = null
var c_x = 0;
var c_y = 0;
var dpr = window.devicePixelRatio || 1;
window.addEventListener('load', function (ev) {
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	temp = document.getElementById("myoverlay");
	c.width = temp.offsetWidth * dpr;
	c.height = temp.offsetHeight * dpr;
	ctx = c.getContext("2d");
	c_x = c.width / 2;
	c_y = c.height / 2;
	rotate_Slider_center.x = c_y
	rotate_lable_center.x = c_y
	rotate_Slider_center.y = (c_x*2)-100
	rotate_lable_center.y = (c_x*2)-100

	pg_coordinate_param.x=c_x
	pg_coordinate_param.y=(c_y*2)-120

	
	
});


/*****************Graph1****************/
var api = []
var tech = {
	prev: null,
	curr: null,
	data: "web d"
}

var thisData = [];

var hvr_offset = 50
const circle_offset = 15;
var track_filter = []
var bacKbtncdnt = []
var attach_circle_r = 0;
var adjcent_circle = [];

var onclick_val = {
	status: false,
	id: null,
}
var mouseOver_val = {
	status: false,
	id: null,
}
isGraph1 = false
isGraph2 = false
/*******************************/





function SliderLableCordinate_Cal(rotate_lable, rotate_Slider) {
	label_cordinate = [{
		y: rotate_lable_center.x - (rotate_lable.length / 2),
		x: rotate_lable_center.y - (rotate_lable.width / 2),
	},
	{
		y: rotate_lable_center.x - (rotate_lable.length / 2),
		x: rotate_lable_center.y + (rotate_lable.width / 2),
	},
	{
		y: rotate_lable_center.x + (rotate_lable.length / 2),
		x: rotate_lable_center.y + (rotate_lable.width / 2),
	},
	{
		y: rotate_lable_center.x + (rotate_lable.length / 2),
		x: rotate_lable_center.y - (rotate_lable.width / 2),
	}]

	scroll_cordinate = [{
		y: rotate_Slider_center.x - (rotate_Slider.width / 2),
		x: rotate_Slider_center.y - (rotate_Slider.length / 2),
	},
	{
		y: rotate_Slider_center.x - (rotate_Slider.width / 2),
		x: rotate_Slider_center.y + (rotate_Slider.length / 2),
	},
	{
		y: rotate_Slider_center.x + (rotate_Slider.width / 2),
		x: rotate_Slider_center.y + (rotate_Slider.length / 2),
	},
	{
		y: rotate_Slider_center.x + (rotate_Slider.width / 2),
		x: rotate_Slider_center.y - (rotate_Slider.length / 2),
	}]
	return [label_cordinate, scroll_cordinate]
}


function rotateShape(ctx, rotate_lable, rotate_Slider) {
	SliderLableCordinate_Cal(rotate_lable, rotate_Slider)
	draw_AdjRect2(ctx, label_cordinate,1, "#FF0000","#000000")
	draw_AdjRect2(ctx, scroll_cordinate,1, "#FF0000","#000000")
}

function draw_txt(ctx, txt, x, y, theta, color) {
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.translate(x, y);
	ctx.rotate(theta);
	ctx.fillStyle = color;
	ctx.fillText(txt, 0, 0);
	ctx.resetTransform();
}


function draw_AdjRect(ctx, thisItem, color) {
	ctx.beginPath()
	// let pattern = ctx.createPattern(myImage, "repeat");
	// ctx.fillStyle = pattern;
	// ctx.globalAlpha = 0.1
	ctx.fillStyle = color
	ctx.moveTo(thisItem[0][0], thisItem[0][1])
	for (var i = 1; i < thisItem.length; i++) {
		ctx.lineTo(thisItem[i][0], thisItem[i][1])
	}

	ctx.closePath();
	ctx.fill();
	// ctx.globalAlpha = 1
	ctx.stroke();
	ctx.fillStyle = "#FFFFFF"


}
function draw_AdjRect2(ctx, thisItem,line_width, fillColor,borderColor) {
	ctx.beginPath()
	ctx.fillStyle = fillColor;
	ctx.moveTo(thisItem[0].x, thisItem[0].y)
	for (var i = 1; i < thisItem.length; i++) {
		ctx.lineTo(thisItem[i].x, thisItem[i].y)
	}
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = borderColor;
	ctx.lineWidth =line_width 
	ctx.stroke();
}
function perpendicular_point(x1, y1, x2, y2, d, x, y) {
	var dx = x1 - x2
	var dy = y1 - y2
	var dist = Math.sqrt(dx * dx + dy * dy)
	dx /= dist
	dy /= dist
	var x3 = x - (d / 2) * dy
	var y3 = y + (d / 2) * dx
	return [x3, y3]
}
function perpendicular_plygn(item) {
	var x1 = item[0][0]
	var y1 = item[0][1]
	var x2 = item[item.length - 1][0]
	var y2 = item[item.length - 1][1]
	var d = 100
	var new_plygn = []
	item.forEach((itm, index) => {
		new_plygn.push(perpendicular_point(x1, y1, x2, y2, d, itm[0], itm[1]))
	})
	return new_plygn
}
function inside(ts, x, y) {
	var vs = ts.layer2_ply
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
function inside2(ts, x, y) {
	var vs = ts
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
/*
function DrawCircle(ctx,x,y,r,theta1,theta2,line_Width) {
ctx.beginPath();
ctx.arc(x, y, r, theta1, theta2);
//ctx.lineWidth=line_Width;
	
ctx.stroke();

}
*/
function txtLengthCmp2(ctx, data) {
	var txtMaxLenght = 0
	for (var i = 0; i < data.length; i++) {
		ctx.font = "20px Arial";
		var this_txt = data[i].name;
		if (ctx.measureText(this_txt).width > txtMaxLenght) {

			txtMaxLenght = (ctx.measureText(this_txt).width);
		}
	}
	return txtMaxLenght
}
function plotDescription(ctx, thispoly, thisTheta, data) {
	let x1 = thispoly[0][0]
	let y1 = thispoly[0][1]
	let x2 = thispoly[1][0]
	let y2 = thispoly[1][1]
	let l = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
	let r = Math.sqrt(Math.pow(x2 - c_x, 2) + Math.pow(y2 - c_y, 2))
	let d = Math.sqrt(Math.pow(r, 2) - Math.pow((l / 2), 2))




	let txt = data[onclick_val_index].descr
	let txtSplited = txt.split(" ");

	let final_txt_array = []
	let i = 0
	let this_txt = ""
	while (i < txtSplited.length && final_txt_array.length < 5) {
		ctx.font = "16px Arial";
		let temp_txt = this_txt + " " + txtSplited[i]
		if (ctx.measureText(temp_txt).width <= l - 10) {
			this_txt += " " + txtSplited[i]

		} else {
			final_txt_array.push(this_txt)
			this_txt = txtSplited[i]
		}
		i++
	}
	if (this_txt !== txtSplited[txtSplited.length - 1] && final_txt_array.length < 5) {
		final_txt_array.push(this_txt)
	}
	let next_line_space = 20
	final_txt_array.forEach((itm) => {
		var p1 = perpendicular_point(x1, y1, x2, y2, next_line_space, x1, y1)
		var p2 = perpendicular_point(x1, y1, x2, y2, next_line_space, x2, y2)
		draw_txt(ctx, itm, (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, thisTheta, "#000000")
		next_line_space += 40
	})
}

function readMoreBtn(ctx, thispoly, thisTheta) {
	let x1 = thispoly[2][0]
	let y1 = thispoly[2][1]
	let x2 = thispoly[3][0]
	let y2 = thispoly[3][1]
	let p1 = perpendicular_point(x2, y2, x1, y1, 80, x1, y1)
	let p2 = perpendicular_point(x2, y2, x1, y1, 80, x2, y2)
	let btn_cordinate = [[x1, y1], [x2, y2], p2, p1]
	let txt_p1 = perpendicular_point(x2, y2, x1, y1, 40, x1, y1)
	let txt_p2 = perpendicular_point(x2, y2, x1, y1, 40, x2, y2)
	draw_AdjRect(ctx, btn_cordinate, "#C0C0C0")
	let txt = "Read More"
	ctx.font = "20px Arial";
	draw_txt(ctx, txt, (txt_p1[0] + txt_p2[0]) / 2, (txt_p1[1] + txt_p2[1]) / 2, thisTheta, "#000000")

}




function plygnInside(vs, x, y) {
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

function polygon(initial_theta, p_dist, data) {

	isGraph1 = false
	isGraph2 = true
	c = document.getElementById("myCanvas");
	temp = document.getElementById("myoverlay");
	c.width = temp.offsetWidth * dpr;
	c.height = temp.offsetHeight * dpr;
	ctx = c.getContext("2d");
	c_x = c.width / 2;
	c_y = c.height / 2;
	var x = c_x
	var y = c_y
	prev_btn_cordinate.x=prev_btn_cordinate.x-20
	next_btn_cordinate.x=next_btn_cordinate.x+50
	prev_btn_cordinate.x=c_x+400
	next_btn_cordinate.x=c_x-400
	prev_btn_cordinate.y=c_y
	next_btn_cordinate.y=c_y
	builPrevBtn(prev_btn_cordinate, ctx, "#FFFFFF", "#000000", 0.7, "PREV")
	builPrevBtn(next_btn_cordinate, ctx, "#FFFFFF", "#000000", 0.7, "NEXT")
	
	drawPg(ctx,pg_coordinate_param,5,.75,"#000000","#FFFFFF")
	



	var sides = data.length
	polyR = txtLengthCmp2(ctx, data) / (2 * Math.sin((Math.PI) / sides))
	var radius = polyR

	if (sides < 3) return;
	var initial_angle = initial_theta;
	var a = ((Math.PI * 2) / sides);
	ctx.beginPath();

	ctx.moveTo(x + radius * Math.cos(initial_angle), y + radius * Math.sin(initial_angle));

	txtCordinate.push({
		data: data[0].name,
		x: x + (polyR + txtOffset) * Math.cos(initial_angle + (a / 2)),
		y: y + (polyR + txtOffset) * Math.sin(initial_angle + (a / 2)),
		theta: initial_angle + ((Math.PI / 2) + (a / 2))
	})


	adjacent_plygn.push([{
		x: x + (radius + offset_plygn) * Math.cos(initial_angle),
		y: y + (radius + offset_plygn) * Math.sin(initial_angle)
	},
	{
		x: x + (radius) * Math.cos(initial_angle),
		y: y + (radius) * Math.sin(initial_angle)
	},
	initial_angle + ((Math.PI / 2) + (a / 2))
	]);
	for (var i = 1; i < sides; i++) {
		ctx.lineTo(x + radius * Math.cos(initial_angle + (a * i)), y + radius * Math.sin(initial_angle + (a * i)));
		adjacent_plygn.push([{
			x: x + (radius + offset_plygn) * Math.cos(initial_angle + (a * i)),
			y: y + (radius + offset_plygn) * Math.sin(initial_angle + (a * i))
		},
		{
			x: x + (radius) * Math.cos(initial_angle + (a * i)),
			y: y + (radius) * Math.sin(initial_angle + (a * i))
		},
		initial_angle + ((Math.PI / 2) + (a / 2) + (a * i))
		]);

		var txt_rotate_angle = ((Math.PI / 2) + (a / 2) + (a * i))
		txtCordinate.push({
			data: data[i].name,
			x: x + (polyR + txtOffset) * Math.cos(initial_angle + (a * i) + (a / 2)),
			y: y + (polyR + txtOffset) * Math.sin(initial_angle + (a * i) + (a / 2)),
			theta: initial_angle + ((Math.PI / 2) + (a / 2) + (a * i))
		})


	}
	ctx.closePath();

	var theta90 = Math.PI / 4
	for (var i = 0; i < adjacent_plygn.length; i++) {
		ctx.beginPath();
		ctx.moveTo(adjacent_plygn[i][0].x, adjacent_plygn[i][0].y);
		ctx.lineTo(adjacent_plygn[i][1].x, adjacent_plygn[i][1].y);
		var x1 = adjacent_plygn[i][0].x
		var y1 = adjacent_plygn[i][0].y

		if (i == adjacent_plygn.length - 1) {
			ctx.lineTo(adjacent_plygn[0][1].x, adjacent_plygn[0][1].y);
			ctx.lineTo(adjacent_plygn[0][0].x, adjacent_plygn[0][0].y);
			var x2 = adjacent_plygn[0][0].x
			var y2 = adjacent_plygn[0][0].y
			var p1 = perpendicular_point(x1, y1, x2, y2, p_dist, x1, y1)
			var p2 = perpendicular_point(x1, y1, x2, y2, p_dist, x2, y2)

			adjacent_plygn_cordinates.push({
				layer1: [[adjacent_plygn[i][0].x, adjacent_plygn[i][0].y],
				[adjacent_plygn[i][1].x, adjacent_plygn[i][1].y],
				[adjacent_plygn[0][1].x, adjacent_plygn[0][1].y],
				[adjacent_plygn[0][0].x, adjacent_plygn[0][0].y]],
				layer2_rect: [[x1, y1], [x2, y2], p2, p1],
				theta: adjacent_plygn[i][2]
			})
		} else {
			ctx.lineTo(adjacent_plygn[i + 1][1].x, adjacent_plygn[i + 1][1].y);
			ctx.lineTo(adjacent_plygn[i + 1][0].x, adjacent_plygn[i + 1][0].y);
			var x2 = adjacent_plygn[i + 1][0].x
			var y2 = adjacent_plygn[i + 1][0].y
			var p1 = perpendicular_point(x1, y1, x2, y2, p_dist, x1, y1)
			var p2 = perpendicular_point(x1, y1, x2, y2, p_dist, x2, y2)
			adjacent_plygn_cordinates.push({
				layer1: [[adjacent_plygn[i][0].x, adjacent_plygn[i][0].y],
				[adjacent_plygn[i][1].x, adjacent_plygn[i][1].y],
				[adjacent_plygn[i + 1][1].x, adjacent_plygn[i + 1][1].y],
				[adjacent_plygn[i + 1][0].x, adjacent_plygn[i + 1][0].y]],
				layer2_rect: [[x1, y1], [x2, y2], p2, p1],
				theta: adjacent_plygn[i][2]
			})
		}

		ctx.closePath();
		ctx.stroke();
	}
	adjacent_plygn_cordinates.forEach((item, i) => {
		adjacent_plygn_cordinates[i].layer2_ply = perpendicular_plygn(item.layer1)
	})
	for (var i = 0; i < adjacent_plygn_cordinates.length; i++) {
		let x1 = adjacent_plygn_cordinates[i].layer2_ply[0][0]
		let y1 = adjacent_plygn_cordinates[i].layer2_ply[0][1]
		let x2 = adjacent_plygn_cordinates[i].layer2_ply[3][0]
		let y2 = adjacent_plygn_cordinates[i].layer2_ply[3][1]
		let p1 = perpendicular_point(x1, y1, x2, y2, 200, x1, y1)
		let p2 = perpendicular_point(x1, y1, x2, y2, 200, x2, y2)
		adjacent_plygn_cordinates[i].layer3 = [[x1, y1], [x2, y2], p2, p1]
	}

	adjacent_plygn_cordinates.forEach((item, i) => {
		draw_AdjRect(ctx, item.layer2_ply, "#000000")
	})
	// review graph
	adjacent_plygn_cordinates.forEach((item) => {
		let thisPoly = item.layer3
		let x1 = thisPoly[0][0]
		let y1 = thisPoly[0][1]
		let x2 = thisPoly[1][0]
		let y2 = thisPoly[1][1]
		let startpt = [[x1, y1], [x2, y2]]
		let reviewlineLength = 200

		let l = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
		let reviewoffset = 2 * l / (5)
		let nextdist = 0
		for (let i = 0; i < 3; i++) {
			let thisp1 = perpendicular_point(startpt[0][0], startpt[0][1], startpt[1][0], startpt[1][1], reviewlineLength, startpt[0][0], startpt[0][1])
			let thisp2 = perpendicular_point(thisp1[0], thisp1[1], startpt[0][0], startpt[0][1], reviewoffset, startpt[0][0], startpt[0][1])
			let thisp3 = perpendicular_point(thisp1[0], thisp1[1], startpt[0][0], startpt[0][1], reviewoffset, thisp1[0], thisp1[1])
			let thisp4 = perpendicular_point(thisp1[0], thisp1[1], startpt[0][0], startpt[0][1], 2 * reviewoffset, startpt[0][0], startpt[0][1])
			let thisp5 = perpendicular_point(thisp1[0], thisp1[1], startpt[0][0], startpt[0][1], 3 * reviewoffset, startpt[0][0], startpt[0][1])
			draw_AdjRect(ctx, [[startpt[0][0], startpt[0][1]], [thisp1[0], thisp1[1]], [thisp3[0], thisp3[1]], [thisp2[0], thisp2[1]]], "#FFA41C")
			// DrawCircle(ctx,thisp5[0],thisp5[1],40,Math.PI*2,0,2)
			// DrawCircle(ctx,thisp4[0],thisp4[1],40,Math.PI*2,0,2)
			startpt = [[thisp4[0], thisp4[1]], [thisp5[0], thisp5[1]]]

		}

	})

	//Ploting description
	if (onclick_val_index || onclick_val_index === 0) {
		let thisPoly = adjacent_plygn_cordinates[onclick_val_index].layer3
		let thisTheta = adjacent_plygn_cordinates[onclick_val_index].theta
		draw_AdjRect(ctx, thisPoly, "#FFFFFF")
		plotDescription(ctx, thisPoly, thisTheta, data)
		readMoreBtn(ctx, thisPoly, thisTheta)

	}
	ctx.font = "20px Arial";

	txtCordinate.forEach((itm) => {
		draw_txt(ctx, itm.data, itm.x, itm.y, itm.theta, "#FFFFFF")


	})
	rotateShape(ctx, rotate_lable, rotate_Slider)
}









/*********************************************************************/

function drawBackBtn(ctx) {
	ctx.font = "20px Arial";
	var this_txt = "Back"
	var bacKbtn = [[50, 50], [50 + (ctx.measureText(this_txt).width) + 10, 50], [50 + (ctx.measureText(this_txt).width) + 10, 80], [50, 80]]
	bacKbtncdnt = bacKbtn
	ctx.beginPath()
	ctx.moveTo(bacKbtn[0][0], bacKbtn[0][1])
	for (var i = 1; i < bacKbtn.length; i++) {
		ctx.lineTo(bacKbtn[i][0], bacKbtn[i][1])
	}

	ctx.closePath();
	ctx.stroke();
	ctx.fillText(this_txt, 55, 70);
	var j = 0;
	while (j < track_filter.length) {
		this_txt = track_filter[j].data
		var temp_x = bacKbtn[bacKbtn.length - 1][0]
		var temp_y = bacKbtn[bacKbtn.length - 1][1]
		bacKbtn = [[temp_x, temp_y], [50 + (ctx.measureText(this_txt).width) + 10, temp_y], [50 + (ctx.measureText(this_txt).width) + 10, 30 + temp_y], [temp_x, 30 + temp_y]];
		ctx.beginPath()
		ctx.moveTo(bacKbtn[0][0], bacKbtn[0][1])
		for (var i = 1; i < bacKbtn.length; i++) {
			ctx.lineTo(bacKbtn[i][0], bacKbtn[i][1])
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fillText(this_txt, 55, temp_y + 20);
		j++
	}

}



function DrawCircle(ctx, x, y, r, theta1, theta2, line_Width) {
	ctx.beginPath();
	ctx.arc(x, y, r, theta1, theta2);
	ctx.lineWidth = line_Width;

	ctx.stroke();

}
function DrawLine(ctx, x1, y1, x2, y2, line_Width) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineWidth = line_Width;
	ctx.stroke();
}

function txtLengthCmp(ctx, data) {
	var txtMaxLenght = 0
	for (var i = 0; i < data.length; i++) {
		ctx.font = "20px Arial";
		var this_txt = data[i].data;
		if ((((ctx.measureText(this_txt).width) / 2) + 10) > txtMaxLenght) {
			txtMaxLenght = (((ctx.measureText(this_txt).width) / 2) + 10);
		}
	}
	return txtMaxLenght
}



function DrawGraph(data) {

	isGraph1 = true
	isGraph2 = false
	c = document.getElementById("myCanvas");
	temp = document.getElementById("myoverlay");
	c.width = temp.offsetWidth * dpr;
	c.height = temp.offsetHeight * dpr;
	ctx = c.getContext("2d");
	c_x = c.width / 2;
	c_y = c.height / 2;
	builPrevBtn(prev_btn_cordinate, ctx, "#FFFFFF", "#000000", 0.7, "PREV")
	builPrevBtn(next_btn_cordinate, ctx, "#FFFFFF", "#000000", 0.7, "NEXT")
	ctx.font = "20px Arial";
	var txt = tech.data;
	const c_radius = ((ctx.measureText(txt).width) / 2) + 10;

	DrawCircle(ctx, c_x, c_y, c_radius, 0, 2 * Math.PI, 4)
	ctx.fillText(txt, c_x - c_radius + 10, c_y + 10)
	var theta = 3 * Math.PI / 2;
	const theta_increment = (2 * Math.PI) / data.length;
	var line_cordinates = []
	const line_length = 150;
	const adjt_circle_offset = 20
	for (var i = 0; i < data.length; i++) {
		var hover_offset = 0
		if (mouseOver_val.status && (mouseOver_val.id == data[i].curr)) {
			hover_offset += hvr_offset
		}
		line_cordinates.push({
			x1: c_x + (c_radius + circle_offset + hover_offset) * Math.cos(theta),
			y1: c_y + (c_radius + circle_offset + hover_offset) * Math.sin(theta),
			x2: c_x + line_length * Math.cos(theta),
			y2: c_y + line_length * Math.sin(theta),
			theta: theta
		});
		theta = theta + theta_increment;
	}


	attach_circle_r = txtLengthCmp(ctx, data)


	for (var i = 0; i < data.length; i++) {
		var this_center_x = line_cordinates[i].x2 + (attach_circle_r + adjt_circle_offset) * Math.cos(line_cordinates[i].theta);
		var this_center_y = line_cordinates[i].y2 + (attach_circle_r + adjt_circle_offset) * Math.sin(line_cordinates[i].theta);
		adjcent_circle.push({
			x: this_center_x,
			y: this_center_y,
			data_id: data[i].curr,

		})
		hover_offset = hvr_offset
		var thisR = c_radius + circle_offset;
		(mouseOver_val.status && (mouseOver_val.id == data[i].curr)) ? thisR = c_radius + circle_offset + hover_offset : thisR = c_radius + circle_offset;
		if (mouseOver_val.status && (mouseOver_val.id == data[i].curr)) {

		}

		//Middle circle arc
		DrawCircle(ctx, c_x, c_y, thisR, line_cordinates[i].theta - (Math.PI / (2 * data.length)), line_cordinates[i].theta + (Math.PI / (2 * data.length)), 10)
		//adjacent lines
		DrawLine(ctx, line_cordinates[i].x1, line_cordinates[i].y1, line_cordinates[i].x2, line_cordinates[i].y2, 1)
		//adjacent circle 
		DrawCircle(ctx, this_center_x, this_center_y, attach_circle_r, 0, 2 * Math.PI, 4)
		//Adject circle arc
		DrawCircle(ctx, this_center_x, this_center_y, attach_circle_r + adjt_circle_offset, line_cordinates[i].theta - (Math.PI / 2) + Math.PI, line_cordinates[i].theta + (Math.PI / 2) + Math.PI, 10)


		ctx.font = "20px Arial";
		var this_txt = data[i].data;
		ctx.fillText(this_txt, this_center_x - ((ctx.measureText(this_txt).width) / 2), this_center_y + 10);
	}


	drawBackBtn(ctx)
	return adjcent_circle;
}

function init(thisapi) {
	api = thisapi
	thisapi.forEach((item) => {
		item.prev ? "" : thisData.push(item);
	})
	track_filter.push(tech)
	DrawGraph(thisData)
}



function circleInside(circle) {
	var dist = Math.sqrt(Math.pow((x - circle.x), 2) + Math.pow((y - circle.y), 2));
	if (dist <= attach_circle_r) {
		return true
	}
}

function grap1ClickEvent(ev) {

	var rect = c.getBoundingClientRect()
	var x = (ev.clientX - rect.left) * dpr
	var y = (ev.clientY - rect.top) * dpr

	var inside_status = false
	if (plygnInside(bacKbtncdnt, x, y) && (track_filter.length - 1) > 0) {
		tech = track_filter[track_filter.length - 2]
		thisData.forEach((item, index) => {
			item.curr === track_filter[track_filter.length - 2].curr ? tech = item : ""
		})
		thisData = []
		api.forEach((item, index) => {
			item.prev === track_filter[track_filter.length - 2].curr ? thisData.push(item) : ""
		})
		track_filter.pop()

		ctx.clearRect(0, 0, c.width, c.height)
		DrawGraph(thisData)
	} else {
		for (var i = 0; i < adjcent_circle.length; i++) {
			var dist = Math.sqrt(Math.pow((x - adjcent_circle[i].x), 2) + Math.pow((y - adjcent_circle[i].y), 2));
			if (dist <= attach_circle_r) {

				inside_status = true
				onclick_val.status = true;
				onclick_val.id = adjcent_circle[i].data_id;
			}
		}
		thisData.forEach((item, index) => {
			item.curr === onclick_val.id ? tech = item : ""
		})
		thisData = []
		api.forEach((item, index) => {
			item.prev === onclick_val.id ? thisData.push(item) : ""
		})
		if (thisData.length === 0) {
			polygon(0, 200, graph2data)
		} else {
			if (inside_status) {
				track_filter.push(tech)
				adjcent_circle = []
				ctx.clearRect(0, 0, c.width, c.height);
				DrawGraph(thisData)
			}
		}


	}
}

function graph2ClickEvent(ev) {
	var rect = c.getBoundingClientRect()
	var x = (ev.clientX - rect.left) * dpr
	var y = (ev.clientY - rect.top) * dpr

	adjacent_plygn_cordinates.forEach((item, index) => {
		if (inside(item, x, y)) {
			onclick_val_index = index;
		}
	})

	ctx.clearRect(0, 0, c.width, c.height);
	txtCordinate = []
	adjacent_plygn = []
	adjacent_plygn_cordinates = []
	polygon(rotateTheta, 200, graph2data);
}




window.addEventListener('click', function (ev) {
	if (isGraph1) {
		grap1ClickEvent(ev)
	}
	if (isGraph2) {
		graph2ClickEvent(ev)
	}

});

// c.addEventListener('mousemove', function(ev) {
//   var rect = c.getBoundingClientRect()
//    var x = ev.clientX - rect.left
//     var y = ev.clientY - rect.top
//     for (var i = 0; i < adjcent_circle.length; i++) {
//     	var dist = Math.sqrt( Math.pow((x-adjcent_circle[i].x), 2) + Math.pow((y-adjcent_circle[i].y), 2) );
//     	if(dist<=attach_circle_r){
//     		mouseOver_val.status=true;
//     		mouseOver_val.id=adjcent_circle[i].data_id;
//     	}
//     }

//     //ctx.clearRect(0,0,c.width,c.height)
//     //animate(thisData)


// });

window.addEventListener('mousemove', function (ev) {
	var rect = c.getBoundingClientRect()
	var x = (ev.clientX - rect.left) * dpr
	var y = (ev.clientY - rect.top) * dpr
	if (isScroll === true) {
		if (Math.abs(rotate_lable_center.x - y) < rotate_lable.length / 2) {
			ctx.clearRect(0, 0, c.width, c.height);
			rotate_Slider_center.x = y
			rotateTheta = Math.PI * ((rotate_lable_center.x - rotate_Slider_center.x) / (rotate_lable.length / 2))
			txtCordinate = []
			adjacent_plygn = []
			adjacent_plygn_cordinates = []
			polygon(rotateTheta, 200, graph2data)
		}
	}
})
window.addEventListener('mousedown', function (ev) {
	var rect = c.getBoundingClientRect()
	var x = (ev.clientX - rect.left) * dpr
	var y = (ev.clientY - rect.top) * dpr
	if (inside2(scroll_cordinate, x, y)) {
		isScroll = true
	}
});

window.addEventListener('mouseup', function (ev) {
	isScroll = false
});


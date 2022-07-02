var dpr = window.devicePixelRatio || 1;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var temp = document.getElementById("myoverlay");
c.width = temp.offsetWidth * dpr;
c.height = temp.offsetHeight * dpr;
var c_x = c.width / 2;
var c_y = c.height / 2;



var myImage = new Image();
myImage.src = '2.jpg';
/************************Prev btn***************************************/
let prev_btn_cordinate = {
    x: c_x + 450,
    y: c_y,
    arrow_h: 50,
    arrow_b: 50,
    box_lx: 75,
    box_by: 75,

}
let next_btn_cordinate = {
    x: c_x - 450,
    y: c_y,
    arrow_h: 50,
    arrow_b: 50,
    box_lx: 75,
    box_by: 75,
}
let prev_btn_cordinate_full = []
let next_btn_cordinate_full = []



/***************Building Previous btn*****************/
function buildPrevNextBtn(center_cdnt, colorArrow, colorBox, zoom, type) {
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
    let thisp1 = [center.x - center.box_lx, center.y - center.box_by]
    let thisp2 = [center.x - center.box_lx, center.y + center.box_by]
    let thisp3 = [center.x + center.box_lx, center.y + center.box_by]
    let thisp4 = [center.x + center.box_lx, center.y - center.box_by]
    if (type === "NEXT") {
        prev_btn_cordinate_full = [thisp1, thisp2, thisp3, thisp4]
    } else {
        next_btn_cordinate_full = [thisp1, thisp2, thisp3, thisp4]
    }


    ctx.moveTo(thisp1[0], thisp1[1])
    ctx.lineTo(thisp2[0], thisp2[1])
    ctx.lineTo(thisp3[0], thisp3[1])
    ctx.lineTo(thisp4[0], thisp4[1])
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
    x: c_x,
    y: (c_y * 2) - 120,
    a: 100,
}
let pg_coordinate = []

function drawPg(pg_coordinate_param, total_pg, zoom, fillcolor, borderColor) {
    let thisPgSide = pg_coordinate_param.a * zoom
    let l = (thisPgSide * total_pg) / 2
    let thisPage = []
    for (let i = 0; i < total_pg; i++) {
        let Cdnt1 = { x: pg_coordinate_param.x - l + thisPgSide * i, y: pg_coordinate_param.y - thisPgSide / 2 }
        let Cdnt2 = { x: pg_coordinate_param.x - l + thisPgSide * i, y: pg_coordinate_param.y + thisPgSide / 2 }
        let Cdnt3 = { x: pg_coordinate_param.x - l + thisPgSide * i + thisPgSide, y: pg_coordinate_param.y + thisPgSide / 2 }
        let Cdnt4 = { x: pg_coordinate_param.x - l + thisPgSide * i + thisPgSide, y: pg_coordinate_param.y - thisPgSide / 2 }
        thisPage.push(Cdnt1)
        thisPage.push(Cdnt2)
        thisPage.push(Cdnt3)
        thisPage.push(Cdnt4)
        pg_coordinate.push(thisPage)
        draw_AdjRect2(thisPage, 1, fillcolor, borderColor)
        let pgNoWidth = 30 * zoom
        ctx.font = pgNoWidth + "px Arial";
        draw_txt((i + 1).toString(), (Cdnt1.x + Cdnt4.x) / 2, pg_coordinate_param.y, 0, "#FFFFFF")
        ctx.resetTransform();
        thisPage = []
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
    temp: 0,
    x: c_y,
    y: (c_x * 2) - 100
}
var rotate_Slider_center = {
    temp: 0,
    x: c_y,
    y: (c_x * 2) - 100
}
var label_cordinate = []
var scroll_cordinate = []
/********************************************************* */
const AdjectPlygnHeight = 220

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
        descr: "They used their engineering and entrepreneurial skills to provide solutions for companies ranging from startups to MNC. They expanded their profile from software solutions to Embedded solutions. "
    },
    {
        id: 2,
        name: "Project 2",
        descr: "react Ipsum NodeL ore mNode LoremN odeLo rem"

    },
    {
        id: 3,
        name: "Project 3",
        descr: "spring Ipsum is simply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled ply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled ply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and "

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







/*****************Graph1****************/
var tagsRelatedToProject;
var api = [] //Total tags are stored in this var
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


function rotateShape(rotate_lable, rotate_Slider) {
    SliderLableCordinate_Cal(rotate_lable, rotate_Slider)
    draw_AdjRect2(label_cordinate, 1, "#FF0000", "#000000")
    draw_AdjRect2(scroll_cordinate, 1, "#FF0000", "#000000")
}

function draw_txt(txt, x, y, theta, color) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate(x, y);
    ctx.rotate(theta);
    ctx.fillStyle = color;
    ctx.fillText(txt, 0, 0);
    ctx.resetTransform();
}


function draw_AdjRect(thisItem, color = null, lineColor = "#00000", line_Width = 2) {
    ctx.beginPath()
    // let pattern = ctx.createPattern(myImage, "repeat");
    // ctx.fillStyle = pattern;
    // ctx.globalAlpha = 0.1
    ctx.strokeStyle = lineColor
    ctx.lineWidth = line_Width
    ctx.fillStyle = color
    ctx.moveTo(thisItem[0][0], thisItem[0][1])
    for (var i = 1; i < thisItem.length; i++) {
        ctx.lineTo(thisItem[i][0], thisItem[i][1])
    }

    ctx.closePath();
    if (color) {
        ctx.fill();
    }

    // ctx.globalAlpha = 1
    ctx.stroke();
    ctx.resetTransform()
    ctx.fillStyle = "#FFFFFF"



}
function draw_AdjRect2(thisItem, line_width, fillColor, borderColor) {
    ctx.beginPath()
    ctx.fillStyle = fillColor;
    ctx.moveTo(thisItem[0].x, thisItem[0].y)
    for (var i = 1; i < thisItem.length; i++) {
        ctx.lineTo(thisItem[i].x, thisItem[i].y)
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = line_width
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
function perpendicular_plygn(item, d) {
    var x1 = item[0][0]
    var y1 = item[0][1]
    var x2 = item[item.length - 1][0]
    var y2 = item[item.length - 1][1]

    var new_plygn = []
    item.forEach((itm, index) => {

        if (index === 3 || index === 0) {
            new_plygn.push(perpendicular_point(x1, y1, x2, y2, d * (6 / graph2data.length), itm[0], itm[1]))
        } else {
            new_plygn.push(perpendicular_point(x1, y1, x2, y2, d, itm[0], itm[1]))
        }
    })
    return new_plygn
}
function inside(ts, x, y) {
    var vs = ts.layer2
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

function txtLengthCmp2(data, fontSize) {
    var txtMaxLenght = 0
    for (var i = 0; i < data.length; i++) {
        ctx.font = fontSize + "px Arial";
        var this_txt = data[i].name;
        if (ctx.measureText(this_txt).width > txtMaxLenght) {

            txtMaxLenght = (ctx.measureText(this_txt).width);
        }
    }
    return txtMaxLenght
}
function plotDescription(thispoly, thisTheta, data) {
    let x1 = thispoly[0][0]
    let y1 = thispoly[0][1]
    let x2 = thispoly[1][0]
    let y2 = thispoly[1][1]
    let forDistx1 = thispoly[0][0]
    let forDisty2 = thispoly[0][1]
    let forDistx2 = thispoly[2][0]
    let forDisty1 = thispoly[2][1]
    let l = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    let r = Math.sqrt(Math.pow(x2 - c_x, 2) + Math.pow(y2 - c_y, 2))
    let d = Math.sqrt(Math.pow(r, 2) - Math.pow((l / 2), 2))
    let fistTxtDist = Math.sqrt(Math.pow(forDistx1 - forDistx2, 2) + Math.pow(forDisty1 - forDisty2, 2))



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
            if (final_txt_array.length === 4) {
                final_txt_array.push(this_txt + "...")
            } else {
                final_txt_array.push(this_txt)
            }

            this_txt = txtSplited[i]
        }
        i++
    }
    if (this_txt !== txtSplited[txtSplited.length - 1] && final_txt_array.length < 5) {
        if (final_txt_array.length === 4) {
            final_txt_array.push(this_txt + "...")
        } else {
            final_txt_array.push(this_txt)
        }

    }
    let next_line_space = 180
    final_txt_array.forEach((itm) => {
        var p1 = perpendicular_point(x1, y1, x2, y2, next_line_space, x1, y1)
        var p2 = perpendicular_point(x1, y1, x2, y2, next_line_space, x2, y2)
        draw_txt(itm, (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, thisTheta, "#000000")
        next_line_space -= 40
    })
}

function readMoreBtn(thispoly, thisTheta) {
    let x1 = thispoly[2][0]
    let y1 = thispoly[2][1]
    let x2 = thispoly[3][0]
    let y2 = thispoly[3][1]
    let p1 = perpendicular_point(x2, y2, x1, y1, 80, x1, y1)
    let p2 = perpendicular_point(x2, y2, x1, y1, 80, x2, y2)
    let btn_cordinate = [[x1, y1], [x2, y2], p2, p1]
    let txt_p1 = perpendicular_point(x2, y2, x1, y1, 40, x1, y1)
    let txt_p2 = perpendicular_point(x2, y2, x1, y1, 40, x2, y2)
    draw_AdjRect(btn_cordinate, "#C0C0C0")
    let txt = "Read More"
    ctx.font = "20px Arial";
    draw_txt(txt, (txt_p1[0] + txt_p2[0]) / 2, (txt_p1[1] + txt_p2[1]) / 2, thisTheta, "#000000")

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
/**********************This function is ploting the riview graph above the project ploygon(layer2) */
function drawReviewGraph(adjacent_plygn_cordinates) {
    adjacent_plygn_cordinates.forEach((item) => {
        let thisPoly = item.layer3
        let x1 = thisPoly[0][0]
        let y1 = thisPoly[0][1]
        let x2 = thisPoly[1][0]
        let y2 = thisPoly[1][1]
        let startpt = [[x1, y1], [x2, y2]]
        let startpt_r = [[x1, y1], [x2, y2]]
        let reviewlineLength = 50

        let l = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        let reviewoffset = 2 * l / (9)
        for (let i = 0; i < 5; i++) {
            /***************************review Actual */
            let thisp1 = perpendicular_point(startpt[0][0], startpt[0][1], startpt[1][0], startpt[1][1], reviewlineLength, startpt[0][0], startpt[0][1])
            let thisp2 = perpendicular_point(thisp1[0], thisp1[1], startpt[0][0], startpt[0][1], reviewoffset, startpt[0][0], startpt[0][1])
            let thisp3 = perpendicular_point(thisp1[0], thisp1[1], startpt[0][0], startpt[0][1], reviewoffset, thisp1[0], thisp1[1])
            let thisp4 = perpendicular_point(thisp1[0], thisp1[1], startpt[0][0], startpt[0][1], 2 * reviewoffset, startpt[0][0], startpt[0][1])
            let thisp5 = perpendicular_point(thisp1[0], thisp1[1], startpt[0][0], startpt[0][1], 3 * reviewoffset, startpt[0][0], startpt[0][1])
            /********************rewier total */
            let thisp1_r = perpendicular_point(startpt_r[0][0], startpt_r[0][1], startpt_r[1][0], startpt_r[1][1], reviewlineLength + 100, startpt_r[0][0], startpt_r[0][1])
            let thisp2_r = perpendicular_point(thisp1_r[0], thisp1_r[1], startpt_r[0][0], startpt_r[0][1], reviewoffset, startpt_r[0][0], startpt_r[0][1])
            let thisp3_r = perpendicular_point(thisp1_r[0], thisp1_r[1], startpt_r[0][0], startpt_r[0][1], reviewoffset, thisp1_r[0], thisp1_r[1])
            let thisp4_r = perpendicular_point(thisp1_r[0], thisp1_r[1], startpt_r[0][0], startpt_r[0][1], 2 * reviewoffset, startpt_r[0][0], startpt_r[0][1])
            let thisp5_r = perpendicular_point(thisp1_r[0], thisp1_r[1], startpt_r[0][0], startpt_r[0][1], 3 * reviewoffset, startpt_r[0][0], startpt_r[0][1])
            if (i !== 0 && i !== 4) {
                draw_AdjRect([[startpt_r[0][0], startpt_r[0][1]], [thisp1_r[0], thisp1_r[1]], [thisp3_r[0], thisp3_r[1]], [thisp2_r[0], thisp2_r[1]]], "#DADADA", "#CD6504")
                draw_AdjRect([[startpt[0][0], startpt[0][1]], [thisp1[0], thisp1[1]], [thisp3[0], thisp3[1]], [thisp2[0], thisp2[1]]], "#FFA41C", "#CD6504")

            }
            // DrawCircle(ctx,thisp5[0],thisp5[1],40,Math.PI*2,0,2)
            // DrawCircle(ctx,thisp4[0],thisp4[1],40,Math.PI*2,0,2)
            startpt = [[thisp4[0], thisp4[1]], [thisp5[0], thisp5[1]]]
            startpt_r = [[thisp4_r[0], thisp4_r[1]], [thisp5_r[0], thisp5_r[1]]]
        }
    })
}


function polygon(initial_theta, p_dist, data,relatedTag) {
    //----------------------adjacent_plygn_cordinates:-----------------------//
    //layer1:Array of all the polygon which are adjacent to main polygon
    //layer2: Array of all the polygon , which contains project title & on clicking those ploygon a description box is open
    //Layer3:this is desccription box which is open after clicking layer2 ploygon
    ctx.clearRect(0, 0, c.width, c.height);
    isGraph1 = false
    isGraph2 = true

    buildPrevNextBtn(prev_btn_cordinate, "#FFFFFF", "#000000", 0.7, "PREV")
    buildPrevNextBtn(next_btn_cordinate, "#FFFFFF", "#000000", 0.7, "NEXT")
    drawPg(pg_coordinate_param, 5, .75, "#000000", "#FFFFFF")

    console.log(relatedTag)
    let x = c_x
    let y = c_y
    
    let main_plygn = []
    var sides = data.length
    polyR = txtLengthCmp2(data, 30) / (2 * Math.sin((Math.PI) / sides))
    var radius = polyR

    if (sides < 3) return;
    var initial_angle = initial_theta;
    var a = ((Math.PI * 2) / sides);
    main_plygn.push([x + radius * Math.cos(initial_angle), y + radius * Math.sin(initial_angle)])
    if (onclick_val_index === 0) {
        txtCordinate.push({
            data: data[0].name,
            x: x + (radius + txtOffset + 50) * Math.cos(initial_angle + (a / 2)),
            y: y + (radius + txtOffset + 50) * Math.sin(initial_angle + (a / 2)),
            theta: initial_angle + ((Math.PI / 2) + (a / 2))
        })
    } else {
        txtCordinate.push({
            data: data[0].name,
            x: x + (radius + txtOffset) * Math.cos(initial_angle + (a / 2)),
            y: y + (radius + txtOffset) * Math.sin(initial_angle + (a / 2)),
            theta: initial_angle + ((Math.PI / 2) + (a / 2))
        })
    }



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
        main_plygn.push([x + radius * Math.cos(initial_angle + (a * i)), y + radius * Math.sin(initial_angle + (a * i))])
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
        if (onclick_val_index === i) {
            txtCordinate.push({
                data: data[i].name,
                x: x + (polyR + txtOffset + 50) * Math.cos(initial_angle + (a * i) + (a / 2)),
                y: y + (polyR + txtOffset + 50) * Math.sin(initial_angle + (a * i) + (a / 2)),
                theta: initial_angle + ((Math.PI / 2) + (a / 2) + (a * i))
            })
        } else {
            txtCordinate.push({
                data: data[i].name,
                x: x + (polyR + txtOffset) * Math.cos(initial_angle + (a * i) + (a / 2)),
                y: y + (polyR + txtOffset) * Math.sin(initial_angle + (a * i) + (a / 2)),
                theta: initial_angle + ((Math.PI / 2) + (a / 2) + (a * i))
            })
        }
    }
    draw_AdjRect(main_plygn,  "#000000" , "#FFFFFF", 4)
    draw_txt(relatedTag.data.split(" ")[0],x,y-15,0,"#FFFFFF")
    relatedTag.data.split(" ")[1]? draw_txt(relatedTag.data.split(" ")[1],x,y+15,0,"#FFFFFF"):""
   

    for (var i = 0; i < adjacent_plygn.length; i++) {
        var x1 = adjacent_plygn[i][0].x
        var y1 = adjacent_plygn[i][0].y

        if (i == adjacent_plygn.length - 1) {
            var x2 = adjacent_plygn[0][0].x
            var y2 = adjacent_plygn[0][0].y
            var p1 = perpendicular_point(x1, y1, x2, y2, p_dist, x1, y1)
            var p2 = perpendicular_point(x1, y1, x2, y2, p_dist, x2, y2)

            adjacent_plygn_cordinates.push({
                layer1: [[adjacent_plygn[i][0].x, adjacent_plygn[i][0].y],
                [adjacent_plygn[i][1].x, adjacent_plygn[i][1].y],
                [adjacent_plygn[0][1].x, adjacent_plygn[0][1].y],
                [adjacent_plygn[0][0].x, adjacent_plygn[0][0].y]],
                layer2_rect_old: [[x1, y1], [x2, y2], p2, p1],
                theta: adjacent_plygn[i][2]
            })
        } else {
            var x2 = adjacent_plygn[i + 1][0].x
            var y2 = adjacent_plygn[i + 1][0].y
            var p1 = perpendicular_point(x1, y1, x2, y2, p_dist, x1, y1)
            var p2 = perpendicular_point(x1, y1, x2, y2, p_dist, x2, y2)
            adjacent_plygn_cordinates.push({
                layer1: [[adjacent_plygn[i][0].x, adjacent_plygn[i][0].y],
                [adjacent_plygn[i][1].x, adjacent_plygn[i][1].y],
                [adjacent_plygn[i + 1][1].x, adjacent_plygn[i + 1][1].y],
                [adjacent_plygn[i + 1][0].x, adjacent_plygn[i + 1][0].y]],
                layer2_rect_old: [[x1, y1], [x2, y2], p2, p1],
                theta: adjacent_plygn[i][2]
            })
        }
    }

    // adjacent_plygn_cordinates.forEach((item) => {
    //     //ctx.globalAlpha = .2;
    //     draw_AdjRect(item.layer1)
    //     //ctx.globalAlpha = 1;
    // })
    adjacent_plygn_cordinates.forEach((item, i) => {

        if (onclick_val_index === i) {
            adjacent_plygn_cordinates[i].layer2 = perpendicular_plygn(item.layer1, 80 + 100)
        } else {
            adjacent_plygn_cordinates[i].layer2 = perpendicular_plygn(item.layer1, 80)
        }
    })
    for (var i = 0; i < adjacent_plygn_cordinates.length; i++) {
        let x1 = adjacent_plygn_cordinates[i].layer2[0][0]
        let y1 = adjacent_plygn_cordinates[i].layer2[0][1]
        let x2 = adjacent_plygn_cordinates[i].layer2[3][0]
        let y2 = adjacent_plygn_cordinates[i].layer2[3][1]
        let p1 = perpendicular_point(x1, y1, x2, y2, 200, x1, y1)
        let p2 = perpendicular_point(x1, y1, x2, y2, 200, x2, y2)

        adjacent_plygn_cordinates[i].layer3 = [[x1, y1], [x2, y2], p2, p1]
    }
    //console.log(adjacent_plygn_cordinates[i].layer3)
    adjacent_plygn_cordinates.forEach((item, i) => {
        draw_AdjRect(item.layer2, "#000000", "#FFFFFF")
    })
    // review graph
    drawReviewGraph(adjacent_plygn_cordinates)

    //Ploting description
    if (onclick_val_index || onclick_val_index === 0) {
        console.log(onclick_val_index)
        let thisPoly = adjacent_plygn_cordinates[onclick_val_index].layer3
        let thisTheta = adjacent_plygn_cordinates[onclick_val_index].theta
        draw_AdjRect(thisPoly, "#FFFFFF", "#FFFFFF")
        plotDescription(thisPoly, thisTheta, data)
        readMoreBtn(thisPoly, thisTheta)

    }
    ctx.font = "25px Arial";

    txtCordinate.forEach((itm) => {
        draw_txt(itm.data, itm.x, itm.y, itm.theta, "#FFFFFF")


    })
    rotateShape(rotate_lable, rotate_Slider)
    drawBackBtn(2, "#000000", "#FFFFFF")
}









/*********************************************************************/

var BackBtnInit = {
    x: 50,
    y: 50,
    a: 60,
    offset: 40
}

function drawBackBtn(line_width, fillColor, lineColor, textColor = "#FFFFFF") {
    ctx.lineWidth = line_width
    ctx.fillStyle = fillColor
    ctx.strokeStyle = lineColor
    ctx.font = "20px Arial";
    var this_txt = "Back"
    var bacKbtn = [
        [BackBtnInit.x, BackBtnInit.y],
        [BackBtnInit.x, BackBtnInit.y + BackBtnInit.a],
        [BackBtnInit.x + (ctx.measureText(this_txt).width) + BackBtnInit.offset, BackBtnInit.y + BackBtnInit.a],
        [BackBtnInit.x + (ctx.measureText(this_txt).width) + BackBtnInit.offset, BackBtnInit.y]
    ]
    bacKbtncdnt = bacKbtn
    ctx.beginPath()
    ctx.moveTo(bacKbtn[0][0], bacKbtn[0][1])
    for (var i = 1; i < bacKbtn.length; i++) {
        ctx.lineTo(bacKbtn[i][0], bacKbtn[i][1])
    }

    ctx.closePath();
    ctx.fill()
    ctx.stroke();
    ctx.fillStyle = textColor
    draw_txt(this_txt, (bacKbtn[0][0] + bacKbtn[3][0]) / 2, (bacKbtn[0][1] + bacKbtn[1][1]) / 2, 0, "#FFFFFF")
    let j = 0;

    // while (j < track_filter.length) {
    //     this_txt = track_filter[j].data
    //     var temp_x = bacKbtn[1][0]
    //     var temp_y = bacKbtn[1][1]
    //     bacKbtn = [
    //         [temp_x, temp_y],
    //         [temp_x , temp_y + BackBtnInit.a],
    //         [temp_x + (ctx.measureText(this_txt).width) + BackBtnInit.offset, BackBtnInit.a + temp_y],
    //         [temp_x + (ctx.measureText(this_txt).width) + BackBtnInit.offset,  temp_y]
    //     ];
    //     ctx.fillStyle = fillColor
    //     ctx.beginPath()

    //     ctx.moveTo(bacKbtn[0][0], bacKbtn[0][1])
    //     for (var i = 1; i < bacKbtn.length; i++) {
    //         ctx.lineTo(bacKbtn[i][0], bacKbtn[i][1])
    //     }
    //     ctx.closePath();
    //     ctx.fill()
    //     ctx.stroke();
    //     ctx.fillStyle = textColor
    //     ctx.fillText(this_txt, (bacKbtn[0][0] + bacKbtn[3][0]) / 2, (bacKbtn[0][1] + bacKbtn[1][1]) / 2);
    //     j++
    // }
    let maxTxtLenghtOfFilters = 0
    let k = 0
    while (k < track_filter.length) {
        this_txt = track_filter[k].data
        if ((ctx.measureText(this_txt).width) > maxTxtLenghtOfFilters) {
            maxTxtLenghtOfFilters = (ctx.measureText(this_txt).width)
        }
        k++
    }
    while (j < track_filter.length) {
        this_txt = track_filter[j].data
        var temp_x = bacKbtn[1][0]
        var temp_y = bacKbtn[1][1]
        bacKbtn = [
            [temp_x, temp_y],
            [temp_x, temp_y + BackBtnInit.a],
            [temp_x + maxTxtLenghtOfFilters + BackBtnInit.offset, BackBtnInit.a + temp_y],
            [temp_x + maxTxtLenghtOfFilters + BackBtnInit.offset, temp_y]
        ];
        ctx.fillStyle = fillColor
        ctx.beginPath()

        ctx.moveTo(bacKbtn[0][0], bacKbtn[0][1])
        for (var i = 1; i < bacKbtn.length; i++) {
            ctx.lineTo(bacKbtn[i][0], bacKbtn[i][1])
        }
        ctx.closePath();
        ctx.fill()
        ctx.stroke();
        ctx.fillStyle = textColor
        ctx.fillText(this_txt, (bacKbtn[0][0] + bacKbtn[3][0]) / 2, (bacKbtn[0][1] + bacKbtn[1][1]) / 2);
        j++
    }
    ctx.resetTransform()

}



function DrawCircle(x, y, r, theta1, theta2, line_Width, fullCircleStatus, closePathStatus = false, lineColor = "#000000", fillColor = "#000000") {
    ctx.fillStyle = fillColor
    ctx.strokeStyle = lineColor
    ctx.beginPath();
    //ctx.globalAlpha = .8
    ctx.arc(x, y, r, theta1, theta2);
    ctx.lineWidth = line_Width;
    if (closePathStatus) {
        ctx.closePath()
    }
    if (fullCircleStatus) {
        ctx.fill()
    }
    ctx.stroke()
    ctx.resetTransform()
    ctx.globalAlpha = 1
}
function DrawLine(x1, y1, x2, y2, line_Width) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = line_Width;
    ctx.stroke();
}

function txtLengthCmp(data) {
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

    buildPrevNextBtn(prev_btn_cordinate, "#FFFFFF", "#000000", 0.7, "PREV")
    buildPrevNextBtn(next_btn_cordinate, "#FFFFFF", "#000000", 0.7, "NEXT")
    ctx.resetTransform()
    ctx.font = "20px Arial";
    var txt = tech.data;
    const c_radius = ((ctx.measureText(txt).width) / 2) + 10;

    DrawCircle(c_x, c_y, c_radius, 0, 2 * Math.PI, 4, true, false, "#FFFFFF")
    draw_txt(txt, c_x, c_y, 0, "#FFFFFF")
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


    attach_circle_r = txtLengthCmp(data)


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
        DrawCircle(c_x, c_y, thisR, line_cordinates[i].theta - (Math.PI / (2 * data.length)), line_cordinates[i].theta + (Math.PI / (2 * data.length)), 10, false)
        //adjacent lines
        DrawLine(line_cordinates[i].x1, line_cordinates[i].y1, line_cordinates[i].x2, line_cordinates[i].y2, 3)
        //adjacent circle 
        DrawCircle(this_center_x, this_center_y, attach_circle_r, 0, 2 * Math.PI, 4, true, false, "#FFFFFF")
        //Adject circle arc
        DrawCircle(this_center_x, this_center_y, attach_circle_r + adjt_circle_offset, line_cordinates[i].theta - (Math.PI / 2) + Math.PI, line_cordinates[i].theta + (Math.PI / 2) + Math.PI, 15, false, true)


        ctx.font = "20px Arial";
        var this_txt = data[i].data;
        draw_txt(this_txt, this_center_x, this_center_y, 0, "#FFFFFF")
    }


    drawBackBtn(2, "#000000", "#FFFFFF")
    return adjcent_circle;
}
/**********************************************PagesWIse selection of tags***********************/
var initial_pg = 0
var total_tag_Per_pg = 3
var curr_pg = 1
var curr_pg_tags = []
function pagesWiseTags(thisapi) {
    thisData = []
    curr_pg_tags = []
    thisapi.forEach((item, i) => {
        if (i >= initial_pg && i < total_tag_Per_pg) {
            item.prev ? "" : thisData.push(item);
        }
        item.prev ? "" : curr_pg_tags.push(item);
    })
}
/**************************This is called when tag is chosen first time ***************/
function init(thisapi, temp) {
    api = thisapi
    pagesWiseTags(thisapi)
    track_filter.push({ prev: null, curr: null, data: temp.name })
    tech = { prev: null, curr: null, data: temp.name }
    ctx.clearRect(0, 0, c.width, c.height);
    DrawGraph(thisData)
}
/********************************************************************************** */


function circleInside(circle) {
    var dist = Math.sqrt(Math.pow((x - circle.x), 2) + Math.pow((y - circle.y), 2));
    if (dist <= attach_circle_r) {
        return true
    }
}

/*********************Function for changing tags pages to next pages************ */
function doPgPrevFun() {
    if ((curr_pg - 1) * total_tag_Per_pg > 0) {
        initial_pg += total_tag_Per_pg
        thisData = []
        for (let k = Math.max(((curr_pg - 2) * total_tag_Per_pg), 0); k < (curr_pg - 1) * total_tag_Per_pg; k++) {
            thisData.push(curr_pg_tags[k])
        }
        curr_pg--;
    }
    ctx.clearRect(0, 0, c.width, c.height)
    DrawGraph(thisData)
}
/*********************Function for changing tags pages to Previous pages************ */

function doPgNextFun() {
    if (curr_pg * total_tag_Per_pg < curr_pg_tags.length) {
        initial_pg += total_tag_Per_pg
        thisData = []
        for (let k = curr_pg * total_tag_Per_pg; k < Math.min(((curr_pg + 1) * total_tag_Per_pg), curr_pg_tags.length); k++) {
            thisData.push(curr_pg_tags[k])
        }
        curr_pg++;
    }
    ctx.clearRect(0, 0, c.width, c.height)
    DrawGraph(thisData)
}

/**********This Function is changing the variable value related to the tag, that is clicked ************/
function clicAdjectTag(inside_status, x, y) {
    for (var i = 0; i < adjcent_circle.length; i++) {
        var dist = Math.sqrt(Math.pow((x - adjcent_circle[i].x), 2) + Math.pow((y - adjcent_circle[i].y), 2));
        if (dist <= attach_circle_r) {

            inside_status = true
            onclick_val.status = true;
            onclick_val.id = adjcent_circle[i].data_id;
        }
    }
    return inside_status
}
/************When a tag is clicked this function is called and all tags coming under the clicked tags are push in curr_pg_tags and thisData******************/
function nextLayerOfClickedTag() {
    thisData = []
    curr_pg_tags = []
    api.forEach((item, index) => {
        if (thisData.length < total_tag_Per_pg) {
            item.prev === onclick_val.id ? thisData.push(item) : ""
        }
        item.prev === onclick_val.id ? curr_pg_tags.push(item) : ""
    })
}
/************When a tag is clicked this function is called and all tags coming under the clicked tags are push in curr_pg_tags and thisData******************/
function BackBtnClicked() {
    tech = track_filter[track_filter.length - 2]
    thisData.forEach((item) => {
        item.curr === track_filter[track_filter.length - 2].curr ? tech = item : ""
    })
    thisData = []
    curr_pg_tags = []
    api.forEach((item) => {
        if (thisData.length < total_tag_Per_pg) {
            item.prev === track_filter[track_filter.length - 2].curr ? thisData.push(item) : ""
        }
        item.prev === track_filter[track_filter.length - 2].curr ? curr_pg_tags.push(item) : ""
    })
    track_filter.pop()
    ctx.clearRect(0, 0, c.width, c.height)
    DrawGraph(thisData)
}
function grap1ClickEvent(ev) {

    var rect = c.getBoundingClientRect()
    var x = (ev.clientX - rect.left) * dpr
    var y = (ev.clientY - rect.top) * dpr

    var inside_status = false
    if (plygnInside(bacKbtncdnt, x, y) && (track_filter.length - 1) > 0) {
        BackBtnClicked()
    } else if (plygnInside(prev_btn_cordinate_full, x, y)) {
        doPgPrevFun()
    } else if (plygnInside(next_btn_cordinate_full, x, y)) {
        doPgNextFun()
    } else {

        inside_status = clicAdjectTag(inside_status, x, y)
        thisData.forEach((item, index) => {
            item.curr === onclick_val.id ? tech = item : ""
        })
        thisData = []
        //pagesWiseTags(thisapi)

        nextLayerOfClickedTag()

        if (thisData.length === 0) {
            track_filter.push(tech)
            tagsRelatedToProject=track_filter[track_filter.length-1]
            polygon(0, 200, graph2data,tagsRelatedToProject)

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
    if (plygnInside(bacKbtncdnt, x, y) && (track_filter.length - 1) > 0) {
        BackBtnClicked()

    } else {
        console.log("yes")
        adjacent_plygn_cordinates.forEach((item, index) => {
            if (inside(item, x, y)) {
                onclick_val_index = index;
            }
        })

        ctx.clearRect(0, 0, c.width, c.height);
        txtCordinate = []
        adjacent_plygn = []
        adjacent_plygn_cordinates = []
        polygon(rotateTheta, 200, graph2data,tagsRelatedToProject);
    }

}




c.addEventListener('click', function (ev) {
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

c.addEventListener('mousemove', function (ev) {
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
            polygon(rotateTheta, 200, graph2data,tagsRelatedToProject)
        }
    }
})
c.addEventListener('mousedown', function (ev) {
    var rect = c.getBoundingClientRect()
    var x = (ev.clientX - rect.left) * dpr
    var y = (ev.clientY - rect.top) * dpr
    if (inside2(scroll_cordinate, x, y)) {
        isScroll = true
    }
});

c.addEventListener('mouseup', function (ev) {
    isScroll = false
});


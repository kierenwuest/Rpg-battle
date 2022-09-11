//------------------ Greatest Archer In The Land ------------------//
// A ambitious RPG Battle simultor by Kieren Wuest Sept 2022
// Ambitious as this is likely well over my expereince level andnot based on a tutorial
// I may need to come back to this later

// const palette = {
// 	// https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500
// 	"Light Cornflower Blue":"#8ecae6",
// 	"Blue Green":"#219ebc",
// 	"Prussian Blue":"#023047",
// 	"Selective Yellow":"#ffb703",
// 	"Tangerine":"#fb8500"
// }

// 	"Light Cornflower Blue": rgba(142, 202, 230, 1);
// 	"Blue Green": rgba(33, 158, 188, 1);
// 	"Prussian Blue": rgba(2, 48, 71, 1);
// 	"Selective Yellow": rgba(255, 183, 3, 1);
// 	"Tangerine": rgba(251, 133, 0, 1);

// Find most efficent for 4 canvases
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// const W = (canvas.width = 1200);  //Not ness
// const H = (canvas.height = 600);  //Not ness

//Not ness
// document.getElementById('gameDiv').setAttribute("style","width:"+ W +"px;height:"+ H +"px"); //eergh
// document.getElementById('playerDiv').setAttribute("style","background: #ffb703; left: "+ 110 +"px");
// document.getElementById('enemyDiv').setAttribute("style","background: #ffb903; left: "+ ((W/3)*2 + 110 ) +"px");

// const height = 20; // number of rows
// const width = 38; // number of columns

// let context = document.getElementById("graphic").getContext("2d");

const gCanvas = document.getElementById("graphic");
const gCtx = gCanvas.getContext("2d");

const gW = document.getElementById("graphic").clientWidth;
const gH = document.getElementById("graphic").clientHeight;

gCanvas.width = gW;
gCanvas.height = gH;

function drawGraphic() {
  //   gCtx.fillStyle = "black";
  //   gCtx.fillRect(0, 0, gW, gH);
  //   gCtx.strokeStyle = "white";
  //   gCtx.strokeRect(2, 2, gW - 4, gH - 4);
  gCtx.fillStyle = "white";
  gCtx.textAlign = "center";
  gCtx.font = "40px Kanit";
  gCtx.fillText("Battle Game", gW / 2, gW / 2 - 40);
  window.requestAnimationFrame(drawGraphic);
}

// const sBBG = new Image();
// sBBG.src = "/RPG.png"; // 101 x 54 px
// function drawGImage() {
//   sBBG.onload = function () {
//     gCtx.drawImage(sBBG, gW / 2 - 101, gH / 2 - 54, 202, 108);
//   };
//   window.requestAnimationFrame(drawGImage);
// }
// window.requestAnimationFrame(drawGImage);


const height = 30; // number of rows
const width = 30; // number of columns

let fire = new Array(width * height).fill(0); // declare and reset the array that holds the value of all the tiles

let wind = 0, countup = true;
let windy = 0

function windblow() {
    if (countup)
  {
  
    ++wind;
    
    if (wind >= 3)
      countup = false;
  }
  else
  {
    --wind;
    
    if (wind <= -3)
      countup = true;
  }
  
 windy = wind;
 
}

setInterval(windblow, 400);




function burn() {
  for (let i = 0; i < width; i++) fire[i + width] = Math.random() * 255; // randomize the 2nd row from the bottom

  for (
    let y = height;
    y > 1;
    y-- // every row
  )
    for (let x = 0; x < width; x++) {
      // every column
      let i = y * width + x + windy; // convert the x and y coordinates to the array index
      fire[i] = Math.floor(
        // add the cell values:
        (fire[(y - 1) * width + ((x - 1 + width) % width)] + // below, left
          fire[(y - 1) * width + ((x + width) % width)] + // immediately below
          fire[(y - 1) * width + ((x + 1 + width) % width)] + // below, right
          fire[(y - 2) * width + ((x + width) % width)]) / // two rows below
          4.04
      );
    } // division to lower the value as the fire goes up

  for (let i = width * 4; i < width * (height * 2); i++) {
    // now we're drawing the fire on the screen

    gCtx.beginPath(); // convert the index value i to screen coordinates and draw a box
    gCtx.rect((i % width) * 10, (height - Math.floor(i / width)) * 10, 10, 10);
    gCtx.fillStyle = "rgb(" + fire[i] + ",0,0)"; // the red component of the RGB color is the value of the cell.
    gCtx.fill();
  };
  window.requestAnimationFrame(burn);
  //console.log(windy);
};


window.requestAnimationFrame(burn);
window.requestAnimationFrame(drawGraphic);


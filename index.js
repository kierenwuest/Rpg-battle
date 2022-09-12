//------------------ Battle Royal ------------------//
// A ambitious RPG Battle simultor by Kieren Wuest Sept 2022
// Ambitious as this is likely well over my expereince level andnot based on a tutorial
// I may need to come back to this later

// const palette = {
// 	https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500
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



//------------------ Middle Canvas ------------------//

const gCanvas = document.getElementById("graphic");
const gCtx = gCanvas.getContext("2d");

const gW = document.getElementById("graphic").clientWidth;
const gH = document.getElementById("graphic").clientHeight;

gCanvas.width = gW;
gCanvas.height = gH;

function drawGraphic() {
  gCtx.fillStyle = "white";
  gCtx.textAlign = "center";
  gCtx.font = "40px Kanit";
  gCtx.fillText("Battle Royale", gW / 2, gW / 2 - 40);
  window.requestAnimationFrame(drawGraphic);
}

//Burn Effect

const bheight = 30; // number of rows
const bwidth = 30; // number of columns

let fire = new Array(bwidth * bheight).fill(0); // declare and reset the array that holds the value of all the tiles

//Burn Wind Effect -3 to +3 and back
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

setInterval(windblow, 4000); //TODO Should change this to use requestAnimationFrame(burn) rate and use stagger frame code to regulate speed https://youtu.be/GFO_txvwK_c?t=1237

//burn structure
function burn() {
  for (let i = 0; i < bwidth; i++) fire[i + bwidth] = Math.random() * 255; // randomize the 2nd row from the bottom

  for (
    let y = bheight;
    y > 1;
    y-- // every row
  )
    for (let x = 0; x < bwidth; x++) {
      // every column
      let i = y * bwidth + x + windy; // convert the x and y coordinates to the array index
      fire[i] = Math.floor(
        // add the cell values:
        (fire[(y - 1) * bwidth + ((x - 1 + bwidth) % bwidth)] + // below, left
          fire[(y - 1) * bwidth + ((x + bwidth) % bwidth)] + // immediately below
          fire[(y - 1) * bwidth + ((x + 1 + bwidth) % bwidth)] + // below, right
          fire[(y - 2) * bwidth + ((x + bwidth) % bwidth)]) / // two rows below
          4.04
      );
    } // division to lower the value as the fire goes up

  for (let i = bwidth * 4; i < bwidth * (bheight * 2); i++) {
    // now we're drawing the fire on the screen

    gCtx.beginPath(); // convert the index value i to screen coordinates and draw a box
    gCtx.rect((i % bwidth) * 10, (bheight - Math.floor(i / bwidth)) * 10, 10, 10);
    gCtx.fillStyle = "rgb(" + fire[i] + ",0,0)"; // the red component of the RGB color is the value of the cell.
    gCtx.fill();
  };
  window.requestAnimationFrame(burn);
  //console.log(windy);
};

window.requestAnimationFrame(burn);
window.requestAnimationFrame(drawGraphic);


//------------------ Field Canvas ------------------//
//TODO Ground that can shift -30 +30 Deg
//TODO Dynamic distance draw
//TODO Player placeholder
//TODO Enemy placeholder
//TODO Animate Player and Enemy
//TODO Player Movement (position turn based)
//TODO Implement Matter.js to animate arrows - resolve a fixed target hit location and misses - start here https://youtu.be/PsL3iI61wl8
//TODO Effects
//TODO Time of Day 
//TODO Environment
//TODO gamestates

//------------------ Hit Location Canvases ------------------//

//TODO Char Model
//TODO Body Locations
//TODO animate idle movement
//TODO show damage on location
//TODO show damage from weapon type
//TODO Gamestates

//------------------ Player Actions ------------------//

//TODO Inputs
//TODO Validations
//TODO State Management turns

//------------------ Game Log Display ------------------//

//TODO Display area
//TODO log lines
//TODO formating features

//------------------ Game Engine ------------------//

//TODO Game States
//TODO Char Objects 
//TODO Char Inputs
//TODO Input validation rules
//TODO Game substates
//TODO Manage async states and sub states
//TODO Game rules - item and parameter values
//TODO Turn rules
//TODO Turn System
//TODO Turn Automations
//TODO Results / Outputs
//TODO Output displays
//TODO Output HTML
//TODO Output Log
//TODO Output Animations 
let canvas;
let character = new MoveableObject();
let ctx;



/**
 * 
 */
function init(){
    canvas = document.getElementById('canvas')

    // diese Variable greift auf das Canvas zu lässt drauf malen
    ctx = canvas.getContext('2d')
    
}
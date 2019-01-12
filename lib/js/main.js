const GAME_SIZE = 600; // pixels
const BLOCK_COLUMN_COUNT = 10;
const BLOCK_SIZE = GAME_SIZE / BLOCK_COLUMN_COUNT;
const SIZE_MODIFIER = .9;
const MODIFIED_BLOCK_SIZE = BLOCK_SIZE * SIZE_MODIFIER;

// HEXAGON VALUES
let SQRT_3;
let HEXAGON_DISTANCE;

// STAR VALUES
let STAR_INNER_ANGLE;
let STAR_DISTANCE;

let game;

function setup(){
    game = new Game(BLOCK_COLUMN_COUNT);

    // HEXAGON VALUES
    SQRT_3 = sqrt(3);
    HEXAGON_DISTANCE = MODIFIED_BLOCK_SIZE * SIZE_MODIFIER / SQRT_3;

    // STAR VALUES
    STAR_INNER_ANGLE = radians(18);
    STAR_DISTANCE = MODIFIED_BLOCK_SIZE / (2 * sq(cos(STAR_INNER_ANGLE)));

    createCanvas(GAME_SIZE,GAME_SIZE);
    stroke(255);
    strokeWeight(3);
}

/**
 * Draws the given board to the canvas.
 */
function drawBoard(board){
    translate(BLOCK_SIZE/2,BLOCK_SIZE/2);
    for(let col_i = 0; col_i < board.length; col_i++){
        const column = board[col_i].column;
        for(let row_i = 0; row_i < column.length; row_i++){
            let gem = column[row_i].gem;
            let color;
            let func;
            switch(gem){
                case Gem.CIRCLE:
                    color = "green";
                    func = drawCircle;
                    break;
                case Gem.SQUARE:
                    color = "blue";
                    func = drawSquare;
                    break;
                case Gem.TRIANGLE:
                    color = "red";
                    func = drawTriangle;
                    break;
                case Gem.HEXAGON:
                    color = "purple";
                    func = createShapeFunction(6, HEXAGON_DISTANCE);
                    break;
                case Gem.STAR:
                    color = "yellow";
                    func = createShapeFunction(5, STAR_DISTANCE, {star_flag: true});
                    break;
                default:
                    throw new Error;
            }

            // REMOVE
            if(column[row_i].groupColor){
                fill(column[row_i].groupColor)
            }else{
                fill(color);
            }
            func(col_i, row_i);
            textAlign(CENTER);
            fill("black");
            text(`${col_i},${row_i}`, col_i * BLOCK_SIZE, row_i * BLOCK_SIZE);
        }
    }
}

/**
 * Draws a square at the given position.
 */
function drawSquare(col_i, row_i){
    rectMode(CENTER);
    rect(col_i * BLOCK_SIZE, row_i * BLOCK_SIZE, MODIFIED_BLOCK_SIZE, MODIFIED_BLOCK_SIZE);
}

/**
 * Draws a circle at the given position.
 */
function drawCircle(col_i, row_i){
    ellipseMode(CENTER);
    ellipse(col_i * BLOCK_SIZE, row_i * BLOCK_SIZE, MODIFIED_BLOCK_SIZE);
}

/**
 * Draws a triangle at the given position.
 */
function drawTriangle(col_i, row_i){
    const HALF_BLOCK = BLOCK_SIZE / 2;
    const low_l_x = col_i * BLOCK_SIZE - (HALF_BLOCK * SIZE_MODIFIER);
    const low_l_y = row_i * BLOCK_SIZE + (HALF_BLOCK * SIZE_MODIFIER);
    
    const low_r_x = low_l_x + (BLOCK_SIZE * SIZE_MODIFIER);
    const low_r_y = low_l_y;
    
    const top_mid_x = (low_r_x + low_l_x) / 2;
    const top_mid_y = low_l_y - (BLOCK_SIZE * SIZE_MODIFIER);
    
    triangle(low_l_x, low_l_y, top_mid_x, top_mid_y, low_r_x, low_r_y);
}

/**
 * Returns a function that draws a shape with the given number of sides at the given position.
 */
function createShapeFunction(sides, distance, {star_flag = false} = {}){
    sides = star_flag ? sides * 2 : sides;
    const angle_change = radians(360/sides);
    return function(col_i, row_i){
        push();
        translate(col_i * BLOCK_SIZE, row_i * BLOCK_SIZE);
        beginShape();
        
        const v = createVector(0,distance);
        
        for(let i = 0; i < sides; i++){
            v.rotate(angle_change);
            if(star_flag && i%2 === 1){
                const copy = v.copy();
                copy.div(2);
                vertex(copy.x,copy.y);
            }else{
                vertex(v.x,v.y);
            }
        }
        endShape(CLOSE);
        pop();
    }
}

let pressedCords;
let releasedCords;
let lock_board = false;

function getCoords(){
    if(mouseX>width || mouseY>height || mouseX<0 || mouseY<0) return null;
    const x = Math.floor(mouseX/BLOCK_SIZE);
    const y = Math.floor(mouseY/BLOCK_SIZE);
    return [x, y];
}

function mousePressed(){
    pressedCords = getCoords();
}

function mouseReleased(){
    releasedCords = getCoords();
    if(pressedCords && releasedCords && !lock_board){
        if(pressedCords[0]!==releasedCords[0] || pressedCords[1]!==releasedCords[1]){
            lock_board = true;
            handleUserInput(pressedCords[0],pressedCords[1],releasedCords[0],releasedCords[1]);
        }
    }
}

function handleUserInput(x1,y1,x2,y2){
    game.playerMove(x1,y1,x2,y2);
    lock_board = false;
}

function draw(){
    background(69);
    drawBoard(game.board.board);
    // noLoop();
}
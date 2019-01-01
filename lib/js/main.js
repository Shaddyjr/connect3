const GAME_SIZE = 600; // pixels
const BLOCK_COLUMN_COUNT = 10;
const BLOCK_SIZE = GAME_SIZE / BLOCK_COLUMN_COUNT;
const SIZE_MODIFIER = .9;
const MODIFIED_BLOCK_SIZE = BLOCK_SIZE * SIZE_MODIFIER;

// HEXAGON VALUES
let SQRT_3;
let HEXAGON_SIDE;
let HALF_HEXAGON_SIDE;
let HEXAGON_HEIGHT_ADDITION;

// STAR VALUES
let STAR_INNER_ANGLE_SMALL;
let STAR_INNER_ANGLE_LARGE;
let STAR_INNER_LENGTH;
let HALF_STAR_INNER_LENGTH;
let STAR_OUTER_X_1;
let STAR_OUTER_X_2;
let STAR_OUTER_Y_1;
let STAR_OUTER_Y_2;


let game;

function setup(){
    game = new Game(BLOCK_COLUMN_COUNT);

    // HEXAGON VALUES
    SQRT_3 = sqrt(3);
    HEXAGON_SIDE = MODIFIED_BLOCK_SIZE * SIZE_MODIFIER / SQRT_3;
    HALF_HEXAGON_SIDE = HEXAGON_SIDE/2;
    HEXAGON_HEIGHT_ADDITION = sin(PI/3) * HEXAGON_SIDE;

    // STAR VALUES
    STAR_INNER_ANGLE_SMALL = radians(18);
    STAR_INNER_ANGLE_LARGE = STAR_INNER_ANGLE_SMALL * 2;
    STAR_INNER_LENGTH = MODIFIED_BLOCK_SIZE / (2 * sq(cos(STAR_INNER_ANGLE_SMALL)));
    HALF_STAR_INNER_LENGTH = STAR_INNER_LENGTH/2;

    STAR_OUTER_X_1 = STAR_INNER_LENGTH * cos(STAR_INNER_ANGLE_SMALL);
    STAR_OUTER_Y_1 = STAR_INNER_LENGTH * sin(STAR_INNER_ANGLE_SMALL);
    STAR_INNER_X_1 = HALF_STAR_INNER_LENGTH * cos(STAR_INNER_ANGLE_SMALL);
    STAR_INNER_Y_1 = HALF_STAR_INNER_LENGTH * sin(STAR_INNER_ANGLE_SMALL);

    STAR_OUTER_X_2 = STAR_INNER_LENGTH * sin(STAR_INNER_ANGLE_LARGE);
    STAR_OUTER_Y_2 = STAR_INNER_LENGTH * cos(STAR_INNER_ANGLE_LARGE);
    STAR_INNER_X_2 = HALF_STAR_INNER_LENGTH * sin(STAR_INNER_ANGLE_LARGE);
    STAR_INNER_Y_2 = HALF_STAR_INNER_LENGTH * cos(STAR_INNER_ANGLE_LARGE);

    createCanvas(GAME_SIZE,GAME_SIZE);
    stroke(255);
    strokeWeight(2);
}

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
                    func = drawHexagon;
                    break;
                case Gem.STAR:
                    color = "yellow";
                    func = drawStar;
                    break;
                default:
                    throw new Error;
            }
            fill(color);
            func(col_i, row_i);
        }
    }
}

function drawSquare(col_i, row_i){
    rectMode(CENTER);
    rect(col_i * BLOCK_SIZE, row_i * BLOCK_SIZE, MODIFIED_BLOCK_SIZE, MODIFIED_BLOCK_SIZE);
}

function drawCircle(col_i, row_i){
    ellipseMode(CENTER);
    ellipse(col_i * BLOCK_SIZE, row_i * BLOCK_SIZE, MODIFIED_BLOCK_SIZE);
}

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

function drawHexagon(col_i, row_i){
    push();
    translate(col_i * BLOCK_SIZE, row_i * BLOCK_SIZE);
    beginShape();
    vertex(0, HEXAGON_SIDE);
    vertex(HEXAGON_HEIGHT_ADDITION, HALF_HEXAGON_SIDE);
    vertex(HEXAGON_HEIGHT_ADDITION, -HALF_HEXAGON_SIDE);
    vertex(0, -HEXAGON_SIDE);
    vertex(-HEXAGON_HEIGHT_ADDITION, -HALF_HEXAGON_SIDE);
    vertex(-HEXAGON_HEIGHT_ADDITION, HALF_HEXAGON_SIDE);
    endShape(CLOSE);
    pop();
}

function drawStar(col_i, row_i){
    push();
    translate(col_i * BLOCK_SIZE, row_i * BLOCK_SIZE);
    beginShape();
    vertex(0, -STAR_INNER_LENGTH);
    vertex(STAR_INNER_X_2, -STAR_INNER_Y_2);
    vertex(STAR_OUTER_X_1, -STAR_OUTER_Y_1);
    vertex(STAR_INNER_X_1, STAR_INNER_Y_1);
    vertex(STAR_OUTER_X_2, STAR_OUTER_Y_2);
    vertex(0,HALF_STAR_INNER_LENGTH);
    vertex(-STAR_OUTER_X_2, STAR_OUTER_Y_2);
    vertex(-STAR_INNER_X_1, STAR_INNER_Y_1);
    vertex(-STAR_OUTER_X_1, -STAR_OUTER_Y_1);
    vertex(-STAR_INNER_X_2, -STAR_INNER_Y_2);
    endShape(CLOSE);
    pop();
}

function draw(){
    background(69);
    drawBoard(game.board);
    // noLoop();
}
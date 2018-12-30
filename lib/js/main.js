const GAME_SIZE = 600; // pixels
const BLOCK_COLUMN_COUNT = 10;
const BLOCK_SIZE = GAME_SIZE / BLOCK_COLUMN_COUNT;

let game;

function setup(){
    game = new Game(BLOCK_COLUMN_COUNT);
    createCanvas(GAME_SIZE,GAME_SIZE);
}

function drawBoard(board){
    for(let row = 0; row < board.length; row++){
        const column = board[row].column;
        for(let spot = 0; spot < column.length; spot++){
            let gem = column[spot].gem;
            let block;
            switch(gem){
                case Gem.CIRCLE:
                    block = "green";
                    break;
                case Gem.SQUARE:
                    block = "blue";
                    break;
                case Gem.TRIANGLE:
                    block = "red";
                    break;
                case Gem.HEXAGON:
                    block = "purple";
                    break;
                case Gem.STAR:
                    block = "yellow";
                    break;
                default:
                    throw new Error;
            }
            fill(block);
            rect(row * BLOCK_SIZE, spot * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

function draw(){
    background(40);
    drawBoard(game.board);
    noLoop();
}
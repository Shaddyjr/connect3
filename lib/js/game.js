/**
 * Responsible for handling the game logic for a generic connect-3 style game.
 */
class Game{
    constructor(n){
        this.initializeBoard(n);
        this.startGame();
    }

    /**
     * Begins the game and appropriately cycles through game phases until the game is over.
     */
    startGame(){
        
    }

    /**
     * Sets up the initial board state.
     */
    initializeBoard(n){
        this.newBoard(n || 10);
        // this.removeConnections();
        // do{
        //     this.newBoard(n || 10);
        //     this.removeConnections();
        // }while(this.validMoveCount()<3);
    }

    /**
     * Controls logic for player's move.
     * Return false if player move is invalid, true otherwise.
     */
    playerMove(x1,y1,x2,y2){
        if(this.validMove(x1,y1,x2,y2)){
            this.swapGems(x1,y1,x2,y2);
            return true;
        }
        return false;
    }

    /**
     * Generates a board sized "n" by "n".
     */
    newBoard(n){
        this.board = [];
        for(let i = 0; i < n;i++){
            this.board.push(new Column(n,i));
        }
    }

    /**
     * Returns "connect 3+" connection data from the board.
     */
    connectionData(){
        const data = {
            count : 0,
            col_groups : {},
            row_groups : {}
        }
        // column counts
        for(let col_i = 0; col_i < this.board.length; col_i++){
            const col_data = this.board[col_i].getConnections();
            if(col_data.length>0){
                data.col_groups[col_i] = col_data;
                data.count += col_data.length;
            }
        }

        // row counts
        for(let row_i = 0; row_i < this.board.length; row_i++){
            const row_data = this.getRowConnection(row_i);
            if(row_data.length>0){
                data.row_groups[row_i] = row_data;
                data.count += row_data.length;
            }
        }

        return data;
        }

    /**
     * Returns the "connect-3+" connections within the given row index.
     */
    getRowConnection(row_i){
        let connected_gems = [];
        const col_length = this.board[row_i].column.length;
        for(let col_i = 0; col_i < col_length-2; col_i++){
            const stored_indeces = [col_i];
            const gem = this.board[col_i].column[row_i].gem;
            while(col_i+1 < col_length && this.board[col_i+1].column[row_i].gem===gem){
                stored_indeces.push(++col_i);
            }
            if(stored_indeces.length>=3){
                connected_gems.push(stored_indeces);
            }
        }
        return connected_gems;
    }

    /**
     * Removes all "connect 3+" connections from the board.
     */
    removeConnections(){
        let connectionData;
        let spots;
        do{
            connectionData = this.connectionData();
            spots = this.convertConnectionDataIntoSpots(connectionData);
            for(const spot of spots){
                const col_i = spot[0];
                const row_i = spot[1];
                const gem_block = this.board[col_i].column[row_i];
                const gem = gem_block.gem;
                gem_block.gem = Gem.randomBaseGem(gem);
            }
        }while(connectionData.count>0);
    }

    /**
     * Converts the given connection data into array of [column, row] spots.
     */
    convertConnectionDataIntoSpots(data){
        const spots = [];
        // columns
        const cols = Object.keys(data.col_groups);
        for(const col_i of cols){
            const rows = data.col_groups[col_i];
            for(const row_indeces of rows){
                spots.push([Number(col_i),row_indeces[0]]);
            }
        }
        // rows
        const rows = Object.keys(data.row_groups);
        for(const row_i of rows){
            const cols = data.row_groups[row_i];
            for(const col_indeces of cols){
                spots.push([col_indeces[0],Number(row_i)]);
            }
        }

        return spots;
    }

    /**
     * Returns number of valid moves left on the board.
     */
    validMoveCount(){
        let count = 0;
        const min = 0;
        const max = this.board.length-1;
        const col_count = this.board.length;

        for(let col_i = 0; col_i<col_count; col_i++){
            const col = this.board[col_i].column;
            const row_count = col.length;
            for(let row_i = 0; row_i<row_count; row_i++){
                // LEFT
                if(col_i-1 >= min && this.validMove(col_i,row_i,col_i-1, row_i)){
                    count++;
                }
                // RIGHT
                if(col_i+1 <= max && this.validMove(col_i,row_i,col_i+1, row_i)){
                    count++;
                }
                // UP
                if(row_i-1 >= min && this.validMove(col_i,row_i,col_i, row_i-1)){
                    count++;
                }
                // DOWN
                if(row_i+1 <= max && this.validMove(col_i,row_i,col_i, row_i+1)){
                    count++;
                }
            }
        }
        return Math.floor(count/2);
    }

    /**
     * Swaps 2 gems given their x,y (col, row) coordinates on the board.
     */
    swapGems(x1, y1, x2, y2){
        const gem1 = this.board[x1].column[y1];
        const gem2 = this.board[x2].column[y2];
        
        this.board[x1].column[y1] = gem2;
        this.board[x2].column[y2] = gem1;
    }

    /**
     * Returns true if the given move is valid.
     */
    validMove(x1, y1, x2, y2){
        const gem1 = this.board[x1].column[y1].gem;
        const gem2 = this.board[x2].column[y2].gem;

        if(gem1===gem2) return false;

        this.swapGems(x1, y1, x2, y2);
        const result = this._gemConnectedCheck(x1, y1) || this._gemConnectedCheck(x2, y2);
        this.swapGems(x1, y1, x2, y2);
        
        return result;
    }

    /**
     * Returns boolean if given gem would have a match 3+ at given location.
     */
    _gemConnectedCheck(x, y){
        const min = 0;
        const max = this.board.length-1;
        const gem = this.board[x].column[y].gem;
        // LEFT
        if(x-1 >= min && this.board[x-1].column[y].gem==gem){
            // continue left
            if(x-2 >= min && this.board[x-2].column[y].gem==gem){
                return true;
            }
            // check right 
            if(x+1 <= max && this.board[x+1].column[y].gem==gem){
                return true;
            }
        };
        // RIGHT
        if(x+1 <= max && this.board[x+1].column[y].gem==gem){
            // continue right
            if(x+2 <= max && this.board[x+2].column[y].gem==gem){
                return true;
            }
        };
        // UP
        if(y-1 >= min && this.board[x].column[y-1].gem==gem){
            // continue up
            if(y-2 >= min && this.board[x].column[y-2].gem==gem){
                return true;
            }
            // check down 
            if(y+1 <= max && this.board[x].column[y+1].gem==gem){
                return true;
            }
        };
        // DOWN
        if(y+1 <= max && this.board[x].column[y+1].gem==gem){
            // continue down
            if(y+2 <= max && this.board[x].column[y+2].gem==gem){
                return true;
            }
        };
        return false;
    }

    /**
     * Returns array of all gem groups.
     */
    getGemGroups(){
        const col_count = this.board.length;

        // Labels gems by column
        for(let col_i = 0; col_i < col_count; col_i++){
            const col = this.board[col_i];
            col.labelGemGroups();
        }

        // Parses gems by row

        // flag gem as being in group

    }

}

// GAME PHASES
// The game goes through regular phases until the end of the game (no more valid moves left)

// Resting phase - valid moves on board, but nothing else happening. The player can attempt a move - if it's valid, the game shifts to the "Moving phase"
Game.prototype.resting = Symbol("Resting");

// Moving phase - the player has made a valid move. The 2 blocks involved are swapped, changing the board state, and shifting the game into a "Volatile" phase.
Game.prototype.moving = Symbol("Moving");

// Volatile phase - Gems are labeled into groups and tagged for removal according to their group type - they are not removed from the board, yet. The game then transitions into the "Resolution" phase.
Game.prototype.volatile = Symbol("Volatile");

// Resolution phase - Gems tagged for removal are removed and additional gems are generated to fill in where appropriate. If there are connected gem groups after this step, the game transitions back to the "Volatile" phase. If there are not valid moves, the game ends, otherwise the game transitions to the "Resting" phase
Game.prototype.resolution = Symbol("Resolution");
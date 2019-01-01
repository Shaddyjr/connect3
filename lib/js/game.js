/**
 * Responsible for handling the game logic for a generic connect-3 style game.
 */
class Game{
    constructor(n){
        this.newBoard(n || 10);
    }

    /**
     * Generates a board sized "n" by "n".
     */
    newBoard(n){
        this.board = [];
        for(let i = 0; i < n;i++){
            this.board.push(new Column(n));
        }
    }

    /**
     * Returns "connect 3+" connection data from the board.
     */
    connectionData(){
        const data = {
            count : 0,
            col_starter_indeces : {},
            row_starter_indeces : {}
        }
        // column counts
        for(let col_i = 0; col_i < this.board.length; col_i++){
            const col_data = this.board[col_i].getConnections();
            if(col_data.length>0){
                data.col_starter_indeces[col_i] = col_data;
                data.count += col_data.length;
            }
        }

        // row counts
        for(let row_i = 0; row_i < this.board.length; row_i++){
            const row_data = this.getRowConnection(row_i);
            if(row_data.length>0){
                data.row_starter_indeces[row_i] = row_data;
                data.count += row_data.length;
            }
        }

        return data;
    }

    /**
     * Returns the "connect-3+" connections within the given row index.
     */
    getRowConnection(row_i){
        let starter_indeces = [];
        const col_length = this.board[row_i].column.length;
        for(let col_i = 0; col_i < col_length-2; col_i++){
            const stored_i = col_i;
            const gem = this.board[col_i].column[row_i].gem;
            let length = 1;
            while(col_i+1 < col_length && this.board[col_i+1].column[row_i].gem===gem){
                length++;
                col_i++;
            }
            if(length>=3){
                starter_indeces.push(stored_i);
            }
        }
        return starter_indeces;
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
                const col_i = spot.col;
                const row_i = spot.row;
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
        const cols = Object.keys(data.col_starter_indeces);
        for(const col_i of cols){
            const col = this.board[col_i].column;
            const rows = data.col_starter_indeces[col_i];
            for(const row_i of rows){
                spots.push({
                    col : Number(col_i),
                    row : row_i
                });
            }
        }
        // rows
        const rows = Object.keys(data.row_starter_indeces);
        for(const row_i of rows){
            const cols = data.row_starter_indeces[row_i];
            for(const col_i of cols){
                spots.push({
                    col : col_i,
                    row : Number(row_i)
                });
            }
        }

        return spots;
    }

    /**
     * Returns number of valid moves left on the board.
     */
    validMoveCount(){

    }

    /**
     * Attempts to move gems given their x,y coordinates on the board.
     */
    moveGems(x1, y1, x2, y2){

    }

    /**
     * Returns true if the given move is valid.
     */
    valideMove(x1, y1, x2, y2){

    }
}
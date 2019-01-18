/**
 * Responsible for handling interaction with columns and gem groups.
 * @class
 */
class Board{
    constructor(n){
        this._n = n || 10;
        this.resetBoard();
        this.gemGroupQueue = [];
    }

    /**
     * Resets the board with new gems.
     */
    resetBoard(){
        this.board = [];
        for(let i = 0; i < this._n; i++){
            const column = new Column(this._n,i);
            column.mapGems(gem=>this.assignGemNeighbors(gem));
            this.board.push(column);
        }

        // invalidateGroups()
    }

    getGemByCoordinate(col,row){
        const min = 0;
        const max = this._n;
        if(col < min || col >= max || row < min || row >= max) return null;
        return this.board[col].column[row];
    }

    /**
     * Swaps the positions of the given gem coordinates.
     */
    swapGemsByCoordinate(x1,y1,x2,y2){
        const gem1 = this.getGemByCoordinate(x1,y1);
        const gem2 = this.getGemByCoordinate(x2,y2);
        this._swapGems(x1,y1,x2,y2, gem1,gem2);
    }

    /**
     * Swaps the positions of the given gems.
     */
    swapGemsByGem(gem1,gem2){
        const x1 = gem1.col;
        const y1 = gem1.row;
        const x2 = gem2.col;
        const y2 = gem2.row;
        this._swapGems(x1,y1,x2,y2, gem1,gem2);
    }

    /**
     * Utility method to swap positions of gems.
     */
    _swapGems(x1,y1,x2,y2, gem1,gem2){
        this.board[x1].swapGemAtIndex(gem2, y1);
        this.board[x2].swapGemAtIndex(gem1, y2);
        this.assignGemNeighbors(gem1);
        this.assignGemNeighbors(gem2);
    }


    /**
     * Properly assigns the gem coordinates for gems surrounding the given gem.
     */
    assignGemNeighbors(gem){
        const col = gem.col;
        const row = gem.row;
        const min = 0;
        const max = this._n;

        // LEFT
        gem.neighbors.left = col-1 >= min ? [col-1,row] : null;
        // RIGHT
        gem.neighbors.right = col+1 < max ? [col+1,row] : null;
        // ABOVE
        gem.neighbors.above = row-1 >= min ? [col,row-1] : null;
        // BELOW
        gem.neighbors.below = row+1 < max ? [col,row+1] : null;
    }

    /**
     * Returns true if the given gem coordinate swap will result in a match of 3+.
     */
    isValidMove(x1,y1,x2,y2){
        const gem1 = this.getGemByCoordinate(x1,y1);
        const gem2 = this.getGemByCoordinate(x2,y2);

        if(gem1.gem===gem2.gem) return false;

        this._swapGems(x1,y1,x2,y2,gem1,gem2);
        const result = this._quickMatch(gem1) || this._quickMatch(gem2);
        this._swapGems(x1,y1,x2,y2,gem2,gem1);
        
        return result;
    }

    /**
     * Returns true if the given gem makes a match 3+.
     */
    _quickMatch(gemObj){
        return this._quickMatchRow(gemObj) || this._quickMatchCol(gemObj);
    }

    /**
     * Returns true if the given gem makes a match 3+ by row.
     */
    _quickMatchRow(gemObj){
        const x = gemObj.col;
        const y = gemObj.row;
        const gems = [
            this.getGemByCoordinate(x-2,y),
            this.getGemByCoordinate(x-1,y),
            gemObj,
            this.getGemByCoordinate(x+1,y),
            this.getGemByCoordinate(x+2,y)
        ]

        for(let i = 0; i < 3; i++){
            if(this._quickMatch3(gems[i],gems[i+1],gems[i+2])) return true;
        }
        return false;
    }

    /**
     * Returns true if the given gem makes a match 3+ by column.
     */
    _quickMatchCol(gemObj){
        const x = gemObj.col;
        const y = gemObj.row;
        const gems = [
            this.getGemByCoordinate(x,y-2),
            this.getGemByCoordinate(x,y-1),
            gemObj,
            this.getGemByCoordinate(x,y+1),
            this.getGemByCoordinate(x,y+2)
        ]

        for(let i = 0; i < 3; i++){
            if(this._quickMatch3(gems[i],gems[i+1],gems[i+2])) return true;
        }
        return false;
    }

    /**
     * Returns true if all three gems are the same.
     */
    _quickMatch3(gem1,gem2,gem3){
        if(!gem1 || !gem2 || !gem3) return false;
        return gem1.gem === gem2.gem && gem2.gem === gem3.gem;
    }


    /**
     * Returns an arry of the gems in the given row index.
     */
    getRowAtIndex(index){
        return this.board.map(x=>x.getGemAtIndex(index));
    }

    /**
     * Returns an object of the count and positions of gems that, if swapped, would produce a match of 3+.
     */
    getValidMoveData(){

    }

    /**
     * Adds new gem groups to the queue for resolution.
     */
    storeNewGemGroups(){

    }


    /**
     * Sets all gem's .visited property to false.
     */
    _resetBoardVisits(){
        this.board.forEach(column=>column.mapGems(gem=>gem.resetVisitation()));
    }

    /**
     * Returns an array of the unprunned match 3+ gem groups on the board.
     */
    getRawGemGroups(){
        const output = [];
        this._resetBoardVisits();
        for(let col_i = 0; col_i < this._n; col_i++){
            const column = this.board[col_i];
            for(let row_i = 0; row_i < this._n; row_i++){
                const gem = column.getGemAtIndex(row_i);
                if(gem.visited) continue;
                const rawGemGroup = this._createRawGemGroup(gem);
                if(rawGemGroup.isRawValid()) output.push(rawGemGroup);
            }
        }
        return output;
    }

    /**
     * Returns an array of the given gem's match 3+ group.
     */
    _createRawGemGroup(gem, output){
        output = output || [];
        output.push(gem);
        gem.visited = true;

        for(const neighbor in gem.neighbors){
            const coords = gem.neighbors[neighbor];
            if(coords){
                const neighbor_gem = this.getGemByCoordinate(coords[0],coords[1]);
                if(!neighbor_gem.visited && neighbor_gem.gem === gem.gem){
                    this._createRawGemGroup(neighbor_gem, output);
                }
            }
        }

        return GemBlob.createFromGemArray(output);
    }

    /**
     * Reassigns gem for each group member.
     */
    invalidateGroup(){

    }

}

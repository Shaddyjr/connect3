/**
 * A column for a generic connect-3 style game.
 */
class Column{
    constructor(n, col_i){
        this._n = n;
        this.col_i = col_i;
        this.newColumn();
    }

    newColumn(){
        this.column = [];
        for(let i = 0; i < this._n ;i++){
            this.column.push(new Gem);
        }
    }

    /**
     * Fills column with random new gems.
     */
    fillColumn(){
        while(this.column.length<this._n){
            this.column.push(new Gem);
        }
    }

    /**
     * Removes gems flagged for deletion.
     */
    removeGems(){
        for(let i = this._n-1; i >= 0 ; i--){
            if(this.column[i].remove) this.column.splice(i,1);
        }
    }

    /**
     * Returns the "connect-3+" connections within the column.
     */
    getConnections(){
        let connected_gems = [];
        const col_length = this._n;
        for(let i = 0; i < col_length-2; i++){
            const stored_indeces = [i];
            const gem = this.column[i].gem;
            while(i+1 < col_length && this.column[i+1].gem===gem){
                stored_indeces.push(++i);
            }
            if(stored_indeces.length >= 3){
                connected_gems.push(stored_indeces);
            }
        }
        return connected_gems;
    }
}
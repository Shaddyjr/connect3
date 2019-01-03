/**
 * A column for a generic connect-3 style game.
 */
class Column{
    constructor(n, col_i){
        this._n;
        this.col_i = col_i;
        this.newColumn(n);
    }

    newColumn(n){
        this.column = [];
        for(let i = 0; i < n;i++){
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
     * Removes gem from column at given index, then fills column.
     */
    removeGem(index){
        this.column.splice(index,1);
        this.fillColumn();
    }

    /**
     * Returns the "connect-3+" connections within the column.
     */
    getConnections(){
        let connected_gems = [];
        const col_length = this.column.length;
        for(let i = 0; i < this.column.length-2; i++){
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

    // /**
    //  * Marks each gem according to their grouping.
    //  */
    // labelGemGroups(){
    //     const col_length = this.column.length;
    //     for(let i = 0; i < col_length; i++){
    //         const stored_i = i;
    //         const gem = this.column[i];
    //         const stored_gems = [gem];
    //         this._labelGem(gem, i);


    //         while(i+1 < col_length && this.column[i+1].gem===gem.gem){
    //             const new_gem = this.column[i+1];
    //             this._labelGem(new_gem, ++i);
    //             stored_gems.push(new_gem);
    //         }

    //         if(stored_gems.length >= 3){
    //             stored_gems.forEach(x=>this._labelGem(x,stored_i, stored_gems.length));
    //         }
    //     }
    // }

    /**
     * Helper method to label gems.
     */
    // _labelGem(gem, row_i, total){
    //     // gem.group.col = this.col_i;
    //     // gem.group.row = row_i;
    //     // gem.group.total = total || 1;
    //     gem.group = `${this.col_i} ${row_i} ${total || 1}`;
    // }
}
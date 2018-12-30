/**
 * A column for a generic connect-3 style game.
 */
class Column{
    constructor(n){
        this._n;
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
        let starter_indeces = [];
        const col_length = this.column.length;
        for(let i = 0; i < this.column.length-2; i++){
            const stored_i = i;
            const gem = this.column[i].gem;
            let length = 1;
            while(i+1 < col_length && this.column[i+1].gem===gem){
                length++;
                i++;
            }
            if(length >= 3){
                starter_indeces.push(stored_i);
            }
        }
        return starter_indeces;
    }
}
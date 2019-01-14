class GemGroup{
    constructor(arr){
        this.rawGemGroup = arr;
        this.formMetaGroup();
        this.groupId = Symbol();
        this.center = null;
    }

    /**
     * Converts the raw group data into meta data.
     */
    formMetaGroup(){
        this.metaGroup = {
            columns:{},
            rows:{}
        }

        for(const coord of this.rawGemGroup){
            const col = coord[0];
            const row = coord[1];

            if(!this.metaGroup.columns[col]){
                this.metaGroup.columns[col] = [];
            }

            this.metaGroup.columns[col].push(row);

            if(!this.metaGroup.rows[row]){
                this.metaGroup.rows[row] = [];
            }

            this.metaGroup.rows[row].push(col);
        }
    }

    /**
     * Returns true if the group has at least 1 valid match 3;
     */
    isRawValid(){
        if(this.rawGemGroup.length < 3) return false;
        return Object.values(this.metaGroup).some(group=>Object.values(group).some(arr=>arr.length>=3));
    }

    /**
     * Prunes the meta group of extraneous gems.
     * Returns an array of pruned gemGroups from the extraneous gems.
     * Set's the group center.
     */
    prune(){
        const centers = this.getCenters();
        const remainder = [];
        
    }

    /**
     * Removes extraneous data from meta data.
     */
    _pruneMetaData(){

    }

    /**
     * Returns an array of gem coordinates designating all possible centers.
     */
    getCenters(){
        const centers = [];
        // for(const col_spot of group.col_gems){
        //     for(const row_spot of group.row_gems){
        //         if(row_spot[0]===col_spot[0] && row_spot[1]===col_spot[1]){
        //             centers.push(row_spot);
        //         }
        //     }
        // }
        return centers;
    }

    static createFromGemArray(arr){
        return new GemGroup(arr.map(gem=>[gem.col, gem.row]));
    }
}
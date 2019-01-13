class GemGroup{
    constructor(arr){
        this.rawGemGroup = arr;
        this.formMetaGroup();
        this.groupId = Symbol();
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

    static createFromGemArray(arr){
        return new GemGroup(arr.map(gem=>[gem.col, gem.row]));
    }
}
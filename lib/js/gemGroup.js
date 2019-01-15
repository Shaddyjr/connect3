class GemGroup{
    constructor(arr){
        this.rawGemGroup = arr;
        this.formMetaGroup();
        this.groupId = Symbol();
        this.centerGem = null;
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
        this._pruneMetaGroup();
        const centers = this.getCenters();
        if(centers.length === 1){
            this.centerGem = centers[0];
            return [this];
        }

        this.centerGem = this.getOptimalCenter(centers);
        const remainder = this.getRemainderGroup();

        return [this, ...remainder];
    }

    /**
     * Removes any data from the metaGroup and returns an array of newly created gemGroups from the remainder.
     */
    getRemainderGroup(){
        const remainder = [];
        
    }

    /**
     * Removes extraneous data from meta group.
     */
    _pruneMetaGroup(){
        for(const grouping_key in this.metaGroup){
            const grouping = this.metaGroup[grouping_key];
            for(const index in grouping){
                if(grouping[index].length < 3){
                    delete grouping[index];
                }
            }
        }
    }

    /**
     * Returns an array of gem coordinates designating all possible centers.
     */
    getCenters(){
        const centers = [];
        for(let col_i in this.metaGroup.columns){
            col_i = Number(col_i);
            const col_arr = this.metaGroup.columns[col_i];
            for(const row_i of col_arr){
                const row_arr = this.metaGroup.rows[row_i];
                if(row_arr && row_arr.includes(col_i)){
                    centers.push([col_i,row_i]);
                }
            }
        }
        return centers;
    }

    /**
     * Returns the optimal center gem coordinate from given array of centers.
     */
    getOptimalCenter(centers){
        let bestCount = 0;
        let bestCenter;
        for(const center of centers){
            const col_i = center[0];
            const row_i = center[1];
            const col = this.metaGroup.columns[col_i];
            const row = this.metaGroup.rows[row_i];

            let count = this.getContinuousLength(col_i, col) + this.getContinuousLength(row_i, row) - 1;
            
            if(count > bestCount){
                bestCount = count;
                bestCenter = center;
            }
        }
        return bestCenter;
    }

    /**
     * Returns length of continous count of the given number in the array.
     */
    getContinuousLength(num, arr){
        if(this.isContinuousArray(arr)){
            return arr.length;
        }

        console.log("Activating!")
        let count = 0;

        let lowNum = num;
        let highNum = num;

        while(arr.includes(lowNum) && arr.includes(highNum)){
            if(arr.includes(lowNum)){
                count++;
                lowNum--;
            }

            if(arr.includes(highNum)){
                count++;
                highNum++;
            }
        }
        return count;
    }

    /**
     * Returns true if given array has continous set of numbers.
     */
    isContinuousArray(arr){
        arr.sort((a,b)=>a-b);
        const min = arr[0];
        return arr.every((x,i)=>x-i==min);
    }

    static createFromGemArray(arr){
        return new GemGroup(arr.map(gem=>[gem.col, gem.row]));
    }
}
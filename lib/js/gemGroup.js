class GemGroup{
    // constructor(arr){
    //     this.rawGemGroup = arr;
    //     this.formMetaGroup();
    //     // this.groupId = Symbol();
    //     this.centerGem = null;
    // }

    // /**
    //  * Converts the raw group data into meta data.
    //  */
    // formMetaGroup(){
    //     this.metaGroup = {
    //         columns:{},
    //         rows:{}
    //     }

    //     for(const coord of this.rawGemGroup){
    //         const col = coord[0];
    //         const row = coord[1];

    //         if(!this.metaGroup.columns[col]){
    //             this.metaGroup.columns[col] = [];
    //         }

    //         this.metaGroup.columns[col].push(row);

    //         if(!this.metaGroup.rows[row]){
    //             this.metaGroup.rows[row] = [];
    //         }

    //         this.metaGroup.rows[row].push(col);
    //     }
    // }

    // /**
    //  * Returns true if the group has at least 1 valid match 3;
    //  */
    // isRawValid(){
    //     if(this.rawGemGroup.length < 3) return false;
    //     return Object.values(this.metaGroup).some(group=>Object.values(group).some(arr=>arr.length>=3));
    // }

    // /**
    //  * Prunes the meta group of extraneous gems.
    //  * Returns an array of pruned gemGroups from the extraneous gems.
    //  * Set's the group center.
    //  */
    // prune(){
    //     this._pruneMetaGroup();
    //     this.setOptimalCenter();
    //     const remainder = this.removeRemainderGroup();

    //     // return [this, ...remainder];
    // }

    // /**
    //  * Removes any data from the metaGroup and returns an array of newly created gemGroups from the remainder.
    //  */
    // removeRemainderGroup(){
    //     const remainder = this.metaGroup;
        
    //     const cleanMetaGroup = {
    //         columns:{},
    //         rows:{}
    //     };

    //     const col_i = this.centerGem[0];
    //     const row_i = this.centerGem[1];
        
    //     const column = remainder.columns[col_i];
    //     const row = remainder.rows[row_i];
        
    //     // COLUMNS
    //     cleanMetaGroup.columns[col_i] = [];
    //     let highNum = row_i;
    //     let lowNum = row_i;
    //     while(column.includes(highNum) || column.includes(lowNum)){
    //         if(column.includes(highNum)){
    //             const i = column.indexOf(highNum);
    //             cleanMetaGroup.columns[col_i].push(column.splice(i, 1)[0]);
    //             highNum++;
    //         }

    //         if(column.includes(lowNum)){
    //             const i = column.indexOf(lowhNum);
    //             colData.push(column.splice(i, 1)[0]);
    //             lowNum--;
    //         }
    //     }

    //     // ROWS
    //     cleanMetaGroup.rows[row_i] = [];
    //     highNum = col_i;
    //     lowNum = col_i;
    //     while(row.includes(highNum) || row.includes(lowNum)){
    //         if(row.includes(highNum)){
    //             const i = row.indexOf(highNum);
    //             cleanMetaGroup.rows[row_i].push(row.splice(i, 1)[0]);
    //             highNum++;
    //         }

    //         if(row.includes(lowNum)){
    //             const i = row.indexOf(lowNum);
    //             colData.push(row.splice(i, 1)[0]);
    //             lowNum--;
    //         }
    //     }

    //     console.log(cleanMetaGroup);
    //     console.log(remainder);
    // }

    // /**
    //  * Removes extraneous data from meta group.
    //  */
    // _pruneMetaGroup(){
    //     for(const grouping_key in this.metaGroup){
    //         const grouping = this.metaGroup[grouping_key];
    //         for(const index in grouping){
    //             if(grouping[index].length < 3){
    //                 delete grouping[index];
    //             }
    //         }
    //     }
    // }

    // /**
    //  * Returns an array of gem coordinates designating all possible centers.
    //  */
    // getCenters(){
    //     const centers = [];
    //     for(let col_i in this.metaGroup.columns){
    //         col_i = Number(col_i);
    //         const col_arr = this.metaGroup.columns[col_i];
    //         for(const row_i of col_arr){
    //             const row_arr = this.metaGroup.rows[row_i];
    //             if(row_arr && row_arr.includes(col_i)){
    //                 centers.push([col_i,row_i]);
    //             }
    //         }
    //     }
    //     return centers;
    // }

    // /**
    //  * Sets the optimal center gem coordinate from given array of centers.
    //  */
    // setOptimalCenter(){
    //     const centers = this.getCenters();
    //     if(centers.length===0){
    //         this.centerGem = centers[0];
    //         return;
    //     }

    //     let bestCount = 0;
    //     let bestCenter;
    //     for(const center of centers){
    //         const col_i = center[0];
    //         const row_i = center[1];
    //         const col = this.metaGroup.columns[col_i];
    //         const row = this.metaGroup.rows[row_i];

    //         let count = this.getContinuousLength(col_i, col) + this.getContinuousLength(row_i, row) - 1;
            
    //         if(count > bestCount){
    //             bestCount = count;
    //             bestCenter = center;
    //         }
    //     }
    //     this.centerGem = bestCenter;
    // }

    // /**
    //  * Returns length of continous count of the given number in the array.
    //  */
    // getContinuousLength(num, arr){
    //     if(this.isContinuousArray(arr)){
    //         return arr.length;
    //     }

    //     console.log("Activating!")
    //     let count = 0;

    //     let lowNum = num;
    //     let highNum = num;

    //     while(arr.includes(lowNum) && arr.includes(highNum)){
    //         if(arr.includes(lowNum)){
    //             count++;
    //             lowNum--;
    //         }

    //         if(arr.includes(highNum)){
    //             count++;
    //             highNum++;
    //         }
    //     }
    //     return count;
    // }

    // /**
    //  * Returns true if given array has continous set of numbers.
    //  */
    // isContinuousArray(arr){
    //     arr.sort((a,b)=>a-b);
    //     const min = arr[0];
    //     return arr.every((x,i)=>x-i==min);
    // }

    // static createFromGemArray(arr){
    //     return new GemGroup(arr.map(gem=>[gem.col, gem.row]));
    // }
}
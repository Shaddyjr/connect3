class GemBlob{
    constructor(arr){
        this.setMetaData(arr);
    }

    static createFromGemArray(arr){
        return new GemBlob(arr.map(gem=>[gem.col, gem.row]));
    }

    /**
     * Converts the raw group data into meta data.
     */
    setMetaData(arr){
        this.metaData = {
            columns:{},
            rows:{}
        }

        for(const coord of arr){
            const col = coord[0];
            const row = coord[1];

            if(!this.metaData.columns[col]){
                this.metaData.columns[col] = [];
            }

            this.metaData.columns[col].push(row);

            if(!this.metaData.rows[row]){
                this.metaData.rows[row] = [];
            }

            this.metaData.rows[row].push(col);
        }

        this.refineRawMetaData();
    }

    /**
     * Removes extraneous outliers and properly groups blobs by column and row.
     */
    refineRawMetaData(){
        for(const grouping_key in this.metaData){
            const grouping = this.metaData[grouping_key];
            for(const index in grouping){
                if(grouping[index].length < 3){
                    delete grouping[index];
                }else{
                    const filteredGroup = this._filterInvalidSubGroups(this._splitMatches(grouping[index]));
                    if(filteredGroup.length){
                        grouping[index] = filteredGroup;
                    }else{
                        delete grouping[index];
                    }
                }
            }
        }
    }

    /**
     * Splits an array of numbers into an array of subarrays of continuous numbers.
     */
    _splitMatches(arr){
        const output = [];
        arr.sort((a,b)=>a-b);
        let currentNum = arr[0];
        while(arr.length){
          let i = 0;
          while(i < arr.length && arr[i] === currentNum + i){
            i++;
          }
          const cut = arr.splice(0,i);
          output.push(cut);
          currentNum = arr[0];
        }
        return output;
      }
      
    /**
     * Removes subarrays from the given array that are not long enough to form a match 3.
     */
    _filterInvalidSubGroups(arr){
        return arr.filter(x=>x.length >= 3);
      }

    /**
     * Returns true if the group has at least 1 valid match 3;
     */
    isRawValid(){
        return Object.values(this.metaData).some(group=>Object.values(group).some(arr=>arr.length));
    }

    /**
     * Returns true if there are any valid groupings.
     */
    hasValidGroupings(){

    }

    /**
     * Returns an array of gemGroup objects converted from the current gemBlob.
     */
    extractMetaData(){
        const center = this.getBestCenter();
        const colCount = Object.keys(this.metaData.columns).length;
        const rowCount = Object.keys(this.metaData.rows).length;

        // Paired col and row or single col or single row
        if(center && (colCount===1 && rowCount===1)){
            return [GemGroup.createFromBlobMetaData(this.metaData)];
        }
        // Must prune off gemGroups
        else if(center){
            const bestGemGroup = this.extractMetaDataByCenter(center);
            this.splitMetaDataOnCenter(center);
            this._cleanUpExtractedMetaData();
            console.log(JSON.stringify(this.metaData))
            return [bestGemGroup,...this.extractMetaData()];
        }
        // extraneous subgroups without center need to be split
        else{
            return this.splitMetaData(this.metaData).map(x=>GemGroup.createFromBlobMetaData(x));
        }
    }

    /**
     * Returns array of metaData objects after separating multiple groupings.
     */
    splitMetaData(metaData){
        let output = [];
        if(Object.entries(metaData.columns).length){
            output = output.concat(this._createMetaData(metaData, "columns"));
        } 
        if(Object.entries(metaData.rows).length){
            output = output.concat(this._createMetaData(metaData, "rows"));
        }
        return output;
    }

    /**
     * Helper method for splitting meta data from a given col or row into separate groupings.
     */
    _createMetaData(metaData, type){
        const output = [];
        for(const i in metaData[type]){
            const group = metaData[type][i];
            for(const subgroup of group){
                const obj = {
                    columns:{},
                    rows:{}
                }
                obj[type][i] = [subgroup];
                output.push(obj);
            }
        }
        return output;
    }

    /**
     * Removes extraneous groups and subgroups after gemGroup extraction.
     */
    _cleanUpExtractedMetaData(){

    }
    /**
     * Returns the coordinates of the blob's best center gem, or null if one does not exist.
     */
    getBestCenter(){
        const lib = {};
        let bestCenter = null;
        let count = 0;
        
        // building library w/columns
        for(const col_i in this.metaData.columns){
            const row_arr = this.metaData.columns[col_i];
            if(!lib[col_i]) lib[col_i] = {};
            for(const group of row_arr){
                for(const row_i of group){
                    lib[col_i][row_i] = group.length;
                }
            }
        }
        // searching library w/rows
        for(const row_i in this.metaData.rows){
            const col_arr = this.metaData.rows[row_i];
            for(const group of col_arr){
                for(const col_i of group){
                    if(lib[col_i] && lib[col_i][row_i]){
                        const total = lib[col_i][row_i] + group.length - 1;
                        if(total > count){
                            count = total;
                            bestCenter = [Number(col_i),Number(row_i)];
                        }
                    }
                }
            }
        }
        return bestCenter;
    }

    /**
     * Returns a metaData object after extracting it from the blob's metaData based in given center coordinates.
     */
    extractMetaDataByCenter(center){
        const extractedMetaData = {
            columns:{},
            rows:{}
        }
        let colSubgroup_i = this.metaData.columns[center[0]].findIndex(subgroup=>subgroup.includes(center[1]));
        let rowSubgroup_i = this.metaData.rows[center[1]].findIndex(subgroup=>subgroup.includes(center[0]));

        extractedMetaData.columns[center[0]] = [this.metaData.columns[center[0]].splice(colSubgroup_i,1)];
        extractedMetaData.rows[center[1]] = [this.metaData.rows[center[1]].splice(rowSubgroup_i,1)];
        return extractedMetaData;
    }

    /**
     * Splits any groupings in the metaData if it contains a gem used in a center gem grouping.
     */
    splitMetaDataOnCenter(center){

    }
}
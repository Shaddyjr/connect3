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

        this.refineRawMetaData(this.metaData);
    }

    /**
     * Removes extraneous outliers and properly groups blobs by column and row.
     */
    refineRawMetaData(metaData){
        for(const grouping_key in metaData){
            const grouping = metaData[grouping_key];
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
     * Returns an array of gemGroup objects converted from the current gemBlob.
     */
    extractMetaData(){
        const colCount = Object.keys(this.metaData.columns).length;
        const rowCount = Object.keys(this.metaData.rows).length;
        
        // Paired col and row or single col or single row
        if((colCount===1 && rowCount===1) || (colCount===1 && rowCount===0) || (colCount===0 && rowCount===1)){
            return [GemGroup.createFromBlobMetaData(this.metaData)];
        }
        else // Complex situation requiring extracting multiple gemGroups
        {
            // try new Map
        }

    }
}
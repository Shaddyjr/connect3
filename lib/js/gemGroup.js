class GemGroup{
    constructor(gemCoords, centerCoord){
        this.gemCoords = gemCoords;
        this.centerCoord = centerCoord;
    }

    /**
     * Class builder method for taking meta data from a gemBlob object to create a new GemGroup object.
     */
    static createFromBlobMetaData(blobMetaData){
        let col = Object.keys(blobMetaData.columns)[0];
        let row = Object.keys(blobMetaData.rows)[0];
        let centerCoord;
        const gemCoords = [];

        if(col){
            const arr = blobMetaData.columns[col][0]; // should only have 1 array
            col = Number(col);
            for(const row_i of arr){
                gemCoords.push([col, row_i]);
            }
        }
        if(row){
            const arr = blobMetaData.rows[row][0]; // should only have 1 array
            row = Number(row);
            for(const col_i of arr){
                gemCoords.push([col_i, row]);
            }
        }

        if(col!=undefined && row!=undefined){
            centerCoord = [col, row];
        }
        
        return new GemGroup(gemCoords,centerCoord);
    }
}
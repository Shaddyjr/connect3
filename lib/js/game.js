/**
 * Responsible for handling the game logic for a generic connect-3 style game.
 */
class Game{
    constructor(){
        this.newGame();
    }
    
    /**
     * Generates a board sized "n" by "n".
     */
    newGame(){
        this.board = new Board;
        this.state = Game.ready;
    }

    // /**
    //  * Sets up the initial board state.
    //  */
    // initializeBoard(){
    //     do{
    //         this.newBoard(this._board_size || 10);
    //         this.removeConnections();
    //     }while(this.validMoveCount()<3);
    //     this.state = Game.resting;
    // }

    // /**
    //  * Returns plaintext current state of the game.
    //  */
    // getState(){
    //     return this.state.toString().match(/\((.*)\)/)[1];
    // }

    /**
     * Controls logic for player's move.
     * Returns an array of group gems.
     */
    playerMove(x1,y1,x2,y2){
        // let gem_groups = [];
        switch(this.state){
            case Game.ready:
                if(this.board.isValidMove(x1,y1,x2,y2)){
                    this.state = Game.processing;
                    this.board.swapGemsByCoordinate(x1,y1,x2,y2);
                    // do{
                    //     gem_groups = gem_groups.concat(this.makeConnectedGroups());
                    //     this.flagGroupsForDeletion(gem_groups);
                    //     this.removeFlaggedGems();
                    // }while(this.connectionData().count);
                    this.state = Game.ready;
                }
                // if(this.validMoveCount()===0){
                //     this.state = Game.end;
                // }
                break;
            case Game.processing:
                throw Error("gemGroups still let to process");
            case Game.end:
                throw Error("Game ended");
        }
        // return gem_groups;
    }



    // /**
    //  * Returns "connect 3+" connection data from the board.
    //  */
    // connectionData(){
    //     // CONNECTION DATA SIGNATURE //
    //     const data = {
    //         col_groups : {},
    //         row_groups : {},
    //         count: 0
    //     }
    //     // column counts
    //     for(let col_i = 0; col_i < this.board.length; col_i++){
    //         const col_data = this.board[col_i].getConnections();
    //         if(col_data.length>0){
    //             data.col_groups[col_i] = col_data;
    //             data.count += col_data.length;
    //         }
    //     }

    //     // row counts
    //     for(let row_i = 0; row_i < this.board.length; row_i++){
    //         const row_data = this.getRowConnection(row_i);
    //         if(row_data.length>0){
    //             data.row_groups[row_i] = row_data;
    //             data.count += row_data.length;
    //         }
    //     }

    //     return data;
    // }

    // /**
    //  * Returns the "connect-3+" connections within the given row index.
    //  */
    // getRowConnection(row_i){
    //     let connected_gems = [];
    //     const col_length = this.board[row_i].column.length;
    //     for(let col_i = 0; col_i < col_length-2; col_i++){
    //         const stored_indeces = [col_i];
    //         const gem = this.board[col_i].column[row_i].gem;
    //         while(col_i+1 < col_length && this.board[col_i+1].column[row_i].gem===gem){
    //             stored_indeces.push(++col_i);
    //         }
    //         if(stored_indeces.length>=3){
    //             connected_gems.push(stored_indeces);
    //         }
    //     }
    //     return connected_gems;
    // }

    // /**
    //  * Removes all "connect 3+" connections from the board.
    //  * This is used to ensure the game initializes without pre-existing matches.
    //  */
    // removeConnections(){
    //     let connectionData;
    //     let spots;
    //     do{
    //         connectionData = this.connectionData();
    //         spots = this._convertConnectionDataIntoSpots(connectionData);
    //         for(const spot of spots){
    //             const col_i = spot[0];
    //             const row_i = spot[1];
    //             const gem_block = this.board[col_i].column[row_i];
    //             const gem = gem_block.gem;
    //             gem_block.gem = Gem.randomBaseGem(gem);
    //         }
    //     }while(connectionData.count);
    // }

    // /**
    //  * Helper method that converts the given connection data into array of [column, row] spots.
    //  */
    // _convertConnectionDataIntoSpots(data){
    //     const spots = [];
    //     // columns
    //     const cols = Object.keys(data.col_groups);
    //     for(const col_i of cols){
    //         const rows = data.col_groups[col_i];
    //         for(const row_indeces of rows){
    //             spots.push([Number(col_i),row_indeces[0]]);
    //         }
    //     }
    //     // rows
    //     const rows = Object.keys(data.row_groups);
    //     for(const row_i of rows){
    //         const cols = data.row_groups[row_i];
    //         for(const col_indeces of cols){
    //             spots.push([col_indeces[0],Number(row_i)]);
    //         }
    //     }

    //     return spots;
    // }

    // /**
    //  * Returns number of valid moves left on the board.
    //  */
    // validMoveCount(){
    //     let count = 0;
    //     const min = 0;
    //     const max = this.board.length-1;
    //     const col_count = this.board.length;

    //     for(let col_i = 0; col_i<col_count; col_i++){
    //         const col = this.board[col_i].column;
    //         const row_count = col.length;
    //         for(let row_i = 0; row_i<row_count; row_i++){
    //             // LEFT
    //             if(col_i-1 >= min && this.validMove(col_i,row_i,col_i-1, row_i)){
    //                 count++;
    //             }
    //             // RIGHT
    //             if(col_i+1 <= max && this.validMove(col_i,row_i,col_i+1, row_i)){
    //                 count++;
    //             }
    //             // UP
    //             if(row_i-1 >= min && this.validMove(col_i,row_i,col_i, row_i-1)){
    //                 count++;
    //             }
    //             // DOWN
    //             if(row_i+1 <= max && this.validMove(col_i,row_i,col_i, row_i+1)){
    //                 count++;
    //             }
    //         }
    //     }
    //     return Math.floor(count/2);
    // }

    // /**
    //  * Swaps 2 gems given their x,y (col, row) coordinates on the board.
    //  */
    // swapGems(x1, y1, x2, y2){
    //     const gem1 = this.board[x1].column[y1];
    //     const gem2 = this.board[x2].column[y2];
        
    //     this.board[x1].column[y1] = gem2;
    //     this.board[x2].column[y2] = gem1;
    // }

    // /**
    //  * Returns true if the given move is valid.
    //  */
    // validMove(x1, y1, x2, y2){
    //     const gem1 = this.board[x1].column[y1].gem;
    //     const gem2 = this.board[x2].column[y2].gem;

    //     if(gem1===gem2) return false;

    //     this.swapGems(x1, y1, x2, y2);
    //     const result = this._gemConnectedCheck(x1, y1) || this._gemConnectedCheck(x2, y2);
    //     this.swapGems(x1, y1, x2, y2);
        
    //     return result;
    // }

    // /**
    //  * Returns boolean if given gem would have a match 3+ at given location.
    //  */
    // _gemConnectedCheck(x, y){
    //     const min = 0;
    //     const max = this.board.length-1;
    //     const gem = this.board[x].column[y].gem;
    //     // LEFT
    //     if(x-1 >= min && this.board[x-1].column[y].gem==gem){
    //         // continue left
    //         if(x-2 >= min && this.board[x-2].column[y].gem==gem){
    //             return true;
    //         }
    //         // check right 
    //         if(x+1 <= max && this.board[x+1].column[y].gem==gem){
    //             return true;
    //         }
    //     };
    //     // RIGHT
    //     if(x+1 <= max && this.board[x+1].column[y].gem==gem){
    //         // continue right
    //         if(x+2 <= max && this.board[x+2].column[y].gem==gem){
    //             return true;
    //         }
    //     };
    //     // UP
    //     if(y-1 >= min && this.board[x].column[y-1].gem==gem){
    //         // continue up
    //         if(y-2 >= min && this.board[x].column[y-2].gem==gem){
    //             return true;
    //         }
    //         // check down 
    //         if(y+1 <= max && this.board[x].column[y+1].gem==gem){
    //             return true;
    //         }
    //     };
    //     // DOWN
    //     if(y+1 <= max && this.board[x].column[y+1].gem==gem){
    //         // continue down
    //         if(y+2 <= max && this.board[x].column[y+2].gem==gem){
    //             return true;
    //         }
    //     };
    //     return false;
    // }

    // /**
    //  * Connects gem groups from board properly.
    //  */
    // makeConnectedGroups(){
    //     return this.getConnectedGroups(this.connectionData());
    // }

    // /**
    //  * Returns array of connected gem groups as objects.
    //  */
    // getConnectedGroups(connectionData){
    //     if(connectionData.length === 0) return [];
    //     const allGroups = [];
    //     const meta_col_groups = connectionData.col_groups;
    //     const meta_row_groups = connectionData.row_groups;


    //     for(let col_i in meta_col_groups){
    //         col_i = Number(col_i);
    //         const col_groups = meta_col_groups[col_i];
    //         for(const col_group of col_groups){
    //             // GROUP OBJECT SIGNATURE //
    //             const group = {
    //                 col_gems : this._createGroupSpots(col_i,col_group),
    //                 row_gems : []
    //             };
    //             // finding only row groups found connected to column group
    //             const row_groups = col_group.map(row_i=>{
    //                 const potential_row_groups = meta_row_groups[row_i];
    //                 if(potential_row_groups){
    //                     const vetted_row_group = potential_row_groups.find(x=>x.some(col=>Math.abs(col)===col_i));
    //                     if(vetted_row_group){
    //                         return {
    //                             row_i: row_i,
    //                             row_group: vetted_row_group
    //                         }
    //                     }else{
    //                         return null;
    //                     }
    //                 }else{
    //                     return null;
    //                 }
    //             }).filter(x=>x);
                
    //             // if no row groups found, then column is alone
    //             if(row_groups.length===0){
    //                 allGroups.push(group);
    //             }
    //             // if row groups found, there might be a common center spot
    //             else{
    //                 // for each row group, if the column is found, 
    //                 // then there is a link and the row group should be 
    //                 // joined with the column group and marked accordingly
    //                 for(const row_group_obj of row_groups){
    //                     const row_group = row_group_obj.row_group;
    //                     const row_i = row_group_obj.row_i;

    //                     // if row group has already been added to another column group, 
    //                     // then need to find it and add current column group to it
    //                     if(row_group.some(col=>col<0)){
    //                         for(let allGroup_i = 0; allGroup_i < allGroups.length; allGroup_i++){
    //                             let prevGroup = allGroups[allGroup_i]
    //                             if(prevGroup.col_gems.some(spot=>spot[0]===col_i&&spot[1]===row_i)||prevGroup.row_gems.some(spot=>spot[0]===col_i&&spot[1]===row_i)){
    //                                 prevGroup.col_gems = prevGroup.col_gems.concat(this._createGroupSpots(col_i,col_group, prevGroup.col_gems));
    //                             }
    //                         }
    //                     }
    //                     // Added the untouched row to the column group
    //                     else{
    //                         group.row_gems = group.row_gems.concat(this._createGroupSpots(row_group, row_i, group.row_gems));
    //                         allGroups.push(group);
    //                         // marking so other columns will know this row alread matched
    //                         const meta_row_index = meta_row_groups[row_i].indexOf(row_group);
    //                         meta_row_groups[row_i][meta_row_index] = row_group.map(x=>-x);
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     // Handling remaining row groups
    //     for(let row_i in meta_row_groups){
    //         row_i = Number(row_i);
    //         const row_groups = meta_row_groups[row_i];
    //         for(const row_group of row_groups){
    //             if(row_group.every(x=>x>0)){
    //                 const group = {
    //                     col_gems : [],
    //                     row_gems : this._createGroupSpots(row_group, row_i)
    //                 };
    //                 allGroups.push(group);
    //             }
    //         }
    //     }

    //     return this._pruneConnectedGroups(allGroups);
    // }

    // /**
    //  * Helper method that returns an array of spots for given col and row data (one will be an index, and the other an array).
    //  * If previous spots are included, duplicates are not included.
    //  */
    // _createGroupSpots(col_data, row_data, prev_spots){
    //     const output = [];
    //     // array of cols
    //     if(Array.isArray(col_data)){
    //         for(const col_i of col_data){
    //             output.push([col_i, row_data]);
    //         }
    //     }
    //     // Array of rows
    //     else{
    //         for(const row_i of row_data){
    //             output.push([col_data, row_i]);
    //         }
    //     }

    //     // Removing duplicates
    //     if(prev_spots){
    //         return output.filter(spot=>!prev_spots.some(prev_spot=>prev_spot[0]===spot[0]&&prev_spot[1]===spot[1]));
    //     }
    //     return output;
    // }

    // /**
    //  * Helper method to prune groups to only valid spots with only 1 center gem.
    //  */
    // _pruneConnectedGroups(raw_groups){
    //     const pruned_groups = [];
    //     const remainder_groups = [];
    //     while(raw_groups.length){
    //         const raw_group = raw_groups.shift();
    //         // col only or row only groups are fine as is
    //         if(raw_group.col_gems.length==0 || raw_group.row_gems.length==0){
    //             pruned_groups.push(raw_group);
    //         }else{
    //             const col_i = raw_group.col_gems[0][0];
    //             const row_i = raw_group.row_gems[0][1];
    //             // all same column and all same row
    //             if(raw_group.col_gems.every(spot=>spot[0]===col_i) && raw_group.row_gems.every(spot=>spot[1]===row_i)){
    //                 pruned_groups.push(raw_group);
    //             }
    //             // multiple centers need to be parsed
    //             else{
    //                 const centers = this._getGroupCenters(raw_group);
    //                 let idealCenterSpot;
    //                 let maxLength = 0;
    //                 for(const center of centers){
    //                     const centerLength = this._getGroupCenterLength(raw_group, center);
    //                     if(centerLength > maxLength){
    //                         maxLength = centerLength;
    //                         idealCenterSpot = center;
    //                     }
    //                 }
    //                 const remainder = this._extractRemainderGroup(raw_group,idealCenterSpot);
    //                 pruned_groups.push(raw_group);
    //                 if(remainder){
    //                     remainder_groups.push(remainder);
    //                 }
    //             }
    //         }
    //         raw_group.count = this._getGroupCenterLength(raw_group, this._getGroupCenters(raw_group)[0]);
    //     }

    //     if(remainder_groups.length){
    //         return pruned_groups.concat(this._handleRemainders(remainder_groups));
    //     }
    //     return pruned_groups;
    // }

    // _handleRemainders(remainder_groups){
    //     const connectionData = {
    //         col_groups : {},
    //         row_groups : {},
    //         count : 0
    //     };

    //     for(const group of remainder_groups){
    //         // cols
    //         for(const spot of group.col_gems){
    //             const col = spot[0];
    //             const row = spot[1];
    //             if(!connectionData.col_groups[col]){
    //                 connectionData.col_groups[col] = [];
    //             }
    //             connectionData.col_groups[col].push(row);
    //         }
    //         // rows
    //         for(const spot of group.row_gems){
    //             const col = spot[0];
    //             const row = spot[1];
    //             if(!connectionData.row_groups[row]){
    //                 connectionData.row_groups[row] = [];
    //             }
    //             connectionData.row_groups[row].push(col);
    //         }
    //     }

    //     /**
    //      * Helper function for parsing groups.
    //      */
    //     function parseGroup(arr){
    //         const output = [];
    //         arr.sort(function(a,b){return a - b});
    //         let newGroup = [];
    //         let counter = arr[0];
    //         while(arr.length){
    //           if(counter === arr[0]){
    //             newGroup.push(arr.shift());
    //             counter++;
    //           }else{
    //             output.push(newGroup);
    //             newGroup = [];
    //             counter = arr[0];
    //           }
    //         }
    //         output.push(newGroup);
          
    //         return output.filter(x=>x.length>=3);
    //       }

    //     // Separating single array into proper groups
    //     // cols
    //     const parsed_col_groups = {};
    //     for(const col_i of Object.keys(connectionData.col_groups)){
    //         const col_group = connectionData.col_groups[col_i];
    //         if(col_group.length < 3){
    //             continue;
    //         }
    //         parsed_col_groups[col_i] = parseGroup(col_group);
    //         connectionData.count++;
    //     }
    //     connectionData.col_groups = parsed_col_groups;
        
    //     // rows
    //     const parsed_row_groups = {};
    //     for(const row_i of Object.keys(connectionData.row_groups)){
    //         const row_group = connectionData.row_groups[row_i];
    //         if(row_group.length < 3){
    //             continue;
    //         }
    //         parsed_row_groups[row_i] = parseGroup(row_group);
    //         connectionData.count++;
    //     }
    //     connectionData.row_groups = parsed_row_groups;

    //     return this.getConnectedGroups(connectionData);
    // }

    // /**
    //  * Helper method to return the center spots in the given group.
    //  */
    // _getGroupCenters(group){
    //     const centers = [];
    //     for(const col_spot of group.col_gems){
    //         for(const row_spot of group.row_gems){
    //             if(row_spot[0]===col_spot[0] && row_spot[1]===col_spot[1]){
    //                 centers.push(row_spot);
    //             }
    //         }
    //     }
    //     return centers;
    // }

    // /**
    //  * Helper method to return total length of given center in group.
    //  */
    // _getGroupCenterLength(group, center){
    //     let count = 0;
    //     if(center){
    //         const col_i = center[0];
    //         const row_i = center[1];
    //         count += group.col_gems.filter(spot=>spot[0]===col_i).length;
    //         count += group.row_gems.filter(spot=>spot[1]===row_i).length;
    //         return count-1;
    //     }else{
    //         return group.col_gems.length ? group.col_gems.length : group.row_gems.length;
    //     }
    // }


    // /**
    //  * Helper method that returns true if the given spot is found in the given array of spots.
    //  */
    // _duplicateSpotCheck(spot, spots){
    //     return spots.some(x=>x[0]===spot[0]&&x[1]===spot[1]);
    // }

    // /**
    //  * Helper method to extract any spot that are not around the given center, 
    //  * returning an array of new group objects or null if none present.
    //  * The original raw_group is modified.
    //  */
    // _extractRemainderGroup(raw_group,center){
    //     const remainder_group = {
    //         col_gems : [],
    //         row_gems : []
    //     }

    //     const col_i = center[0];
    //     const row_i = center[1];
    //     const col_gems = raw_group.col_gems.filter(spot=>spot[0]===col_i);
    //     const row_gems = raw_group.row_gems.filter(spot=>spot[1]===row_i);
    //     let remainder_col_gems = raw_group.col_gems.filter(spot=>{
    //         return spot[0]!==col_i 
    //         && 
    //         !this._duplicateSpotCheck(spot, col_gems.concat(row_gems))
    //     });
        
    //     let remainder_row_gems = raw_group.row_gems.filter(spot=>{
    //         return spot[1]!==row_i
    //         && 
    //         !this._duplicateSpotCheck(spot, col_gems.concat(row_gems))
    //     });
        
    //     // Modifying original raw_group to only have the longest col & row combination
    //     raw_group.col_gems = col_gems;
    //     raw_group.row_gems = row_gems;

    //     // Remaining parts handled separately
    //     // only remainder gems that are long enough are valid
    //     if(remainder_col_gems.length<3 && remainder_row_gems.length<3){
    //         return null;
    //     }

    //     remainder_group.col_gems = remainder_col_gems.length >= 3 ? remainder_col_gems : [];
    //     remainder_group.row_gems = remainder_row_gems.length >= 3 ? remainder_row_gems : [];

    //     return remainder_group;
    // }


    // /**
    //  * Removes flagged gems from the board and repopulates what's missing.
    //  */
    // removeFlaggedGems(){
    //     for(const col of this.board){
    //         col.removeGems();
    //         col.fillColumn();
    //     }
    // }

    // /**
    //  * Flags given spots on board for deletion.
    //  */
    // flagSpotsForDeletion(spots){
    //     if(!Array.isArray(spots)){
    //         spots = [spots];
    //     }

    //     for(const spot of spots){
    //         this.board[spot[0]].column[spot[1]].remove = true;
    //     }
    // }

    // /**
    //  * Flags group for deletion.
    //  */
    // _flagGroupForDeletion(group){
    //     this.flagSpotsForDeletion(group.col_gems);
    //     this.flagSpotsForDeletion(group.row_gems);
    // }

    // /**
    //  * Flags array of groups for deletion.
    //  */
    // flagGroupsForDeletion(groups){
    //     for(const group of groups){
    //         this._flagGroupForDeletion(group);
    //     }
    // }

}

Game.ready = Symbol("ready");
Game.processing = Symbol("processing");
Game.end = Symbol("end");
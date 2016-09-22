// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(rowIndex, colIndex) ||
        this.hasMinorDiagonalConflictAt(rowIndex, colIndex)
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/
    /*var conflicted = new Board([
      [00,01, 02, 03],
      [10, 11, 12, 13],
      [20, 21, 22, 23],
      [30, 32, 32, 33]
    ]);*/
    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasConflict: function(array) {
      //conflict variable
      var conflictSum = 0;
      //itearate over array
      for (var i = 0; i < array.length; i++) {
        conflictSum += array[i];
      }
      //return
      if (conflictSum > 1) {
        return true;
      } else {
        return false;
      }
    },

    hasRowConflictAt: function(rowIndex) {
      var currentRow = this.get(rowIndex);
      //console.log(currentRow);
      return this.hasConflict(currentRow);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //get size
      var boardHeight = this.attributes.n;
      //iterate over board rows
      for (var i = 0; i < boardHeight; i++) {
        var currentRow = this.get(i);
        //if row has conflict, return true
        if ( this.hasConflict(currentRow) ) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //map column to array
      var column = [];
      //find size of matrix
      var boardHeight = this.attributes.n;
      //iterate from 0 to size
      for (var i = 0; i < boardHeight; i++) {
        //access row element at colIndex
        var currentRow = this.get(i);
        //push to new array
        column.push(currentRow[colIndex]);
      }
      //return hasConflict on new colum array
      return this.hasConflict(column);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //get size of board
      var boardHeight = this.attributes.n;
      //iterate over size of board

      for (var i = 0; i < boardHeight; i++) {
        //call hasColConflictAt on each column index; //if true, return true
        if ( this.hasColConflictAt(i) ) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    majorDiagonalize: function() {
      var rowsNum = this.attributes.n;
      var colsNum = this.attributes.n;
      
      var diagonals = [];
      for (var i = 1 - rowsNum; i < colsNum; i++) {
        var oneDiag = [];
        for (var j = 0; j < rowsNum; j++) {
          if ((i + j) >= 0 && (i + j) < colsNum) {
            var item = this.get(j)[i + j];
            oneDiag.push(item);
          }
        }
        diagonals.push(oneDiag);
      }
      this.majorDiags = diagonals;
    },

    minorDiagonalize: function() {
      var size = this.attributes.n;
      //var colsNum = this.attributes.n;
      
      var diagonals = [];
      // for (var i = 1 - size; i < size; i++) {
      //   var oneDiag = [];
      //   for (var j = size - 1; j > -1; j--) {
      //     if ((i + j) >= 0 && (i + j) < size) {
      //       var item = this.get(j)[i + j];
      //       oneDiag.push(item);
      //     }
      //   }
      //   diagonals.push(oneDiag);
      // }
      var n = size;
      for (var slice = 0; slice < 2 * n - 1; ++slice) {
      // printf("Slice %d: ", slice);
        var oneDiag = [];
        var z = slice < n ? 0 : slice - n + 1;
        for (var j = z; j <= slice - z; ++j) {
          //push
          // printf("%d ", x[j][slice - j]);

          var item = this.get(j)[slice - j];
          oneDiag.push(item);
        }
        diagonals.push(oneDiag);
      }
      this.minorDiags = diagonals;
    },

    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(x, y) {
      this.majorDiagonalize();
      var dif = x - y;
      var index;
      if (dif <= 0) {
        index = Math.abs(dif);
      } else {
        index = -Math.abs(dif);
      }
      index += this.attributes.n - 1;
      return this.hasConflict(this.majorDiags[index]);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      this.majorDiagonalize();
      for (var i = 0; i < this.majorDiags.length; i++) {
        if (this.hasConflict(this.majorDiags[i])) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(x, y) {
      this.minorDiagonalize();
      //console.dir(this.minorDiags);
      var index = x + y;

      return this.hasConflict(this.minorDiags[index]);  

      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      this.minorDiagonalize();
      for (var i = 0; i < this.minorDiags.length; i++) {
        if (this.hasConflict(this.minorDiags[i])) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

var rowsNum = 3;
var colsNum = 3;
var row = new Array();
var element = 0;

for(var i = 0; i < rowsNum; i++) {
  row[i] = new Array(colsNum);
  for(var j = 0; j < colsNum; j++) {
    row[i][j] = element;
      element++;
  }
}

var diagonals = new Array();
for (var i = 1 - rowsNum; i < colsNum; i++) {
    var oneDiag = new Array();
    for (var j = 0; j < rowsNum; j++) {
        if ((i + j) >= 0 && (i + j) < colsNum) {
            oneDiag.push(row[j][i + j]);
        }
    }
    diagonals.push(oneDiag);
}
console.log(diagonals);

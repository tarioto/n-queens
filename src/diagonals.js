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
console.log(diagonals);//

//top left to bottom right

int n = 3;
    for (int slice = 0; slice < 2 * n - 1; ++slice) {
      printf("Slice %d: ", slice);
      int z = slice < n ? 0 : slice - n + 1;
      for (int j = z; j <= slice - z; ++j) {
        printf("%d ", x[j][slice - j]);
      }
      printf("\n");
    }

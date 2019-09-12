var grid;
let rSlider, gSlider, bSlider;
function setup() {
  createCanvas(400, 400);
  grid = new Grid(10);
  grid.randomize();
  grid.draw();

  rSlider = createSlider(0, 255, 100);
  rSlider.position(300, 100);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(300, 130);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(300, 160);

  print("Figuring out the for loops");
  print("I did a lot more pushing than I expected.");
  print("I would be happy kinda because I worked really hard through this and this is something I can look back on as I progress and strengthen my skills");
}

function draw() {

  grid.draw();
  grid.updateNeighborCounts();
  grid.updatePopulation();


  grid.words();

  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  background(r,g,b,130);
  text('red', 100 + rSlider.width, 15);
  text('green', 80 + gSlider.width, 45);
  text('blue', 90 + bSlider.width, 75);
}

class Grid {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.numberOfColumns = width / cellSize;
    this.numberOfRows = height / cellSize;
    var x = this.numberOfColumns;
    var y = this.numberOfRows;

    this.cells = new Array(x);
    for (var i = 0; i < this.numberOfColumns; i++) {
      this.cells[i] = new Array(this.numberOfRows);
    }


    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, this.cellSize);
      }
    }
    //print(this.cells);

    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
  }

  draw() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].draw();
      }
    }
  }
  randomize() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var rando = floor(random(2));
        this.cells[column][row].setIsAlive(rando);
      }
    }
  }


  updatePopulation() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].liveOrDie();
      }
    }
  }


  getNeighbors(currentCell) {

    var neighbors = [];

    for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
        var neighborColumn = currentCell.column + xOffset;
        var neighborRow = currentCell.row + yOffset;
        if (this.isValidPosition(neighborColumn, neighborRow)) {
          if ((currentCell.column == neighborColumn) && (currentCell.row == neighborRow)) {
            print("null");
          } else {
            var cell = this.cells[neighborColumn][neighborRow];
            neighbors.push(cell);
          }
        }
      }
      // do something with neighborColumn and neighborRow
    }

    return neighbors;
  }


  isValidPosition(column, row) {
    return column >= 0 && row >= 0 && column < this.numberOfColumns && row < this.numberOfRows;
  }
  updateNeighborCounts() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        var neighbors = this.getNeighbors(cell);
        var count = 0;
        for (var i = 0; i < neighbors.length; i++) {
          if(neighbors[i].isAlive){
            count++;
          }

        }

        cell.liveNeighborCount = count;
      }
    }
  }
   words() {
    textStyle(BOLD);
    textSize(17);
    fill(0);
    text("Randomize Population",18,18);
    text('click here', 35,35);

  }
}

class Cell {
  constructor(column, row, cellSize) {
    this.column = column;
    this.row = row;
    this.cellSize = cellSize;
    this.liveNeighborCount = 0;
    this.isAlive = false;
  }
  draw() {
    if (this.isAlive === true) {
      fill(200, 0, 200);
    } else {
      fill(240);
    }
    noStroke();
    rect(this.column * this.cellSize + 1, this.row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);

  }
  setIsAlive(value) {
    if (value) {
      this.isAlive = true;
    } else {
      this.isAlive = false;
    }
  }
  liveOrDie() {
    if (this.isAlive && this.liveNeighborCount < 2) {
      this.isAlive = false;
    } else if (this.isAlive && this.liveNeighborCount == 2) {
      this.isAlive = true;
    } else if (this.isAlive && this.liveNeighborCount == 3) {
      this.isAlive = true;
    } else if (this.isAlive && this.liveNeighborCount > 3) {
      this.isAlive = false;
    } else if (!this.isAlive && this.liveNeighborCount == 3) {
      this.isAlive = true;
    }
  }
}

function mousePressed() {
  grid.randomize();
  grid.words();
  //   var randomColumn = floor(random(grid.numberOfColumns));
  //   var randomRow = floor(random(grid.numberOfRows));

  //   var randomCell = grid.cells[randomColumn][randomRow];
  //   var neighborCount = grid.getNeighbors(randomCell).length;

  // print("cell at " + randomCell.column + ", " + randomCell.row + " has " + neighborCount + " neighbors");
  // print(grid.isValidPosition(0, 0)); // should be true
  // print(grid.isValidPosition(0, 1)); // should be false


  //   grid.updateNeighborCounts();
  //   print(grid.cells);
  // grid.updatePopulation();

}

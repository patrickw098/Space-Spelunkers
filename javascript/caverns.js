

const createmap = (width, height) => {
  const chanceToStartAlive = 0.40;
  const map = [];

    for( let x = 0; x < width; x++ ){
      map[x] = []
        for( let y = 0; y < height; y++ ){
          let row = map[x];

          if (Math.random() < chanceToStartAlive) {
            row.push(true);
          } else {
            row.push(false);
          }

        }
    }
    return map;
}


const doSimulationStep = (oldMap) => {
  const birthLimit = 4;
  const deathLimit = 3;
  const newMap = [];

  for (let x = 0; x < oldMap.length; x++ ) {
    newMap[x] = [];

    for ( let y = 0; y < oldMap[0].length; y++ ) {
      let neighbors = countAliveNeighbors(oldMap, x, y);
      let row = newMap[x];

      // If oldMap[x][y] is true, it means the cell is alive and we want to check
      // whether or not we shoudl keep it alive depending on the number of
      // alive neighbors it has.
      if ( oldMap[x][y] ) {
        if ( neighbors < deathLimit ) {
          row.push(false);
        } else {
          row.push(true);
        }
      // else do the opposite for dead cells.
      } else {
        if ( neighbors > birthLimit ) {
          row.push(true);
        } else {
          row.push(false);
        }
      }
    }
  }

  return newMap;
}

const doStepNumTimes = (num) => {
  let map = createmap(50,50);

  for ( let i = 0; i < num; i++ ) {
    map = doSimulationStep(map);
  }

  return map;
}

const printMap = (map) => {
  for ( let i = 0; i < map.length; i++ ) {
    let row = map[i];

    let printedRow = row.map( (col) => {
      if ( col ) {
        return " ";
      } else {
        return "x";
      }
    })

    printedRow = printedRow.join("")

    console.log(printedRow)
  }
}

const countAliveNeighbors = (map, x, y) => {
  let count = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j ++) {
      let adjX = x + i;
      let adjY = y + j;

      if ( i === 0 && y === 0 ) {
        continue;
      } else if ( outOfBounds(map, adjX, adjY) ) {
        count += 0;
      } else if ( map[adjX][adjY] ) {
        count += 1;
      }
    }
  }

  return count;
}

const outOfBounds = (map, adjX, adjY) => {
  return adjX < 0 || adjX >= map.length || adjY < 0 || adjY >= map[0].length
}

const countFill = (x,y,map,color) => {
  if ( outOfBounds(map, x, y) || map[x][y] === color ) return;
  if ( !map[x][y] ) return;

  map[x][y] = color

  countFill(x, y+1, map, color);
  countFill(x, y-1, map, color);
  countFill(x-1, y, map, color);
  countFill(x+1, y, map, color);

  return;
}

const count = map => {
  let counter = 0;

  for (let i = 0; i < map.length; i++ ) {
    for (let j = 0; j< map.length; j++ ) {
      if ( map[i][j] === "empty" ) {
        map[i][j] = true;
        counter += 1;
      }
    }
  }

  return counter;
}


const generateMap = () => {
  let map = doStepNumTimes(10);
  let maxCounter = 0;
  let startSpace = [];

  for (let i = 0; i < map.length; i++ ) {
    for (let j = 0; j< map.length; j++ ) {
      countFill(i,j,map,"empty");
      let num = count(map);

      if ( num > maxCounter ) {
        maxCounter = num;
        startSpace = [i,j];
      }
    }
  }

  return maxCounter > 1100 && maxCounter < 1700 ? map : generateMap()
}

const drawMap = (map) => {
  const rootEl = document.getElementById("canvas");
  const grid = document.createDocumentFragment();

  for ( let i = 0; i < map.length; i++ ) {
    let row = document.createElement('div');
    row.classList.add(`row`);

    for ( let j = 0; j < map[i].length; j++ ) {
      let col = document.createElement('div');
      col.classList.add(`col`);

      if ( map[i][j] ) {
        col.classList.add('empty');
      } else {
        col.classList.add('wall');
      }

      row.append(col);
    }

    grid.append(row);
  }

  rootEl.append(grid);
}


document.addEventListener('DOMContentLoaded', () => {
  const cavern = generateMap();

  drawMap(cavern);
})

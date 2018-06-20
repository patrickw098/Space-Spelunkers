

const createMap = (width, height, options) => {
  const chanceToStartAlive = options.chance;
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


const doSimulationStep = (oldMap, options) => {
  const birthLimit = options.birthLimit;
  const deathLimit = options.deathLimit;
  const newMap = [];

  for (let x = 0; x < oldMap.length; x++ ) {
    newMap[x] = [];

    for ( let y = 0; y < oldMap[0].length; y++ ) {
      let neighbors = countAliveNeighbors(oldMap, x, y);
      let row = newMap[x];

      // If oldMap[x][y] is true, it means the cell is alive and we want to check
      // whether or not we should keep it alive depending on the number of
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

const doStepNumTimes = (num, options) => {
  let map = createMap(50,50, options);

  for ( let i = 0; i < num; i++ ) {
    map = doSimulationStep(map, options);
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

export const outOfBounds = (map, adjX, adjY) => {
  return adjX < 0 || adjX >= map[0].length || adjY < 0 || adjY >= map.length
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


export const generateMap = (options = {}) => {
  options.chance = options.chance || 0.6
  options.birthLimit = options.birthLimit || 6
  options.deathLimit = options.deathLimit || 3
  options.minCount = options.minCount || 0

  let map = doStepNumTimes(10, options);
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

  return maxCounter > options.minCount ? [map, startSpace] : generateMap()
}

export const drawMap = (map) => {
  const rootEl = document.getElementById("canvas-div");
  while (rootEl.firstChild) {
    rootEl.removeChild(rootEl.firstChild);
  }
  const grid = document.createDocumentFragment();

  for ( let i = 0; i < map.length; i++ ) {
    let row = document.createElement('div');
    row.classList.add(`row`);

    for ( let j = 0; j < map[i].length; j++ ) {
      let col = document.createElement('div');
      col.classList.add(`square-${i}-${j}`);

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

export const turmitesNTimes = (times) => {
  let grid = squareGrid(150);
  let x = 75;
  let y = 75;
  let state = 0;
  let dirX = - 1;
  let dirY = 0;

  for ( let i = 0; i < times; i++ ) {
    [x, y, grid, dirX, dirY, state] = turmites(...[x, y, grid, dirX, dirY, state]);
  }

  return grid;
}

const squareGrid = (n) => {
  let grid = new Array(n);

  for ( let i = 0; i < grid.length; i++ ) {
    grid[i] = new Array(n);
    for (let j = 0; j < grid[i].length; j++ ) {
      grid[i][j] = true;
    }
  }

  return grid;
}

const turmites = (x, y, grid, dirX, dirY, state) => {

  if ( outOfBounds(grid, x, y) ) {
    return "error"
  } else if ( grid[x][y] === true && state === 0 ){
    grid[x][y] = false;
    [dirX, dirY] = ninetyDegreesRight(dirX, dirY);
    state = 0;
    return [x + dirX, y + dirY, grid, dirX, dirY, state]
  } else if ( grid[x][y] === true && state === 1 ) {
    grid[x][y] = true;
    state = 0;
    return [x + dirX, y + dirY, grid, dirX, dirY, state]
  } else if ( grid[x][y] === false && state === 0 ) {
    grid[x][y] = false;
    [dirX, dirY] = ninetyDegreesRight(dirX, dirY);
    state = 1;
    return [x + dirX, y + dirY, grid, dirX, dirY, state]
  } else {
    grid[x][y] = true;
    state = 1;
    return [x + dirX, y + dirY, grid, dirX, dirY, state]
  }
}

const ninetyDegreesRight = (dirX, dirY) => {
  if ( dirX === 0 ) {
    return [dirY, 0]
  } else {
    return [0, -dirX ]
  }
}

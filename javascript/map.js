import { generateMap, outOfBounds } from './caverns.js'

class Map {
  constructor(options) {
    [ this.grid, this.startPos ] = generateMap(options);
  }

  validMove(x, y) {
    return this.grid[x][y]
  }

  isOutofBounds(x,y) {
    return outOfBounds(this.grid, x, y);
  }

  randomPos() {
    let bounds = this.grid.length;

    let x = Math.floor( Math.random() * this.grid.length ) ;
    let y = Math.floor( Math.random() * this.grid[0].length ) ;

    if ( this.validMove(x,y) ) {
      return [x,y]
    } else {
      return this.randomPos();
    }
  }

}

export default Map;

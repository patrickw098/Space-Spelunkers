### SpaceSpelunkers!

## Background and Overview
SpaceSpelunkers is a cavern exploration game that utilizes cellular automata to procedurally generate random caverns full of treasures and bad guys for the user to explore.  Armed with a pickaxe and a flame thrower, it is up to the player to explore the cave and uncover its secrets!
Overview:
* Custom dungeon generation using cellular automata.  
* Players can explore the dungeon via a viewport and dynamically alter the randomly generated dungeon with their pickaxe.
![Splash](https://i.imgur.com/MJl4IR8.jpg)


## Features
Players will be able to select different settings for the rules of randomly generating a cavern using cellular automata.  When the player hits "Custom Play!" the cavern will be generated, along with treasures and bad guys.  Using a flamethrower and a pickaxe, players will be destroy their enemies as they advance through the cavern.

* Random procedurally generated caverns based on player inputted settings.
* Players can interact with these caverns
* Players will encounter randomly generated enemies and treasures.
* Players will be able to defeat these enemies.

## Architectures and Technologies
The project will utilize the following technologies:
* Vanilla javascript, canvas, and DOM manipulation for rendering the environment and its characters.
* Webpack to bundle the files.
* Cellular automata logic for procedurally generating the caverns.  

![Random Dungeon](https://i.imgur.com/8JJXUCy.png)


When the game is initialized, the map is generated using the following code:

```javascript
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
```
The `options` are passed in from the form on the splash page.  An array of living and dead pixels is created within the function `doStepNumTimes`

```javascript
const doStepNumTimes = (num, options) => {
  let map = createMap(50,50, options);

  for ( let i = 0; i < num; i++ ) {
    map = doSimulationStep(map, options);
  }

  return map;
}
```

Once the map is created using the user submitted settings.  The dungeon is modified based on the rules defined by `birthRate` and `deathRate`.  The maximum amount of available space to explore is calculated with `countFill` and a position within the filled area is returned as the starting position of the dungeon.

To create the viewport a canvas is created and once the game is initialized, all the tiles around the user in a 7x7 area are populated into an array (`getTiles`).  Every time the `animate` and subsequently, `draw`, is called on the canvas, the old set of tiles is discarded and a new 7x7 viewport is populated into the tiles array based on the current position of the player.

```javascript
  draw() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = Game.BG_COLOR;
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.tiles = this.getTiles();
    
    this.tiles.forEach((tile) => {
      let [x,y] = tile;
      this.drawTile(x, y);
    })

    this.rocks.forEach ((rock) => {
      rock.draw(this.ctx);
    })
    
    this.allObjects().forEach((object) => {
      object.draw(this.ctx);
    });
    
    this.points.draw(this.ctx);
  }
```

All other objects within the players viewport are also drawn by `this.allObjects`, `forEach`, `object.draw`.  Each objects `draw` function takes into consideration the players current viewport, and only draws itself if it is within the viewport.  It's coordinates are then normalized relative to the players position.

I do not own any of the characters, sprites, or music.  They are all owned by their respective owners.
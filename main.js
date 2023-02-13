// import modules
//module.exports.loop = function () {}

require("prototype.spawn");
require("prototype.creep")
require("prototype.tower");
require("prototype.link");



module.exports.loop = function () {
  console.log("Spawn1 Energia para almacenar: " + Game.rooms.W54N1.energyCapacityAvailable)
  console.log("Spawn1 Energia en la room: " + Game.rooms.W54N1.energyAvailable)
  console.log("Spawn2 Energia para almacenar: " + Game.rooms.W54N2.energyCapacityAvailable)
  console.log("Spawn2 Energia en la room: " + Game.rooms.W54N2.energyAvailable)
  console.log("Spawn3 Energia para almacenar: " + Game.rooms.W53N2.energyCapacityAvailable)
  console.log("Spawn3 Energia en la room: " + Game.rooms.W53N2.energyAvailable)
  Game.cpu.generatePixel()
  // check for memory entries of died creeps by iterating over Memory.creeps
  for (let name in Memory.creeps) {
    // and checking if the creep is still alive
    if (Game.creeps[name] == undefined) {
      // if not, delete the memory entry
      delete Memory.creeps[name];
    }
  }

  // for every creep name in Game.creeps
  for (let name in Game.creeps) {
    // run creep logic
    Game.creeps[name].runRole();
  }

  // find all towers
  var towers = _.filter(
    Game.structures,
    (s) => s.structureType == STRUCTURE_TOWER
  );
  // for each tower
  for (let tower of towers) {
    // run tower logic
    tower.defend();
  }
  // Find all Links
  var links = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_LINK);
  for (let link of links) {
    // run tower logic
    link.pushEnergy();
  }

  for (let spawnName in Game.spawns) {
    // run spawn logic
    Game.spawns[spawnName].spawnCreepsIfNecessary();
  }
};

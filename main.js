// import modules
//module.exports.loop = function () {}

require("prototype.spawn")();
require("prototype.tower");
require("prototype.link");
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleLorry = require("role.lorry");
var roleLorryLargeDistance = require("role.lorryLargeDistance");
var roleLongDistanceHarvester = require("role.longDistanceHarvester");
var roleLorryExtension = require("role.lorryExtension");
var roleHunter = require("role.hunter");
var roleElite = require("role.elite");
var roleJackal = require("role.jackal");
var roleGrunt = require("role.grunt");
var roleWallDestroyer = require("role.wallDestroyer");
var roleChansey = require("role.chansey");
var roleManager = require("role.manager");
var roleDrill = require("role.drill");
var roleMiner = require("role.miner");
var roleCrazySoldier = require("role.crazySoldier");
var roleSpawnCreater = require("role.spawnCreater");



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
    // get the creep object
    var creep = Game.creeps[name];

    // if creep is harvester, call harvester script
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    // if creep is upgrader, call upgrader script
    else if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    // if creep is builder, call builder script
    else if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
    else if (creep.memory.role == "lorry") {
      roleLorry.run(creep);
    } else if (creep.memory.role == "lorryLargeDistance") {
      roleLorryLargeDistance.run(creep);
    }
    else if (creep.memory.role == "longDistanceHarvester") {
      roleLongDistanceHarvester.run(creep);
    }
    else if (creep.memory.role == "lorryExtension") {
      roleLorryExtension.run(creep);
    }
    else if (creep.memory.role == "drill") {
      roleDrill.run(creep);
    }
    else if (creep.memory.role == "miner") {
      roleMiner.run(creep);
    }
    else if (creep.memory.role == "manager") {
      roleManager.run(creep);
    } else if (creep.memory.role == "hunter") {
      roleHunter.run(creep);
    } else if (creep.memory.role == "jackal") {
      roleJackal.run(creep);
    } else if (creep.memory.role == "grunt") {
      roleGrunt.run(creep);
    } else if (creep.memory.role == "wallDestroyer") {
      roleWallDestroyer.run(creep);
    } else if (creep.memory.role == "elite") {
      roleElite.run(creep);
    } else if (creep.memory.role == "chansey") {
      roleChansey.run(creep);
    } else if (creep.memory.role == "crazySoldier") {
      roleCrazySoldier.run(creep);
    } else if (creep.memory.role == "spawnCreater") {
      roleSpawnCreater.run(creep);
    }
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
    let spawn = Game.spawns[spawnName];
    let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == "harvester");
    var numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');
    var numberOfLongDistanceHarvester = _.sum(Game.creeps, (c) => c.memory.role == "longDistanceHarvester");
    var numberOfLorrys = _.sum(creepsInRoom, (c) => c.memory.role == "lorry");
    var numberOfLorrysLargeDistance = _.sum(Game.creeps, (c) => c.memory.role == "lorryLargeDistance");
    var numberOfLorrysExtension = _.sum(creepsInRoom, (c) => c.memory.role == "lorryExtension");
    var numberOfDrills = _.sum(creepsInRoom, (c) => c.memory.role == "drill");
    var numberOfMiner = _.sum(creepsInRoom, (c) => c.memory.role == "miner");
    var numberOfManagers = _.sum(creepsInRoom, (c) => c.memory.role == "manager");
    var numberOfHunters = _.sum(Game.creeps, (c) => c.memory.role == "hunter");
    var numberOfJackals = _.sum(Game.creeps, (c) => c.memory.role == "jackal");
    var numberOfGrunts = _.sum(Game.creeps, (c) => c.memory.role == "grunt");
    var numberOfWallDestroyers = _.sum(Game.creeps, (c) => c.memory.role == "wallDestroyer");
    var numberOfElites = _.sum(Game.creeps, (c) => c.memory.role == "elite");
    var numberOfChanseys = _.sum(Game.creeps, (c) => c.memory.role == "chansey");

    var energy = spawn.room.energyCapacityAvailable;
    var name = undefined;
    var energyDivide = energy / 2;
    if (energy >= 1800) {
      // if not enough harvesters
      if (numberOfHarvesters < spawn.memory.minHarvesters) {
        // try to spawn one
        name = spawn.createCustomCreep(energyDivide, 'harvester');

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
          // spawn one with what is available
          name = spawn.createCustomCreep(
            spawn.room.energyAvailable, 'harvester');
        }
      }
      else if (numberOfManagers < spawn.memory.minManagers) {
        // try to spawn one
        name = spawn.createCustomManager(energyDivide);
      }
      else if (numberOfLongDistanceHarvester < spawn.memory.minLongDistanceHarvester) {
        name = spawn.createCustomCreep(energyDivide, "longDistanceHarvester");
      }
      else if (numberOfLorrysExtension < spawn.memory.minLorrysExtension) {
        name = spawn.createCustomLorryExtension(energyDivide);
      }
      else if (numberOfLorrys < spawn.memory.minLorrys) {
        name = spawn.createCustomLorry(energyDivide);
      }
      else if (numberOfDrills < spawn.memory.minDrills) {
        name = spawn.createCustomDrill(energyDivide);
      }
      // if not enough upgraders
      else if (numberOfUpgraders < spawn.memory.minUpgraders) {
        // try to spawn one
        name = spawn.createCustomCreep(energyDivide, 'upgrader');
      }
      else if (numberOfMiner < spawn.memory.minMiner) {
        name = spawn.createCustomMiner(energyDivide);
      }
      // if not enough builders
      else if (numberOfBuilders < spawn.memory.minBuilders) {
        // try to spawn one
        name = spawn.createCustomCreep(energyDivide, 'builder');
      }
      else if (numberOfHunters < spawn.memory.minHunters) {
        // try to spawn one
        name = spawn.createCustomHunter(energy);
      } else if (numberOfJackals < spawn.memory.minJackals) {
        // try to spawn one
        name = spawn.createCustomJackal(energy);
      } else if (numberOfGrunts < spawn.memory.minGrunts) {
        // try to spawn one
        name = spawn.createCustomGrunt(energy);
      } else if (numberOfElites < spawn.memory.minElites) {
        // try to spawn one
        name = spawn.createCustomElite(energy);
      } else if (numberOfChanseys < spawn.memory.minChanseys) {
        // try to spawn one
        name = spawn.createCustomChansey(energy);
      } else if (numberOfWallDestroyers < spawn.memory.minWallDestroyers) {
        // try to spawn one
        name = spawn.createCustomWallDestroyer(energyDivide);
      } else if (numberOfLorrysLargeDistance < spawn.memory.minLorrysLargeDistance) {
        // try to spawn one
        name = spawn.createCustomLorry(energyDivide);
      } else {
        // else try to spawn a builder
        name = spawn.createCustomCreep(energyDivide, "builder");
      }
    } else {
      // if not enough harvesters
      if (numberOfHarvesters < spawn.memory.minHarvesters) {
        // try to spawn one
        name = spawn.createCustomCreep(energy, 'harvester');

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
          // spawn one with what is available
          name = spawn.createCustomCreep(
            spawn.room.energyAvailable, 'harvester');
        }
      }
      else if (numberOfManagers < spawn.memory.minManagers) {
        // try to spawn one
        name = spawn.createCustomManager(energy);
      }
      else if (numberOfLongDistanceHarvester < spawn.memory.minLongDistanceHarvester) {
        name = spawn.createCustomCreep(energy, "longDistanceHarvester");
      }
      else if (numberOfLorrysExtension < spawn.memory.minLorrysExtension) {
        name = spawn.createCustomLorryExtension(energy);
      }
      else if (numberOfLorrys < spawn.memory.minLorrys) {
        name = spawn.createCustomLorry(energy);
      }
      else if (numberOfDrills < spawn.memory.minDrills) {
        name = spawn.createCustomDrill(energy);
      }
      // if not enough upgraders
      else if (numberOfUpgraders < spawn.memory.minUpgraders) {
        // try to spawn one
        name = spawn.createCustomCreep(energy, 'upgrader');
      }
      else if (numberOfMiner < spawn.memory.minMiner) {
        name = spawn.createCustomMiner(energy);
      }
      // if not enough builders
      else if (numberOfBuilders < spawn.memory.minBuilders) {
        // try to spawn one
        name = spawn.createCustomCreep(energy, 'builder');
      }
      else if (numberOfHunters < spawn.memory.minHunters) {
        // try to spawn one
        name = spawn.createCustomHunter(energy);
      } else if (numberOfJackals < spawn.memory.minJackals) {
        // try to spawn one
        name = spawn.createCustomJackal(energy);
      } else if (numberOfGrunts < spawn.memory.minGrunts) {
        // try to spawn one
        name = spawn.createCustomGrunt(energy);
      } else if (numberOfElites < spawn.memory.minElites) {
        // try to spawn one
        name = spawn.createCustomElite(energy);
      } else if (numberOfChanseys < spawn.memory.minChanseys) {
        // try to spawn one
        name = spawn.createCustomChansey(energy);
      } else if (numberOfWallDestroyers < spawn.memory.minWallDestroyers) {
        // try to spawn one
        name = spawn.createCustomWallDestroyer(energy);
      } else if (numberOfLorrysLargeDistance < spawn.memory.minLorrysLargeDistance) {
        // try to spawn one
        name = spawn.createCustomLorry(energy);
      } else {
        // else try to spawn a builder
        name = spawn.createCustomCreep(energy, "builder");
      }
    }
  }
};

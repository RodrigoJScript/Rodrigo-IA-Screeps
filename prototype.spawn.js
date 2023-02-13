var listOfRoles = [
  "harvester",
  "upgrader",
  "builder",
  "lorry",
  "lorryExtension",
  "manager",
  "drill",
  "miner",
];
StructureSpawn.prototype.spawnCreepsIfNecessary =
  function () {
    let room = this.room;
    let creepsInRoom = room.find(FIND_MY_CREEPS);
    let numberOfCreeps = {};
    for (let role of listOfRoles) {
      numberOfCreeps[role] = _.sum(creepsInRoom, c => c.memory.role == role);
    }
    var energy = room.energyCapacityAvailable;
    var name = undefined;
    var energyDivide = energy / 2;


    if (energy >= 1800) {
      // if not enough harvesters
      if (numberOfCreeps["harvester"] < this.memory.minHarvesters) {

        name = this.createCustomCreep(energyDivide, 'harvester');

        // if thising failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfCreeps["harvester"] == 0) {
          // this one with what is available
          name = this.createCustomCreep(
            this.room.energyAvailable, 'harvester');
        }
      }
      else if (numberOfCreeps["manager"] < this.memory.minManagers) {
        // try to this one
        name = this.createCustomManager(energyDivide);
      }
      else if (numberOfCreeps["lorryExtension"] < this.memory.minLorrysExtension) {
        name = this.createCustomLorryExtension(energyDivide);
      }
      else if (numberOfCreeps["lorry"] < this.memory.minLorrys) {
        name = this.createCustomLorry(energyDivide);
      }
      else if (numberOfCreeps["drill"] < this.memory.minDrills) {
        name = this.createCustomDrill(energyDivide);
      }
      // if not enough upgraders
      else if (numberOfCreeps["upgrader"] < this.memory.minUpgraders) {
        // try to this one
        name = this.createCustomCreep(energyDivide, 'upgrader');
      }
      else if (numberOfCreeps["miner"] < this.memory.minMiner) {
        name = this.createCustomMiner(energyDivide);
      }
      // if not enough builders
      else if (numberOfCreeps["builder"] < this.memory.minBuilders) {
        // try to this one
        name = this.createCustomCreep(energyDivide, 'builder');
      } else {
        // else try to this a builder
        name = this.createCustomCreep(energyDivide, "builder");
      }

      let numberOfLongDistanceHarvesters = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minLongDistanceHarvesters) {
          numberOfLongDistanceHarvesters = _.sum(Game.creeps, (c) =>
            c.memory.role == 'longDistanceHarvester')

          if (numberOfLongDistanceHarvesters < this.memory.minLongDistanceHarvesters) {
            name = this.createCustomCreep(energyDivide, "longDistanceHarvester");
          }
        }
      }

      let numberOfLorrysLargeDistance = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minLorrysLargeDistance) {
          numberOfLorrysLargeDistance = _.sum(Game.creeps, (c) =>
            c.memory.role == 'lorryLargeDistance')

          if (numberOfLorrysLargeDistance < this.memory.minLorryLargeDistance) {
            name = this.createCustomLorryLargeDistance(energyDivide);
          }
        }
      }

      let numberOfChanseys = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minChanseys) {
          numberOfChanseys = _.sum(Game.creeps, (c) =>
            c.memory.role == 'chansey')

          if (numberOfChanseys < this.memory.minChanseys) {
            name = this.createCustomChanseys(energyDivide);
          }
        }
      }

      let numberOfHunters = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minHunters) {
          numberOfHunters = _.sum(Game.creeps, (c) =>
            c.memory.role == 'hunter')

          if (numberOfHunters < this.memory.minHunters) {
            name = this.createCustomHunter(energyDivide);
          }
        }
      }

      let numberOfElites = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minElites) {
          numberOfElites = _.sum(Game.creeps, (c) =>
            c.memory.role == 'elite')

          if (numberOfElites < this.memory.minElites) {
            name = this.createCustomElite(energyDivide);
          }
        }
      }

      let numberOfJackals = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minJackals) {
          numberOfJackals = _.sum(Game.creeps, (c) =>
            c.memory.role == 'jackal')

          if (numberOfJackals < this.memory.minJackals) {
            name = this.createCustomJackals(energyDivide);
          }
        }
      }

      let numberOfGrunts = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minGrunts) {
          numberOfGrunts = _.sum(Game.creeps, (c) =>
            c.memory.role == 'grunt')

          if (numberOfGrunts < this.memory.minGrunts) {
            name = this.createCustomGrunts(energyDivide);
          }
        }
      }

      let numberOfWallDestroyers = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minWallDestroyers) {
          numberOfWallDestroyers = _.sum(Game.creeps, (c) =>
            c.memory.role == 'wallDestroyer')

          if (numberOfWallDestroyers < this.memory.minWallDestroyers) {
            name = this.createCustomWallDestroyers(energyDivide);
          }
        }
      }
    } else {
      // if not enough harvesters
      if (numberOfCreeps["harvester"] < this.memory.minHarvesters) {
        // try to this one
        name = this.createCustomCreep(energy, 'harvester');

        // if thising failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfCreeps["harvester"] == 0) {
          // this one with what is available
          name = this.createCustomCreep(
            this.room.energyAvailable, 'harvester');
        }
      }
      else if (numberOfCreeps["manager"] < this.memory.minManagers) {
        // try to this one
        name = this.createCustomManager(energy);
      }
      else if (numberOfCreeps["lorryExtension"] < this.memory.minLorrysExtension) {
        name = this.createCustomLorryExtension(energy);
      }
      else if (numberOfCreeps["lorry"] < this.memory.minLorrys) {
        name = this.createCustomLorry(energy);
      }
      else if (numberOfCreeps["drill"] < this.memory.minDrills) {
        name = this.createCustomDrill(energy);
      }
      // if not enough upgraders
      else if (numberOfCreeps["upgrader"] < this.memory.minUpgraders) {
        // try to this one
        name = this.createCustomCreep(energy, 'upgrader');
      }
      else if (numberOfCreeps["miner"] < this.memory.minMiner) {
        name = this.createCustomMiner(energy);
      }
      // if not enough builders
      else if (numberOfCreeps["builder"] < this.memory.minBuilders) {
        // try to this one
        name = this.createCustomCreep(energy, 'builder');
      } else {
        // else try to this a builder
        name = this.createCustomCreep(energy, "builder");
      }

      let numberOfLongDistanceHarvesters = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minLongDistanceHarvesters) {
          numberOfLongDistanceHarvesters = _.sum(Game.creeps, (c) =>
            c.memory.role == 'longDistanceHarvester')

          if (numberOfLongDistanceHarvesters < this.memory.minLongDistanceHarvesters) {
            name = this.createCustomCreep(energy, "longDistanceHarvester");
          }
        }
      }

      let numberOfChanseys = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minChanseys) {
          numberOfChanseys = _.sum(Game.creeps, (c) =>
            c.memory.role == 'chansey')

          if (numberOfChanseys < this.memory.minChanseys) {
            name = this.createCustomChansey(energy);
          }
        }
      }

      let numberOfLorryLargeDistance = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minLorryLargeDistance) {
          numberOfLorryLargeDistance = _.sum(Game.creeps, (c) =>
            c.memory.role == 'lorryLargeDistance')

          if (numberOfLorryLargeDistance < this.memory.minLorryLargeDistance) {
            name = this.createCustomLorryLargeDistance(energy);
          }
        }
      }

      let numberOfHunters = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minHunters) {
          numberOfHunters = _.sum(Game.creeps, (c) =>
            c.memory.role == 'hunter')

          if (numberOfHunters < this.memory.minHunters) {
            name = this.createCustomHunter(energy);
          }
        }
      }

      let numberOfElites = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minElites) {
          numberOfElites = _.sum(Game.creeps, (c) =>
            c.memory.role == 'elite')

          if (numberOfElites < this.memory.minElites) {
            name = this.createCustomElite(energy);
          }
        }
      }


      let numberOfJackals = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minJackals) {
          numberOfJackals = _.sum(Game.creeps, (c) =>
            c.memory.role == 'jackals')

          if (numberOfJackals < this.memory.minJackals) {
            name = this.createCustomJackal(energy);
          }
        }
      }

      let numberOfWallDestroyers = {};
      if (name == undefined) {
        // count the number of long distance harvesters globally
        for (let roomName in this.memory.minWallDestroyers) {
          numberOfWallDestroyers = _.sum(Game.creeps, (c) =>
            c.memory.role == 'wallDestroyer')

          if (numberOfWallDestroyers < this.memory.minWallDestroyers) {
            name = this.createCustomWallDestroyer(energy);
          }
        }
      }
    }
  };

StructureSpawn.prototype.createCustomCreep = function (energy, roleName) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 200);
  var body = [];
  for (let i = 0; i < numberOfParts; i++) {
    body.push(WORK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    body.push(CARRY);
  }
  for (let i = 0; i < numberOfParts; i++) {
    body.push(MOVE);
  }
  let name = roleName + Game.time;
  // create creep with the created body and the given role
  return this.spawnCreep(body, name, {
    memory: { role: roleName, working: false }
  });
};

StructureSpawn.prototype.createCustomLorry = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 150);
  var bodyL = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyL.push(CARRY);
    bodyL.push(CARRY);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyL.push(MOVE);
  }
  let nameLorry = "Lorry" + Game.time;
  this.spawnCreep(bodyL, nameLorry, {
    memory: { role: "lorry", working: false }
  });
};

StructureSpawn.prototype.createCustomLorryLargeDistance = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 150);
  var bodyLD = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyLD.push(CARRY);
    bodyLD.push(CARRY);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyLD.push(MOVE);
  }
  let nameLorryD = "Lorry" + Game.time;
  this.spawnCreep(bodyLD, nameLorryD, {
    memory: { role: "lorryLargeDistance", working: false }
  });
};

StructureSpawn.prototype.createCustomLorryExtension = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 100);
  var bodyLE = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyLE.push(CARRY);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyLE.push(MOVE);
  }
  let nameLorry = "LorryExtension" + Game.time;
  this.spawnCreep(bodyLE, nameLorry, {
    memory: { role: "lorryExtension", working: false }
  });
};

StructureSpawn.prototype.createCustomHunter = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 600);
  var bodyH = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyH.push(TOUGH);
    bodyH.push(TOUGH);
    bodyH.push(TOUGH);
    bodyH.push(TOUGH);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyH.push(RANGED_ATTACK);
    bodyH.push(RANGED_ATTACK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyH.push(ATTACK);
    bodyH.push(ATTACK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyH.push(MOVE);
    bodyH.push(MOVE);
  }
  let nameHunter = "Hunter" + Game.time;
  this.spawnCreep(bodyH, nameHunter, {
    memory: { role: "hunter" }
  });
};

StructureSpawn.prototype.createCustomElite = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 400);
  var bodyE = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyE.push(TOUGH);
    bodyE.push(TOUGH);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyE.push(RANGED_ATTACK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyE.push(ATTACK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyE.push(MOVE);
    bodyE.push(MOVE);
    bodyE.push(MOVE);
  }
  let nameElite = "Elite" + Game.time;
  this.spawnCreep(bodyE, nameElite, {
    memory: { role: "elite" }
  });
};

StructureSpawn.prototype.createCustomJackal = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 210);
  var bodyJK = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyJK.push(TOUGH);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyJK.push(RANGED_ATTACK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyJK.push(MOVE);
  }
  let nameJackal = "Jackal" + Game.time;
  this.spawnCreep(bodyJK, nameJackal, {
    memory: { role: "jackal" }
  });
};

StructureSpawn.prototype.createCustomGrunt = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 130);
  var bodyGT = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyGT.push(RANGED_ATTACK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyGT.push(MOVE);
  }
  let nameGrunt = "Grunt" + Game.time;
  this.spawnCreep(bodyGT, nameGrunt, {
    memory: { role: "grunt" }
  });
};

StructureSpawn.prototype.createCustomChansey = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 550);
  var bodyC = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyC.push(HEAL);
    bodyC.push(HEAL);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyC.push(MOVE);
  }
  let nameChansey = "Chansey" + Game.time;
  this.spawnCreep(bodyC, nameChansey, {
    memory: { role: "chansey" }
  });
};

StructureSpawn.prototype.createCustomWallDestroyer = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 130);
  var bodyWD = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyWD.push(ATTACK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyWD.push(MOVE);
  }
  let nameWallDestroyer = "WallDestroyer" + Game.time;
  this.spawnCreep(bodyWD, nameWallDestroyer, {
    memory: { role: "wallDestroyer" }
  });
};

StructureSpawn.prototype.createCustomManager = function (energy) {
  // create a balanced body as big as possible with the given energy
  var energyF = energy - 50;
  var numberOfParts = Math.floor(energyF / 50);
  var bodyM = [];
  bodyM.push(MOVE);
  for (let i = 0; i < numberOfParts; i++) {
    bodyM.push(CARRY);
  }
  let nameManager = "Manager" + Game.time;
  this.spawnCreep(bodyM, nameManager, {
    memory: { role: "manager", working: false }
  });
};

StructureSpawn.prototype.createCustomDrill = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 250);
  var bodyD = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyD.push(WORK);
    bodyD.push(WORK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyD.push(MOVE);
  }
  let nameDrill = "Drill" + Game.time;
  this.spawnCreep(bodyD, nameDrill, {
    memory: { role: "drill" }
  });
};

StructureSpawn.prototype.createCustomMiner = function (energy) {
  // create a balanced body as big as possible with the given energy
  var numberOfParts = Math.floor(energy / 150);
  var bodyMi = [];
  for (let i = 0; i < numberOfParts; i++) {
    bodyMi.push(WORK);
  }
  for (let i = 0; i < numberOfParts; i++) {
    bodyMi.push(MOVE);
  }
  let nameMiner = "Miner" + Game.time;
  this.spawnCreep(bodyMi, nameMiner, {
    memory: { role: "miner" }
  });
};

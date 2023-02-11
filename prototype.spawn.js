module.exports = function () {
  // create a new function for StructureSpawn
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
      memory: { role: roleName, working: false },
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
      memory: { role: "lorry", working: false },
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
      memory: { role: "lorryExtension", working: false },
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
      memory: { role: "hunter" },
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
      memory: { role: "elite" },
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
      memory: { role: "jackal" },
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
      memory: { role: "grunt" },
    });
  };

  StructureSpawn.prototype.createCustomChansey = function (energy) {
    // create a balanced body as big as possible with the given energy
    var numberOfParts = Math.floor(energy / 300);
    var bodyC = [];
    for (let i = 0; i < numberOfParts; i++) {
      bodyC.push(HEAL);
    }
    for (let i = 0; i < numberOfParts; i++) {
      bodyC.push(MOVE);
    }
    let nameChansey = "Chansey" + Game.time;
    this.spawnCreep(bodyC, nameChansey, {
      memory: { role: "chansey" },
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
      memory: { role: "wallDestroyer" },
    });
  };

  StructureSpawn.prototype.createCustomManager = function (energy) {
    // create a balanced body as big as possible with the given energy
    var energyF = energy - 50
    var numberOfParts = Math.floor(energyF / 50);
    var bodyM = [];
    bodyM.push(MOVE);
    for (let i = 0; i < numberOfParts; i++) {
      bodyM.push(CARRY);
    }
    let nameManager = "Manager" + Game.time;
    this.spawnCreep(bodyM, nameManager, {
      memory: { role: "manager", working: false },
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
      memory: { role: "drill" },
    });
  };
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
    memory: { role: "miner" },
  });
};
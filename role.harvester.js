module.exports = {

  run: function (creep) {
    if (creep.memory.working == false && creep.store.getFreeCapacity() == 0) {
      creep.memory.working = true;
      creep.say("🔄")
    }
    if (creep.memory.working == true && creep.store.getUsedCapacity() == 0) {
      creep.memory.working = false;
      creep.say('⚡');
    }
    if (creep.memory.working == true) {
      var links = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK) && structure.store.getFreeCapacity > 99;
        }
    });
      var targets = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER ) && structure.energy < structure.energyCapacity;
        }
      });
      if (links.length > 0) {
        if (creep.transfer(links[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(links[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
      if (targets != undefined) {
        // try to transfer energy, if it is not in range
        if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    } else {
      var sources = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  },
};

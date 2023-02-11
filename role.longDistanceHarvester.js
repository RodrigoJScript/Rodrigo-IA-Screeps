module.exports = {
    run: function (creep) {
        let harvestFlag = Game.flags.harvestFlag;
        let homeFlag = Game.flags.homeFlag;
        if (creep.memory.working == false && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say("🔄")
        }
        if (creep.memory.working == true && creep.store.getUsedCapacity() == 0) {
            creep.memory.working = false;
            creep.say('⚡');
        }
        if (creep.memory.working == false) {
            if (harvestFlag) {
                if (creep) {
                    if (creep.pos.roomName === harvestFlag.pos.roomName) {
                        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                        if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }
                    } else {
                        creep.moveTo(harvestFlag);
                    }
                }
            }
        } else if (creep.memory.working == true) {
            if (homeFlag) {
                if (creep) {
                    if (creep.pos.roomName === homeFlag.pos.roomName) {
                        var links = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_LINK) && structure.energy < 800;
                            }
                        });
                            if (creep.transfer(links, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(links, { visualizePathStyle: { stroke: '#ffaa00' } });
                            }
                    } else {
                        creep.moveTo(homeFlag);
                    }
                }
            }
        }
    }
};
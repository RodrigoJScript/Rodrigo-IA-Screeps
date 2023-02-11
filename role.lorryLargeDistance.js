module.exports = {
    run: function (creep) {
        let flag = Game.flags.attackFlag;
        if (flag) {
            if (creep) {
                if (creep.pos.roomName === flag.pos.roomName) {
                    module.exports = {
                        // a function to run the logic for this role
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
                                // find closest spawn, extension or tower which is not full
                                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                        return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TOWER) && structure.store.getUsedCapacity() < structure.store.getCapacity();
                                    }
                                });
                                // if we found one
                                if (structure != undefined) {
                                    // try to transfer energy, if it is not in range
                                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        // move towards it
                                        creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
                                    }
                                }
                            }
                            // if creep is supposed to harvest energy from source
                            else {
                                var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
                                var containers = creep.room.find(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                        return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0;
                                    }
                                });
                                if (droppedEnergy.length > 0) {
                                    if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(droppedEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                                    }
                                } else if (containers.length > 0) {
                                    if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                                    }
                                }
                            }
                        }
                    };
                } else {
                    creep.moveTo(flag);
                }
            }
        }
    },
};
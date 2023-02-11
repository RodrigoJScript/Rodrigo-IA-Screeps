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
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            var storages = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (storages.length > 0) {
                if (creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storages[0], { visualizePathStyle: { stroke: '#ffa000' } });
                }
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
var roleUpgrader = require('role.upgrader');

module.exports = {

    run: function (creep) {
        if (creep.memory.working == false && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say("⚡")
        }
        if (creep.memory.working == true && creep.store.getUsedCapacity() == 0) {
            creep.memory.working = false;
            creep.say('🔄');
        }

        if (creep.memory.working == true) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
            var storages = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (storages.length > 0) {
                if (creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storages[0], { visualizePathStyle: { stroke: '#ffa000' } });
                }
            } else if (containers.length > 0) {
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (resource) => {
                        return resource.resourceType == RESOURCE_ENERGY;
                    }
                });
                if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }
};

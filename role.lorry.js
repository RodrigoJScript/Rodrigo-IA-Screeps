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

            var target = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity() > 0;
                }
            });

            // if we found one
            if (target.length > 0) {
                for (let recurso in creep.carry) {
                    if (creep.transfer(target[0], recurso) == ERR_NOT_IN_RANGE); {
                        creep.moveTo(target[0]);
                    }
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER &&
                    s.store[RESOURCE_ENERGY] < s.storeCapacity
            });
            if (droppedEnergy.length > 0) {
                if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else if (container) {
                // Si hay algún recurso distinto a energía en el contenedor, lo extraemos
                for (let resourceType in container.store) {
                    if (resourceType != RESOURCE_ENERGY) {
                        if (creep.withdraw(container, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    }
                }
                // Si no queda ningún recurso distinto a energía en el contenedor, extraemos energía
                if (_.sum(container.store) > 0) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
            }
        }
    }
};
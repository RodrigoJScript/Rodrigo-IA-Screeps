//rol para el que administra la energia desde el centro

module.exports = {
    run: function (creep) {

        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is looking energy but is full
        else if (creep.memory.working == false && creep.carry.energy >= 800) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) =>
                    (s.structureType == STRUCTURE_LAB || s.structureType == STRUCTURE_TERMINAL || s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_SPAWN)
            });
            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_LINK, });
            if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
        }
    }
};
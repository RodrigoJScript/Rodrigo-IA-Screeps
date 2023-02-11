module.exports = {
    // a function to run the logic for this role
    run: function (creep) {

        var sources = creep.room.find(FIND_MINERALS);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }

    }
};
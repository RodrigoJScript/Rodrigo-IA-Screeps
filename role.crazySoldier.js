module.exports = {
    run: function (creep) {
        let flag = Game.flags.claimFlag;
        if (flag) {
            if (creep) {
                if (creep.pos.roomName === flag.pos.roomName) {
                    if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                } else {
                    creep.moveTo(flag);
                }
            }
        }
    }
};
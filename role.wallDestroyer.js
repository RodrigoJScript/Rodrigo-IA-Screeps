module.exports = {
    run: function (creep) {

        let flag = Game.flags.attackFlag;
        if (flag) {
            if (creep) {
                if (creep.pos.roomName === flag.pos.roomName) {
                    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (target) {
                        if (target.owner.username !== "ChicoFlex") {
                            var targetWall = Game.getObjectById('63d7ed93cf1a77cce49674f1');
                            if (creep.attack(targetWall) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targetWall);
                            }
                        } else {
                            creep.say("Team Friends", true)
                        }
                    }
                } else {
                    creep.moveTo(flag);
                }
            }
        }
    },
};
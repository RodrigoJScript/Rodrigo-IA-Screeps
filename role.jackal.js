module.exports = {
    run: function (creep) {

        let flag = Game.flags.attackFlag;
        if (flag) {
            if (creep) {
                if (creep.pos.roomName === flag.pos.roomName) {
                    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (target) {
                        if (target.owner.username !== "ChicoFlex") {
                            if (creep.memory.target) {
                                var target = Game.getObjectById(creep.memory.target);
                                if (target) {
                                    if (target) {
                                        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(target);
                                        }
                                    }
                                } else {
                                    creep.moveTo(target);
                                }
                            } else {
                                creep.memory.target = null;
                            }
                        } else {
                            var hostileCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                            if (hostileCreep) {
                                creep.memory.target = hostileCreep.id;
                            }
                        }
                    } else {
                        creep.say("Team Friends")
                    }
                } else {
                    creep.moveTo(flag);
                }
            }
        }
    }
};
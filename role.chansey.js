
module.exports = {
    run: function (creep) {
        var curacion = "wallDestroyer";
        let flag = Game.flags.attackFlag;
        if (flag) {
            if (creep) {
                if (creep.pos.roomName === flag.pos.roomName) {
                    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (target) {
                        if (target.owner.username !== "ChicoFlex") {
                            // Encuentra los atacantes y asígnalos a la variable "targets".
                            var targets = creep.room.find(FIND_MY_CREEPS, {
                                filter: function (object) {
                                    return object.memory.role == curacion && object.hits < object.hitsMax;
                                }
                            });
                            // Si encuentra atacantes dañados, mueve al sanador hasta el atacante más dañado.
                            if (targets.length > 0) {
                                if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[0]);
                                }
                            } else {
                                // Si no encuentra atacantes dañados, mueve el sanador hasta la posición más cercana de tus atacantes.
                                var attackers = creep.room.find(FIND_MY_CREEPS, {
                                    filter: function (object) {
                                        return object.memory.role == curacion;
                                    }
                                });
                                if (attackers.length > 0) {
                                    creep.moveTo(attackers[0]);
                                }
                            }
                        } else {
                            creep.say("Team Friends", true)
                            var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
                                filter: function (object) {
                                    return object.hits < object.hitsMax;
                                }
                            });
                            if (target.owner.username == "ChicoFlex") {
                                if (targets.length > 0) {
                                    if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(targets[0]);
                                    }
                                }
                            }
                        }
                    } else {
                        var targets = creep.room.find(FIND_MY_CREEPS, {
                            filter: function (object) {
                                return object.memory.role == curacion && object.hits < object.hitsMax;
                            }
                        });
                        // Si encuentra atacantes dañados, mueve al sanador hasta el atacante más dañado.
                        if (targets.length > 0) {
                            if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0]);
                            }
                        } else {
                            // Si no encuentra atacantes dañados, mueve el sanador hasta la posición más cercana de tus atacantes.
                            var attackers = creep.room.find(FIND_MY_CREEPS, {
                                filter: function (object) {
                                    return object.memory.role == curacion;
                                }
                            });
                            if (attackers.length > 0) {
                                creep.moveTo(attackers[0]);
                            }
                        }
                    }
                } else {
                    creep.moveTo(flag);
                }
            }
        }
    },
};

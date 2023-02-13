//HUNTER 20% TOUGH, 20% MOVE, 25%, 35% lARGE ATTACK
module.exports = {
  run: function (creep) {

    let flag = Game.flags.attackFlag;
    if (flag) {
      if (creep) {
        if (creep.pos.roomName === flag.pos.roomName) {
          var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          if (target) {
            if (hostileCreep.owner.username !== "ChicoFlex" || hostileCreep.owner.username !== "Jackroos") {
              if (creep.memory.target) {
                var target = Game.getObjectById(creep.memory.target);
                if (target) {
                  var range = creep.pos.getRangeTo(target);
                  if (range <= 1) {
                    creep.attack(target);
                  } else if (range <= 3) {
                    creep.rangedAttack(target);
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
          }
        } else {
          creep.moveTo(flag);
        }
      }
    }
  },
};
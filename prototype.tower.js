// create a new function for StructureTower

StructureTower.prototype.defend =
    function () {
        var hostileCreep = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostileCreep) {
            if (hostileCreep.owner.username !== "ChicoFlex") {
                if (hostileCreep) {
                    this.attack(hostileCreep);
                    return;
                }
            } else {
                var injuredCreep = this.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: creep => creep.hits < creep.hitsMax
                });
                if (injuredCreep) {
                    this.heal(injuredCreep);
                    return;
                }
                var damagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: structure => structure.hits < structure.hitsMax && structure.hits < 100000
                });
                if (damagedStructure) {
                    this.repair(damagedStructure);
                }
            }
        } else {
            var injuredCreep = this.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: creep => creep.hits < creep.hitsMax
            });
            if (injuredCreep) {
                this.heal(injuredCreep);
                return;
            }
            var damagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: structure => structure.hits < structure.hitsMax && structure.hits < 100000
            });
            if (damagedStructure) {
                this.repair(damagedStructure);
            }
        }
    };

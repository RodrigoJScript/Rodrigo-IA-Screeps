var roles = {
     harvester : require("role.harvester"),
     upgrader : require("role.upgrader"),
     builder : require("role.builder"),
     lorry : require("role.lorry"),
     lorryLargeDistance : require("role.lorryLargeDistance"),
     longDistanceHarvester : require("role.longDistanceHarvester"),
     lorryExtension : require("role.lorryExtension"),
     hunter : require("role.hunter"),
     elite : require("role.elite"),
     jackal : require("role.jackal"),
     grunt : require("role.grunt"),
     wallDestroyer : require("role.wallDestroyer"),
     chansey : require("role.chansey"),
     manager : require("role.manager"),
     drill : require("role.drill"),
     miner : require("role.miner"),
     crazySoldier : require("role.crazySoldier"),
     spawnCreater : require("role.spawnCreater"),
};

Creep.prototype.runRole =
    function () {
        roles[this.memory.role].run(this);
    };
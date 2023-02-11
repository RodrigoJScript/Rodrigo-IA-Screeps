StructureLink.prototype.pushEnergy =
    function () {
        // Encuentra el link central en la misma habitación que el link actual
        var centralLink = Game.rooms[this.room.name].memory.centralLink;

        // Si se ha encontrado un link central y el link actual no es el central y tiene energía, empuja la energía hacia el central
        if (centralLink && this.id != centralLink && this.store.energy > 0) {
            this.transferEnergy(Game.getObjectById(centralLink));
        }
    };
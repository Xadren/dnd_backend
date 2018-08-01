const Store = require('openrecord/store/mysql');

class Spell extends Store.BaseModel{
    static definition(){
        this.validatesPresenceOf('name');
        // this.belongsToMany("classes");
    }
}

module.exports = Spell;
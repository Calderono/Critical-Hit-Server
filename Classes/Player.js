var shortID = require('shortid');
var Vector2 = require('./Vector2');

module.exports = class Player {
    constructor(){
        this.username = '';
        this.id = shortID.generate();
        this.gridPosition = new Vector2();
        this.facingDirection = new Vector2();
    }
}
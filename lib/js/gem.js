/**
 * Single block for a generic connect-3 style game.
 */
class Gem{
    static get CIRCLE(){
        return Gem.prototype.CIRCLE;
    }
    static get SQUARE(){
        return Gem.prototype.SQUARE;
    }
    static get TRIANGLE(){
        return Gem.prototype.TRIANGLE;
    }
    static get HEXAGON(){
        return Gem.prototype.HEXAGON;
    }
    static get STAR(){
        return Gem.prototype.STAR;
    }

    static get allBaseGems(){
        return [
            Gem.prototype.CIRCLE,
            Gem.prototype.SQUARE,
            Gem.prototype.TRIANGLE,
            Gem.prototype.HEXAGON,
            Gem.prototype.STAR
        ];
    }

    constructor(gem){
        this.gem = Gem.allBaseGems.includes(gem) ? gem : Gem.randomBaseGem();
        this.visited = false;
    }

    static randomBaseGem(){
        const l = Gem.allBaseGems.length;
        return Gem.allBaseGems[Math.floor(Math.random()*l)];
    }

}

Gem.prototype.CIRCLE   = Symbol("circle");
Gem.prototype.SQUARE   = Symbol("square");
Gem.prototype.TRIANGLE = Symbol("triangle");
Gem.prototype.HEXAGON  = Symbol("hexagon");
Gem.prototype.STAR     = Symbol("star");
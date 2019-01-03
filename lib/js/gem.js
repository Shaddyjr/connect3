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
    }

    /**
     * Returns a random gem. If given a gem, another random gem is returned.
     */
    static randomBaseGem(not){
        const l = Gem.allBaseGems.length;
        let pick = Gem.allBaseGems[Math.floor(Math.random()*l)];
        if(not){
            while(pick === not){
                pick = Gem.allBaseGems[Math.floor(Math.random()*l)];
            }
        }
        return pick;
    }

}

Gem.prototype.CIRCLE   = Symbol("circle");
Gem.prototype.SQUARE   = Symbol("square");
Gem.prototype.TRIANGLE = Symbol("triangle");
Gem.prototype.HEXAGON  = Symbol("hexagon");
Gem.prototype.STAR     = Symbol("star");
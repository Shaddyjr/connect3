/**
 * Single block for a generic connect-3 style game.
 */
class Gem{
    static get allBaseGems(){
        return [
            Gem.CIRCLE,
            Gem.SQUARE,
            Gem.TRIANGLE,
            Gem.HEXAGON,
            Gem.STAR
        ];
    }

    constructor(gem){
        this.gem = Gem.allBaseGems.includes(gem) ? gem : Gem.randomBaseGem();
        this.status = Gem.new;
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

Gem.CIRCLE   = Symbol("circle");
Gem.SQUARE   = Symbol("square");
Gem.TRIANGLE = Symbol("triangle");
Gem.HEXAGON  = Symbol("hexagon");
Gem.STAR     = Symbol("star");

Gem.new = Symbol("new");
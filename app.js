
const config = {
    WEREWOLF_MAX_HP: 100,
    WEREWOLF_HP: 100,
    WEREWOLF_AP: 20,
    VAMPIRE_MAX_HP: 80,
    VAMPIRE_HP: 80,
    VAMPIRE_AP: 15,
    VAMPIRE_BITE_CHANCE: 0.3,   // between 0 and 1, the chance of having a bite instead of normal attack.
    VAMPIRE_BITE_HEALING_RATE: 0.7,  // how much damage (in fraction) is converted to hp.
    Mummy_MaxHealth: 80,
    Mummy_AttackPoints: 20,
    Mummy_DamageBeingAttacked: 10
};

class Monster {
    constructor(maxHp, ap) {
        this.hitPoint = maxHp;
        this.maxHitPoint = maxHp;
        this.attackPoint = ap;
    }    attack(anotherMonster) {
        anotherMonster.beingHit(this.attackPoint);
    }    beingHit(damage) {
        if(damage > this.hitPoint){
            damage = this.hitPoint;
        }
        this.hitPoint -= damage;
        return damage;
    }
}

class Werewolf extends Monster {
    constructor() {
        super( config.WEREWOLF_MAX_HP, config.WEREWOLF_AP);
    }
}
    
class Vampire extends Monster {
    constructor() {
        super( config.VAMPIRE_MAX_HP, config.VAMPIRE_AP);
    }    
    attack(anotherMonster) {
        const actualDamage = anotherMonster.beingHit(this.attackPoint);
        if (Math.random() > config.VAMPIRE_BITE_CHANCE) {
            this.gainHealth(actualDamage * config.VAMPIRE_BITE_HEALING_RATE);
        }
    }    
    gainHealth(health) {
        this.hitPoint += health;
        if (this.hitPoint > this.maxHitPoint) {
            this.hitPoint = this.maxHitPoint;
        }
    }
}// test it!const monster1 = new Monster(100, 100, 20);
// const monster2 = new Monster(200, 200, 40);monster1.attack(monster2);
// monster2.attack(monster1);console.log(monster1);
// console.log(monster2);const ww1 = new Werewolf();
// const ww2 = new Werewolf();ww1.attack(ww2);
// ww1.attack(ww2);console.log(ww1);
// console.log(ww2);

class Mummy extends Monster {
    constructor(){
        super(config.Mummy_MaxHealth, config.Mummy_AttackPoints);
        this.counter = 0;
    }
    attack(monster){
        this.counter ++;
        if(this.counter < 3){
            const damage = monster.beingHit(this.attackPoint);
        }else{
            this.beingHit(config.Mummy_DamageBeingAttacked);
            this.counter = 0;
        }
    }
}

//testing

const ww1 = new Werewolf();
const MM1 = new Mummy();

MM1.attack(ww1);
MM1.attack(ww1);
MM1.attack(ww1);

console.log(MM1);
console.log(ww1);

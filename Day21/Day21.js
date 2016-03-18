'use strict';
let _ = require('lodash');

// you have to beat the boss (kill them first)
// you have unlimited gold to spend on 1 weapon (must buy)
// 1 (optional) armor
// and 0-2 rings
// damage done is attackers damage - defenders armor (minimum of 1 per hit)
// question: what is min gold player can spend and still win

let boss = { //input
  hitPoints: 104,
  damage: 8,
  armor: 1
};

let player = { //player starts with this
  hitPoints: 100,
  damage: 0,
  armor: 0
};

// calculate attack damage
let attack = (attacker, defender) => {
  if (attacker.damage > defender.armor) {
    return attacker.damage - defender.armor;
  } else {
    return 1;
  }
};

//play out a fight
let fight = (player, boss) => {
  while (player.hitPoints > 0 && boss.hitPoints > 0) { // fight while both live
    boss.hitPoints = boss.hitPoints - attack(player, boss); // player attacks 1st

    if (boss.hitPoints > 0) { // if boss still alive, boss attacks
      player.hitPoints = player.hitPoints - attack(boss, player);
    };
  };

  if (player.hitPoints > 0) { return "player wins";}
  else { return "boss wins";};
};

// weapons available to buy (must buy 1 and only 1)
let weapons = [
  {name: 'Dagger', cost: 8, damage: 4, armor: 0},
  {name: 'Shortsword', cost: 10, damage: 4, armor: 0},
  {name: 'Warhammer', cost: 25, damage: 6, armor: 0},
  {name: 'Longsword', cost: 40, damage: 7, armor: 0},
  {name: 'Greataxe', cost: 74, damage: 8, armor: 0}
];

// armors available (can by 1 or none)
let armors = [
  {name: 'Leather', cost: 13, damage: 0, armor: 1},
  {name: 'Chainmail', cost: 31, damage: 0, armor: 2},
  {name: 'Splintmail', cost: 53, damage: 0, armor: 3},
  {name: 'Bandedmail', cost: 75, damage: 0, armor: 4},
  {name: 'Platemail', cost: 101, damage: 0, armor: 5}
];

// rings available (can buy 0 to 2)
let rings = [
  {name: 'damPlus1', cost: 25, damage: 1, armor: 0},
  {name: 'damPlus2', cost: 50, damage: 2, armor: 0},
  {name: 'damPlus3', cost: 100, damage: 3, armor: 0},
  {name: 'defPlus1', cost: 20, damage: 0, armor: 1},
  {name: 'defPlus2', cost: 40, damage: 0, armor: 2},
  {name: 'defPlus3', cost: 80, damage: 0, armor: 3}
];

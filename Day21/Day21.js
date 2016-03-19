'use strict';
let _ = require('lodash');

// you have to beat the boss (kill them first)
// you have unlimited gold to spend on 1 weapon (must buy)
// 1 (optional) armor
// and 0-2 rings
// damage done is attackers damage - defenders armor (minimum of 1 per hit)
// question: what is min gold player can spend and still win

// player starts with 100 hp

let boss = { //input
  hitPoints: 104,
  damage: 8,
  armor: 1
};

// calculate attack damage
let attack = (attacker, defender) => {
  if (attacker.damage > defender.armor) {
    return attacker.damage - defender.armor;
  } else {
    return 1;
  }
};

//play out a fight and return winner
let fight = (player, boss) => {
  while (player.hitPoints > 0 && boss.hitPoints > 0) { // fight while both live
    boss.hitPoints = boss.hitPoints - attack(player, boss); // player attacks 1st

    if (boss.hitPoints > 0) { // if boss still alive, boss attacks
      player.hitPoints = player.hitPoints - attack(boss, player);
    };
  };

  if (player.hitPoints > 0) { return 'player wins';}
  else { return 'boss wins';};
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
  {name: 'Platemail', cost: 101, damage: 0, armor: 5},
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

// need to create a cross product of sorts
// for each weapon, pair with no armor, and with each possible armors
// for each of these possibilities, add no rings, then each possible ring
// then, in addition, for each of these add another of each (other) ring

//refactor this???
let combos = _.transform(weapons, (result, weapon) => {
  result.push([weapon]); //need to get every weapon alone
  armors.forEach((armor) => {
    result.push([weapon, armor]); //creates each weapon and armor combo

    rings.forEach((ring1) => {
      result.push([weapon, armor, ring1]); // each 1 ring combo with armor
      result.push([weapon, ring1]); // each 1 ring combo without armor

      rings.forEach((ring2) => {
        if (ring2.name != ring1.name) {
          result.push([weapon, armor, ring1, ring2]); // ring combos with armor
          result.push([weapon, ring1, ring2]); // ring combos without
        };
      });
    });
  });
},[]);

// for each combo, calculate the cost and if it wins in array
// add all attributes to fighter stats, generate player object
let equipItems = (gear) => {
  let newStats = _.transform(gear, (result, item) => {
    result.damage = result.damage + item.damage;
    result.armor = result.armor + item.armor;
    result.cost = result.cost + item.cost;
  },{hitPoints: 100, damage: 0, armor: 0, cost: 0});

  newStats.winner = fight(newStats, boss); // test outcome

  return newStats;
};

// calculate outcomes for each item combination
let outcomes = _.transform(combos, (result, combo) => {
  result.push(equipItems(combo)); // equip items, calc cost
}, []);

// get all costs where player wins
let costs = _.transform(outcomes, (result, outcome) => {
  if (outcome.winner == 'player wins') { result.push(outcome.cost) };
}, []);

// PROBLEM: TOO LOW A COST. ALSO, WHY ARE SOME HITPOINTS SO LOW FOR PLAYER?

// get minimum
let answer = _.min(costs);

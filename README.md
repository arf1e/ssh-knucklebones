# ssh knucklebones

[![tests](https://github.com/arf1e/ssh-knucklebones/actions/workflows/node.js.yml/badge.svg)](https://github.com/arf1e/ssh-knucklebones/actions/workflows/node.js.yml) [![deploy](https://github.com/arf1e/ssh-knucklebones/actions/workflows/deploy.yml/badge.svg)](https://github.com/arf1e/ssh-knucklebones/actions/workflows/deploy.yml)

<p align="center">
<img src="https://github.com/user-attachments/assets/96168f36-6ed0-4f3d-a45c-a5d3231d2052" alt="game-overview" />
</p>

## Table of contents

- [Original game idea](#original-game-idea)
- [Playing the game](#playing-the-game)

## Original game idea

Originally, Knucklebones is [a mini-game from Cult of the Lamb by Massive Monster](https://cult-of-the-lamb.fandom.com/wiki/Knucklebones)

## Playing the game

```bash
ssh knucklebones.egorushque.com
```

## Game rules

### 1. makin moves
in knucklebones, players take turns rolling dice and placing it in either one of three columns on their field.

### 2. makin moves the smart way

#### 2.1. combos
<p align="center">
  <img src="https://github.com/user-attachments/assets/4ab45905-4b5e-43d5-b298-4e47f4dc229c" alt="combos" />
</p>
if your column already has a piece of the same value, each piece adds its value multiplied by the amount of the same dice in the column to your score. so, `two 6 pieces would give you 6*2 + 6*2 = 24 points`. 

#### 2.1. evicting opponent's dice
<p align="center">
  <img src="https://github.com/user-attachments/assets/1b16b2a6-e14f-43b4-9785-fe973a411f7e" alt="evicting-dice" />
</p>
if your column already has a piece of the same value, each piece adds its value multiplied by the amount of the same dice in the column to your score. so, `two 6 pieces would give you 6*2 + 6*2 = 24 points`.

### 3. winning and losing
game session ends when one of the players has filled all their columns. player with the highest score wins.

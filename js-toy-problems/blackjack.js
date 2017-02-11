class Deck {
	constructor() {
		this.deck = [];
  }
  newDeck() {
    this.deck = [];
    [1,2,3,4].forEach(_ => {
    	this.deck = this.deck.concat([2,3,4,5,6,7,8,9,10,10,10,11])
    });
  }
  draw() {
		if (!this.deck.length) this.newDeck();
  	return this.deck.splice(Math.random() * this.deck.length, 1)[0];
  }
}

class Hand {
	constructor(deck) {
  	this.deck = deck;
  	this.hand = [];
    this.hit().hit();
  }
	hit() {
		this.hand.push(this.deck.draw());
		return this;
	}
	value() {
		return this.hand.map(x => x === 11 ? 1 : x).reduce((acc, x) => acc + x);
	}
}

let maxBy = (arr, f) => {
	let max = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (f(arr[i]) > f(max)) {
			max = arr[i];
		}
	}
	return max;
}

class BlackJack {
	constructor(players) {
		this.players = players;
		this.makeGame();
	}
	makeGame() {
		this.deck = new Deck();
		this.players.forEach(p => {
			p.hand = new Hand(this.deck);
		});
	}
	runRound() {
		this.players.forEach(p => {
			let decision = p.hitOrStay();
			while (decision === 'hit') {
				p.hand.hit();

				decision = p.hitOrStay();
			}
		})
		let playerNameValues = this.players
			.filter(p => p.hand.value() > 21)
			.map(p => [p.name, p.hand.value()])

		return maxBy(playerNameValues, arr => arr[1]);
	}
}

class Player {
	constuctor(name) {
		this.name = name;
	}
	hitOrStay() {
		return ['hit', 'stay'][Math.floor(Math.random() * 2)];
	}
}

let players = ['Nick', 'Louis', 'Layne', 'Brandon'];
players = players.map(name => new Player(name));
console.log(new Player('Louis'))
console.log((new BlackJack(players)).runRound());

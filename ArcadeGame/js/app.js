// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // random speed for the enemy;
    this.speed = Math.floor((Math.random() * 5) + 1) * 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    // if collision then reset the player and show the game is loss
    if (this.isCollision(player)) {
        //console.log('collision!');
        player.reset();
        loss();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.isCollision = function(player) {
    // check if enemy and player is combined
    // PS: the enemy position is changed 20px for viewing.
    if ((Math.abs(this.x - player.x) < 83)&& (this.y + 20 == player.y)) {
        return true;
    } else {
        return false;
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// xT and yT contains the tempropery value for x and y. the value will updated 
// when update method is called
// oriX and oriY contains the original value for x and y.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.xT = x;
    this.yT = y;
    this.oriX = x;
    this.oriY = y;
}

// check whether the position is out of the border
Player.prototype.update = function(dt) {
    this.x = this.xT;
    this.y = this.yT;
    if (this.x < 0) {this.x = 0};
    if (this.x > 4 * 101) {this.x = 404};
    if (this.y < 0) {this.y = 0};
    if (this.y > 5 * 83) {this.y = 415};
    // if the palyer reached the goal the game is over with a win.
    if (this.y == 0) {
        this.reset();
        won();
    };
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle the different directions
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.xT = this.x - 101;
            break;
        case 'right':
            this.xT = this.x + 101;
            break;
        case 'up':
            this.yT = this.y - 83;
            break;
        case 'down':
            this.yT = this.y + 83;
    }
}

// reset the player to the original position
Player.prototype.reset = function() {
    this.x = this.oriX;
    this.y = this.oriY;
    this.xT = this.x;
    this.yT = this.y;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var allEnemies = [];

// put random number of enemies into the array in 6 
// seconds and put them in random rows.
(function(){
    setInterval(function() {
        var numbers = Math.floor((Math.random() * 3));
        for (var i = 0; i < numbers; i++) {
            rowNumber = Math.floor((Math.random() * 3)) + 1;
            var enemy = new Enemy(0, rowNumber*83 - 20);
            allEnemies.push(enemy);
        }
    }, 600);
})();

var player = new Player(2*101, 5*83);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// show something when win the game
function won() {
    //console.log('win');
    alert('you win!');
}

// show something when loss the game
function loss() {
    //console.log('loss');
    alert('you lose!');
}
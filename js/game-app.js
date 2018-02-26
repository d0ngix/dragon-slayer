new Vue({
    el: '#game-app',
    data: {
        playerName: '[Player 1]',
        enemyName: 'DRAGON',
        difficulty: 2000,
        maxAttackPoints: 10,
        minAttackPoints: 0,
        maxPowerAttackPoints: 20,
        minPowerAttackPoints: 10,
        powerAttackCount: 4,
        healCount: 4,

        imgDragon: 'img/dragon.png',
        imgPlayer: 'img/stickman.png',

        healthPlayer: 100,
        healthDragon: 100,
        healthPlayerWarning: false,
        healthDragonWarning: false,
        ended: false,
        started: false,
        commentaries: [],
        powerAttackBtn: true,  
        healBtn: true,
        winDragon: false,
        winPlayer: false,
        

    },
    mounted: function (){        
        // setInterval (function () {
        //     //if (!this.ended) this.dragonAttack();
        //   }.bind(this) , this.difficulty)
    },
    methods: {
        start: function () {
            var _this = this;
            window.addEventListener("keypress", function(e) {
                var charKey = String.fromCharCode(e.keyCode).toLowerCase();
                console.log(charKey);
                if (charKey == 'a' ) {
                    _this.attack();
                } else if (charKey == 'b') {
                    _this.powerAttack();
                } else if (charKey == 'h') {
                    _this.heal();
                } else if (charKey == 'r') {
                    _this.restart();
                }
            });            

            setInterval (function () {
                if (!this.ended) this.dragonAttack();
              }.bind(this) , this.difficulty)
            
              this.started = true;
        },
        //keymonitor: function(event) {
        //       alert(event.key);
        //},
        logAction: function(obj){
            
            if (obj.points == 0) {
                obj.action = 'ATTACK BLOCKED';
            }
            
            this.commentaries.push( obj );
        },
        attack: function () {
            attackPoints = this.getAttackPoints(this.minAttackPoints, this.maxAttackPoints);
            this.healthDragon -= attackPoints ;// Math.floor(Math.random() * 11);
            this.logAction({actor:this.playerName, action: 'ATTACK ' + this.enemyName + ' for ' + attackPoints, points: attackPoints});
            this.checkDragonHealth();
        },
        powerAttack: function () {
            this.powerAttackCount -= 1;
            if (this.powerAttackCount <= 0 ) this.powerAttackBtn = false;
            // console.log(this.powerAttackBtn);

            attackPoints = this.getAttackPoints(this.minPowerAttackPoints, this.maxPowerAttackPoints);
            this.healthDragon -= attackPoints ;// Math.floor(Math.random() * 11);
            this.logAction({actor:this.playerName, action: 'POWER ATTACK ' + this.enemyName + ' for ' + attackPoints, points: attackPoints});
            this.checkDragonHealth();

            attackPoints = this.getAttackPoints(this.minPowerAttackPoints, this.maxPowerAttackPoints);
            this.healthPlayer -= attackPoints;
            this.logAction({actor:this.enemyName, action: 'POWER ATTACK ' + this.playerName + ' for ' + attackPoints, points: attackPoints});
            this.checkPlayerHealth();            
        },              
        checkDragonHealth: function(){
            if (this.healthDragon <= 0 ) {
                this.ended = true;
                this.healthDragon = 0;
                this.imgDragon = 'img/dragon-dead.png';
                this.winPlayer = true;
                this.logAction({actor:this.playerName, action: 'WINS', points: attackPoints});                
            } else if (this.healthDragon <= 20 ) {
                this.healthDragonWarning = true;
            }
        },
        checkPlayerHealth: function(){
            if (this.healthPlayer <= 0 ) {
                this.ended = true;
                this.healthPlayer = 0;
                this.imgPlayer = 'img/stickman-dead.png';
                this.winDragon = true,
                this.logAction({actor:this.enemyName, action: 'WINS', points: attackPoints});
            } else if (this.healthPlayer <= 20 ) {
                this.healthPlayerWarning = true;
            }
        },        
        dragonAttack: function() {
            attackPoints = this.getAttackPoints(this.minAttackPoints, this.maxAttackPoints);
            this.healthPlayer -= attackPoints;
            this.logAction({actor:this.enemyName, action: 'ATTACK ' + this.playerName + ' for ' + attackPoints, points: attackPoints});
            this.checkPlayerHealth();            
        },  
        heal: function() {
            this.healCount -= 1;
            if ( this.healCount <= 0 ) this.healBtn = false;

            healPoints = this.getAttackPoints(this.minAttackPoints, this.maxAttackPoints);
            this.healthPlayer += healPoints ;// Math.floor(Math.random() * 11);
            if (this.healthPlayer >= 100 ) this.healthPlayer = 100;
            else this.logAction({actor:this.playerName, action: 'HEALED for ' + attackPoints, points: attackPoints});

            this.dragonAttack();
            //this.checkDragonHealth();
        },
        restart: function () {
            //alert('Restart');
            if (confirm ( 'Are you sure you want another challenge?')) {
                this.healthPlayer = 100,
                this.healthDragon = 100,            
                this.healthPlayerWarning = false,
                this.healthDragonWarning = false,            
                this.ended = false,
                //this.started = false;
                this.commentaries = [],
                this.powerAttackBtn = true;
                this.powerAttackCount = 4;
                this.healBtn = true;
                this.healCount =  4;
                this.winDragon = false,
                this.winPlayer = false
				this.imgDragon ='img/dragon.png';
				this.imgPlayer ='img/stickman.png';
            }

        },
        getAttackPoints: function (min, max) {
            // if (isPower){
            //     return attackPoints = Math.floor( Math.random() * ( max - min + 1 ) + min );
            // } 
            return Math.floor( Math.random() * ( max - min + 1 ) + min );
        }
    },
    computed: {
        // commentaries () {
        //     //return this.commentaries.push('test123');
        //     console.log(this.commentaries);
        // }
        // attackPoints () {
        //     return this.getRandomNumbers(this.minAttackPoints, this.maxAttackPoints);         
        // }
    }
});
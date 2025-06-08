const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

let marginLeft = 20;
let maarhinRight = CANVAS_WIDTH - 200;

let gameSpeed = 1;
let scorePoint = 0;
let scoreFactor = 0.01;
let score = 0;

let bg_l1 = new Image();
bg_l1.src = 'Assets/BG/3/layers/1.png';
let bg_l2 = new Image();
bg_l2.src = 'Assets/BG/3/layers/2.png';
let bg_l3 = new Image();
bg_l3.src = 'Assets/BG/3/layers/3.png';
let bg_l4 = new Image();
bg_l4.src = 'Assets/BG/3/layers/4.png';
let bg_l5 = new Image();
bg_l5.src = 'Assets/BG/3/layers/5.png';
let bg_l6 = new Image();
bg_l6.src = 'Assets/BG/3/layers/6.png';
let bg_l7 = new Image();
bg_l7.src = 'Assets/BG/3/layers/7.png';
let bg_l8 = new Image();
bg_l8.src = 'Assets/BG/3/layers/8.png';
let bg_l9 = new Image();
bg_l9.src = 'Assets/BG/3/layers/9.png';
let bg_l10 = new Image();
bg_l10.src = 'Assets/BG/3/layers/10.png';

let player = new Image();
var n = 0;


class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 1000;
        this.heigth = 600;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed* this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x -= this.speed;
        this.x2 -= this.speed;
        scorePoint += this.speed;
    }
    draw(){
        ctx.drawImage(this.image, this.x,this.y,this.width,this.heigth);
        ctx.drawImage(this.image, this.x2,this.y,this.width,this.heigth);
    }
}

const layer1 = new Layer(bg_l1,0);
const layer2 = new Layer(bg_l2,0.1);
const layer3 = new Layer(bg_l3,0);
const layer4 = new Layer(bg_l4,0.5);
const layer5 = new Layer(bg_l5,1);
const layer6 = new Layer(bg_l6,1);
const layer7 = new Layer(bg_l7,1);
const layer8 = new Layer(bg_l8,1);
const layer9 = new Layer(bg_l9,1);
const layer10 = new Layer(bg_l10,0.3);

const BGLayers = [layer1,layer2,layer3,layer4,layer5,layer6,layer9];

function bg_animation(){
    BGLayers.forEach(layer => {
        layer.update();
        layer.draw();
    });
    player1_walk();
    score = scorePoint*scoreFactor;
    console.log(Math.floor(score));
    requestAnimationFrame(bg_animation);
}

function player1_walk(){
    
        if(n == 0 | n == 24){
            n=0;
            player.src = 'Assets/Player/Reaper_Man_1/Walking/0_Reaper_Man_Walking_000.png';

        }
        if(n<10) {
            player.src = 'Assets/Player/Reaper_Man_1/Walking/0_Reaper_Man_Walking_00'+n+'.png';
            ctx.drawImage(player,20,375,200,200);
            n++;
        }
        else if(n<24){
            player.src = 'Assets/Player/Reaper_Man_1/Walking/0_Reaper_Man_Walking_0'+n+'.png';
            ctx.drawImage(player,20,375,200,200);
            n++;
        }
    
}

function player2_walk(){
    if(n == 0 | n == 12){
        n=0;
        player.src = 'Assets/Player/Wraith_01/Walking/Wraith_01_Moving Forward_000.png';

    }
    if(n<10) {
        player.src = 'Assets/Player/Wraith_01/Walking/Wraith_01_Moving Forward_00'+n+'.png';
        ctx.drawImage(player,0,375,200,200);
        n++;
    }
    else if(n<12){
        player.src = 'Assets/Player/Wraith_01/Walking/Wraith_01_Moving Forward_0'+n+'.png';
        ctx.drawImage(player,0,375,200,200);
        n++;
    }
}

class oracle{
    constructor(text,time){
        this.text = text;
        this.time = time;
        const container = document.getElementById('reveal-text');
        container.classList.remove('fade-out');
        container.classList.remove('reveal-text');
        void container.offsetWidth;
        container.classList.add('reveal-text');
        
        setTimeout(() => {
        container.classList.add('fade-out');
        }, this.time*1000);

        container.innerHTML = [...text].map((ch, i) => {
        if (ch === ' ') return `<span class="space" style="animation-delay: ${i * 0.2}s">&nbsp;</span>`;
        else if( ch === '_') return '<br>';
        else return `<span style="animation-delay: ${i * 0.1}s">${ch}</span>`;
        }).join('');
    
    }
}

window.addEventListener('load', function(){
    bg_animation();
    new oracle("\"You’ve finally arrived._This world is dying._The ground rots. The sky watches._Nothing here wants you alive._But you’re too late to turn back.\"",25);
    
});

function triggerTextAnimation(){
    new oracle("Hello world ", 5);
}



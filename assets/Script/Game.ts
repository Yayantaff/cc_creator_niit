// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

// Importing class references from gameplay nodes' scripts, for manipulating animations and similar controls.

import {Hero} from './Hero';
import {Guard} from './Guard';
import {SlideDoor} from './SlideDoor';
import {LaserDoor} from './LaserDoor';
import {TPod} from './TPod';

import {KLIPS} from './config/Klips';
import {CustomEvents} from './CustomEvents';
import Globals from './Globals';

//``````````````````````````````````````````````````````````````````````````


// IMAGE NOMECLATURES. Also keys for dictionaries referencing arrays of frames for respective animations.

const hero_entry = KLIPS.hero_entry_img;//'Hero starting walk';
const hero_idle = KLIPS.hero_idle_img;//'Hero idle';
const hero_walk = KLIPS.hero_walk_img;//'Hero walk';
const hero_accessing_pod = KLIPS.hero_accessing_pod_img;//'Accessing_pod';
const hero_death_by_bullet = KLIPS.hero_death_by_bullet_img;//'Death by bullet';
const hero_death_through_laser = KLIPS.hero_death_through_laser_img;//'Death through laser';

const guard_patrol = KLIPS.guard_patrol_img;//'Shooting';
const guard_shoot = KLIPS.guard_shoot_img;//'Recoil after shooting';
const guard_death = KLIPS.guard_death_img;//'death of security guard';

const slide_door = KLIPS.slide_door_img;//'slide up door';

const laser_door = KLIPS.laser_door_img;//'Laser beam';

//``````````````````````````````````````````````````````````````````````````

//``````````````````````````````````````````````````````````````````````````


@ccclass
export default class Game extends cc.Component {


    // Internal variables to hold references to classes from gameplay nodes' scripts.
    
    private hero_ext: Hero = null; 
    private guard_ext: Guard = null;
    private slide_door_ext: SlideDoor = null;
    private laser_door_ext: LaserDoor = null;
    private tpDoor_ext: TPod = null;
    private tpLaser_ext: TPod = null
    
    //```````````````````````````````````````````````````````````

    // Multiatlas from TexturePacker
    
    private atlas: cc.SpriteAtlas = null;
    private _frames: cc.SpriteFrame[];
    
    //````````````````````````````````````````````````````````````

    // Internal variables to hold references to nodes on stage.
    
    private hero: cc.Node = null;
    private guard: cc.Node = null;
    private tpDoor: cc.Node = null;
    private tpLaser: cc.Node = null;
    private slide_door: cc.Node = null;
    private laser_door: cc.Node = null;
    
    //```````````````````````````````````````````````````````````

    // Dictionaries ( { key : value } pairs' keys against array memory types. These keys are not variable names, they are strings !), 
    // to hold animation frames for generating animation clips later.
    
    private hero_frames = {
        hero_entry_fr: [],
        hero_idle_fr: [],
        hero_walk_fr: [],
        hero_accessing_pod_fr: [],
        hero_death_by_bullet_fr: [],
        hero_death_through_laser_fr: [],
    };

    private guard_frames = {
        guard_patrol_fr: [],
        guard_shoot_fr: [],
        guard_death_fr: [],
    };

    private slide_door_frames = {
        slide_door_fr: [],
    };

    private laser_door_frames = {
        laser_door_fr: [],
    };
    //`````````````````````````````````````````````

    private _heroDestination: number; // clicked location xcoordinate .
    
    private _heroStart: number; // starting x c coordinate, for calculating direction.

    private _gameScore: number;

    private g: Globals;

    //private _heroDir: number; // for scaling hero -1 or 1, to face left or right. This is controlled by the game manager.

    //private _guardDir: number; // for scaling guard -1 or 1. 
    
    // mine begin

    // METHODS 

    // Inintialize reference variables to gameplay nodes, and their controlling classes.
    // Nodes - <NodeName>
    // Node Clases - <NodeName>+_ext
    
    initializeRefs(){
        
        this.hero = this.node.getChildByName('hero'); // The hero node on stage, in the hierarchy under Canvas.
        this.hero_ext = this.hero.getComponent(Hero); // This is the script component attached to hero node.

        this.guard = this.node.getChildByName('guard');
        this.guard_ext = this.guard.getComponent(Guard);

        this.slide_door = this.node.getChildByName('slide_door');
        this.slide_door_ext = this.slide_door.getComponent(SlideDoor);

        this.laser_door = this.node.getChildByName('laser_door');
        this.laser_door_ext = this.laser_door.getComponent(LaserDoor);

        this.tpDoor = this.node.getChildByName('TPod1');
        this.tpDoor_ext = this.tpDoor.getComponent('TPod');

        this.tpLaser = this.node.getChildByName('TPod2');
        this.tpLaser_ext = this.tpLaser.getComponent('TPod');

        return;
    
    }


    // Load multiatlas form bundle Atlas. 
    
    loadAssets() {
        
        let _this = this;
        
        cc.assetManager.loadBundle('Atlas', function (err, bundle) {
        
            bundle.load('multiatlas', cc.SpriteAtlas, (err, atlas: cc.SpriteAtlas) => {
                if (err) {
                    cc.error(err.message || err);
                    return;
                    }
                _this.atlas = atlas;
                _this.prepareSprites();
                console.log('The atlas is ', _this.atlas);
                _this._frames =  atlas.getSpriteFrames(); 
                
            });
            
            //console.log('loaded bundle successfully.');
        });

        return;
        
    }

    // Prepare and attach animation clips for sprites. 
    
    prepareSprites() {
        
        var frames = this.atlas.getSpriteFrames();
        var frameClip = '';
        
        for(let i = 0; i < frames.length; ++i){
            frameClip = frames[i].name.substr(0, frames[i].name.length - 4)
            switch(frameClip){

                // Hero's frames
                case hero_entry : {
                    this.hero_frames.hero_entry_fr.push(frames[i]);
                    break;
                }
                case hero_idle : {
                    this.hero_frames.hero_idle_fr.push(frames[i]);
                    break;
                }
                case hero_walk : {
                    this.hero_frames.hero_walk_fr.push(frames[i]);
                    break;
                }
                case hero_accessing_pod : {
                    this.hero_frames.hero_accessing_pod_fr.push(frames[i]);
                    break;
                }
                case hero_death_by_bullet : {
                    this.hero_frames.hero_death_by_bullet_fr.push(frames[i]);
                    break;
                }
                case hero_death_through_laser : {
                    this.hero_frames.hero_death_through_laser_fr.push(frames[i]);
                    break;
                }

                //Guard's frames
                case guard_patrol : {
                    this.guard_frames.guard_patrol_fr.push(frames[i]);
                    break;
                }
                case guard_shoot : {
                    this.guard_frames.guard_shoot_fr.push(frames[i]);
                    break;
                }
                case guard_death : {
                    this.guard_frames.guard_death_fr.push(frames[i]);
                    break;
                }

                //Slide door's frames
                case slide_door : {
                    this.slide_door_frames.slide_door_fr.push(frames[i]);
                    break;
                }

                //Laser door's frames
                case laser_door : {
                    this.laser_door_frames.laser_door_fr.push(frames[i]);
                    break;
                }

                default: break;
            }
            
        }
        
        // Calling methods on exported classes, to add clips to the animation components of each.

        this.hero_ext.addclips(this.hero_frames);  
        
        this.guard_ext.addclips(this.guard_frames);

        this.slide_door_ext.addclips(this.slide_door_frames);

        this.laser_door_ext.addclips(this.laser_door_frames);

        return;
    }

    // Custom events on hitting terminal pods.

    addEventListeners(){
        
        let _this = this;
        
        
        // mouse event listener registered for moving hero.

        this.node.on(cc.Node.EventType.MOUSE_UP, this.heroLocomotion, this);
        // listeners registered for custom events broadcast from mouse clicks on TPods.

        this.node.on(CustomEvents.POD_SLIDE_DOOR_EVENT, function (event:cc.Event.EventCustom) { // the event tyoe
            console.log('slide door activated');
            _this.slide_door_ext.slideDoorOpen = !_this.slide_door_ext.slideDoorOpen;
            
            _this.laser_door_ext.laserBeamOn = !_this.laser_door_ext.laserBeamOn  && _this.slide_door_ext.slideDoorOpen;
           
            if (_this.hero.x != _this.tpDoor.x)
                _this.hero_ext.dir = -(_this.hero.x - _this.tpDoor.x)/Math.abs(_this.hero.x - _this.tpDoor.x);
            console.log('The new set hero direction is ',_this.hero_ext.dir);
            console.log('The calcculated hero dir is ',-(_this.hero.x - _this.tpDoor.x)/Math.abs(_this.hero.x - _this.tpDoor.x));

            _this.hero_ext.heroState = 'operating';

            /*if (_this.hero.x != _this.tpDoor.x)
                _this.hero_ext.dir = (_this.hero.x - _this.tpDoor.x)/Math.abs(_this.hero.x - _this.tpDoor.x);*/
        
            event.stopPropagation();
        });

        this.node.on(CustomEvents.POD_LASER_DOOR_EVENT, function (event:cc.Event.EventCustom) {
            console.log('laser beam activated');
            _this.laser_door_ext.laserBeamOn = !_this.laser_door_ext.laserBeamOn;// && _this.slide_door_ext.slideDoorOpen;

            if (_this.hero.x != _this.tpLaser.x)
                _this.hero_ext.dir = -(_this.hero.x - _this.tpLaser.x)/Math.abs(_this.hero.x - _this.tpLaser.x);
            _this.hero_ext.heroState = 'operating';

            /*if (_this.hero.x != _this.tpLaser.x)
                _this.hero_ext.dir = -(_this.hero.x - _this.tpLaser.x)/Math.abs(_this.hero.x - _this.tpLaser.x);*/

            event.stopPropagation();
        });
        
        

        return;
    }

    // run on mouseclick on canvas, if the hero is idling or in walking state. all other states are engaged states.

    heroLocomotion(event:cc.Event.EventMouse){
        console.log('Hero Locomotion', this);
        
        
        //engaged states' conditions. ---

        if(this.hero_ext.heroState == 'operating') return;

        if(this.hero_ext.heroState == '') return;  // workaround for the animation clips loading latency issue.
        
        if(this.hero_ext.heroState == 'dying by laser') return;
        
        if(this.hero_ext.heroState == 'dying by bullet') return;

        // ------------------------------- 

        this.hero_ext.heroState = 'walking';
        this.disablePods();

        console.log('HERO WALKING .................');
        
        this._heroDestination = this.node.convertToNodeSpaceAR(event.getLocation()).x;//event.getLocationX();
        
        this._heroStart = this.hero.x;
        
        this.hero_ext.dir = -Math.abs(this._heroStart - this._heroDestination)/(this._heroStart - this._heroDestination);

        // updating exclusive herodestinations. (Hence the return st.) 
        // 1) two conditions checking whether hero's position is overflowing the canvas.
        
        if (this._heroDestination < -(this.node.width/2 - this.hero.width))  {
            this._heroDestination = -(this.node.width/2 - this.hero.width);
            return;
        }
        
        if (this._heroDestination > (this.node.width/2 - this.hero.width))  {
            this._heroDestination = this.node.width/2 - this.hero.width;
            
            return;
        }


                
        // updating exclusive herodestinations. (Hence the return st.)
        // 2)this is to calculate if the slide door is closed, and if it is, if it falls between the hero start and destination locations.

        if(!this.slide_door_ext.slideDoorOpen){
            let a = this._heroStart;
            let b = this._heroDestination;
            let c = this.slide_door.x;// - this.hero.width/1.5;

            
            if(Math.abs(c - b) < this.hero_ext.heroWidth/2)
                this._heroDestination = c -  this.hero_ext.heroWidth/2; // to confine hero to before his half width before the door.


            if(Math.abs(c - a)+Math.abs(c - b) == Math.abs(a - b))
                this._heroDestination = c -  this.hero_ext.heroWidth/2; // hero confined to about the slide door

            //if(Math.abs(this._heroDestination -this.hero.x) < this.hero.width)
              //  this._herodestination
        }
        return;
    }

    

    disablePods(){
        //this.tpDoor.getComponent(cc.Button).enabled = false;
        //this.tpLaser.getComponent(cc.Button).enabled = false;

        this.tpDoor_ext.isEnabled = false;
        this.tpLaser_ext.isEnabled = false;
                
    }
    // initialize a few game variables that need to be.
    gameInit(){
        this._heroDestination = null;
        this._heroStart = this.node.x;
        //this.tpDoor.getComponent(cc.Button).enabled = false;
        //this.tpLaser.getComponent(cc.Button).enabled = false;

        this.disablePods();

        //this._guardDir = -1;
        this.guard_ext.dir = -1;
        this.addEventListeners();

        

        this._gameScore = 30  ;
        this.node.getChildByName('ScoreLabel').getComponent(cc.Label).string = this._gameScore + '"';
        this.schedule(this.scoreCounter, 1);


    }

    scoreCounter(){
        this._gameScore -= 1;
        this.node.getChildByName('ScoreLabel').getComponent(cc.Label).string = this._gameScore + '"';
        console.log('Gamescore is ', this._gameScore);
        console.log('The label is ', this.node.getChildByName('ScoreLabel'));
        if(this._gameScore == 0) {
            //this.gameOver(false);
            this.unschedule(this.scoreCounter);
            this.hero_ext.heroState ='idling';
            this.scheduleOnce(function(){ // workaround, no animationcomplete callbacks in API.
                this.gameOver(false) ;
            },1);
        }
    }

    gameOver(b: boolean){
        Globals.score = this._gameScore;
        Globals.won = b;
        this.unschedule(this.scoreCounter);
        //this.g.won = b;
        //Window.g = this._gameScore;
        cc.director.loadScene('gameover');
    }
    
    
    // mine end

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.initializeRefs();
        this.loadAssets();
    }           

    start () {
        this.gameInit();
        
    }

    update (dt) {


        // Carry out Hero's activities, monitor and refresh states. ---------------------------------------------------------------------------------------------------------

        switch (this.hero_ext.heroState){
            
            case ('walking'): {

                // contact between hero and laser, end of story. 
                if( (Math.abs(this.hero.x - this.laser_door.x) < this.hero.width/2) && this.laser_door_ext.laserBeamOn ){
                    this.hero_ext.heroState = 'dying by laser';
                    this.hero.scaleX = 1.3 * this.hero_ext.dir;
                    this.node.off(cc.Node.EventType.MOUSE_UP, this.heroLocomotion, this);
                    //this.gameOver();
                    let _this = this;
                    this.schedule(function(){ // workaround, no animationcomplete callbacks in API.
                        _this.gameOver(false) ;
                    },2); 
                    break;
                }
                
                // switches states between walking and idling based on this if condition.

                if(20 < Math.abs(this.hero.x - this._heroDestination)){   // check this... to how close to the mouse click the hero  moves.
                    
                    this.hero.x +=  this.hero_ext.dir * this.hero_ext.speed;
                    this.hero.scaleX = Math.abs(this.hero.scale) * this.hero_ext.dir ;
                }
                else{
                    this.hero_ext.heroState = 'idling';

                    // this is a gameover condition. checking of the hero has managed to rech the weed.
                    if(this.hero.x > this.node.width/2 - this.hero.width){
                        this.scheduleOnce(function(){ // workaround, no animationcomplete callbacks in API.
                            this.gameOver(true) ;
                        },.5);
                    }   
                    
                    // Calculating hero's proximity, to be eligible to operate pods when he has come to a stop. 
                    // This is run only once when the hero enters his idle mode.



                    console.log('The hero width is ', this.hero_ext.heroWidth);

                    if(Math.abs(this.hero.x - this.tpDoor.x) < 1.5 * this.hero_ext.heroWidth){
                        
                        this.tpDoor.getComponent(cc.Button).enabled = true;
                        this.tpDoor_ext.isEnabled = true;
                    }
                    

                    if(Math.abs(this.hero.x - this.tpLaser.x) < 1.5 * this.hero_ext.heroWidth){
                        
                        this.tpLaser.getComponent(cc.Button).enabled = true;
                        this.tpLaser_ext.isEnabled = true;
                    }
                    
                }

                //console.log('difference is ', Math.abs(this.hero.x - this._heroDestination));
                break;
            }

            case ('idling'):{
                break;
            }

            case ('operating'):{
                break;
            }

            case ('dying by laser'):{
                break;
            }

            default:{
                break;
            }

        } // switch st. ends 



            //--------------------------------------------------------------------------------------------------------------------
        // Guard's activities
        switch(this.guard_ext.guardState){
            
            case ('patrolling'):{
                if( ( Math.abs(this.guard.x - this.laser_door.x) < this.guard.width/2 ) && this.laser_door_ext.laserBeamOn ){
                    this.guard_ext.guardState = 'dying';
                    this.guard_ext.dir = -this.guard_ext.dir;
                    this.guard.scaleX = 1.3 * this.guard_ext.dir;
                    this.guard.y -= 10; 

                    break;
                }
                // showdown-----------------------------------------------------------------------------------------------------------
                if(this.slide_door_ext.slideDoorOpen && this.guard_ext.dir == -1){
                    this.guard_ext.guardState = 'shooting';
                    this.hero_ext.heroState = 'dying by bullet';
                    this.hero.scaleX = -1.3 ;//* this.hero_ext.dir;
                    this.hero.x -= 50;
                    
                    let _this = this;
                    this.schedule(function(){ // workaround, no animationcomplete callbacks in API.
                        _this.gameOver(false) ;
                    },2);  
                    //schedule this.gameOver();
                    break;
                }//--------------------------------------------------------------------------------------------------------------------
                if(this.guard.x > 500 || this.guard.x < 100) // Guard moves between x c (750, 1110)
                    this.guard_ext.dir = -this.guard_ext.dir;
                this.guard.x += this.guard_ext.dir * this.guard_ext.speed;
                this.guard.scaleX = 1.3 * this.guard_ext.dir;
                break;
            }
            case ('shooting'):{
                break;
            }
            case ('dying'):{
                break;
            }
            default:{
                break;
            }
        }// guard switch statement ends here

        
    } // LIFECYCLE update fn. ends


} // class def. ends.

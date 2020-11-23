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


// Terminal Pods' events.

const pod_slide_door_event = 'TPod1';
const pod_laser_door_event = 'TPod2';

//``````````````````````````````````````````````````````````````````````````


@ccclass
export default class Game extends cc.Component {

    /*
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    */

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
    
    private _heroStart: number; // starting x coordinate, for calculating direction.

    private _heroDir: number; // for scaling hero -1 or 1, to face left or right.
    
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
        this.tpDoor_ext = this.node.getComponent('TPod');

        this.tpLaser = this.node.getChildByName('TPod2');
        this.tpLaser_ext = this.node.getComponent('TPod');

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
        
        // listeners registered for custom events broadcast from mouse clicks on TPods.

        this.node.on(CustomEvents.POD_SLIDE_DOOR_EVENT, function (event:cc.Event.EventMouse) {
            console.log('slide door activated');
            _this.slide_door_ext.slideDoorOpen = !_this.slide_door_ext.slideDoorOpen;
            event.stopPropagation();
          });

        this.node.on(CustomEvents.POD_LASER_DOOR_EVENT, function (event:cc.Event.EventMouse) {
            console.log('laser beam activated');
            _this.laser_door_ext.laserBeamOn = !_this.laser_door_ext.laserBeamOn && _this.slide_door_ext.slideDoorOpen;
            event.stopPropagation();
          });
        
        // mouse event listener registered for moving hero.

        this.node.on(cc.Node.EventType.MOUSE_UP, function(event:cc.Event.EventMouse){
            
            _this.hero_ext.setHeroState('walking');
            
            _this._heroDestination = event.getLocationX();
            
            _this._heroStart = this.node.x;
            
            _this._heroDir = Math.abs(this._heroStart - this._heroDestination)/(this._heroStart - this._heroDestination);

            console.log('destination coordinate', _this._heroDestination);
            console.log('start coordinate', _this._heroStart);
            
            console.log('hero direction ',_this._heroDir);

        
        },this)

        return;
    }
    
    
    // mine end

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.initializeRefs();
        this.loadAssets();
        this.addEventListeners();

        this._heroDestination = null;
        this._heroStart = this.node.x;

    }           

    start () {
        //
    }

    update (dt) {


        // Calculate destination.



        // Hero's activities.
        switch (this.hero_ext.getHeroState()){
            case ('walking'): {
                if(0 < Math.abs(this.node.x - this._heroDestination))
                    this.hero_ext.node.x += 0;//this._heroDir * this.hero_ext.speed;
                else this.hero_ext.setHeroState('idling');
                break;
            }
            case ('idling'):{
                break;
            }
            case ('operating'):{
                break;
            }
            default:{
                break;
            }
        } // switch st. ends


        // calculating hero's proximity to be eligible to click pods.



    } // update fn. ends


} // class def. ends.

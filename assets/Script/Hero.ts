// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {KLIPS} from './config/Klips';
import {CustomEvents} from './CustomEvents';

@ccclass
export class Hero extends cc.Component {

    /*
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';*/

    private animationComponent: cc.Animation;

    //private _isOperating: boolean;
    //private _inLocomotion: boolean;
    private _speed : number;// = 5;
    private _dir: number;
    private animSt: cc.AnimationState;
    private _heroState: string;
    private _heroWidth: number;

    /**
     * get walking speed
     */
    public get speed(): number {
        return this._speed;
    }

    /**
     * get facing direction
     */
    public get dir(): number {
        return this._dir;
    }

    /**
     * set facing direction
     */
    public set dir(n: number) {
        this._dir = n;
    }

    public get heroWidth(): number{
        return this._heroWidth;
    }


    

    public get heroState(): string {
        return this._heroState;
    
    }

    public set heroState(s: string){
        
        this._heroState = s;

        switch(this._heroState){
            case ('idling'):{
                this.animSt = this.animationComponent.play(KLIPS.hero_idle_klip);
                this.animSt.wrapMode = cc.WrapMode.Loop; 
                break;
            }

            case ('walking'):{
                this.animSt = this.animationComponent.play(KLIPS.hero_walk_klip);
                this.animSt.wrapMode = cc.WrapMode.Loop;
                break;
            }

            case ('operating'):{
                this.animSt = this.animationComponent.play(KLIPS.hero_accessing_pod_klip);
                this.animSt.wrapMode = cc.WrapMode.Normal;
                let _this = this;
                this.animationComponent.scheduleOnce(function(){ // workaround, no animationcomplete callbacks in API.
                    _this.heroState = 'idling' ;
                },1);
                console.log('HERO OPERATING ', this._heroState);
                break;
            }
            case ('dying by laser'):{
                this.animSt = this.animationComponent.play(KLIPS.hero_death_through_laser_klip);
                this.animSt.wrapMode = cc.WrapMode.Normal;
                console.log('Hero dying by laser');
                this.animationComponent.scheduleOnce(function(){ // workaround, no animationcomplete callbacks in API.
                    this.node.destroy() ;
                },1);  
                
                break;
            }
            case ('dying by bullet'):{
                this.animSt = this.animationComponent.play(KLIPS.hero_death_by_bullet_klip);
                this.animSt.wrapMode = cc.WrapMode.Normal;
                console.log('Hero dying by bullet');
                this.animationComponent.scheduleOnce(function(){ // workaround, no animationcomplete callbacks in API.
                    this.node.destroy() ;
                },1);  
                
                break;
            }

            default:{
                console.log('HERO ASTRAY ', this._heroState);
                break;

            }

        }

        return;
    }


    
    /**
     * addclips
     */
    public addclips(framesDict) {
        console.log('To test');
        console.log(framesDict.hero_entry_fr);
        
        for(let anim in framesDict){
            console.log("The frames are ", anim);
            var clip = cc.AnimationClip.createWithSpriteFrames(framesDict[anim], framesDict[anim].length);
            clip.name = anim;
            clip.wrapMode = cc.WrapMode.Loop;
        
            this.animationComponent.addClip(clip);
        }
        //this.animationComponent.play(KLIPS.hero_idle_klip);
        this.heroState = 'idling';
        
        return;
    }

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this._isOperating = false;//this._inLocomotion = false;//false;
        this.animationComponent = this.node.addComponent(cc.Animation);
        this._heroWidth = this.node.width;
        //this.setHeroState('idling');
        //this._speed = 2;
        
    }

    start () {
        this._speed = 2;
        this._dir = 1;
        this.heroState = ''; // workaround for the animation clips loading latency issue. Unless _herostate is changed from empty to 'idling', 
                              // which happens after clips are loaded in addclips function, mouse eventlistener function in game class won't  
                              // play any clip now.
    }

    // update (dt) {}
}

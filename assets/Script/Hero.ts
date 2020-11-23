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
    private animSt: cc.AnimationState;
    private _heroState: string;

    /**
     * get walking speed
     */
    public get speed(): number {
        return this._speed;
    }


    /*
    /**
     * get heroIsEngaged - true if operating pod, false otherwise.
     
    public get isOperating(): boolean {
        return this._isOperating;
    }

    public set isOperating(t: boolean){
        this._isOperating = t; 
        this.animSt = this.animationComponent.play(KLIPS.hero_accessing_pod_klip);
        this.animSt.wrapMode = cc.WrapMode.Normal;
        return;
    }

    /**
     * get inLocomotion
     
    public get inLocomotion(): boolean {
        return this._inLocomotion;
        
    } 
    
    public set inLocomotion(t: boolean)  {
        this._inLocomotion = t;
        if(this._inLocomotion){
            this.animSt = this.animationComponent.play(KLIPS.hero_walk_klip);
            this.animSt.wrapMode = cc.WrapMode.Loop;
        }else{
            this.animSt = this.animationComponent.play(KLIPS.hero_idle_klip);
            this.animSt.wrapMode = cc.WrapMode.Loop;
        }
        return;
    }

    */

    public getHeroState(): string {
        return this._heroState;
    
    }

    public setHeroState(s: string){
        
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
        this.setHeroState('idling');
        
        return;
    }

    addEventListeners() {
        this.node.on(CustomEvents.POD_SLIDE_DOOR_EVENT, function(event){
            this.inLocomotion = false;
            this.isOperating = true;
        },this)
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this._isOperating = false;//this._inLocomotion = false;//false;
        this.animationComponent = this.node.addComponent(cc.Animation);
        //this.setHeroState('idling');
        this._speed = 2;
        
    }

    // start () {}

    // update (dt) {}
}

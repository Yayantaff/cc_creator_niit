// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {KLIPS} from './config/Klips';

@ccclass
export class Guard extends cc.Component {

    /*
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    */

    private _speed: number;

    private _dir: number;

    private animSt: cc.AnimationState;

    private animationComponent: cc.Animation;

    private _guardState: string;

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


    public get guardState(): string{
        return this._guardState;
    }

    /**
     * setGuardState
     */
    public set guardState(s: string) {
        this._guardState = s;
        switch(this._guardState){
            case ('patrolling'):{
                this.animSt = this.animationComponent.play(KLIPS.guard_patrol_klip);
                this.animSt.wrapMode = cc.WrapMode.Loop;
                break;
            }
            case ('shooting'):{
                this.animSt = this.animationComponent.play(KLIPS.guard_shoot_klip);
                this.animSt.wrapMode = cc.WrapMode.Normal;
                //let _this = this;
                break;
            }
            case ('dying'):{
                this.animationComponent.play(KLIPS.guard_death_klip);
                //this.
                this.animationComponent.scheduleOnce(function(){ // workaround, no animationcomplete callbacks in API.
                    this.node.destroy();
                },1);
                break;
            }

            default: {
                break;
            }
        }
        
    }
    /**
     * addclips
     */
    public addclips(framesDict) {
        console.log('To test');
        console.log(framesDict.guard_patrol_fr);
        
        for(let anim in framesDict){
            console.log("The frames are ", anim);
            var clip = cc.AnimationClip.createWithSpriteFrames(framesDict[anim], framesDict[anim].length);
            clip.name = anim;
            clip.wrapMode = cc.WrapMode.Loop;
        
            this.animationComponent.addClip(clip);
        }
        this.animationComponent.play(KLIPS.guard_patrol_klip);
        this.guardState ='patrolling';
        
        
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.animationComponent = this.node.addComponent(cc.Animation);
        //this._speed = 1.3;
    }

    start () {
        this.animSt = null;
        this._speed = 1.3;
        this._guardState = '';
    }

    // update (dt) {}
}

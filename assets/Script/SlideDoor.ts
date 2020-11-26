// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {KLIPS} from './config/Klips';

@ccclass
export class SlideDoor extends cc.Component {

    /*@property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';*/

    private animationComponent: cc.Animation;
    private animSt: cc.AnimationState;

    private _slideDoorOpen: boolean;

    private _isBtnEnabled: boolean;

    /**
     * get slideDoorOpen
    */
    public get slideDoorOpen():boolean {
        return this._slideDoorOpen;
    }

    public set slideDoorOpen(t: boolean) {
        this._slideDoorOpen = t;
        //this.node.dispatchEvent( new cc.Event.EventCustom('TPod2', true) );
        //this.animationComponent.setCurrentTime(0);
        //this.animationComponent.stop();
        if (this._slideDoorOpen){
            //this.node.dispatchEvent( new cc.Event.EventCustom('TPod2', true) );
            this.animSt = this.animationComponent.play(KLIPS.slide_door_klip);
            this.animSt.wrapMode = cc.WrapMode.Normal;
        }
        else{
            //this.animationComponent.stop();
            this.animationComponent.setCurrentTime(0, KLIPS.slide_door_klip);
            this.animationComponent.stop(KLIPS.slide_door_klip);
        }
        return;// this._laserBeamOn;
        
    }
    
    
    

    


    /**
     * addclips
     */
    public addclips(framesDict) {
        console.log('To test');
        console.log(framesDict.slide_door_fr);
        
        for(let anim in framesDict){
            console.log("The frames are ", anim);
            var clip = cc.AnimationClip.createWithSpriteFrames(framesDict[anim], framesDict[anim].length);
            clip.name = anim;
            clip.wrapMode = cc.WrapMode.Loop;
        
            this.animationComponent.addClip(clip);
        }
        //this.animationComponent.play('slide_door');
        
        
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.animationComponent = this.node.addComponent(cc.Animation);
        this.animSt = null;
        this._slideDoorOpen = false;
    }

    start () {

    }

    // update (dt) {}
}

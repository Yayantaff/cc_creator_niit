// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {KLIPS} from './config/Klips';

@ccclass
export class LaserDoor extends cc.Component {

    /*@property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';*/

    private animationComponent: cc.Animation;
    
    private _laserBeamOn: boolean;

    private _isBtnEnabled: boolean;

    /**
     * get laserBeamOn
    */
    public get laserBeamOn():boolean {
        return this._laserBeamOn;
        
    }

    public set laserBeamOn(t: boolean) {
        this._laserBeamOn = t;
        if (this._laserBeamOn){
            let animSt = this.animationComponent.play(KLIPS.laser_door_klip);
            animSt.wrapMode = cc.WrapMode.Loop;
        }
        else{
            //this.animationComponent.stop();
            this.animationComponent.setCurrentTime(0);
            this.animationComponent.stop();
        }
        return;// this._laserBeamOn;
        
    }

    

    /**
     * addclips
     */
    public addclips(framesDict) {
        console.log('To test');
        console.log(framesDict.laser_door_fr);
        
        for(let anim in framesDict){
            console.log("The frames are ", anim);
            var clip = cc.AnimationClip.createWithSpriteFrames(framesDict[anim], framesDict[anim].length);
            clip.name = anim;
            clip.wrapMode = cc.WrapMode.Loop;
        
            this.animationComponent.addClip(clip);
        }
        //this.animationComponent.play('laser_door');
        
        
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.animationComponent = this.node.addComponent(cc.Animation);
        this._laserBeamOn = false;
    }

    start () {

    }

    // update (dt) {}
}

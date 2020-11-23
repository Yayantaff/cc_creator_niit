// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class TPod extends cc.Component {

    /*
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    */

    private _isEnabled: boolean = false;

    private toggleState: string = 'set';

    /** accessors
     * isEnabled is true, if hero is in suffient proximity to the switch.
     */
    get isEnabled(): boolean {
        return this._isEnabled;
        
    }

    set isEnabled(operable: boolean){
        this._isEnabled = operable;
    }

    //private animationComponent: cc.Animation;

    // Methods

    //this.node.on(cc.Node.EventType.MOUSE_UP, )

    public addStates(statesDict) {
        console.log('To test');
        console.log(statesDict);
        /*
        for(let state in statesDict){
            console.log("The frames are ", state);
            var btn = cc.Button.EventHandler.
            clip.name = anim;
            clip.wrapMode = cc.WrapMode.Loop;
        
            this.animationComponent.addClip(clip);
        }
        this.animationComponent.play('laser_door');
        */
        
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_UP, function(event){
        //if(this._isEnabled)
            this.node.dispatchEvent( new cc.Event.EventCustom(this.node.name, true) );
        
        },this)
    }

    start () {

    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class TPod extends cc.Component {

    
    private _isEnabled: boolean = false;

    private toggleState: string = 'set';

    private _scaled: number;

    private timeIntegrated: number;

    private blink: boolean;

    /** accessors
     * isEnabled is true, if hero is in suffient proximity to the switch.
     */
    public get isEnabled(): boolean {
        return this._isEnabled;
        
    }

    public get scaled():number {
        return this._scaled;
    }

    public set isEnabled(b: boolean){
        this._isEnabled = b;
        this.blink = true;
        this.node.getComponent(cc.Button).enabled = this._isEnabled;
        return;
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
        if(this.isEnabled)
            this.node.dispatchEvent( new cc.Event.EventCustom(this.node.name, true) );
            this.blink = false;
            this.node.scale = this._scaled;
            this.timeIntegrated = 0;
        },this)
    }

    start () {
        this._scaled = this.node.scale;
        this.timeIntegrated = 0;
        this.blink = false;
    }

    update (dt) {
        if(this.isEnabled && this.blink) this.node.scale = .08*Math.sin(Math.PI*this.timeIntegrated)*this._scaled + this._scaled;
        this.timeIntegrated += 10 *   dt;
    }
}

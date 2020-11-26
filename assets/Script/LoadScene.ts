const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private scene;
    private bundle;
    private _this;

    /**
     * playGame
     */
    public playGame() {
       // cc.director.runScene(this.scene);
       cc.assetManager.loadBundle('Scene', function(err, bundle){
        bundle.loadScene('maingame', function(err, scene){
                cc.director.runScene(scene);
            });
        });
        console.log('Button pressed');
        
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {
        
    }

    // update (dt) {}
}

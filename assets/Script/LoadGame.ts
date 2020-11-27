const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadGame extends cc.Component {

    private scene: cc.Scene;
    
    /**
     * playGame
     */
    public playGame() {
        cc.director.loadScene('maingame', function(err, scene){
            //cc.director.runScene(scene);
        });
        console.log('Button pressed');
        return;
        
    }
    public showInstr(){
        
        this.node.getParent().getChildByName('Instructions').active = true;
        
        this.node.getParent().getChildByName('Show_Instruction_Btn').active =  false;
        return;
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene('maingame');
    }

    start () {
        this.node.getParent().getChildByName('Instructions').active = false;

    }

    // update (dt) {}
}

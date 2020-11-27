import Globals from './Globals';

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayAgain extends cc.Component {

    
    private scene: cc.Scene;

    
    
    /**
     * playGame
     */
    public playGame() {
       cc.director.loadScene('maingame');
       return;
    }
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene('maingame');
        console.log('The persistent node is ', Globals.score);
        console.log('Won ? ', Globals.won);
        
    }

    start () {
        if(Globals.won)
            this.node.getParent().getChildByName('Display_Score').getComponent(cc.Label).string = 'Good! You score ' + (30 - Globals.score) + '.';
        else this.node.getParent().getChildByName('Display_Score').getComponent(cc.Label).string = 'Give it another try.';

    }

    // update (dt) {}
}

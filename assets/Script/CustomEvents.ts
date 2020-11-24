// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class CustomEvents extends cc.Component {

    public static POD_LASER_DOOR_EVENT = 'TPod2';
    public static POD_SLIDE_DOOR_EVENT = 'TPod1';
    
}

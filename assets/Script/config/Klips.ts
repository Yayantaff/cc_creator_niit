// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export  class KLIPS extends cc.Component {

    // Dictionary keys for clips in Game.ts
    public static hero_entry_klip = 'hero_entry_fr';
    public static hero_idle_klip = 'hero_idle_fr';
    public static hero_walk_klip = 'hero_walk_fr';
    public static hero_accessing_pod_klip = 'hero_accessing_pod_fr';
    public static hero_death_by_bullet_klip = 'hero_death_by_bullet_fr';
    public static hero_death_through_laser_klip = 'hero_death_through_laser_fr';

    public static guard_patrol_klip = 'guard_patrol_fr';
    public static guard_shoot_klip = 'guard_shoot_fr';
    public static guard_death_klip = 'guard_death_fr';

    public static slide_door_klip = 'slide_door_fr';

    public static laser_door_klip = 'laser_door_fr';


    // Corresponding art nomenclatures
    public static hero_entry_img = 'Hero starting walk';
    public static hero_idle_img = 'Hero idle';
    public static hero_walk_img = 'Hero walk';
    public static hero_accessing_pod_img = 'Accessing_pod';
    public static hero_death_by_bullet_img = 'Death by bullet';
    public static hero_death_through_laser_img = 'Death through laser';

    public static guard_patrol_img = 'Shooting';
    public static guard_shoot_img = 'Recoil after shooting';
    public static guard_death_img = 'death of security guard';

    public static slide_door_img = 'slide up door';

    public static laser_door_img = 'Laser beam';


    
}

`````````````````````````
Cocos Creator NIIT


This is a Cocos Creator Version 2.4.2 game.


This project uses Typescript.



Source program structure: (Inside Assets/Script)



  __                __
-| _|_--Script_____| _|_ --config
 |/__/         |   |/__/    |
	       |            |
	       |            |_____ KLIPS.ts  -> Configuration for nomenclature of images mainly. Static properties.
	       |
	       |
	       |_____ Hero.ts -> Hero class, of the hero character. Adding and playing animations done from inside this class. Also speed, facing direction and                  |                 state of activity.
	       |
	       |
	       |_____ Guard.ts -> Hero class, of the guard character. Adding and playing animations done from inside this class. 
	       |
	       |
	       |_____ Slidedoor.ts -> Door (opened upon operating pod). Adding and playing animations done from inside this class.
	       |
	       |
	       |_____ Laserbeam.ts -> Laserbeam (activated and deactivated by operating pod)class, Adding animations done from inside this class.
	       |
	       |
	       |_____ TPod.ts -> Terminal pod class. Enabling and disabling pods done from inside this class.
	       |
	       |
	       |_____ Game.ts -> Maingame class, this is the game controller, much of the game logic is implemented here.
	       |
	       |
	       |_____ Global.ts -> Carrying global values, score across scenes.
               |
	       |
	       |_____ CustomEvents.ts -> Carries the signatures of custom events(on terminal pod click to notify other game element nodes.). 
               |
               | 
	       |_____ Loadscene.ts -> Loads the main game, before showing a walkthrough instruction screen.
               |
	       |
	       |_____ PlayAgain.ts -> Playing again - loads the main scene once again, shows the score and a display message.
		



Scource code installation 



This source carries only the local system independant program assets. Following the steps below is the best way to see the code running in the Cocos Editor.

* Create a new 2.4.2 project in Cocos Creator.

* Download the zip version of this source, extract, and copy the contents into the newly created project folder. (Replace files in the new project.)

The editor should normally update.

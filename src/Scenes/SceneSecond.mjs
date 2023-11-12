import Phaser from "phaser";

//temp
// import varNamesArray from "../common/variableNames/varNamesArray.mjs";

import VarManager from "../modules/VarsManager/VarManager.mjs";

export default class SceneSecond extends Phaser.Scene
{
  offset = 2;

  eventZdown = Phaser.Input.Keyboard.Events.KEY_DOWN + 'Z'; //Phaser.Input.Keyboard.KeyCodes.Z;

  vars = VarManager;

    constructor()
    {
        super({
              key: 'SceneSecond',
              active: false,
              visible: false,
              plugins: [
                'Clock',  //this.time
                //'DataManagerPlugin',  //this.data
                'InputPlugin',  //this.input
                'Loader',  //this.load
                //'TweenManager',  //this.tweens
                //'LightsPlugin'  //this.lights
                ],
              cameras:
              {
                backgroundColor: "#225",
                height: 128,
                x: 100
              }
            })
    }

    preload()
    {
        this.load.image('bitsy', 'assets/bitsy-6x8.png');
    }

    create()
    {
        // this.add.image(0, 0, 'background').setOrigin(0).setAlpha(.7);
        
        this.text = this.buildBmFont().setText("Second");
        
        // this.input.on('pointerdown', this.testVarsOnClick, this);
        
        this.input.keyboard.on(this.eventZdown, this.keyListener, this); //Phaser.Input.Keyboard.KeyCodes.Z)
        this.events.once('create', this.disable, this);


    }

    disable()
    {
        console.clear();
        console.log("Just created scene 2.\nDisabling scene 2");
        this.scene.pause();//sleep();
    }

    keyListener(evnt, b)
    {
      console.log("Second?", b);

      console.dir(evnt);
    }

    // Don't forget these three methods (readVar, setVar, toggleBit)!
    readVar(kind, varIdx)
    {
        return this.vars.handleVar(kind, varIdx);
    }

    setVar(kind, varIdx, newValue)
    {
        return this.vars.handleVar(kind, varIdx, newValue);
    }

    toggleBit(varIdx, kind = 0)
    {
      return this.vars.handleVar(kind, varIdx, null, true);
    }

    buildBmFont()
    {
        console.log("SECSCENE BUILDING TEXT")
    //   const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ,.:;"!abcdefghijklmnopqrstuvwxyz?+-*/= 0123456789'&$|_àèìòù#^><%()[]`;
        
    //   const config = {
    //     image: 'bitsy',
    //     width: 6,
    //     height: 8,
    //     chars: chars,
    //     charsPerRow: 32,
    //     //spacing: { x: 1, y: 1 }
    //   }
        
    //   this.cache.bitmapFont.add('bitsy', Phaser.GameObjects.RetroFont.Parse(this, config));

      return this.add.bitmapText(this.offset, this.offset, 'bitsy', 'SEC').setOrigin(0);
    }
}

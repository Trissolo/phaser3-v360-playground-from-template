import Phaser from "phaser";

// import VarManager from "../modules/VarsManager/VarManager.mjs";

export default class SceneB extends Phaser.Scene
{
  offset = 2;

    constructor()
    {
        super({
              key: 'SceneB',
              active: true,
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
                backgroundColor: "#255"//,
                //height: 128
              }
            })
    }

    init()
    {
        this.events.once('create', () => { 
            console.log("B", this.scene.getStatus(this));
            this.scene.sleep(this);
            console.log("B sleeping:", this.scene.getStatus(this));
        });
    }

    init()
    {
        console.log('init', this.sys.settings.key);
        this.events.once('create', () => {
            console.log("on create", this.sys.settings.key, this.scene.getStatus(this));
            this.scene.sleep(this);
            
        });
    }

    preload()
    {
        console.log('preload', this.sys.settings.key);
        this.load.image('bitsy', 'assets/bitsy-6x8.png');
    }

    create()
    {
        console.log('create', this.sys.settings.key);

        // this.add.image(0, 0, 'background').setOrigin(0).setAlpha(.7);


        // this.input.on('pointerdown', this.testVarsOnClick, this);

        // this.input.keyboard.on('keydown-Z', this.keyListener, this); //Phaser.Input.Keyboard.KeyCodes.Z)

    }

    // keyListener(evnt, b)
    // {
    //   // console.log("Second?", b);

    //   console.dir(evnt);
    // }

    // Don't forget these three methods (readVar, setVar, toggleBit)!
    // readVar(kind, varIdx)
    // {
    //     return this.vars.handleVar(kind, varIdx);
    // }

    // setVar(kind, varIdx, newValue)
    // {
    //     return this.vars.handleVar(kind, varIdx, newValue);
    // }

    // toggleBit(varIdx, kind = 0)
    // {
    //   return this.vars.handleVar(kind, varIdx, null, true);
    // }

}

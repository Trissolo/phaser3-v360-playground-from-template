import Phaser from "phaser";

//temp
import varNamesArray from "../common/variableNames/varNamesArray.mjs";

import VarManager from "../modules/VarsManager/VarManager.mjs";

export default class SceneVariablesTest extends Phaser.Scene
{
  offset = 2;
  tempVarIdx = -1;
  vars = VarManager;

    constructor()
    {
        super({
              key: 'Viewscreen',
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
                backgroundColor: "#252",
                height: 128
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

        this.text = this.buildBmFont();

        this.input.on('pointerdown', this.testVarsOnClick, this);

        // this.testVarsOnClick();

        // // quick test;
        // const knd = 2;

        // const cont = this.vars.varContainers.get(knd);

        // //some value
        // const numb = 564644654
        // cont.typedArray[0] = numb;

        // const res = this.readVar(knd, 7);
        // console.log(`All: ${this.vToString(numb)}\nRES: ${this.vToString(res, cont.varSize)}`);

    }

    // Don't forget these three methods (readVar, setVar, toggleBit)!
    readVar(kind, varIdx)
    {
        return this.vars.newHandleAny(kind, varIdx);
    }

    setVar(kind, varIdx, newValue)
    {
        return this.vars.newHandleAny(kind, varIdx, newValue);
    }

    toggleBit(varIdx, kind = 0)
    {
      return this.vars.newHandleAny(kind, varIdx, null, true);
    }


  testVarsOnClick(pointer)
  {
    // the container:
    const kind = 3;

    const currContainer = this.vars.varContainers.get(kind);

    const currTypedArray = currContainer.typedArray;

    //then: increment!
    this.tempVarIdx += 1;

    if (this.tempVarIdx > currContainer.lastIdxAllowed)
    {
      this.tempVarIdx = currContainer.lastIdxAllowed;

      this.cameras.main.setBackgroundColor(0x402510);
    }

    //test toggle
    this.toggleBit(this.tempVarIdx < 32? 30:40);
    
    // console.dir(currContainer);
    
    const {x, y} =  this.vars.betterGetXY(kind, this.tempVarIdx) ?? {x:0, y:currTypedArray.length - 1}
    
    this.setVar(kind, this.tempVarIdx, currContainer.bitmask);

    this.text.setText([
      `Var Idx: ${this.tempVarIdx}`,
      `maxIDXAllowed: ${currContainer.lastIdxAllowed}`,
      `Name: ${varNamesArray[kind][this.tempVarIdx]}`,
      // `Max: ${currContainer.maximumCapacity}`,
      `Len: ${currTypedArray.length}`,
      `\nAry[${y}][${x}]\n${this.vToString(/*currTypedArray[0])}`//*/y!==null?currTypedArray[y]:currTypedArray[currTypedArray.length - 1])}`
    ]);
   
  }

  vToString(num, tot = 32) // kind = 0, y = 0, cont = this.varsManager.varContainers.get(kind))
    {
        // return cont.typedArray[y].toString(2).padStart(32, "0");
        return num.toString(2).padStart(tot, "0");
    }

    buildBmFont()
    {
      const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ,.:;"!abcdefghijklmnopqrstuvwxyz?+-*/= 0123456789'&$|_àèìòù#^><%()[]`;
        
      const config = {
        image: 'bitsy',
        width: 6,
        height: 8,
        chars: chars,
        charsPerRow: 32,
        //spacing: { x: 1, y: 1 }
      }
        
      this.cache.bitmapFont.add('bitsy', Phaser.GameObjects.RetroFont.Parse(this, config));
      return this.add.bitmapText(this.offset, this.offset, 'bitsy', '0'.repeat(32)+"]").setOrigin(0);
    }
}

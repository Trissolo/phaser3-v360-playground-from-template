import Phaser from "phaser";

//temp
import boolNames from "../common/variableNames/boolNames.mjs";

import VarManager from "../modules/VarsManager/VarManager.mjs";

export default class VariablesTest extends Phaser.Scene
{
  offset = 2;
  tempVarIdx = 0;
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

    toggleBit(kind, varIdx)
    {
      return this.vars.newHandleAny(kind, varIdx, null, true);
    }


  testVarsOnClick(pointer)
  {
      const kind = 3;

      const currContainer = this.vars.varContainers.get(kind);

      const currTypedArray = currContainer.typedArray;

      console.log("CONTAINER", currContainer);

      console.log("Setting VALUE:", this.setVar(kind, this.tempVarIdx, currContainer.bitmask), currTypedArray);

      // this.toggleBit(0, 14);

      this.text.setText([
        `TEST CLICK`,
        `TEMPVARIDX: ${this.tempVarIdx} - KIND ${kind}, Max: ${currContainer.maximumCapacity}\nLen: ${currTypedArray.length}\nmaxIDXAllowed: ${currContainer.lastIdxAllowed}`]);

      for (let [i, val] of currTypedArray.entries())
      {
        this.text.text +=`\n(${i}\n${this.vToString(val)}\n`;
      }

      // this.setVar(kind, this.tempVarIdx, 0);

      this.tempVarIdx++;
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
      return this.add.bitmapText(this.offset, 0, 'bitsy', '0'.repeat(32)+"]").setOrigin(0);
    }
}

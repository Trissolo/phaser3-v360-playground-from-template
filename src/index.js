import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import SceneVariablesTest from './Scenes/SceneVariablesTest.mjs';

import SceneBase from './Scenes/SceneBase.mjs';

// class MyGame extends Phaser.Scene
// {
//     constructor ()
//     {
//         super();
//     }

//     preload ()
//     {
//         //  This is an example of a bundled image:
//         this.load.image('logo', logoImg);

//         //  This is an example of loading a static image from the public folder:
//         this.load.image('background', 'assets/bg.jpg');
//     }
      
//     create ()
//     {
//         this.add.image(400, 300, 'background');

//         const logo = this.add.image(400, 150, 'logo');
      
//         this.tweens.add({
//             targets: logo,
//             y: 450,
//             duration: 2000,
//             ease: "Power2",
//             yoyo: true,
//             loop: -1
//         });
//     }
// }

const config = {
    // type: Phaser.WEBGL,
    pixelArt: true,
    backgroundColor: '#320822',
    disableContextMenu: true,
    parent: 'phaser-example',
    scale:
    {
        mode: Phaser.Scale.NONE,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 256,
        height: 200,
        zoom: 3
    },
    scene: SceneBase // SceneVariablesTest
};

const game = new Phaser.Game(config);

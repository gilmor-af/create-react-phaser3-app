import Phaser from 'phaser'

export interface Reflection {
  id: string;
  reflection_date: string;
  name: string;
  created_at: string;
}

export interface Goal {
  id: string;
  parent_id: string | null;
  name: string;
  type: string;
  created_at: string;
  updated_at?: string;
  status?: string;
  completed_at?: string;
  user_id: string;
}

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('helloworld')
  }

  logo!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  logo2!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  logo3!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  // For recycling
  rect1 = new Phaser.Geom.Rectangle();
  rect2 = new Phaser.Geom.Rectangle();
  overlap = new Phaser.Geom.Rectangle();

  y1 = 200;
  y2 = 600;

  xSpacing = 200;

  isPlanetOpen = false;

  planets: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] = [];
  currentPlanet?: Reflection;

  preload() {
    // this.load.setCORS('anonymous')
    this.load.setBaseURL('https://af-journey-hackathon2022.s3.eu-west-1.amazonaws.com/')
    this.load.image('logo', 'Assets/spaceship1@4x.png')

    this.load.image('red', 'Assets/red.png')
    this.load.image('planet1', 'Assets/star1@4x.png')
    this.load.image('planet2', 'Assets/star2@4x.png')
    this.load.image('planet3', 'Assets/star3@4x.png')
    this.load.image('planet4', 'Assets/star4@4x.png')
    this.load.image('planet5', 'Assets/star5@4x.png')
    this.load.image('planet6', 'Assets/star6@4x.png')
    this.load.image('planet7', 'Assets/star7@4x.png')
    this.load.image('planet8', 'Assets/star8@4x.png')
    this.load.image('planet9', 'Assets/star9@4x.png')

    this.load.image('background', './Assets/Artboard 1@4x.png');
    // this.load.spritesheet('planet', '5466_2_50_360x180.jpeg', { frameWidth: 60, frameHeight: 60, startFrame: 3, endFrame: 5 });
  }

  positions = [
    { x: 200, y: 200 },
    { x: 350, y: 650 },
    { x: 630, y: 180 },
    { x: 790, y: 575 },
    { x: 1140, y: 150 },
    { x: 1230, y: 660 },
    { x: 1490, y: 200 },
    { x: 1610, y: 600 },
  ]

  start(planetsData: Reflection[]) {
    for (let index = 0; index < planetsData.length; index++) {
      const sprite = this.physics.add.image(this.positions[index].x, this.positions[index].y, 'planet' + (index + 1))
        .setInteractive()
        .setDepth(0);
      sprite.on('pointerdown', (pointer: any) => {
        this.isPlanetOpen = false;
        this.logo2 = sprite;
        this.currentPlanet = planetsData[index];
        this.physics.moveToObject(this.logo, sprite, 300);
        const angleDeg = Math.atan2(this.logo.y - sprite.y, this.logo.x - sprite.x) * 180 / Math.PI;
        this.logo.angle = angleDeg - 90 // container should face the center point
      });
      sprite.scale = 0.1;
      this.planets.push(sprite);
    }
  }

  create() {
    this.createEmitter()
  }

  createEmitter() {
    this.add.image(900, 300, 'background').setScale(0.15, 0.15);

    const particles = this.add.particles('red')

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    })

    this.logo = this.physics.add.image(150, 400, 'logo').setDepth(2).setScale(0.05).setRotation(120);

    emitter.startFollow(this.logo);

    const event = new Event('phaseLoad');

    // Dispatch the event.
    dispatchEvent(event);
  }


  update() {
    this.updateLogo();
  }

  updateLogo() {
    let distance = 0;

    if (this.logo2) distance = Phaser.Math.Distance.Between(this.logo.x, this.logo.y, this.logo2.x, this.logo2.y);

    if (this.logo.body.speed > 0) {

      //  4 is our distance tolerance, i.e. how close the source can get to the target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.
      if (distance < 50) {
        // this.logo.body.reset(this.logo2.x, this.logo2.y);
        this.logo.body.speed = 0;
        this.logo.body.velocity = new Phaser.Math.Vector2();
        this.isPlanetOpen = true;
        const event = new CustomEvent('planetOpen', { detail: { ...this.currentPlanet }});
        // Dispatch the event.
        dispatchEvent(event);
      }
      this.logo.getBounds(this.rect1);
      this.logo2.getBounds(this.rect2);

      // (1) Overlap test (true/false)

      if (Phaser.Geom.Intersects.RectangleToRectangle(this.rect1, this.rect2)) {
        // console.log('INTERSECT!')
      } else {
      }

      // (2) Overlap area

      // Must clear before GetRectangleIntersection()!
      // this.overlap.setEmpty();
      // Phaser.Geom.Intersects.GetRectangleIntersection(this.rect1, this.rect2, this.overlap);
    }
  }
}

import Phaser from 'phaser'

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

  planets: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] = [];

  preload() {
    // this.load.setCORS('anonymous')
    this.load.setBaseURL('https://af-journey-hackathon2022.s3.eu-west-1.amazonaws.com/')
    this.load.image('logo', 'images/logo.svg')
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png')
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
    { x: 800, y: 600 },
    { x: 1150, y: 150 },
    { x: 1240, y: 660 },
    { x: 1500, y: 200 },
    { x: 1620, y: 600 },
  ]

  start(count: number) {
    for (let index = 0; index < count; index++) {
      const sprite = this.physics.add.image(this.positions[index].x, this.positions[index].y, 'planet' + (index + 1))
        .setInteractive()
        .setDepth(0);
      sprite.on('pointerdown', (pointer: any) => {
        this.logo2 = sprite;
        this.physics.moveToObject(this.logo, sprite, 300);
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

    this.logo = this.physics.add.image(400, 100, 'logo').setDepth(0)

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

        const event = new CustomEvent('planetOpen', { detail: { id: 'gil'}});
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

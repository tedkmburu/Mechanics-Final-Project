let planets = [];
let moons = [];
let ships = [];
let g = 6.6743 * Math.pow(10, -11); // 6.6743 × 10^-11
// let g = 0.1;
let center;
let sidePanelWidth = 500;
let timeScale = 1;
let distanceScale = Math.pow(10, 6)

let offset;
let centeredPlanet = 0;

let launched = false; 
let launchTime = 200000000;

let tableData = []

let earth, moon, sun, mars, venus, mercury, spaceship, saturn, uranus, neptune, jupiter, satellite, space, initVel;

let textToShow = "Press Space to pause and Enter to restart"

let startDate = new Date('April 19, 2022 03:24:00');
let oldDateObj = startDate;

function preload() 
{
    earth = loadImage('images/earth.png');
    spaceship = loadImage('images/ship.png');
    sun = loadImage('images/sun.png');
    mars = loadImage('images/mars.png');
    venus = loadImage('images/venus.png');
    jupiter = loadImage('images/jupiter.png');
    mercury = loadImage('images/mercury.png'); 
    uranus = loadImage('images/uranus.png'); 
    neptune = loadImage('images/neptune.png'); 
    saturn = loadImage('images/saturn.png');
    moon = loadImage('images/moon.png');
    satellite = loadImage('images/satellite.png');
    space = loadImage('images/space (3).jpg');
}

function setup()
{
    createCanvas(innerWidth, innerHeight);

    let centerX = (innerWidth) / 2;
    let centerY = innerHeight / 2;
    center = createVector(centerX, centerY)
    angleMode(DEGREES);

    initVel = createVector(0, 0)
    offset = createVector(0, 0)

    createPlanets()
    createShip()
        
    angleMode(RADIANS)

    launched = false; 
}

function draw() 
{
    // centerOnPlanet("Earth")
    background(0);

    let imageWidth = innerWidth * 2
    let imageHeight = innerHeight * 2

    image(space, -(imageWidth / 2), -(imageHeight/2), imageWidth, imageHeight);

    frameRate(60);

    

    planets.forEach(planet => 
    {
        planet.move()
        planet.display()
    })

    moons.forEach(aMoon => 
    {
        aMoon.move()
        aMoon.display()
    })

    ships.forEach(ship => { 
        ship.move()
        ship.display()
    }) 
    
    
    
    displayText()
    displayGrid()

    // timeScale = document.getElementById("timeScaleSlider").value
}

function displayText()
{
    push()
    fill(255)
    noStroke()
    textAlign(CENTER);
    textSize(32);
    textFont('Times New Roman');
    
    let timeElapsedInMin = (frameCount/(365.25 * 2)) * 525600 * timeScale * 2
    newDate = new Date(oldDateObj.getTime() + timeElapsedInMin * 60000);
    let year = newDate.getFullYear()
    let day = newDate.getDay()
    let month = newDate.toLocaleString('default', { month: 'long' })
    textToShow = month + " " + day + ", " + year
    fill(255)
    text(textToShow, center.x, 60)

    year = startDate.getFullYear()
    day = startDate.getDay()
    month = startDate.toLocaleString('default', { month: 'long' })
    textToShow = month + " " + day + ", " + year
    fill(255/2)
    text(textToShow, center.x, 30)
pop()
}

function centerOnPlanet(name)
{
    let planetToCenter = planets.findIndex(mass => mass.name == name)
    // console.log(planetToCenter);
    offset = center.copy().sub(planets[planetToCenter].pos.copy())
    
}

// function checkCollision()
// {

//     let collide = false; 
//     let satel = planets[7];
//     let mass = planets[0];

//     let distanceBetweenCirlces = satel.pos.dist(mass.pos);
//     if (distanceBetweenCirlces < mass.radius)
//     {
//         collide = true;
//     }

//     mass = planets[1];

//     distanceBetweenCirlces = satel.pos.dist(mass.pos);
//     if (distanceBetweenCirlces < mass.radius)
//     {
//         collide = true;
//     }

//     // console.log(collide);    

    
// }

function displayGrid() // displays background grid
{
    gridSize = 50
    let stepSize = gridSize / (distanceScale / 500000)
    push();
        stroke("rgba(255,255,255,0.125)"); // gray color for the grid
        for (let x = (innerWidth/2) - 1000; x <= innerWidth; x+= gridSize)
        {
            line(x, 0, x, innerHeight);
        }
        for (let y = (innerHeight/2) - 1000; y < innerHeight; y+= gridSize)
        {
            line(0, y, innerWidth, y);
        }

        // stroke("rgba(255,255,255,0.5)"); // gray color for the grid
        // line(0, center.y, innerWidth, center.y);
        // line(center.x, 0, center.x, innerHeight);
        
    pop();
}

function createArrow(start, end, angle, color, scale)
{
    push();
        stroke(color);
        strokeWeight(scale * 4);
        noFill();
        line(start.x, start.y, end.x, end.y);

        translate(end.x, end.y)
        angleMode(DEGREES)
        rotate(angle);
        // console.log(angle);
        fill(color);

        triangle(0, 0, -10 * scale, -5 * scale, -10 * scale, 5 * scale);
    pop();
}

function drawArrow(base, vec, myColor) 
{
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}


function mouseClicked() 
{
    // if (launched) 
    // {
    //     setup()    
    // }
    // else
    // {
    //     launch()
    // }
    ships.forEach(ship => { 
        // console.log(ship.netForce());
        ship.move()
        ship.display()
    })     
}

function mouseWheel(event) 
{
    let scaleFactor = event.delta == -100 ? 0.5 : 2;
    distanceScale *= scaleFactor
    createPlanets()
    // console.log(distanceScale);
    // print(event.delta);
}

function keyPressed() 
{
    if (keyCode === UP_ARROW) 
    {
        let scaleFactor = 0.5;
        distanceScale *= scaleFactor
        createPlanets()
    } 
    else if (keyCode === DOWN_ARROW) 
    {
        let scaleFactor = 2;
        distanceScale *= scaleFactor
        createPlanets()
    }
  }

function launch()
{
    console.log("launch");

    launched = true;

    // planets[2].vel = initVel.copy()
    
    // let lauchPlanet = planets.find(mass => mass.name == "Earth")

    
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
    let centerX = (innerWidth - sidePanelWidth) / 2;
    let centerY = innerHeight / 2;
    center = createVector(centerX, centerY)
    // maplanetssses[0].pos = center;
}
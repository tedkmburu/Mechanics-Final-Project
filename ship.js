function createShip()
{
    ships = []

    ships.push(new Ship({
        pos: p5.Vector.fromAngle(1 * Math.PI * 2, (227.9 * Math.pow(10, 6)) / distanceScale).add(center),
        vel: p5.Vector.fromAngle(30, (2285714285 * timeScale) / distanceScale),
        name: "SpaceShip",
        radius: 224 * 2,
        mass: 149685.482,
    }));
}

class Ship
{
    constructor(props)
    {
        this.pos = props.pos || createVector(0, 0);
        this.vel = props.vel || createVector(0, 0);
        this.acc = props.acc || createVector(0, 0);
        this.mass = props.mass || 1;
        this.color = props.color || "white";
        
        this.radius = props.radius / distanceScale;
        
        this.name = props.name || "No Name";

        this.image = eval(this.name.toLowerCase())
    }
    
    display = function()
    {
        let ship = this;
        push()
            noStroke()
            fill(ship.color)
            ellipse(ship.pos.x, ship.pos.y, 20, 20)       


            // if (ship.trail.length > 5) 
            // {
            //     for (let i = 0; i < ship.trail.length - 1; i++) 
            //     {
            //         line(mass.trail[i].x + offset.x, mass.trail[i].y  + offset.y, mass.trail[i + 1].x, mass.trail[i + 1].y)
            //     }
            // }

            let x = (ship.pos.x - (ship.radius / 2)) + offset.x;
            let y = (ship.pos.y - (ship.radius / 2)) + offset.y;
            image(this.image, x, y, ship.radius, ship.radius);
            fill(255)
            textAlign(CENTER)
            text(ship.name, x, y - 5)
        pop()
    }

    move = function()
    {
        let netForce = this.netForce()
        if (netForce.mag() < 10000) 
        {
            this.acc = netForce
        }
        else
        {
            this.acc = (netForce).div(1000000000000000000000000)
        }

        this.vel.add(this.acc)
        this.pos.add(this.vel) 
        

        // console.log(this.pos);
    }

    netForce = function()
    {
        let netForce = createVector(0, 0);

        planets.forEach(planet => 
        {
            let planetPos = planet.pos;
            let planetMass = planet.mass;
            
            let gmm = g * planetMass * this.mass;
            let r = p5.Vector.dist(this.pos, planetPos);

            let rSquared = Math.pow(r, 2);
            let force = gmm / rSquared;
        
            let theta = p5.Vector.sub(planetPos, this.pos).heading();
            let forceX = force * cos(theta);
            let forceY = force * sin(theta);
        
            let forceVector = createVector(forceX, forceY);
        
            netForce.add(forceVector);
        });
        
        return netForce
    }
  
}
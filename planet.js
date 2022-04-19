class Planet
{
    constructor(props)
    {
        this.pos = props.pos || createVector(0, 0);
        this.vel = props.vel || createVector(0, 0);
        this.acc = props.acc || createVector(0, 0);
        this.mass = props.mass || 1;
        this.type = props.type;
        this.radius = props.radius / distanceScale;
        this.color = props.color || "red";
        this.name = props.name || "No Name";
        this.type = props.type;
        this.daysInAYear = props.daysInAYear / timeScale;
        this.distanceToSun = props.distanceToSun / distanceScale;
        this.phi = props.phi || 0;

        this.force = props.force || createVector(0, 0);
        // this.trail = [];
    }
    
    display = function()
    {
        let mass = this;
        push()
            stroke(mass.color)

            if (mass.type == "Planet") 
            {
                noFill()
                ellipse(center.x + offset.x, center.y + offset.y, mass.distanceToSun * 2, mass.distanceToSun * 2)   
                
            }

            fill(mass.color)
            // ellipse(mass.pos.x, mass.pos.y, mass.radius, mass.radius)       


            // if (mass.trail.length > 5) 
            // {
            //     for (let i = 0; i < mass.trail.length - 1; i++) 
            //     {
            //         line(mass.trail[i].x + offset.x, mass.trail[i].y  + offset.y, mass.trail[i + 1].x, mass.trail[i + 1].y)
            //     }
            // }

            let x = (mass.pos.x - (mass.radius / 2)) + offset.x;
            let y = (mass.pos.y - (mass.radius / 2)) + offset.y;
            image(eval(mass.name.toLowerCase()), x, y, mass.radius, mass.radius);
            fill(255)
            textAlign(CENTER)
            text(mass.name, x, y - 5)
        pop()
    }
    move = function()
    {
        if (this.type == "Planet") 
        {
            let twoPI = 2 * Math.PI;
            let inside = ((twoPI / this.daysInAYear) * frameCount);
            this.pos.x = -1 * Math.cos(inside + this.phi) * this.distanceToSun + center.x;
            this.pos.y = Math.sin(inside + this.phi) * this.distanceToSun + center.y;

            // this.pos.add(offset)
        }
        else if(this.name != "Sun")
        {
            // this.trail.push(this.pos.copy());
            this.pos.add(this.vel);
            this.vel.add(this.acc);

            this.acc = this.force.div(this.mass)
        }

        
    }

    netForce = function()
    {
        this.force = createVector(0, 0);

        planets.forEach(mass => 
        {
            let massPos = mass.pos;
            let massMass = mass.mass;
            
            let gm = massMass  * g;
            let r = p5.Vector.dist(this.pos, massPos);

            let count = true;
            if (r < 0.5) 
            {
                count = false;
            }
            if (r < 30) 
            {
                r = 30
            }
            let rSquared = Math.pow(r,2);
            let force = gm / rSquared;
        
            let theta = p5.Vector.sub(massPos, this.pos).heading();
            let forceX = force * cos(theta);
            let forceY = force * sin(theta);
        
            let forceVector = createVector(forceX, forceY);
        
            if (count) 
            {
                this.force.add(forceVector);
            }
            
        });
    }
  
}
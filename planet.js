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

        this.image = eval(this.name.toLowerCase())
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

            let x = (mass.pos.x - (mass.radius / 2)) + offset.x;
            let y = (mass.pos.y - (mass.radius / 2)) + offset.y;
            image(this.image, x, y, mass.radius, mass.radius);
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
            let x = -1 * Math.cos((inside) * timeScale + this.phi) * this.distanceToSun;
            let y = Math.sin((inside) * timeScale + this.phi) * this.distanceToSun;
            let oldPosition = this.pos.copy()
            let newPosition = createVector(x, y).add(center)
            this.pos.add(newPosition.sub(oldPosition))

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
  
}
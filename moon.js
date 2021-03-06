class Moon
{
    constructor(props)
    {
        this.pos = props.pos || createVector(0, 0);
        this.mass = props.mass || 1;
        this.planet = props.planet;
        this.radius = props.radius / distanceScale;
        this.color = props.color || "red";
        this.name = props.name || "No Name";
        this.daysInAYear = props.daysInAYear / timeScale;
        this.distanceToPlanet = props.distanceToPlanet / distanceScale;
        this.phi = props.phi || 0;
    }

    display = function()
    {
        let mass = this;
        push()
            stroke(mass.color)

            // if (mass.type == "Planet") 
            // {
            //     noFill()
            //     ellipse(center.x, center.y, mass.distanceToPlanet * 2, mass.distanceToPlanet * 2)   
            // }

            fill(mass.color)
            // ellipse(mass.pos.x, mass.pos.y, mass.radius, mass.radius)       


            // if (mass.trail.length > 5) 
            // {
            //     for (let i = 0; i < mass.trail.length - 1; i++) 
            //     {
            //         line(mass.trail[i].x + offset.x, mass.trail[i].y + offset.y, mass.trail[i + 1].x, mass.trail[i + 1].y)
            //     }
            // }

            let x = (mass.pos.x - (mass.radius / 2)) + offset.x
            let y = (mass.pos.y - (mass.radius / 2)) + offset.y
            image(eval(mass.name.toLowerCase()), x, y, mass.radius, mass.radius);

            // push()
            //     fill("red")
            //     ellipse(x,y,10,10)
            // pop()
            

            

            
 
        pop()

        // console.log(mass);
    }
    move = function()
    {
        let twoPI = 2 * Math.PI;
        let parentPlanetPos = planets.find(element => element.name == this.planet).pos;
        let inside = ((twoPI / this.daysInAYear) * frameCount);
        this.pos.x = -1 * Math.cos(inside + this.phi) * this.distanceToPlanet + parentPlanetPos.x;
        this.pos.y = Math.sin(inside + this.phi) * this.distanceToPlanet + parentPlanetPos.y;

        // this.pos.add(offset)
    }  
}

function createPlanets()
{
    planets = []
    moons = []

    planets.push(new Planet({
        name: "Sun", 
        pos: createVector(center.x, center.y), 
        color: "blue", 
        radius: 1.3927 * Math.pow(10, 6), // 1.3927 million km - diameter
        mass: 1988500 * Math.pow(10, 24)
    }))

    planets.push(new Planet({
        name: "Mercury", 
        type: "Planet",
        daysInAYear: 87.96,
        distanceToSun: 57.9 * Math.pow(10, 6), // km
        phi: 21.785,
        moons: 0,
        earthDaysInDay: 58.7,
        mass: 3.3 * Math.pow(10, 23), // kg
        color: "rgba(255,255,255,0.125)",
        radius: 4878 // km - diameter
    }))

    planets.push(new Planet({
        name: "Venus", 
        type: "Planet",
        daysInAYear: 224.68,
        distanceToSun: 108.2 * Math.pow(10, 6), // km
        phi: 1.11 + 90,
        moons: 0,
        earthDaysInDay: 243,
        mass: 4.87 * Math.pow(10, 24), // kg
        color: "rgba(255,255,255,0.125)",
        radius: 12104 // km - diameter
    }))

    planets.push(new Planet({
        name: "Earth", 
        type: "Planet",
        daysInAYear: 365.25,
        distanceToSun: 149.6 * Math.pow(10, 6), // km
        phi: 29.0317,
        moons: 0,
        earthDaysInDay: 1,
        mass: 5.9724 * Math.pow(10, 24), // kg
        color: "rgba(255,255,255,0.125)",
        radius: 12756 // km - diameter
    }))

    planets.push(new Planet({
        name: "Mars", 
        type: "Planet",
        daysInAYear: 687,
        distanceToSun: 227.9 * Math.pow(10, 6),  // km
        phi: 90,
        moons: 2,
        earthDaysInDay: 1.026,
        mass: 6.42 * Math.pow(10, 23), // kg
        color: "rgba(255,255,255,0.125)",
        radius: 6787 // km - diameter
    }))

    planets.push(new Planet({
        name: "Jupiter", 
        type: "Planet",
        daysInAYear: 365.25 * 11.862,
        distanceToSun: 778.3 * Math.pow(10, 6), // km
        phi: 0,
        moons: 79,
        earthDaysInDay: 9.84/24,
        mass: 1.90 * Math.pow(10, 27), // kg
        color: "rgba(255,255,255,0.125)",
        radius: 142796 // 142,796 km - diameter 
    }))

    planets.push(new Planet({
        name: "Saturn", 
        type: "Planet",
        daysInAYear: 365.25 * 29.456,
        distanceToSun: 1427 * Math.pow(10, 6), // km
        phi: 0,
        moons: 82,
        earthDaysInDay: 10.2/24,
        mass: 5.69 * Math.pow(10, 26), // kg
        color: "rgba(255,255,255,0.125)",
        radius: 120660 // 120660 km - diameter 
    }))

    planets.push(new Planet({
        name: "Uranus", 
        type: "Planet",
        daysInAYear: 365.25 * 84.07,
        distanceToSun: 2871 * Math.pow(10, 6), // km
        phi: 0,
        moons: 27,
        earthDaysInDay: 17.9/24,
        mass: 8.68 * Math.pow(10, 25), // kg
        color: "rgba(255,255,255,0.125)",
        radius: 51120 // 51,120 km - diameter 
    }))

    planets.push(new Planet({
        name: "Neptune", 
        type: "Planet",
        daysInAYear: 365.25 * 164.81,
        distanceToSun: 4497 * Math.pow(10, 6), // km
        phi: 0,
        moons: 27,
        earthDaysInDay: 19.1/24,
        mass: 1.02 * Math.pow(10, 26), // kg
        color: "rgba(255,255,255,0.125)",
        radius: 48600 // 48,600 km - diameter 
    }))






























    moons.push(new Moon({
        name: "Moon", 
        type: "Moon",
        planet: "Earth",
        phi: 0,
        daysInAYear: 27/365,
        distanceToPlanet: 384400, // km 
        mass: 4.87 * Math.pow(10, 24), // 4.87 x 10^24 kg
        color: "rgba(255,255,255,0.125)",
        radius: 1737
    }))


    for (let i = 0; i < 2; i++) 
    {
        moons.push(new Moon({
            name: "Moon", 
            type: "Moon",
            planet: "Mars",
            phi: 3.14 * i,
            daysInAYear: 27/365,
            distanceToPlanet: 384400, // km 
            mass: 4.87 * Math.pow(10, 24), // 4.87 x 10^24 kg
            color: "rgba(255,255,255,0.125)",
            radius: 3389
        }))
    }

    let jupiterMoonData = [
        [127960, 0.29],
        [128980, 0.3],
        [181300, 0.5],
        [221900, 0.68],
        [421600, 1.77],
        [670900, 3.55],
        [1070000, 7.16],
        [1883000, 16.69],
        [11094000, 238.72],
        [11480000, 250.57],
        [11720000, 259.22],
        [11737000, 259.7],
        [21200000, 631],
        [22600000, 692],
        [23500000, 735],
        [23700000, 758],
        [24000000, 730]
    ]
    for (let i = 0; i < 79; i++) 
    {
        let moonNumber = Math.round((jupiterMoonData.length - 1) * Math.random())
        
        moons.push(new Moon({
            name: "Moon", 
            type: "Moon",
            planet: "Jupiter",
            phi: (3.14 * 2 / 79) * i,
            daysInAYear: 27/365,
            distanceToPlanet: jupiterMoonData[moonNumber][0], // km 
            mass: 4.87 * Math.pow(10, 24), // 4.87 x 10^24 kg
            color: "rgba(255,255,255,0.125)",
            radius: 2000
        }))
        
    }
}
import * as THREE from 'three'
import  { Orbit } from '../utils/orbit'
import { InitialPos } from '../utils/inital_pos'
import updateTextPos from './addtext'


export default class Solar {
    constructor(camera, universe, scene){
        this.camera = camera
        this.universe = universe
        this.scene = scene
        this.circles = []
        this.addSolar()

    }
        addSolar(){
            // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
            
                const solarSystem = new THREE.Object3D()
                this.universe.add(solarSystem)
    
                // Make a sphere (exactly the same as before). 

                const sungeometry   = new THREE.SphereGeometry(0.1, 32, 32)
                // const texture = new THREE.TextureLoader().load(`https://solartextures.b-cdn.net/8k_sun.jpg`)
                const texture = new THREE.TextureLoader().load(`asset/sun_texture.jpg`)
                const sunmaterial = new THREE.MeshBasicMaterial( { map: texture });
                const sun = new THREE.Mesh(sungeometry, sunmaterial)

                // var sungeometry = new THREE.SphereBufferGeometry( 0.4, 32, 32 );

                // var sunwireframe = new THREE.EdgesGeometry( sungeometry );
 
                // var line = new THREE.LineSegments( sungeometry );
                // line.material.depthTest = false;
                // line.material.opacity = 0.25;
                // line.material.transparent = true;
    
                // This time we give the sun random x and y positions between -500 and 500
                // sun.position.x = 0;
                // sun.position.y = 0;
                // sun.position.z = 0;
                sun.position.set(0,0,0)
    
                // scale it up a bit
    
                //add the sun to the Universe
                solarSystem.add( sun);
                this.sun = sun
                var suncirclegeometry = new THREE.BufferGeometry();
                suncirclegeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [0,0,0], 3 ) );
                const sunsprite = new THREE.TextureLoader().load( `asset/circle.png` )


                var suncirclematerial = new THREE.PointsMaterial( { sizeAttenuation: false, map: sunsprite, size: 16, alphaTest: 0, transparent: true, color: 0xA39D51} );

                const suncricle = new THREE.Points( suncirclegeometry, suncirclematerial );
                suncricle.userData.planet = 'Sun'
                solarSystem.add(suncricle)

                // var customMaterial= new THREE.ShaderMaterial( 
                //     {
                //         uniforms:       
                //         { 
                //             "c":   { type: "f", value: 0.5 },
                //             "p":   { type: "f", value: 2.0 },
                //             glowColor: { type: "c", value: new THREE.Color(0x00ffff) }
                //         },
                //         vertexShader:   document.getElementById( 'vertexShaderAtmosphere'   ).textContent,
                //         fragmentShader: document.getElementById( 'fragmentShaderAtmosphere' ).textContent,
                //         side: THREE.FrontSide,
                //         blending: THREE.AdditiveBlending,
                //         transparent: true
                //     }   );
                
                //   var glow = new THREE.SphereGeometry(0.12, 32, 32)
                //   var corona = new THREE.Mesh( glow, customMaterial )
                //   this.scene.add( corona )

                const light = new THREE.PointLight(0xFFFF00,100 ,0);
                light.position.set(0, 0, 0)
                solarSystem.add(light);
            for (let i = 1; i < 10; i+=1) 
            {   
                const planetName = Object.keys(Orbit)[i]
                const planet = Object.values(Orbit)[i]
                const xRadius = (planet.max_dis + planet.min_dis)/2
                const yRadius = Math.sqrt(planet.min_dis * planet.max_dis)
                const inclination = planet.inclination / 180 * Math.PI
                var curve = new THREE.EllipseCurve(
                    0,  0,            // ax, aY
                    xRadius/10, yRadius/10,           // xRadius, yRadius
                    0,  2 * Math.PI,  // aStartAngle, aEndAngle
                    false,            // aClockwise
                    0                // aRotation
                );
                var numOfPoints = 1000
                // var points = curve.getPoints( numOfPoints );
                var geometry = new THREE.BufferGeometry()


				var vertices = [];
				var colors2 = [];


				var point = new THREE.Vector3();
                var color = new THREE.Color();
                
                const initialp =  Math.sqrt(InitialPos[planetName].ra ** 2 + InitialPos[planetName].dec ** 2) * Math.PI/ 180
                const devp = (Date.now() - Date.parse('25 Mar 2020'))/ (1000* 60 * 60 * 24 * planet.period)
                const startp = initialp + devp
        
				for (let j = 0; j < numOfPoints; j ++ ) {

					var t = (j / ( numOfPoints ) + startp) - Math.floor(j / ( numOfPoints ) + startp);
					curve.getPoint( t, point );

					vertices.push( point.x, point.y, 0 );


                    color.setHSL( planet.h/360, 0.25,  0.4 * j / numOfPoints   );
                    
                    if(i === 9)color.setHSL( planet.h/360, 0,  0.4 * j / numOfPoints   );
					colors2.push( color.r, color.g, color.b );
				}

                
				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
                
                
				geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors2, 3 ) );
                
                
                
                var material = new THREE.LineBasicMaterial( {  color: 0xffffff, vertexColors: true, linewidth: 1, transparent:true } );
                
                // Create the final object to add to the Universe
                var ellipse = new THREE.Line( geometry, material )
                // const circle = new Object3D()
                // ellipse.add(circle)
                // circle.position.set(vertices[0])
                // const circlegeometry   = new THREE.SphereGeometry(0.5, 16, 16)
                
                // var circlematerial= new THREE.ShaderMaterial( 
                //     {
                //         uniforms:       
                //         { 
                //             "s":   { type: "f", value: -3.0},
                //             "b":   { type: "f", value: 2.0},
                //             "p":   { type: "f", value: 4.0 },
                    
                //             glowColor: { type: "c", value: color }
                //         },
                //         vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
                //         fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
                //         side: THREE.FrontSide,
                //         blending: THREE.AdditiveBlending,
                //         transparent: true
                //     }   );
                // const circlematerial = new THREE.MeshBasicMaterial( { color: 0xffffff  });

                const containergeo = new THREE.SphereBufferGeometry(planet.min_dis/100,4,4)
                const containermat = new THREE.MeshBasicMaterial({opacity:0, alphaTest: 0.5, transparent: true})

                const planetInfo = new THREE.Mesh(containergeo, containermat)

                planetInfo.position.set(vertices[0], vertices[1], vertices[2])
                

                    var circlegeometry = new THREE.BufferGeometry();
                    circlegeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [0,0,0], 3 ) );
                    const sprite = new THREE.TextureLoader().load( `asset/circle.png` )


                    var circlematerial = new THREE.PointsMaterial( { sizeAttenuation: false, map: sprite, size: 16, alphaTest: 0, transparent: true, color: color} );

                    const newsph = new THREE.Points( circlegeometry, circlematerial );
                    newsph.userData.planet = planetName


                // const newsph = new THREE.Mesh(circlegeometry, circlematerial)
                // newsph.position.set(vertices[0], vertices[1], vertices[2])
                // circle.add(newsph)

                planetInfo.add(newsph)
                // updateTextPos(planetInfo, this.camera)

                ellipse.add(planetInfo)
                this.circles.push(planetInfo)

                ellipse.rotation.set(- Math.PI /3, inclination, 0)
                // newsph.rotation.set(- Math.PI /3, inclination, 0)
                solarSystem.add(ellipse)
                
                // this.addCircle(newsph, planetName, this.camera)
                
            }
                //finally push it to the stars array 
                // stars.push(sphere); 
                // renderer.render( scene, camera );
            
        }

       

    
        // render() {
        //     //get the frame
        //     // requestAnimationFrame( renderer );

        //     //render the scene
        //     return(
        //         <div className='solar'></div>
        //     )


        // }
}

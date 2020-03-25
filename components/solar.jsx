import React, { Component } from 'react'
import * as THREE from 'three'
import { Universe, camera, renderer, scene} from '../solarsystem'
import orbit, { Orbit } from '../utils/orbit'


export default class solar extends Component {
    constructor(){
        super()
        this.addSolar()
    }
        addSolar(){
            // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
            
                const solarSystem = new THREE.Object3D()
                Universe.add(solarSystem)
    
                // Make a sphere (exactly the same as before). 

                const sungeometry   = new THREE.SphereGeometry(0.42, 16, 16)
                const texture = new THREE.TextureLoader().load(`https://solartextures.b-cdn.net/8k_sun.jpg`)
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

                var customMaterial= new THREE.ShaderMaterial( 
                    {
                        uniforms:       
                        { 
                            "c":   { type: "f", value: 0.5 },
                            "p":   { type: "f", value: 2.0 },
                            glowColor: { type: "c", value: new THREE.Color(0x00ffff) }
                        },
                        vertexShader:   document.getElementById( 'vertexShaderAtmosphere'   ).textContent,
                        fragmentShader: document.getElementById( 'fragmentShaderAtmosphere' ).textContent,
                        side: THREE.FrontSide,
                        blending: THREE.AdditiveBlending,
                        transparent: true
                    }   );
                
                  var glow = new THREE.SphereGeometry(0.5, 16, 16)
                  var corona = new THREE.Mesh( glow, customMaterial )
                  scene.add( corona )

                const light = new THREE.PointLight(0xFFFF00,100 ,0);
                light.position.set(0, 0, 0)
                solarSystem.add(light);
            for (let i = 1; i < 10; i+=1) 
            {   
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
                const startp = Math.random()

				for (let j = 0; j < numOfPoints; j ++ ) {

					var t = (j / ( numOfPoints ) + startp) - Math.floor(j / ( numOfPoints ) + startp);
					curve.getPoint( t, point );

					vertices.push( point.x, point.y, 0 );


					color.setHSL( i/9 * 0.5, 0.3, Math.max( 0, 0.5 * j / numOfPoints  ) );
					colors2.push( color.r, color.g, color.b );
				}

				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );


				geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors2, 3 ) );

                
                
                var material = new THREE.LineBasicMaterial( {  color: 0xffffff, vertexColors: true, linewidth: 2 } );
                
                // Create the final object to add to the Universe
                var ellipse = new THREE.Line( geometry, material )
                ellipse.rotation.set(Math.PI /2, inclination, 0)
                solarSystem.add(ellipse)
                
            }
                //finally push it to the stars array 
                // stars.push(sphere); 
                // renderer.render( scene, camera );
            
        }

    
        render() {
            //get the frame
            // requestAnimationFrame( renderer );

            //render the scene
            return(
                <div className='sun'></div>
            )


        }
}

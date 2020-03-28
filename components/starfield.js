
import * as THREE from 'three'


export default class StarField {
    constructor(universe){
        this.universe = universe
        this.addSphere()
    }
        addSphere(){
            const colors =[0xffffff,0xFFFF00,0x87cefa ]
            // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
            for ( let i= 0; i < 1500; i+=1 ) {
    
                // Make a sphere (exactly the same as before). 
                const color = colors[Math.floor(Math.random()*3)]
                const geometry   = new THREE.SphereGeometry(1.2, 4, 4)
                const material = new THREE.MeshBasicMaterial( {color: color} );
                const sphere = new THREE.Mesh(geometry, material)
                // var light = new THREE.PointLight( 0xff0000, 5, 100 )
                const theta = Math.random() * Math.PI
                const alpha = Math.random() * Math.PI * 2
                const length = Math.random() * 1000 + 800
                // This time we give the sphere random x and y positions between -500 and 500
                const y = length * Math.cos(theta)
                const x = length * Math.sin(theta) * Math.cos(alpha)
                
    
                // Then set the z position to where it is in the loop (distance of camera)
                const z = length * Math.sin(theta) * Math.sin(alpha)
                sphere.position.set(x,y,z)
                // light.position.set(x, y, z)
                // scale it up a bit
                // sphere.scale.x = sphere.scale.y = 2;
    
                //add the sphere to the Universe
                this.universe.add(sphere)
                // Universe.add( light );
    
                //finally push it to the stars array 
                // stars.push(sphere); 
                // renderer.render( scene, camera );
            }
}

    
// render() {
//     //get the frame
//     // requestAnimationFrame( renderer );

//     //render the Universe
//     return(
//         <div className='starfield'></div>
//     )


// }
}

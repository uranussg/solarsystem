import * as THREE from 'three'
 
 export default function updateText(obj, camera) {
     const planetName = obj.children[0].userData.planet
            let p = new THREE.Vector3()
            
            obj.updateMatrixWorld()
            //  p = obj.geometry.vertices[0].clone();
            // p = obj.position.clone()
            //  p.applyMartirx4(obj.matrixWorld)
            // debugger
            p.setFromMatrixPosition(obj.matrixWorld)
            const widthHalf = 0.5*window.innerWidth;
            const heightHalf = 0.5*window.innerHeight;

            camera.updateMatrixWorld()
            camera.updateProjectionMatrix()
            // let vector = obj.uv
            let vector = p.project(camera);
            
            
            const x = ( vector.x * widthHalf ) + widthHalf;
            const y = - ( vector.y * heightHalf ) + heightHalf;
            let text
            const container = document.getElementById('text-container')
            if( document.getElementById(planetName) )
            {text = document.getElementById(planetName) }
            else {
                text = document.createElement('div')
                text.setAttribute('id', planetName)
                container.appendChild(text)
                text.style.position = 'absolute';
                text.innerHTML = planetName;
                text.style.background = "transparent";
            }
            text.style.display = 'block'
            
            if(Math.abs(vector.x) < 0.05 && Math.abs(vector.y) < 0.05) {
                text.style.display = 'none'
            }

            text.style.left = x + 'px';
            text.style.top = y + 'px';
            // text.style.transform = "translate("+vector.x+"px,"+vector.y+"px)";



        }
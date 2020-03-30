
import * as THREE from 'three'
const OrbitControls = require('three-orbitcontrols')
import Clock from './components/clock'
import StarFiled from './components/starfield'
import Solar from './components/solar'
import DetailPanel from './components/detailpanel'
import {Detail }from './utils/detail'
import updateTextPos from './components/addtext'



export let scene = new THREE.Scene();
export let camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.01, 4000);
export let renderer = new THREE.WebGLRenderer();
export let Universe  = new THREE.Object3D()
export let controls = new OrbitControls( camera, renderer.domElement );

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
controls.enableDamping = true
controls.dampingFactor = 0.1
// debugger
scene.add(Universe)


camera.position.z = 400;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root')
  const solar = new Solar(camera, Universe,scene)
  const starfield = new StarFiled(Universe)
  const clock = new Clock()


  function onHover() {
    document.body.style.cursor ='default'
    mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1)

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( solar.circles );

    if (intersects.length) {
      const intersect = intersects[0]
      
      document.body.style.cursor ='pointer'
      // addText(intersect, )
    }

  }

  function onClick(e) {

    // debugger

    if (e.target.classList.value == 'text') {
      DetailPanel(e.target.id)
    }
    else {

        mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1)

        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( solar.circles );

        if ( intersects.length ) {
          const intersect = intersects[0]
          // const idx = solar.circles.indexOf(intersect.Object)
          const planet = intersect.object.children[0].userData.planet
          
          DetailPanel(planet)

        

        }
        else {
          if (e.target.nodeName === 'CANVAS')


          {
            const detail = document.getElementById('detail')
            if(detail.classList.contains('active')) detail.classList.replace('active', 'hidden')

        }
        }
    }
  }

  function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

  function animate() {

    requestAnimationFrame( animate );
    controls.update();
    solar.sun.rotation.y += 0.01
    for(let i=0; i< solar.circles.length; i+=1) {
      updateTextPos(solar.circles[i], camera)
    }
    clock.render()

    renderer.render( scene, camera );

  }







  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  
  window.addEventListener( 'mousemove', onHover, false );
  window.addEventListener( 'mouseup', onClick, false );
  window.addEventListener( 'resize', onWindowResize, false );
  animate()
    
    
  
});

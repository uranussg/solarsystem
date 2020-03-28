import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three'
const OrbitControls = require('three-orbitcontrols')
import Clock from './components/clock'
import StarFiled from './components/starfield'
import Solar from './components/solar'
import DetailPanel from './components/detailpanel'
import {Detail }from './utils/detail'
import updateTextPos from './components/addtext'



export let scene = new THREE.Scene();
export let camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.01, 2000 );
export let renderer = new THREE.WebGLRenderer();
export let Universe  = new THREE.Object3D()
export let controls = new OrbitControls( camera, renderer.domElement );

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();


scene.add(Universe)


camera.position.z = 400;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root')
  const solar = new Solar(camera, Universe,scene)


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

  function onClick() {

    mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1)

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( solar.circles );

    if ( intersects.length ) {
      const intersect = intersects[0]
      // const idx = solar.circles.indexOf(intersect.Object)
      const planet = intersect.object.children[0].userData.planet
      
      const panel = new DetailPanel(planet)

    

    }
    else {
      const detail = document.getElementById('detail')
      detail.style.display = 'none'
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
    // // onHover()
    // onClick()

    renderer.render( scene, camera );

  }







  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  
  window.addEventListener( 'mousemove', onHover, false );
  window.addEventListener( 'mousedown', onClick, false );
  window.addEventListener( 'resize', onWindowResize, false );
  animate()
    
    
    function Root() {
        return(
            <div>
              
        <Clock />
        <StarFiled width={window.innerWidth} height = {window.innerHeight}/>
        {/* <Solar /> */}
        
      </div>
       );
    }

  ReactDOM.render(
	  <Root/>,
	  root
  );
});

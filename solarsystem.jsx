import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three'
const OrbitControls = require('three-orbitcontrols')
import Clock from './components/clock'
import StarFiled from './components/starfield'
import Solar from './components/solar'
import DetailPanel from './components/detailpanel'
import {Detail }from './utils/detail'



export let scene = new THREE.Scene();
export let camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.01, 2000 );
export let renderer = new THREE.WebGLRenderer();
export let Universe  = new THREE.Object3D()
export let controls = new OrbitControls( camera, renderer.domElement );

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();


scene.add(Universe)
const solar = new Solar(camera, Universe,scene)


function onHover() {
  
  mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1)

	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( solar.circles );

	for ( var i = 0; i < intersects.length; i++ ) {

		// intersects[ i ].object.material.color.set( 0xff0000 );

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
    debugger
    const panel = new DetailPanel(planet)

	

	}

}

function animate() {

	requestAnimationFrame( animate );
  controls.update();
  // onHover()
  // onClick()

	renderer.render( scene, camera );

}








document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root')
  
  window.addEventListener( 'mousemove', onHover, false );
  window.addEventListener( 'mousedown', onClick, false );
  animate()
    
    
    function Root() {
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        camera.position.z = 400;
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

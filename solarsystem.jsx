import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three'
const OrbitControls = require('three-orbitcontrols')
import Clock from './components/clock'
import StarFiled from './components/starfield'
import Solar from './components/solar'



export let scene = new THREE.Scene();
export let camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 2000 );
export let renderer = new THREE.WebGLRenderer();
export let Universe  = new THREE.Object3D()
export let controls = new OrbitControls( camera, renderer.domElement );

let raycaster = new THREE.Raycaster();
let hovermouse = new THREE.Vector2();


scene.add(Universe)

function onMouseMove( event ) {
	hovermouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	hovermouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onHover() {

	raycaster.setFromCamera( hovermouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

}

let raycaster1 = new THREE.Raycaster();
let clickmouse = new THREE.Vector2();

function onClickMouse() {
  clickmouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	clickmouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onClick() {

	raycaster1.setFromCamera( clickmouse, camera );
	var intersects = raycaster1.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {

	

	}

}

function animate() {

	requestAnimationFrame( animate );
  controls.update();
  onHover()
  onClick()

	renderer.render( scene, camera );

}








document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root')
  
  window.addEventListener( 'mousemove', onMouseMove, false );
  animate()
    
    
    function Root() {
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        camera.position.z = 400;
        return(
            <div>
              
        <Clock />
        {/* <StarFiled width={window.innerWidth} height = {window.innerHeight}/> */}
        <Solar />
        
      </div>
       );
    }


  ReactDOM.render(
	  <Root/>,
	  root
  );
});

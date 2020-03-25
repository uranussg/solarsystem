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

scene.add(Universe)

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

animate()
document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root')
    
    
    
    function Root() {
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        camera.position.z = 400;
        return(
            <div>
          <div id="overlay"></div>
        <Clock />
        <StarFiled width={window.innerWidth} height = {window.innerHeight}/>
        <Solar />
        
      </div>
    );
}


  ReactDOM.render(
	  <Root/>,
	  root
  );
});

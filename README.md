# solarsystem

solar-system is a clone of nasa's 3D solar system model, which display the real-time position of the planets of the solar system. it is based on vanilla javascript dom. 

live: https://uranussg.github.io/solarsystem/

* 3d model: utilized orbit control to realize reaction to dragging and zooming mouse actions.

* on-time position and orbit: The 3D model display the gradually transparent orbits of each planet, and their relavent position based on the real data.

* randomized starfield: used approperate distance parameters and distribution function to gemerated a starfield that are actually consisted of 3d models.

* planets' name in JavaScript Dom: utilized projection method in three.js to get the screen coordinates from the 3d matrices, thus added the texts that are able to attach to the planets.

* detail-panel: display detail panels in react to mouse's click on each planets. added fade-in/out effect to it.

* sun model: display a rotating sun model that reflect the real-sun's size when zoom in closely enough.

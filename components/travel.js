
export function initialView(camera, controls) {
    // camera.up.set(1, 0, 0)
    controls.autoRotate = true
    controls.autoRotateSpeed = 30
    window.setTimeout(()=> {
        controls.autoRotate = false
        // camera.up.set(0, 1, 0)
    }, 5000)
    


}

export function travel(camera, control) {

    const outer = document.getElementById('solar-system')
    const inner = document.getElementById('inner-solar-system')
  
    outer.addEventListener('click', ()=> {
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z= 500
        camera.updateMatrixWorld()
        camera.updateProjectionMatrix()
    })

    inner.addEventListener('click', ()=> {
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 40
        camera.updateMatrixWorld()
        camera.updateProjectionMatrix()
    })
}
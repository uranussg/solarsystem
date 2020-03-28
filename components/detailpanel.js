import { Detail } from "../utils/detail";

export default function DetailPanel(planet) {
    const planetdetail = Detail[planet]
    const detail = document.getElementById('detail')
    detail.style.display = 'block'

    const title = document.getElementById('title')
    title.innerText = planet

    const imgurl = document.getElementById('imgurl')
    imgurl.setAttribute('src',planetdetail['imgurl']) 

    const description = document.getElementById('description')
    description.innerText = planetdetail['description']

    const readmore = document.getElementById('readmore')
    readmore.setAttribute('href', planetdetail['readmore'])


    const quickfacts = document.getElementById('quickfacts')
    // const datas = document.querySelector('#data')
    // const labels = document.querySelector('#label')
    const children = quickfacts.children[0].children
        
    for (let i = 0; i< planetdetail['quickfacts'].length; i+=1) {
        

        if (i % 2) {
            const target = planetdetail['quickfacts'][i]['label']

            children[i].firstElementChild.firstElementChild.innerText = target['left']
            children[i].lastElementChild.firstElementChild.innerText = target['right']
        }
        else{
         
         for (let i1=0; i1< 2; i1+=1){
             const key2 = i1 ? 'right' :'left'
             const target = planetdetail['quickfacts'][i]['data'][key2]
            const keys = Object.keys(target)
            for (let i2=0; i2< keys.length; i2+=1)
            {   
                const el = children[i]
                .getElementsByClassName(key2)[0]
                .getElementsByClassName(keys[i2])[0]

                el.innerText = target[keys[i2]]
            }
        }

    }
    }

}
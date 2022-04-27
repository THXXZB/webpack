import helloWord from "./js/helloWord.js";
import imgSrc from './assets/风.png'
import tzjURI from './assets/tzj.jpeg'
import exampleTxt from './assets/data/example.txt'
import gif from './assets/绵羊.gif'

import './style.css'
import './style2.less'

import Data from './assets/data/data.xml'
import Notes from './assets/data/data.csv'

import toml from './assets/data/data.toml'
import yaml from './assets/data/data.yaml'
import json5 from './assets/data/data.json5'

// 静态导入
import _ from 'loadsh'
import './js/async-module'

helloWord()
// asset/resource: 导出url
// asset/inline: 导出data URI
// asset/source: 导出资源的源代码
// console.log(imgSrc, tzjURI)

const img = document.createElement('img')
img.style.cssText = 'width: 300px;'
img.src = imgSrc
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.style.cssText = 'width: 200px;height: 200px;'
img2.src = tzjURI
document.body.appendChild(img2)

const block = document.createElement('div')
block.style.cssText = 'width: 200px; height: 200px;background: #abe;'
block.classList.add('block-bg')
block.textContent = exampleTxt
document.body.appendChild(block)

const img3 = document.createElement('img')
img3.style.cssText = 'width: 200px;height: 200px;'
img3.src = gif
document.body.appendChild(img3)

document.body.classList.add('hello')

const span = document.createElement('span')
span.classList.add('icon')
span.innerHTML = 'hello word'
document.body.appendChild(span)

console.log('xml data', Data)
console.log('csv data', Notes)

console.log('toml data', toml)
console.log('yaml data', yaml)
console.log('json5 data', json5)

// 使用与another-modules相同的共享文件
console.log(_.join(['Index', 'module', 'loaded!'], ' '))

const button = document.createElement('button')
button.textContent = '懒加载'
button.addEventListener('click', () => {
    // 魔法注释webpackChunkName修改打包的文件名
    // webpackPrefetch预获取：浏览器空闲时加载
    // webpackPreload预加载，效果似乎与懒加载一致
    import(/* webpackChunkName: 'math', webpackPrefetch: true*/'./js/test.js').then(({ sayHi }) => {
        sayHi()
    })
})
document.body.appendChild(button)
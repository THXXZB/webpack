function getComponent() {
    // 动态导入loadsh
    return import('loadsh').then(({default: _}) => {
        const element = document.createElement('div')
        element.innerHTML = _.join(['动态', '导入'], ' ')
        return element
    })
}

getComponent().then(element => {
    document.body.appendChild(element)
})
function createNode(nodeType, props, ...children) {
    const node = document.createElement(nodeType)

    for (const prop in props) {
        if (props.hasOwnProperty(prop)) {
            node[prop] = props[prop]
        }
    }

    children.forEach(child => {
        if (typeof child === "string") {
            child = document.createTextNode(child)
        }

        node.appendChild(child)
    })

    return node
}

function findDomItems(node, ...selectors) {
    let resItems = []
    selectors.forEach(selector =>
        resItems.push(node.querySelector(selector))
    )
    return resItems
}

export { createNode, findDomItems };
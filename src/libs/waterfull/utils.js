/*
    年/月/日/时/分：2022/6/11/13/19 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

/*获取所有的img标签*/
export const getImgElements = (itemElements) => {
    const imgElements = []
    itemElements.forEach(el => imgElements.push(el.querySelector('img')))
    return imgElements
}

/*生成所有图片链接数组*/
export const getAllImg = (imgElements) => imgElements.map(imgElement => imgElement.src)

/*监听图片数组加载完成*/
export const onComplateImgs = (imgs) => {
    // promise 集合
    const promiseAll = []
    // 循环构建 promiseAll
    imgs.forEach((img, index) => {
        const promise = new Promise((resolve, reject) => {
            const imageObj = new Image()
            imageObj.onload = () => resolve({img, index})
            imageObj.src = img
        })
    })
    return Promise.all(promiseAll)
}

// 计算最小高度所在的列
export const getMinHeightColumn = (columnHeightObj) => {
    const minHeight = Math.min(...Object.values(columnHeightObj))
    const MinHeight = Object.keys(columnHeightObj).find((key) => columnHeightObj[key] === minHeight)
    return MinHeight
}


import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer'
// import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
import esriRequest from '@arcgis/core/request'
// import esriConfig from '@arcgis/core/config'
const baiduAK = 'yCRGwwpmWhKXHkXeRQupe16ybnMEn3Ku'
const bdMapTileLayer = BaseTileLayer.createSubclass({
  properties: {
    urlTemplate: ''
  },
  getTileUrl: function (level, row, col) {
    // var zoom = level
    let zoom = level - 1
    const offsetX = parseInt(Math.pow(2, zoom))
    const offsetY = offsetX - 1
    const numX = col - offsetX
    const numY = -row + offsetY
    zoom = level + 1
    // const num = ((col + row) % 8) + 1
    const url =
                'http://api0.map.bdimg.com/customimage/tile/?qt=tile&x=' +
                numX +
                '&y=' +
                numY +
                '&z=' +
                zoom +
                '&ak=' +
                baiduAK +
                '&customid=normal'
    return url
  },
  fetchTile: function (level, row, col) {
    const url = this.getTileUrl(level, row, col)
    return esriRequest(url, {
      responseType: 'image'
    }).then(
      function (response) {
        const image = response.data
        const width = this.tileInfo.size[0]
        const height = this.tileInfo.size[0]
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        if (this.tint) {
          context.fillStyle = this.tint.toCss()
          context.fillRect(0, 0, width, height)
          context.globalCompositeOperation = 'multiply'
        }
        context.drawImage(image, 0, 0, width, height)
        return canvas
      }.bind(this)
    )
  }
})
export default bdMapTileLayer

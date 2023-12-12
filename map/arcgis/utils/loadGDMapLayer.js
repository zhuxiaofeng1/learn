import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
export function loadGDMapLayer () {
  const gdMapLayer = new WebTileLayer({
    id: 'gaode',
    urlTemplate: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={col}&y={row}&z={level}',
    name: '高德地图'
  })
  return gdMapLayer
}

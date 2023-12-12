/**
 * 提供百度坐标(BD-09)、国测局坐标(火星坐标，GCJ-02)和WGS84坐标系之间的转换
 */

/** ******************************************************变量区*********************************************************/
const xPI = Math.PI * 3000.0 / 180.0
const PI = Math.PI
const a = 6378245.0
const EE = '0.00669342162296594323'
const MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0]
const LLBAND = [75, 60, 45, 30, 15, 0]

const MC2LL = [
  [1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547,
    91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2],
  [-7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826,
    -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
  [-3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871,
    -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
  [-1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277,
    -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
  [3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511,
    -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
  [2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994,
    -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]]

const LL2MC = [
  [-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880,
    -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5],
  [0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142,
    -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
  [0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455,
    -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
  [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013,
    -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
  [-0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378,
    54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
  [-0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093,
    2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]]

/** ******************************************************方法区*********************************************************/

/**
 * @method webMercator_to_lonlat_of_bd09 墨卡托投影转经纬度坐标(bd09)
 * @param x 待转换的墨卡托投影平面经度坐标
 * @param y 待转换的墨卡托投影平面纬度坐标
 * @returns location 转换后百度坐标系下的经纬度坐标
 */
function ME2LLbd09 (x, y) {
  let cF = null
  x = Math.abs(x)
  y = Math.abs(y)
  for (let cE = 0; cE < MCBAND.length; cE++) {
    if (y >= MCBAND[cE]) {
      cF = MC2LL[cE]
      break
    }
  }
  if (cF !== null) {
    return converter(x, y, cF)
  }
}
/**
 * @method wgs84_to_gcj02 WGS84坐标系转火星坐标系(GCJ-02)
 * @param wgslon WGS84坐标系下的经度坐标
 * @param wgslat WGS84坐标系下的纬度坐标
 * @returns [mglon,mglat] 转换后火星坐标系下的经纬度坐标
 */
function wgs84LL2gcjLL (wgslon, wgslat) {
  const ee = parseFloat(EE)
  const lon = +wgslon
  const lat = +wgslat

  let dlat = transformLat(lon - 105.0, lat - 35.0)
  let dlon = transformLon(lon - 105.0, lat - 35.0)

  const radlat = lat / 180.0 * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  const sqrtmagic = Math.sqrt(magic)

  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
  dlon = (dlon * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)

  const mglat = lat + dlat
  const mglon = lon + dlon

  return [mglon, mglat]
}
/**
 * @method gcj02_to_bd09 火星坐标系(GCJ-02)转百度坐标系(BD-09) 即谷歌地图、高德地图 转成 百度地图
 * @param gcjlon 火星坐标系下的经度
 * @param gcjlat 火星坐标系下的纬度
 * @returns [bdlon,bdlat] 百度坐标系下的经纬度坐标
 */
function gcjLL2bdLL (gcjlon, gcjlat) {
  const lon = +gcjlon
  const lat = +gcjlat

  const z = Math.sqrt(lon * lon + lat * lat) + 0.00002 * Math.sin(lat * xPI)

  const theta = Math.atan2(lat, lon) + 0.000003 * Math.cos(lon * xPI)
  const bdlon = z * Math.cos(theta) + 0.0065
  const bdlat = z * Math.sin(theta) + 0.006

  return [bdlon, bdlat]
}
/**
 * @method bd09togcj02 百度坐标系(BD-09)转火星坐标系(GCJ-02)即百度地图 转成 谷歌地图、高德地图
 * @param bdlon 百度坐标系下的经度
 * @param bdlat 百度坐标系下的纬度
 * @return [gcj_lon,gcj_lat] 火星坐标系下的经纬度坐标
 */
function bdLL2gcjLL (bdlon, bdlat) {
  const lon = +bdlon
  const lat = +bdlat

  const x = lon - 0.0065
  const y = lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI)

  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI)
  const gcjlon = z * Math.cos(theta)
  const gcjlat = z * Math.sin(theta)

  return [gcjlon, gcjlat]
}
/**
 * @method gcj02_to_wgs84 火星坐标系(GCJ-02)转WGS84坐标系
 * @param gcj_lon 火星坐标系下的经度坐标
 * @param gcj_lat 火星坐标系下的纬度坐标
 * @returns [] 转换后WGS84坐标系下的经纬度坐标
 */
function gcjLL2wgs84LL (gcjlon, gcjlat) {
  const ee = parseFloat(EE)
  const lon = +gcjlon
  const lat = +gcjlat

  let dlat = transformLat(lon - 105.0, lat - 35.0)
  let dlon = transformLon(lon - 105.0, lat - 35.0)

  const radlat = lat / 180.0 * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  const sqrtmagic = Math.sqrt(magic)

  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
  dlon = (dlon * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)

  const mglat = lat + dlat
  const mglon = lon + dlon

  return [lon * 2 - mglon, lat * 2 - mglat]
}
/**
 * @method lonlat_to_webMercator_of_bd09 经纬度坐标转墨卡托投影(bd09)
 * @param lon 待转换的百度坐标系下的经度坐标
 * @param lat 待转换的百度坐标系下的纬度坐标
 * @returns [] 转换后墨卡托投影平面经纬度坐标
 */
function LL2MEbd09 (lon, lat) {
  let cE = ''
  lon = getLoop(lon, -180, 180)
  lat = getRange(lat, -74, 74)

  for (let i = 0; i < LLBAND.length; i++) {
    if (lat >= LLBAND[i]) {
      cE = LL2MC[i]
      break
    }
  }

  if (!cE) {
    for (let i = LLBAND.length - 1; i >= 0; i--) {
      if (lat <= -LLBAND[i]) {
        cE = LL2MC[i]
        break
      }
    }
  }

  return converter(lon, lat, cE)
}
/**
 * @method wgs84_to_bd09 WGS84坐标系转百度坐标系(BD-09)
 * @param wgslon WGS84坐标系下的经度坐标
 * @param wgslat WGS84坐标系下的纬度坐标
 * @returns bdcoordinate 转换后百度坐标系下的经纬度坐标
 */
function wgs84LL2bdLL (wgslon, wgslat) {
  const gcjcoordinate = wgs84LL2gcjLL(wgslon, wgslat)// WGS84坐标系 转 火星坐标系
  const bdcoordinate = gcjLL2bdLL(gcjcoordinate[0], gcjcoordinate[1])// 火星坐标系 转 百度坐标系

  return bdcoordinate
}

/**
 * @method bd09_to_wgs84 百度坐标系(BD-09)转WGS84坐标系
 * @param bdlon 百度坐标系下的经度坐标
 * @param bdlat 百度坐标系下的纬度坐标
 * @returns wgscoordinate 转换后WGS84坐标系下的经纬度坐标
 */
function bdLL2wgs84LL (bdlon, bdlat) {
  const gcjcoordinate = bdLL2gcjLL(bdlon, bdlat)// 百度坐标系 转 火星坐标系
  const wgscoordinate = gcjLL2wgs84LL(gcjcoordinate[0], gcjcoordinate[1])// 火星坐标西 转 WGS84坐标系

  return wgscoordinate
}

/**
 * @method lonlat_of_wgs84_to_webMercator_of_bd09 WGS84坐标系转百度墨卡托
 * @param lon 待转换的WGS84坐标系下的经度坐标
 * @param lat 待转换的WGS84坐标系下的纬度坐标
 * @returns [] 转换后百度坐标系下的墨卡托投影平面坐标
 */
function wgs84LL2bdME (lon, lat) {
  const bd = wgs84LL2bdLL(lon, lat)
  return LL2MEbd09(bd[0], bd[1])
}

/**
 * @method webMercator_of_bd09_to_lonlat_of_wgs84 百度墨卡托转WGS84坐标系
 * @param x 待转换的百度坐标系下墨卡托投影平面经度坐标
 * @param y 待转换的百度坐标系下墨卡托投影平面纬度坐标
 * @returns [] 转换后WGS84坐标系下的经纬度坐标
 */
function bdME2wgs84LL (x, y) {
  if (!isNaN(x) && !isNaN(y)) {
    const bd = ME2LLbd09(x, y)
    return bdLL2wgs84LL(bd[0], bd[1])
  } else {
    return [0, 0]
  }
}

/**
 * @method transformLat 转换纬度坐标
 * @param longitude 待转换的经度坐标
 * @param latitude 待转换的纬度坐标
 * @returns {number} 返回转换后的纬度坐标
 */
function transformLat (longitude, latitude) {
  const lon = +longitude
  const lat = +latitude

  let ret = -100.0 + 2.0 * lon + 3.0 * lat + 0.2 * lat * lat + 0.1 * lon * lat + 0.2 * Math.sqrt(Math.abs(lon))
  ret += (20.0 * Math.sin(6.0 * lon * PI) + 20.0 * Math.sin(2.0 * lon * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0

  return ret
}

/**
 * @method transformLon 转换经度坐标
 * @param longitude 待转换的经度坐标
 * @param latitude 待转换的纬度坐标
 * @returns {number} 返回转换后的经度坐标
 */
function transformLon (longitude, latitude) {
  const lon = +longitude
  const lat = +latitude

  let ret = 300.0 + lon + 2.0 * lat + 0.1 * lon * lon + 0.1 * lon * lat + 0.1 * Math.sqrt(Math.abs(lon))
  ret += (20.0 * Math.sin(6.0 * lon * PI) + 20.0 * Math.sin(2.0 * lon * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lon * PI) + 40.0 * Math.sin(lon / 3.0 * PI)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(lon / 12.0 * PI) + 300.0 * Math.sin(lon / 30.0 * PI)) * 2.0 / 3.0

  return ret
}

/**
 * @method converter 墨卡托投影转百度坐标系经纬度坐标
 * @param x 墨卡托投影平面经度坐标
 * @param y 墨卡托投影平面纬度坐标
 * @param cE 转换系数数组
 * @returns [] 转换结果
 */
function converter (x, y, cE) {
  let xTemp = cE[0] + cE[1] * Math.abs(x)
  const cC = Math.abs(y) / cE[9]
  let yTemp = cE[2] + cE[3] * cC + cE[4] * cC * cC + cE[5] * cC * cC * cC + cE[6] * cC * cC * cC * cC + cE[7] * cC * cC * cC * cC * cC + cE[8] * cC * cC * cC * cC * cC * cC
  xTemp *= (x < 0 ? -1 : 1)
  yTemp *= (y < 0 ? -1 : 1)

  return [xTemp, yTemp]
}

/**
 * @method getLoop
 * @param lng
 * @param min
 * @param max
 * @returns {*}
 */
function getLoop (lng, min, max) {
  while (lng > max) {
    lng -= max - min
  }
  while (lng < min) {
    lng += max - min
  }
  return lng
}

/**
 * @method getRange
 * @param lat
 * @param min
 * @param max
 * @returns {*}
 */
function getRange (lat, min, max) {
  if (min != null) {
    lat = Math.max(lat, min)
  }
  if (max != null) {
    lat = Math.min(lat, max)
  }
  return lat
}
export function convertGeoInMap (type, data) {
  if (type === 'point') {
    return wgs84LL2bdME(data[0], data[1])
  } else if (type === 'polyline') {
    const childCoordArr = []
    data.forEach(coord => {
      const p = wgs84LL2bdME(coord[0], coord[1])
      childCoordArr.push(p)
    })
    return childCoordArr
  } else if (type === 'polygon') {
    const coordArr = []
    data.forEach(polygon => {
      coordArr.push(convertGeoInMap('polyline', polygon))
    })
  }
}
export function convertGeoOutMap (type, data) {
  if (type === 'point') {
    return bdME2wgs84LL(data[0], data[1])
  } else if (type === 'polyline') {
    const childCoordArr = []
    data.forEach(coord => {
      const p = bdME2wgs84LL(coord[0], coord[1])
      childCoordArr.push(p)
    })
    return childCoordArr
  } else if (type === 'polygon') {
    const coordArr = []
    data.forEach(polygon => {
      coordArr.push(convertGeoOutMap('polyline', polygon))
    })
  }
}
// /**
//  * 将外部传入的坐标数据类型（wgs84）转换为当前地图下的类型,在原数据修改
//  * 扶持转换清单
//  * ol.geom:GeometryCollection,LineString,MultiLineString,MultiPoint,MultiPolygon,Point,Polygon
//  * array:[ol.geom]
//  *
//  * @param data geo/array
//  */
// export function convertGeoInMap_ (data) {
//   if (data instanceof GeometryCollection) {
//     data.getGeometries().forEach(function (geo) {
//       convertGeoInMap(geo)
//     })
//   } else if (data instanceof LineString) {
//     const coordArr = []
//     data.getCoordinates().forEach(function (value) {
//       const p = wgs84LL2bdME(value[0], value[1])
//       coordArr.push(p)
//     })
//     data.setCoordinates(coordArr)
//   } else if (data instanceof MultiLineString) {
//     const coordArr = []
//     data.getCoordinates().forEach(function (stringcoods) {
//       const childCoordArr = []
//       stringcoods.forEach(function (value) {
//         const p = wgs84LL2bdME(value[0], value[1])
//         childCoordArr.push(p)
//       })
//       coordArr.push(childCoordArr)
//     })
//     data.setCoordinates(coordArr)
//   } else if (data instanceof MultiPoint) {
//     const coordArr = []
//     data.getCoordinates().forEach(function (value) {
//       const p = wgs84LL2bdME(value[0], value[1])
//       coordArr.push(p)
//     })
//     data.setCoordinates(coordArr)
//   } else if (data instanceof MultiPolygon) {
//     const grandFatherArr = []
//     data.getCoordinates().forEach(function (grandFather) {
//       const fatherArr = []
//       grandFather.forEach(function (father) {
//         const childArr = []
//         father.forEach(function (child) {
//           const p = wgs84LL2bdME(child[0], child[1])
//           childArr.push(p)
//         })
//         fatherArr.push(childArr)
//       })
//       grandFatherArr.push(fatherArr)
//     })
//     data.setCoordinates(grandFatherArr)
//   } else if (data instanceof Point) {
//     const p = wgs84LL2bdME(data.getCoordinates()[0], data.getCoordinates()[1])
//     data.setCoordinates(p)
//   } else if (data instanceof Polygon) {
//     const coordArr = []
//     data.getCoordinates().forEach(function (stringcoods) {
//       const childCoordArr = []
//       stringcoods.forEach(function (value) {
//         const p = wgs84LL2bdME(value[0], value[1])
//         childCoordArr.push(p)
//       })
//       coordArr.push(childCoordArr)
//     })
//     data.setCoordinates(coordArr)
//   } else if (data instanceof Array) {
//     data.forEach(function (value) {
//       convertGeoInMap(value)
//     })
//   }
// }

// /**
//  * 当前地图下的类型转换为外部坐标数据类型（wgs84），返回新的数据结果对象,原始数据不会修改。
//  * 扶持转换清单
//  * ol.geom:GeometryCollection,LinearRing,LineString,MultiLineString,MultiPoint,MultiPolygon,Point,Polygon
//  * array:[ol.geom]
//  *
//  * @param data geo/array
//  * @param callbyself  该参数外部不需要传，内部迭代使用。
//  */
// export function convertGeoOutMap (data, callbyself) {
//   let newdata
//   if (callbyself) {
//     // 内部迭代调用
//     newdata = data
//   } else {
//     if (data instanceof Array) {
//       newdata = data.concat()// array deep clone
//     } else {
//       newdata = data.clone()
//     }
//   }

//   if (newdata instanceof GeometryCollection) {
//     newdata.getGeometries().forEach(function (geo) {
//       convertGeoOutMap(geo, true)
//     })
//   } else if (newdata instanceof LineString) {
//     const coordArr = []
//     newdata.getCoordinates().forEach(function (value) {
//       const p = bdME2wgs84LL(value[0], value[1])
//       coordArr.push(p)
//     })
//     newdata.setCoordinates(coordArr)
//   } else if (newdata instanceof MultiLineString) {
//     const coordArr = []
//     newdata.getCoordinates().forEach(function (stringcoods) {
//       const childCoordArr = []
//       stringcoods.forEach(function (value) {
//         const p = bdME2wgs84LL(value[0], value[1])
//         childCoordArr.push(p)
//       })
//       coordArr.push(childCoordArr)
//     })
//     newdata.setCoordinates(coordArr)
//   } else if (newdata instanceof MultiPoint) {
//     const coordArr = []
//     newdata.getCoordinates().forEach(function (value) {
//       const p = bdME2wgs84LL(value[0], value[1])
//       coordArr.push(p)
//     })
//     newdata.setCoordinates(coordArr)
//   } else if (newdata instanceof MultiPolygon) {
//     const grandFatherArr = []
//     newdata.getCoordinates().forEach(function (grandFather) {
//       const fatherArr = []
//       grandFather.forEach(function (father) {
//         const childArr = []
//         father.forEach(function (child) {
//           const p = bdME2wgs84LL(child[0], child[1])
//           childArr.push(p)
//         })
//         fatherArr.push(childArr)
//       })
//       grandFatherArr.push(fatherArr)
//     })
//     newdata.setCoordinates(grandFatherArr)
//   } else if (newdata instanceof Point) {
//     const p = bdME2wgs84LL(newdata.getCoordinates()[0], newdata.getCoordinates()[1])
//     newdata.setCoordinates(p)
//   } else if (newdata instanceof Polygon) {
//     const coordArr = []
//     newdata.getCoordinates().forEach(function (stringcoods) {
//       const childCoordArr = []
//       stringcoods.forEach(function (value) {
//         const p = bdME2wgs84LL(value[0], value[1])
//         childCoordArr.push(p)
//       })
//       coordArr.push(childCoordArr)
//     })
//     newdata.setCoordinates(coordArr)
//   } else if (newdata instanceof Array) {
//     newdata.forEach(function (value) {
//       convertGeoOutMap(value, true)
//     })
//   }
//   return newdata
// }

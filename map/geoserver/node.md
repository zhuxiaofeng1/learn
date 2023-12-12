### GetFeatureInfo
请求地址示例：http://localhost:8080/geoserver/neimeng_province/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=neimeng_province:county&LAYERS=neimeng_province:county&CQL_FILTER="地级"='锡林郭勒盟'&&"县级"='正蓝旗'&INFO_FORMAT=application/json&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A4326&WIDTH=101&HEIGHT=101&BBOX=97.17172008991025,37.40664667970057,126.06558102964084,53.33377931006714  
解释说明：  
服务地址：http://localhost:8080/geoserver/neimeng_province/wms  
服务类型：SERVICE  
服务版本：VSERSION  
请求类型：REQUEST  
请求图层：QUERY_LAYERS  
图层：LAYERS  
查询过滤条件：CQL_FILTER  
返回数据格式：INFO_FORMAT  
返回最大数据：FEATURE_COUNT  
X: X  
Y: Y  
坐标系：SRS  
WIDTH: WIDTH  
HEIGHT: HEIGHT  
BBOX: BBOX
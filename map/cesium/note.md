# 一、构建球体
## 示例:
```
Cesium.Ion.defaultAccessToken="token"
const viewer = new Cesium.Viewer('cesiumContainer', {
    geocoder: false, // 地理编码（搜索）组件;查搜索图标，查找并定位目标，默认使用bing地图
    homeButton: false, // 返回初始视角
    sceneModePicker: false, // 选择视角的模式，有三种：3D，2D，哥伦布视图
    baseLayerPicker: false, // 图层选择器，选择要显示的地图服务和地形服务
    navigationHelpButton: false, // 导航帮助按钮
    timeline: false, // 时间线
    fullscreenButton: false, // 全屏
    vrButton: false, // vr模式开关
    infoBox: false, // 信息框
    selectionIndicator: false, // 是否显示选取指示器组件
    navigationInstructionsInitiallyVisible: false,
    animation: false // 动画小组件
})
```
## 构造函数参数
* **animation**，类型：Boolean，默认值：true，是否创建左下角动画（Anaimation）小部件，可以在此小部件中方便的操作动画播放/暂停，修改动画播放倍率。如果设置为false，则不会创建动画小部件。
* **baseLayerPicker**，类型：Boolean，默认值：true，是否创建右上角底图选择器（baseLayerPicker）小部件，可在小部件选择底图和地形。如果设置为false，则不会创建底图选择器小部件。
* **fullscreenButton**，类型：Boolean，默认值：true，是否创建右下角全屏按钮小部件。如果设置为false，则不会创建全屏按钮小部件。
* **vrButton**，类型：Boolean，默认值：false，是否创建右下角VR按钮小部件。如果设置true，则会创建VR按钮小部件。
* **geocoder**，类型：Boolean|Array.< GeocoderService >，默认值：true，是否创建地理编码器（geocoder）小部件，也就是右上角搜索框。如果设置为false，则不会创建地理编码器小部件。
* **homeButton**，类型：Boolean，默认值：true，是否创建右上角主页按钮小部件，点击按钮可使三维地球视图回到主视图。如果设置为false，则不会创建主页按钮小部件。
* **infoBox**，类型：Boolean，默认值：true，是否创建信息框小部件，点击三维地球上的实体时右上角弹出的方盒子，方盒子中默认显示实体ID。如果设置为false，则不会创建信息框小部件。
* **sceneModePicker**，类型：Boolean，默认值：true，是否创建右上角场景模式选择器小部件，可选择的场景模式有：3D视图，2D视图，哥伦布视图（2.5D视图）。如果设置为false，则不创建场景模式选择器小部件。
* **selectionIndicator**，类型：Boolean，默认值：true，是否创建选择指示符小部件，也就是在选择实体时实体本身会出现一个绿色方块。如果设置为false，则不创建选择指示符小部件。
* **timeline**，类型：Boolean，默认值：true，是否创建下方时间线小部件。如果设置为false，则不创建时间线小部件。
* **navigationHelpButton**，类型：Boolean，默认值：true，是否创建右上角导航帮助按钮，点击按钮弹出导航说明。如果设置为false，则不创建导航帮助按钮。
* **navigationInstructionsInitiallyVisible**，类型：Boolean，默认值：true，初始化地球时导航说明是否可见。如果设置为true，则在初始化地球时就会自动弹出导航说明，如果设置为false，则初始化地球时不显示导航说明，点击导航帮助按钮时才会弹出导航说明。
* **scene3DOnly**，类型：Boolean，默认值：false，是否只使用3D场景。如果设置为true，则每个几何实例都将以3D渲染，这样可以节省GPU内存。
* **shouldAnimate**，类型：Boolean，默认值：false，如果时钟在默认情况下尝试提前模拟时间，设置为true，反之设置为false，这个设置的优先级大于 Viewer#clockViewModel 。
* **clockViewModel**，类型：ClockViewModel，默认值：new ClockViewModel(clock)，设置用于控制当前时间的时钟视图模型。
* **selectedImageryProviderViewModel**，类型：ProviderViewModel，默认值：无，当前基础影像图层的视图模型，如果未提供，则使用第一个可用的基础图层， 即imageryProviderViewModels 中的第一个。仅当 baseLayerPicker 设置为true时，此值才有效。
* **imageryProviderViewModels**，类型：Array.< ProviderViewModel >，默认值：createDefaultImageryProviderViewModels()，从 BaseLayerPicker 中可选择的 ProviderViewModels 数组。仅当 baseLayerPicker 设置为true时，此值才有效。
* **selectedTerrainProviderViewModel**，类型：ProviderViewModel，默认值：无，当前基础地形图层的视图模型，如果未提供，则使用第一个可用的基础图层， 即imageryProviderViewModels 中的第一个。仅当 baseLayerPicker 设置为true时，此值才有效。
* **terrainProviderViewModels**，类型：Array.< ProviderViewModel >，默认值：createDefaultTerrainProviderViewModels()，从 BaseLayerPicker 中可选择的 ProviderViewModels 数组。仅当 baseLayerPicker 设置为true时，此值才有效。
* **imageryProvider**，类型：ImageryProvider，默认值：createWorldImagery()，初始化三维地球时使用的影像提供程序，仅当 baseLayerPicker 设置为false时，此值才有效。此处实测结果是，当 baseLayerPicker 为false时也会生效，只是无法在 baseLayerPicker 所列出图层中显示。
* **terrainProvider**，类型：TerrainProvider，默认值：new EllipsoidTerrainProvider()，初始化三维地球时使用的地形提供程序。如果想要加载官方服务器地形的话，可使用Cesium.createWorldTerrain()函数。
* **skyBox**，类型：SkyBox|false，默认值：无，设置渲染星空的天空盒。如果不设置，则会使用默认的星空，如果设置为false，则不会渲染任何星空，太阳，月亮等。
* **skyAtmosphere**，类型：SkyAtmosphere|false，默认值：无，蔚蓝的天空和围绕在三维地球周边的辉光，也就是所谓的大气层。如果设置为false，则会关闭它。
* **fullscreenElement**，类型：Element|String，默认值：document.body，当全屏按钮被按下时将被置于全屏模式的元素或元素ID。此处注意，这里的默认值是body，也就是说如果三维地球在body下首个div上渲染时才能完成真正的三维地球全屏。
* **useDefaultRenderLoop**，类型：Boolean，默认值：true，如果需要控制渲染循环，则设置为true，反之，设置为false。
* **targetFrameRate**，类型：Number，默认值：无，控制渲染循环的目标帧率。
* **showRenderLoopErrors**，类型：Boolean，默认值：true，如果设置为true，在渲染循环出错时会自动为用户显示一个包含错误信息的html面板。
* **useBrowserRecommendedResolution**，类型：Boolean，默认值：true，如果设置为true，以浏览器推荐的分辨率渲染，并忽略window.devicePixelRatio。
* **automaticallyTrackDataSourceClocks**，类型：Boolean，默认值：true，如果设置为true，则此小部件将自动跟踪新添加的数据源的时钟设置，并在数据源的时钟发生更改时进行更新。如果要独立配置时钟，请将其设置为false。
* **contextOptions**，类型：Object，默认值：无，传递给场景（scene）的与options相对应的上下文和WebGL创建属性。这个设置需要一些webGL相关知识，默认值是：{ webgl : { alpha : false, depth : true, stencil : false, antialias : true, powerPreference: ‘high-performance’, premultipliedAlpha : true, preserveDrawingBuffer : false, failIfMajorPerformanceCaveat : false }, allowTextureFilterAnisotropic : true }。其中， webgl.alpha 默认是false，之所以跟webGL默认的false不一样是因为这样可以提升性能，如果应用程序需要在其他HTML元素之上使用alpha混合，设置 webgl.alpha 为true。 allowTextureFilterAnisotropic 默认设置为true，当支持WebGL扩展时启用各向异性纹理过滤。将此设置为false会提高性能，但会损害视觉质量，尤其是对于地平线视图。其他用默认就好。
* **sceneMode**，类型：SceneMode，默认值：SceneMode.SCENE3D，设置初始场景模式。共4种模式：1. SceneMode.MORPHING，在模式之间变换，如3D模式到2D模式。2. SceneMode.CPLUMBUS_VIEW，哥伦布视图模式，一个2.5D透视视图，其中地图是平的，可以在上面绘制非零高度的物体。3. SceneMode.SCENE2D，2D模式，地图从上到下用正投影观看。4. SceneMode.SCENE3D，3D模式，一个传统的三维视角的地球。
* **mapProjection**，类型：MapProjection，默认值：new GeographicProjection()，在2D和Columbus View模式中使用的地图投影。默认是EPSG:4326，即WGS84经纬度投影，new GeographicProjection()，还可以选择EPSG:3875，即WGS84-WEB墨卡托投影，new WebMercatorProjection()。
* **globe**，类型：Globe|false，默认值：new Globe(mapProjection.ellipsoid)，场景（scene）中使用的地球仪。如果设置为false，则不会添加地球仪。
* **orderIndependentTranslucency**，类型：Boolean，默认值：true，如果设置为true，并且配置支持它，则使用顺序独立半透明。
* **creditContainer**，类型：Element|String，默认值：无，包含 CreditDisplay 的DOM元素或元素ID。如果未指定，则将credit信息添加到小部件本身的底部。
* **creditViewport**，类型：Element|String，默认值：无，包含 CreditDisplay 创建的credit信息弹出窗口的DOM元素或元素ID。如果未指定，则将credit信息添加到小部件上。
* **dataSources**，类型：DataSourceCollection，默认值：new DataSourceCollection()，小部件可视化的数据源集合。如果提供了此参数，该实例假定为调用者所有，并且在销毁查看器（viewer）时也不会销毁。
* **shadows**，类型：Boolean，默认值：false，确定光源是否投射阴影。
* **terrainShadows**，类型：ShadowMode，默认值：ShadowMode.RECEIVE_ONLY，确定地形是否从光源投射或接收阴影，默认只接收阴影。共4种模式：1. ShadowMode.DISABLED，代表物体不接收和投射阴影。2. ShadowMode.ENABLED，代表物体接收和投射阴影。3. ShadowMode.CAST_ONLY，代表物体只投射阴影。4. ShadowMode.RECEIVE_ONLY，代表物体只接收阴影。
* **mapMode2D**，类型：MapMode2D，默认值：MapMode2D.INFINITE_SCROLL，确定2D地图是否可旋转或可以在水平方向上无限滚动，默认无线卷动。共2种模式：1. ROTATE，2D视图下不能无限滚动，但可以绕z轴旋转。2. INFINITE_SCROLL，可以无限滚动，但是无法绕z轴旋转。
* **projectionPicker**，类型Boolean，默认值：false，如果设置为true，将创建投影选择器（ProjectionPicker）小部件。
* **requestRenderMode**，类型：Boolean，默认值：false，如果设置为true，渲染帧只会在场景中发生变化时才会发生。启用该模式可以减少应用程序的CPU/GPU使用率，并在移动设备上使用更少的电池，但需要使用 Scene#requestRender 在这种模式下显式地渲染一个新帧。在API的其他部分对场景进行更改后，在许多情况下这是必要的。参考官方博客，译文放在这里：Improving Performance with Explicit Rendering（通过显式渲染提高性能）。
* **maximumRenderTimeChange**，类型：Number，默认值：0.0，如果 requestRenderMode 为true，这个值定义了在请求渲染之前允许的模拟时间的最大变化。参考官方博客，译文放在这里：Improving Performance with Explicit Rendering（通过显式渲染提高性能）。
## 成员属性：
* **allowDataSourcesToSuspendAnimation**: Boolean
  
    获取或设置数据源是否可以暂时暂停动画，以避免向用户显示不完整的图片。例如，如果异步原始类型（asynchronous primitives）在后台处理，时钟将不会前进，直到几何图形准备好。

* **animation**: Animation(只读)
  
    获取动画（Animation）小部件。
* **baseLayerPicker**: BaseLayerPicker(只读)
  
    获取底图选择器（baseLayerPicker）小部件。
* **bottomContainer**: Element(只读)
  
    获取包含 CreditDisplay 和其他内容的窗口底部区域的DOM元素。
* **sceneMode**：SceneMode
  
    视图类型；可能取值：`MORPHING`变形模式、`COLUMBUS_VIEW`2.5D哥伦布模式、`SCENE2D`2D模式、`SCENE3D`3D模式。
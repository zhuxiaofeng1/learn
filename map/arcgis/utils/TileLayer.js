const TintLayer = BaseTileLayer.createSubclass({
    properties: {
        urlTemplate: null
    },
    getTileUrl: function (level, row, col) {
        return this.urlTemplate
            .replace("{z}", level)
            .replace("{x}", col)
            .replace("{y}", row);
    },
    fetchTile: function (level, row, col, options) {
        const url = this.getTileUrl(level, row, col);
        return esriRequest(url, {
            responseType: "image",
            signal: options && options.signal
        }).then(
            function (response) {
                const image = response.data;
                const width = this.tileInfo.size[0];
                const height = this.tileInfo.size[0];
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                if (this.tint) {
                    context.fillStyle = this.tint.toCss();
                    context.fillRect(0, 0, width, height);
                    context.globalCompositeOperation = "difference";
                }
                context.drawImage(image, 0, 0, width, height);

                return canvas;
            }.bind(this)
        );
    }
});

export default TintLayer;
// 使用方法
//   const openTopoMapTileLayer = new TintLayer({
//     urlTemplate: "nginx/nmwp/{z}/{x}/{y}.png",
//     visible: true,
//     id: "tile-layer"
//   });
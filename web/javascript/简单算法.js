/**
 * 长轮询
 */
function longPolling() {
    fetch('/api/data').then(res => {
        // 处理数据
        console.log(res);

        // 再次发起请求
        longPolling();
    })
    .catch(error => {
        // 处理错误
        console.log(error);

        // 延迟一段时间再次发起请求
        setTimeout(() => {
            longPolling();
        }, 5000);
    })
}
/**
 * Server-Sent Event技术
 * SSE 的优点是不需要像长轮询那样持久化连接，不会占用大量的服务器资源。
 * 同时，它还支持事件类型、重连机制、自定义消息数据等高级特性，拓展了开发者对实时应用场景的应用场景。
 * SSE 的缺点是他依赖浏览器的 EventSource 接口，目前对于老版本的浏览器需增加额外的兼容代码。
 */
var source = new EventSource('/api/data');
source.addEventListener('message', (event) => {
    // 处理数据
    console.log(event.data)
})
source.addEventListener("error", (error) => {
    // 处理错误
    console.log(error)
})


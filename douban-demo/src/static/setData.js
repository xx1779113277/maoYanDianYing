// 处理图片路径
function getUrl(img) {
    var re = /(w.h)/g;
    var str = "170.230";
    var res = img.replace(re, () => {
        return str;
    });
    return res;
}
// 处理时间
function getTime(time) {
    var res = time.split(" ");
    return res[0];
}

export { getUrl, getTime }
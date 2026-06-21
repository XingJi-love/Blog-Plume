<template>
    <div id="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

// 状态：用于跟踪地图是否加载完成
const isMapLoaded = ref(false);

/**
 * 动态加载高德地图 JS API Loader
 */
const loadAMap = async () => {
    // 确保 AMapLoader 只在客户端被导入
    const AMapLoader = await import("@amap/amap-jsapi-loader");

    // AMapLoader.load 会返回一个 Promise
    await AMapLoader.load({
        key: "2a26799a6cebef7013746e5a760c5be4", // 替换为你的高德地图 API Key
        version: "2.0",
        plugins: ["AMap.ToolBar", "AMap.Scale"], // 添加常用插件
    });
};

/**
 * 初始化高德地图
 */
const initMap = () => {
    var cityList = [
        {
            adcode: "440100",
            name: "广州",
            position: [113.2592945, 23.1301964],
            iconUrl: "",
            size: [30, 30],
            desc: "<div><h3 style='margin:10px'>📍 广州市</h3><i>📅 2021-2025 (读书&打工)</i><p style='line-height:8px'>第二家乡，大学生活和打工历程</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251206212054.png'/><img width='150' src='https://img.haipeng-lin.cn/20251206212114.png'/></div></div>",
        },
    ];

    let adCode = [];
    for (var i = 0; i < cityList.length; i++) {
        adCode.push(cityList[i].adcode);
    }

    const mapContainer = document.getElementById("mapContainer");
    // 检查地图容器和全局 AMap 对象
    if (!mapContainer || typeof AMap === "undefined") {
        console.error("Map container not found or AMap not loaded");
        return;
    }

    try {
        // 总地图初始化
        const mapInstance = new AMap.Map("mapContainer", {
            viewMode: "3D",
            zoom: 6.5,
            center: [113.8830806, 23.6603206],
            pitch: 40,
            defaultCursor: "pointer",
            features: ["bg", "road", "building", "area", "sky"],
        });
        mapInstance.setMapStyle("amap://styles/whitesmoke");

        // 填充省份颜色
        const disProvince = new AMap.DistrictLayer.Province({
            zIndex: 12,
            zooms: [2, 15],
            adcode: adCode,
            depth: 2,
            styles: {
                fill: "rgba(100,149,237,0.3)",
                "province-stroke": "blue",
                "city-stroke": "cornflowerblue",
                "county-stroke": "rgba(100,149,237,0.2)",
            },
        });
        mapInstance.add(disProvince);

        // 创建 Label 图层用于容纳所有 LabelMarker
        var labelsLayer = new AMap.LabelsLayer({
            collision: false,
            animation: true,
            zIndex: 15,
        });

        // 循环创建和添加 Marker
        for (var i = 0; i < cityList.length; i++) {
            var city = cityList[i];

            // 创建 LabelMarker (用于图标和文字标签)
            var labelsMarker = new AMap.LabelMarker({
                position: city.position,
                name: city.name,
                zooms: [4, 13],
                zIndex: 1,
                opacity: 1,
                icon: {
                    image: city.iconUrl,
                    size: new AMap.Size(city.size[0], city.size[1]),
                    imageSize: new AMap.Size(city.size[0], city.size[1]),
                    anchor: "center",
                },
                text: {
                    content: city.name,
                    direction: "bottom",
                    offset: [0, 5],
                    style: {
                        fontSize: 12,
                        fontWeight: "normal",
                        fillColor: "#eee",
                        strokeColor: "#88f",
                        strokeWidth: 3,
                        // cursor: pointer,
                    },
                },
            });

            // 创建信息窗体
            const infoWindow = new AMap.InfoWindow({
                content: city.desc,
                anchor: "bottom-center",
                offset: new AMap.Pixel(0, -15),
            });

            // 绑定点击事件
            labelsMarker.on("click", function (e) {
                console.log(`点击了 ${city.name} 标记`);
                // 打开信息窗体，位置为当前点击的 Marker 的位置
                infoWindow.open(mapInstance, e.target.getPosition());
            });

            // 将 Marker 添加到 LabelsLayer
            labelsLayer.add(labelsMarker);
        }

        // 将 LabelsLayer 添加到地图
        mapInstance.add(labelsLayer);

        // 隐藏高德地图 Logo 和版权信息
        const logoElement = document.getElementsByClassName("amap-logo")[0];
        const copyrightElement =
            document.getElementsByClassName("amap-copyright")[0];
        if (logoElement) logoElement.innerHTML = "";
        if (copyrightElement) copyrightElement.innerHTML = "";
    } catch (error) {
        console.error("地图初始化失败:", error);
    }
};

// VUE 3 生命周期钩子：组件挂载后执行
onMounted(async () => {
    try {
        await loadAMap();
        // 等待 DOM 更新（虽然对于 #mapContainer 已经存在的情况可能不是严格必要，但保持严谨性）
        await nextTick();
        initMap();
        isMapLoaded.value = true;
    } catch (error) {
        console.error("地图加载失败:", error);
    }
});
</script>

<style>
#mapContainer {
    height: 1000px;
}
</style>
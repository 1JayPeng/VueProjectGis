// Gis地图相关配置
var infoDefine = {
	//底图类型
	baseMapType: {
		google:"google",
		arcgis:"arcgis",
		tianditu:"tianditu",
	},
	//2维3维
	viewType: {
		view2D:"2D",
		view3D:"3D",
	},

	arcgisBaseMap:{
		arcgissat: "satellite",
		arcgismap: "osm" //可选：streets, satellite, hybrid, topo, gray, dark-gray, oceans, osm, national-geographic
	},

	//gis图像相对目录
	imagesDir: "/src/assets/image/gis/",
};

var gisConfig = {	
	infoDefine:infoDefine,
	mapConfig:{
		url:{
			//arcgis js api
			urlAgsApi: "https://js.arcgis.com/4.22/",
			urlSource: "https://www.gdjtypt.com/DeviceWebGisApi/api/",
			//zjSjXzq: "https://118.190.106.119:6443/arcgis/rest/services/CommonMap/ZjSjXzq/MapServer/0",
			zjSjXzq: "https://www.zhjtypt.com:6443/arcgis/rest/services/CommonMap/ZjSjXzq/MapServer/0",
		},
		mapInitParams:{
			fullExtent: {//全图范围
				xmin: 121.383811,
				ymin: 28.486049,
				xmax: 121.385811,
				ymax: 28.488049
			},
			extent: {//初始化范围
				xmin: 121.383811,
				ymin: 28.486049,
				xmax: 121.385811,
				ymax: 28.488049
			},
			center: [120.4508651185194, 28.763963987428166],
			baseMap:infoDefine.baseMapType.tianditu,//baseMapType.tianditu,//底图类型
			//baseMap:infoDefine.baseMapType.arcgis,//baseMapType.tianditu,//底图类型
			baseMapMain:"vec", //第一次出来的底图，有vec和sat
			spatialReference: {
				wkid: 4326
			},
			zoom: 7
		},
		latLonType:1, //1表示显示经纬度 其他表示显示 米
	},
	appConfig:{
		mapView: null,
		sceneView: null,
		activeView: null,
		container: "viewDiv",
		widget:{//小部件
			search:false,
			home:true,
			switch2D3D:false,
			layerList:false,
			lengend:true,
			overView:true,
			baseMap:true,
			scaleBar:true,
			coordinates:false,
			measurement:true,
			print:true,
			fullScreen:true,
			track:false,
			geoQuery:true,
		},
		highLightFeature:true,
	},

};

// 导出函数方法
export default gisConfig;

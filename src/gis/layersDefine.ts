// Gis图层创建
import {
    loadModules
} from 'esri-loader';
import XEAjax from 'xe-ajax';
import gisConfig from '/@/gis/gisConfig'

const layers = {	
	async createBaseMap() {
		//let layer: any;
		var baseLayers = null;
		await loadModules([		
			"esri/layers/WebTileLayer",
			"esri/Basemap",		
		], {
			url: gisConfig.mapConfig.url.urlAgsApi
		}).then(([WebTileLayer,Basemap]) => { 
			//这里&tk=52d5a24296cda9169da22e74abc17e71是我的key
			var key = "52d5a24296cda9169da22e74abc17e71";
			var tdtVecLayer = new WebTileLayer({
				urlTemplate:
					"http://{subDomain}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
					key,
				subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
				title: "天地图矢量",
				maxScale: 19,
				copyright: "天地图"
			});
	
			
			var tdtImgLayer = new WebTileLayer({
				urlTemplate:
					"http://{subDomain}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
					key,
				subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
				title: "天地图影像",
				maxScale: 19,
				copyright: "天地图"
			});


			tdtImgLayer.visible = true; //
			tdtVecLayer.visible = true; //初始不显示
			
			var tdtAnnLayer = new WebTileLayer({
				urlTemplate:
					"http://{subDomain}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
					key,
				subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
				title: "天地图注记",
				maxScale: 19,
				copyright: "天地图"
			});

			let baseTdtSat = new Basemap({
				baseLayers: [tdtImgLayer,tdtAnnLayer ],//tdtImgLayer
				title: "卫星影像",
				id: "googlesat",
				thumbnailUrl: gisConfig.infoDefine.imagesDir + "SatImage.png"
			});
			let baseTdtMap = new Basemap({
				baseLayers: [ tdtVecLayer,tdtAnnLayer],//tdtAnnLayer
				title: "街景地图",
				id: "googlemap",
				thumbnailUrl: gisConfig.infoDefine.imagesDir + "MapVec.png"
			});
			baseLayers = [baseTdtMap,baseTdtSat];
		})	
		return baseLayers;
	},

	async createZjSjXzq() {
		//let layer: any;
		var layer = null;
		await loadModules([		
			"esri/layers/FeatureLayer",		
		], {
			url: gisConfig.mapConfig.url.urlAgsApi
		}).then(([FeatureLayer]) => { 
			var renderer = {
				type: "unique-value",  // autocasts as new UniqueValueRenderer()
				field: "value",
				defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
				uniqueValueInfos: [{					
					value: "趋好",
						symbol: {
							type: "simple-fill",  // autocasts as new SimpleFillSymbol()
							color: "green"
						}
					}, {					
					value: "一般",
						symbol: {
							type: "simple-fill",  // autocasts as new SimpleFillSymbol()
							color: "yellow"
						}
					}, {				
					value: "严重",
						symbol: {
							type: "simple-fill",  // autocasts as new SimpleFillSymbol()
							color: "red"
						}
				}]        
			};
	
			layer = new FeatureLayer({
				url: gisConfig.mapConfig.url.zjSjXzq,//"https://118.190.106.119:6443/arcgis/rest/services/CommonMap/ZjSjXzq/MapServer/0",
			});
			
			if(layer != null && layer != undefined)
			{
				layer.renderer = renderer;				
			}
		})	
		return layer;
	},

	snjbzLayerConfig:{
		tableFieldConfigs: [{
			name: "ObjectID",
			label: "ObjectID",
			direction: "asc"
		  },
		  {
			name: "name",
			label: "name"
		  },
		  {
			name: "deviceId",
			label: "deviceId"
		  },
		  {
			name: "status",
			label: "status"
		  },
		  {
			name: "title",
			label: "title"
		  },
		  {
			name: "temperature",
			label: "temperature"
		  },
		  {
			name: "humidity",
			label: "humidity"
		  },
		  {
			name: "product",
			label: "product"
		  },
		  {
			name: "overcount",
			label: "overcount"
		  },
		  {
			name: "btnFlag",
			label: "btnFlag"
		  },
		  {
			name: "Id",
			label: "Id"
		  },
		  {
			name: "url",
			label: "url"
		  },
		  {
			name: "project",
			label: "project"
		  },
		  {
			name: "department",
			label: "department"
		  }
		],


	},

	async createSnjbz() {
		//let layer: any;
		var layer = null;
		await loadModules([   
            "esri/geometry/Point",     
            "esri/layers/FeatureLayer",    
            "esri/layers/support/Field",           
        ], {
            url: gisConfig.mapConfig.url.urlAgsApi
        }).then(([Point,FeatureLayer,Field]) => {     
				const features = [];
				const fields = [
				  new Field({
					  name: "ObjectID",
					  alias: "ObjectID",
					  type: "oid"
				  }), new Field({
					  name: "name",
					  alias: "name",
					  type: "string"
				  }), new Field({
					  name: "deviceId",
					  alias: "deviceId",
					  type: "string"
				  }), new Field({
					  name: "status",
					  alias: "status",
					  type: "string"
				  }), new Field({
					  name: "title",
					  alias: "title",
					  type: "string"
				  }), new Field({
					  name: "temperature",
					  alias: "temperature",
					  type: "double"
				  }), new Field({
					  name: "humidity",
					  alias: "humidity",
					  type: "double"
				  }), new Field({
					  name: "product",
					  alias: "product",
					  type: "double"
				  }), new Field({
					  name: "overcount",
					  alias: "overcount",
					  type: "integer"
				  }),new Field({ //这个字段特殊用途，仅仅用于指示弹出框哪些button显示1-2-3-4 1表示新增 2表示删除 3表示更新，默认都有？
					  name: "btnFlag",
					  alias: "btnFlag",
					  type: "string"
				  }), new Field({
					  name: "Id",
					  alias: "Id",
					  type: "integer"
				  }), new Field({
					  name: "url",
					  alias: "url",
					  type: "string"
				  }), new Field({
					  name: "project",
					  alias: "project",
					  type: "string"
				  }), new Field({
					  name: "department",
					  alias: "department",
					  type: "string"
				  })
				];
  
				const snjbzName = "水泥搅拌桩";
				const projectCode = "金丽温东延";
				const urlSource = gisConfig.mapConfig.url.urlSource;//"https://www.gdjtypt.com/DeviceWebGisApi/api/";
				var   templateSnjbz = {
				  title: snjbzName,
				  content: ""
				};
  
				  
  
				var snjbzSymbol = {
				  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
				  style: "circle", //circle, diamond, square, triangle, cross, x 
				  color: "blue",
				  size: "8px",  // pixels
				  outline: {  // autocasts as new SimpleLineSymbol()
				  color: [ 255, 0, 0 ],
				  width: 3  // points
				  }
				};
  
				function createGraphics(data) {
					// raw GeoJSON data
					var geoJson = data;
  
					// Create an array of Graphics from each GeoJSON feature
					return geoJson.features.map(function (feature, i) {
						return {
							geometry: new Point({
								x: feature.geometry.coordinates[0],
								y: feature.geometry.coordinates[1],
								//z: feature.geometry.coordinates[2],
								hasZ: false //false的话，可以自动贴组3维的地面
							}),
							
							// select only the attributes you care about
							attributes: {
								ObjectID: i,
								name: feature.properties.name,
								Id: feature.properties.Id, //可能是自增id
								deviceId: feature.properties.deviceId, //设备Id
								status: feature.properties.status,//开关状态
								temperature:feature.properties.temperature, //温度
								humidity: feature.properties.humidity, //湿度
								product: feature.properties.product, //搅拌站的每日盘方数
								overcount: feature.properties.overcount, //搅拌站的每日超标次数
								title: feature.properties.title,
								url:feature.properties.url, //摄像头有
								project:feature.properties.project, //水泥搅拌桩
								department:feature.properties.department, //水泥搅拌桩
								desc:feature.properties.desc,
								time:feature.properties.time,
							}
						};
					});
				}


				var graphics = null;
				async function getData(url) {
					//var url = "../js/lab.geojson";
			
					//return esriRequest(url, {
					//    responseType: "json"
					//});       
					//XEAjax.get 默认返回响应结果为 JSON 的 Peomise 对象
					var data = await XEAjax.get (url);					
					if(data != null)
					{
							graphics = createGraphics(data);
					}
					else
					{
							//graphics = null;  //如果这样会出错
					if(graphics != null)
						graphics.length = 0;//清空上次的结果，免得这次没有数据却用了上次的数据
					else
						graphics = new Array(); //这里不能为null，否则创建图层会出错
								return;
					}
		
					// XEAjax.get是异步，所以放这里面
					var snjbzVectLayer = new FeatureLayer({
						title: snjbzName,
						source: graphics, // autocast as an array of esri/Graphic
						// create an instance of esri/layers/support/Field for each field object
						fields: fields, // This is required when creating a layer from Graphics
						objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
						renderer: {
							//type: "simple",  // autocasts as new SimpleRenderer()
							type: "unique-value",  // autocasts as new UniqueValueRenderer()
							field: "status",
							defaultLabel: "关",		//默认是others		
							defaultSymbol: snjbzSymbol,//要有default，否则新增这个图标的时候，看不见结果。
							uniqueValueInfos: [
							{					
							value: "开",					
							symbol:snjbzSymbol
							},
							//{					
							// value: "关",					
							// symbol:snjbzSymbol
							//}
							],                
						},
						spatialReference: {
							wkid: 4326
						},
						geometryType: "point", // Must be set when creating a layer from Graphics
						// popupTemplate: templateSnjbz,
						//labelingInfo: [labelClass]
					});		

					return new Promise((resolve, reject) => {
						resolve(snjbzVectLayer);
					})
				}		
				// https://www.gdjtypt.com/DeviceWebGisApi/api/Device/GetDevices//%E6%B0%B4%E6%B3%A5%E6%90%85%E6%8B%8C%E6%A1%A9/%E9%87%91%E4%B8%BD%E6%B8%A9%E4%B8%9C%E5%BB%B6
				const featUrlHeader = urlSource+"/Device/GetDevices/";
				//const thisurl = featUrlHeader + "?type="+encodeURIComponent(snjbzName)+"&project=" + encodeURIComponent(projectCode);
				const thisurl = "https://www.gdjtypt.com/DeviceWebGisApi/api/Device/GetDevices/" + encodeURIComponent(snjbzName) + "/" + encodeURIComponent(projectCode);
				// 注意：这是异步的写法，这里需要同步返回，所以不能用then
				// getData(thisurl).then(lay => { 
				// 	layer = lay;					
				//   });

				layer = getData(thisurl);
		})	
		return layer;
	}	

};


export default  layers;
 

<template>
    <div id='viewDiv'>
    </div>
</template>
<script>
    import {
        loadModules
    } from 'esri-loader';
    //使用jquery
    import $ from jquery;
    export default {
        name: 'Map',
        mounted() {
            loadModules([
                'esri/Map',
                'esri/views/SceneView',
                "esri/widgets/Search",
                "esri/widgets/Locate",
                 "esri/geometry/Point",
                     "esri/layers/GraphicsLayer",
                  "esri/symbols/SimpleMarkerSymbol",
                "esri/PopupTemplate",
                   "esri/layers/FeatureLayer",
                       "esri/Graphic",
                          "esri/layers/support/Field"
            ], {
                url: 'https://js.arcgis.com/4.22/'
            }).then(([EsriMap, SceneView,Search,Locate,Point,GraphicsLayer,SimpleMarkerSymbol,PopupTemplate,FeatureLayer,Graphic,Field]) => {



        const snjbzName = "水泥搅拌桩";
        const projectCode = "金丽温东延";
        const urlSource = "https://www.gdjtypt.com/DeviceWebGisApi/api/";
                var   templateSnjbz = {
                title: snjbzName,
                content: null
            };
		    const labelClass = {
          // autocasts as new LabelClass()
          symbol: {
            type: "text",  // autocasts as new TextSymbol()
            color: "red",
            font: {  // autocast as new Font()
                size: 16,
                family: "sans-serif",
                weight: "bold"
            }
			    },
			 
          labelPlacement: "center-right",
          labelExpressionInfo: {
          expression: "$feature.deviceId"
          }
        };			
			/*
      var imagesDir = 
       var snjbzSymbol = {
			//angle:45,
			type: 'picture-marker',			
			url: imagesDir + 'snjbz.png',						
			width: '40px',
			height: '40px',
			xoffset: '0px', //默认x在图像中心
			yoffset: '0px', //默认y在图像中心，所以64/2=32
		};*/

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

      var graphics = null;
      function getData(url) {
        //var url = "../js/lab.geojson";

        //return esriRequest(url, {
        //    responseType: "json"
        //});       
        $.ajax({
            type: 'get',
            async: false, //同步，否则还没获得数据就加载图层
            url: url,
            contentType: 'application/json',
            //data: JSON.stringify({ value: "Amon" }),
            // 下面的两行代码,就是解决跨域的关键
            xhrFields: { withCredentials: true },
            crossDomain: true,
            // 就是上面的两行代码
            success: function (data) {
                // do something
                if (data == "undefined" || data == null || data == "" || data == "{}") {
                    //graphics = null;  //如果这样会出错
					if(graphics != null)
						graphics.length = 0;//清空上次的结果，免得这次没有数据却用了上次的数据
					else
						graphics = new Array(); //这里不能为null，否则创建图层会出错
                    return;
                }
                data = JSON.parse(data);
                graphics = createGraphics(data);
            },
            error: function (data) {
                // do something
            }
        })
      }

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

    
    const featUrlHeader = urlSource+"/MachineDevice/GetDevices/";
		getData(featUrlHeader + "?type="+encodeURIComponent(snjbzName)+"&project=" + encodeURIComponent(projectCode));
        //getData(featUrlHeader + "/" + encodeURIComponent(deviceType.snjbzName));
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
              /*{					
                value: "关",					
                symbol:snjbzSymbol
              }*/
              ],                
            },
            spatialReference: {
                wkid: 4326
            },
            geometryType: "point", // Must be set when creating a layer from Graphics
            popupTemplate: templateSnjbz,
			//labelingInfo: [labelClass]
        });


                let map = new EsriMap({
                    basemap: 'satellite'
                })
                const view = new SceneView({
                    map: map,
                    container: 'viewDiv',
                    center: [120.4508651185194, 40.763963987428166],
                    zoom: 13
                })

                const search = new Search({
                    view: view
                });
                
                const locateBtn = new Locate({
                    view: view
                });

                view.ui.add(search, "top-right");        
                view.ui.add(locateBtn, "bottom-right");
            })
        }
    }
</script>
<style scoped>
    @import url("https://js.arcgis.com/4.22/esri/themes/light/main.css");
    #viewDiv {
        position:absolute; /*这个一定要 */
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
    }
</style>
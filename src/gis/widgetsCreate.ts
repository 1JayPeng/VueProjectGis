// Gis图层创建
import {
    loadModules
} from 'esri-loader';
import XEAjax from 'xe-ajax';
import gisConfig from '/@/gis/gisConfig'

const widgets = {
	//BasemapToggle因为要用到已经生成的底图，比较特殊，这里单独写一个函数
	async createBasemapToggle(view:any,baseMapLayers:any) {
		//let layer: any;
		var layer = null;
		await loadModules([   		
            "esri/widgets/BasemapToggle",            
        ], {
            url: gisConfig.mapConfig.url.urlAgsApi
        }).then(([BasemapToggle]) => { 
			//basemap togggle
			if(gisConfig.appConfig.widget.baseMap == true)
			{
				var toggle;
				var nextBaseMap;
				var type = gisConfig.infoDefine.viewType.view2D;
				if(type == gisConfig.infoDefine.viewType.view2D)//2D	
				{
					if(gisConfig.mapConfig.mapInitParams.baseMap == gisConfig.infoDefine.baseMapType.tianditu)
					{
						if(baseMapLayers!= null && baseMapLayers.length == 2)
						{
							if(gisConfig.mapConfig.mapInitParams.baseMapMain == "vec")
								nextBaseMap = baseMapLayers[1];
							else
								nextBaseMap = baseMapLayers[0];
						}
					}
						
					// else if(MapConfig.mapInitParams.baseMap == baseMapType.google)
					// 	nextBaseMap = baseGoogleMap;
					// else
					// 	nextBaseMap = arcgismap;
				}				
				else			
					nextBaseMap = "streets";	
				
				//临时：
				//nextBaseMap = "streets";

				toggle = new BasemapToggle({
					titleVisible: true,
					view: view,
					nextBasemap: nextBaseMap
					});	
				//if(type == viewType.view3D)
				// if(MapConfig.mapInitParams.baseMapMain == "vec")
				// 	toggle.nextBasemap.title = "卫星地图";//这里3d还需要手动设置
				// else
				// 	toggle.nextBasemap.title = "矢量地图";//这里3d还需要手动设置
				toggle.nextBasemap.title = "矢量地图";//这里3d还需要手动设置
				view.ui.add(toggle, "top-right");
			}    
		})			
	},	

	async createWidgets(view:any) {
		//let layer: any;
		var layer = null;
		await loadModules([   
			"esri/views/MapView",
			"esri/core/watchUtils",		
			"esri/geometry/support/webMercatorUtils",	
			"esri/geometry/Point",
			"esri/widgets/Expand",
            "esri/widgets/Legend",
            "esri/widgets/Feature",            
            "esri/widgets/ScaleBar",
            "esri/widgets/Fullscreen",
            "esri/widgets/Editor",
            "esri/widgets/Locate",
            "esri/widgets/Print",
            "esri/widgets/Sketch/SketchViewModel",            
            "esri/widgets/Home",
            "esri/widgets/LayerList", 
			"esri/widgets/Search",     			
			"esri/widgets/Measurement",
        ], {
            url: gisConfig.mapConfig.url.urlAgsApi
        }).then(([MapView,watchUtils,webMercatorUtils,Point,Expand,Legend,Feature,ScaleBar,Fullscreen,Editor,
			Locate,Print,SketchViewModel,Home,LayerList,Search,Measurement]) => { 
			

			if(gisConfig.appConfig.widget.scaleBar == true)
			{
			  var scaleBar = new ScaleBar({
				view: view,
				unit: "metric" //米制
			  });
			  // Add widget to the bottom left corner of the view
			  view.ui.add(scaleBar, {
				position: "bottom-right"
			  });
			}
			
			//fullscreen
			if(gisConfig.appConfig.widget.fullScreen == true)
			{
			  view.ui.add(
				new Fullscreen({
				view: view,
			  //	element: applicationDiv
				}),
				"top-right"
			  );
			}

			//home
			if(gisConfig.appConfig.widget.home == true)
			{
				var homeButton = new Home({
					view: view,
					label:"默认视图"
				});		
				view.ui.add(homeButton, "top-left");
			}

			//legend
			if(gisConfig.appConfig.widget.lengend == true)
			{
			  	var legendExpand = new Expand({
				expandIconClass: "esri-icon-drag-horizontal",
				expandTooltip: "展开查看图例",
				collapseTooltip:"折叠",// optional, defaults to "Collapse" for English locale
				content: new Legend({
				  view: view,
				  //layerInfos: [
				  //    { //layerInfos如果不写，那么所有层都显示，但是这里无人机不显示图例，因此这里全部列出要显示的
				  //        layer: jbzVectLayer,
				  //        //title: "Legend"
				  //    }, {
				  //        layer: envVectLayer
				  //    }, {
				  //        layer: labVectLayer
				  //    }, {
				  //        layer: yajiangVectLayer
				  //    }, {
				  //        layer: zhanglaVectLayer
				  //    }, {
				  //        layer: yanghuVectLayer
				  //    }],
				  style: "classic" // other styles include 'card'
					}),
					view: view,
					expanded: true
				});
				legendExpand.collapse();
				view.ui.add(legendExpand, "top-left");
			}

			//print
			if(gisConfig.appConfig.widget.print == true)
			{
			  var print = new Print({
				view: view,
				// specify your own print service
				printServiceUrl:
				  "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
			  });

				  // Add widget to the top right corner of the view
				  //view.ui.add(print, "top-right");
			  var printExpand = new Expand({
						view: view,
						content: print,
						expandTooltip: "展开进行打印",
				collapseTooltip:"折叠",// optional, defaults to "Collapse" for English locale
						expandIconClass: "esri-icon-printer"
					});
			  view.ui.add(printExpand, "top-right");
			}

			if(gisConfig.appConfig.widget.geoQuery == true){
				let div = document.getElementById("select-by-rectangle");
				if(div != null){
					div.style.display = "";//显示
					view.ui.add(div, "top-left");
				}
				div = document.getElementById("clear-selection");
				if(div != null){					
					div.style.display = "";//显示
					view.ui.add(div, "top-left");
				}
			}


			if(gisConfig.appConfig.widget.measurement == true)
			{
				var toolbar = document.getElementById("toolbarDiv");
				if(toolbar != null){
					toolbar.style.display = "";//显示
				}
				var measurement = new Measurement();
				var distanceButton = document.getElementById("distance");
				var areaButton = document.getElementById("area");
				var clearButton = document.getElementById("clear");
				if(distanceButton != null){
					distanceButton.addEventListener("click", function() {
						distanceMeasurement();
					});
				}	
				if(areaButton != null){
					areaButton.addEventListener("click", function() {
						areaMeasurement();
					});
				}
				if(clearButton != null){
					clearButton.addEventListener("click", function() {
						clearMeasurements();
					});
				}
				view.ui.add(measurement, "bottom-right");
				measurement.view = view;
				// Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
				function distanceMeasurement() {
					const type = view.type;
					measurement.activeTool =
						type.toUpperCase() === "2D" ? "distance" : "direct-line";
					distanceButton.classList.add("active");
					areaButton.classList.remove("active");
				}

				// Call the appropriate AreaMeasurement2D or AreaMeasurement3D
				function areaMeasurement() {
					measurement.activeTool = "area";
					distanceButton.classList.remove("active");
					areaButton.classList.add("active");
				}

				// Clears all measurements 这个外面要用到，所以这样定义
				function clearMeasurements() {
					distanceButton.classList.remove("active");
					areaButton.classList.remove("active");
					measurement.clear();
				}
			}
		
			function createOverView()
            {
                let type = "2D";             

                //overview
                function InitOverView(overMapView:any)
                {
                  // Remove the default widgets
                  overMapView.ui.components = [];
                  var extentDiv = document.getElementById("extentDiv");
                  overMapView.when(function () {
                    // Update the overview extent whenever the MapView or SceneView extent changes
                    view.watch("extent", updateOverviewExtent);
                    overMapView.watch("extent", updateOverviewExtent);

                    // Update the minimap overview when the main view becomes stationary
                    watchUtils.when(view, "stationary", updateOverview);

                    function updateOverview() {
                      // Animate the MapView to a zoomed-out scale so we get a nice overview.
                      // We use the "progress" callback of the goTo promise to update
                      // the overview extent while animating
                      overMapView.goTo({
                        center: view.center,
                        scale: view.scale * 2 * Math.max(view.width /
                          overMapView.width,
                          view.height / overMapView.height)
                      });
                    }
                    function updateOverviewExtent() {
                      // Update the overview extent by converting the SceneView extent to the
                      // MapView screen coordinates and updating the extentDiv position.
                      var extent = view.extent;
                      if (extent == null)
                        return;

                      //这里js4.11版本会出错，为森马？
                      //var bottomLeft = overMapView.toScreen(extent.xmin, extent.ymin);
                      //var topRight = overMapView.toScreen(extent.xmax, extent.ymax);
                      var bottomLeft = overMapView.toScreen(
                        new Point({
                        x: extent.xmin,
                        y: extent.ymin,
                        spatialReference: extent.spatialReference
                        })
                      );

                      var topRight = overMapView.toScreen(
                        new Point({
                        x: extent.xmax,
                        y: extent.ymax,
                        spatialReference: extent.spatialReference
                        })
                      );

                      extentDiv.style.top = topRight.y + "px";
                      extentDiv.style.left = bottomLeft.x + "px";

                      extentDiv.style.height = (bottomLeft.y - topRight.y) + "px";
                      extentDiv.style.width = (topRight.x - bottomLeft.x) + "px";
                    }
                  });

                /* 下面是overview，在3d下有问题，暂时注释了。*/
                }

                var overMapView2D = null;
                if(gisConfig.appConfig.widget.overView == true)
                {
                // Create the MapView for overview map	
                  document.getElementById("overviewDiv").style.display = "";		
                  if(type == gisConfig.infoDefine.viewType.view2D)//2D	
                  {
                      overMapView2D = new MapView({
                      container: "overviewDiv",
                      map: view.map,
                      constraints: {
                        rotationEnabled: false
                      }
                    });
                    InitOverView(overMapView2D);
                  }
                  else
                  {			
                      overMapView3D = new SceneView({
                      container: "overviewDiv",
                      map: view.map,
                      constraints: {
                        rotationEnabled: false
                      }
                    });
                    InitOverView(overMapView3D);
                  }                  
                }
            }
   
            createOverView();

			//下面是显示坐标
			//显示地图坐标
			function showCoordinates(point) {
				////the map is in web mercator but display coordinates in geographic (lat, long)
				//var mp = webMercatorUtils.webMercatorToGeographic(evt.po);
				////display mouse coordinates
				//显示指定位置
				//dom.byId("info").innerHTML = mp.x.toFixed(3) + ", " + mp.y.toFixed(3);
				var dom = document.getElementById('info');
				dom.innerHTML = "坐标： " + point.x.toFixed(9) + ", " + point.y.toFixed(9);
			}
			  
			//下面是鼠标移动事件：经纬度显示+高亮feature
			var highLightSelect;
			function addMouseMoveEvent(view)
			{
			//特别注意：不像click事件，这里pointer-move事件没有event.mapPoint
				view.on('pointer-move', function (event) {
					//event.x是屏幕坐标,转换成地理坐标（米）
					var point = view.toMap({ x: event.x, y: event.y });
					//var normalizedVal = webMercatorUtils.xyToLngLat(42215329, 1321748);
					//console.log(normalizedVal);
					if(point != null) //3d的时候为什么为null
					{
						if (gisConfig.mapConfig.latLonType === 1)//显示经纬度
						{
							var result = webMercatorUtils.xyToLngLat(point.x, point.y);
							point.x = result[0];
							point.y = result[1];
						}

						//bufferPoint(point);
						//alert(evt.x,evt.y);
						showCoordinates(point);
					}
				
					//下面是高亮一个层，鼠标经过的时候高亮一个feature			
					view.hitTest(event).then(function(response){
						if (response.results.length) 
						{
							if(gisConfig.appConfig.highLightFeature == true)
							{
							var graphic = response.results.filter(function (result) {
								//如果要对指定层进行高亮用这个：return result.graphic.layer === snjbzVectLayer;
								//if(!(result.graphic ==  null ||result.graphic.layer))
								return true;						
								//if(result.graphic.layer.title != null) //过滤掉（不高亮）测距离添加上去的graphics（title为null)
								
							})[0].graphic;

						
							view.whenLayerView(graphic.layer).then(function(layerView){			  
								// if a feature is already highlighted, then remove the highlight
								if (highLightSelect) {
								highLightSelect.remove();
								}
								
								// set the highlight on the first feature returned by the query
								highLightSelect = layerView.highlight(graphic);
							}).catch(function(error) {//这里需要出错catch，否则页面debug会出错误
								// An error occurred during the layerview creation
							}); 
							}
						}
						/*else
						{
							// 如果没有从hitTest()返回任何feature，则移除突出显示。这里暂时不要
							if(highLightSelect){
							highLightSelect.remove();
							highLightSelect = null;
							}
						}*/
					});                
				});		
			}
			addMouseMoveEvent(view);
		})			
	}	

};


export default  widgets;
 

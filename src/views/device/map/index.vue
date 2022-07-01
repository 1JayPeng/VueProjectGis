<template>
  <!-- <div class="splitpanes-container"  style="height: 100%">     
      <splitpanes class="default-theme" @resize="paneSize = $event[0].size" style="height: 800pt">
      <pane :size="5"> 
        <div class="shu-log">
          <el-image
              style="width: 100px; height: 100px"
                src="/src/assets/image/system/401.png"
                fit="cover">
            </el-image>
        </div>        
          </pane>
    
      <pane :size="95">  -->
        <div id="appContainer">
          <div id='viewDiv'>
            <span id="info" style="position:absolute; right:30px; bottom:0px; color:#000; z-index:50; font-size:12px"></span>
          </div>
          <div id="select-by-rectangle" class="esri-widget esri-widget--button esri-widget esri-interactive"
            title="Select features by rectangle" style="display:none">
            <span class="esri-icon-checkbox-unchecked"></span>
          </div>
          <div id="clear-selection" class="esri-widget esri-widget--button esri-widget esri-interactive"
              title="Clear selection" style="display:none">
            <span class="esri-icon-erase"></span>
          </div>

          <div id="tableContainer" class="container">
              <div id="tableDiv"></div>
          </div>

          <div id="mainDiv" class="esri-widget">
              <label class="switch">
                <input id="checkboxId" type="checkbox" checked="">
                <span class="slider round"></span>
              </label>
              <label class="labelText" id="labelText">打开要素表</label>
          </div>

          <div id="overviewDiv" style="display:none">
              <div id="extentDiv"></div>
          </div>

          <div id="toolbarDiv" style="display:none;" >
            <button
              id="distance"
              class="esri-widget--button esri-interactive esri-icon-measure-line"
              title="距离测量工具"
            ></button>
            <button
              id="area"
              class="esri-widget--button esri-interactive esri-icon-measure-area"
              title="面积测量工具"
            ></button>
            <button
              id="clear"
              class="esri-widget--button esri-interactive esri-icon-trash"
              title="清除"
            ></button>
          </div>
        </div>
      <!-- </pane>
    </splitpanes>     
	</div> -->



</template>
<script>
import {
    loadModules
} from 'esri-loader';
import { Splitpanes, Pane } from 'splitpanes';
import XEAjax from 'xe-ajax';
import gisConfig from '/@/gis/gisConfig'
import layers from '/@/gis/layersDefine'
import widgets from '/@/gis/widgetsCreate'
//使用jquery
// import $ from jquery;
export default {
    name: 'Map',
    components: { Splitpanes, Pane },
    
    mounted() {
        loadModules([
            "esri/Map",            
            "esri/views/SceneView",
            "esri/views/MapView",
            "esri/widgets/Search",
            "esri/core/watchUtils",            
            "esri/widgets/FeatureTable",           
            "esri/geometry/Point",
            "esri/layers/GraphicsLayer",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/PopupTemplate",
            "esri/tasks/QueryTask",
            "esri/layers/FeatureLayer",
            "esri/Graphic",
            "esri/symbols/SimpleFillSymbol",
            "esri/renderers/UniqueValueRenderer",
            "esri/Color",
            "esri/layers/support/Field",
            "esri/widgets/Expand",           
            "esri/widgets/Feature",    
            "esri/widgets/Sketch/SketchViewModel",
            "esri/widgets/BasemapToggle",            
            "esri/widgets/LayerList",
            "esri/layers/Layer",           
            "esri/geometry/geometryEngineAsync"
        ], {
            url: 'https://js.arcgis.com/4.22/'
        }).then(([EsriMap, SceneView,MapView,Search,watchUtils,FeatureTable,Point,GraphicsLayer,SimpleMarkerSymbol,
            PopupTemplate,QueryTask,FeatureLayer, Graphic,SimpleFillSymbol,UniqueValueRenderer,Color,Field,Expand,
            Feature,SketchViewModel,BasemapToggle,LayerList,Layer, geometryEngineAsync]) => {  
            const appContainer = document.getElementById("appContainer");
            const tableContainer = document.getElementById("tableContainer");
            const tableDiv = document.getElementById("tableDiv");

            var basemap = null;
            let map = new EsriMap({
              basemap: basemap,
                //basemap: 'satellite',
                //basemap: "streets-vector",
                //layers: [snjbzVectLayer]
            })

            //特别注意：这里创建view必须在下面layers.createBaseMap()之前，否则出错
            //const view = new SceneView({
            const view = new MapView({
                //map: map,
                container: 'viewDiv',
                center: gisConfig.mapConfig.mapInitParams.center,
                zoom: gisConfig.mapConfig.mapInitParams.zoom,
                // popup: {
                //   dockEnabled: true,
                //   dockOptions: {
                //     buttonEnabled: false,
                //     breakpoint: false
                //   }
                // }
              popup: {
                    autoOpenEnabled: false
                } //disable popups
            })

            
            layers.createBaseMap().then(baseLayers => { 
              //这里底图创建完毕才赋值给view.map，否则错误！！？？ 不能在上面new MapView中赋值，否则出错
              view.map = map;
              if(baseLayers != null && baseLayers.length == 1)
                map.basemap = baseLayers[0]; 
              else if(baseLayers != null && baseLayers.length == 2)
              {
                if(gisConfig.mapConfig.mapInitParams.baseMapMain == "vec")
                  map.basemap = baseLayers[0]; 
                else
                  map.basemap = baseLayers[1];  
                               
                widgets.createBasemapToggle(view,baseLayers);
              }        
            });
            
                        
            widgets.createWidgets(view);
            
        
            var zjxzqLayer = null;
            layers.createZjSjXzq().then(layer => { 
              zjxzqLayer = layer;
              map.add(zjxzqLayer);
            });
            
            var snjbzVectLayer = null;
            layers.createSnjbz().then(layer => { 
                snjbzVectLayer = layer;
                map.add(snjbzVectLayer);                

                // Create the feature table
                const featureTable = new FeatureTable({
                    view: view, // required for feature highlight to work
                    layer: snjbzVectLayer,
                    // Autocast the FieldColumnConfigs
                    fieldConfigs:layers.snjbzLayerConfig.tableFieldConfigs,
                    container: document.getElementById("tableDiv")
                });


                snjbzVectLayer.watch("loaded", () => {
                    watchUtils.whenFalse(view, "updating", () =>  {
                        // Get the new extent of view/map whenever map is updated.
                        if (view.extent) {
                          // Filter out and show only the visible features in the feature table
                          featureTable.filterGeometry = view.extent;
                        }
                    });
                });

                function errorCallback(){}

                let csvLayerView;
                snjbzVectLayer.when(() => {
                    view.whenLayerView(snjbzVectLayer).then(function (layerView) {
                      csvLayerView = layerView;
                    });
                  })
                  .catch(errorCallback);

                // Listen for the table's selection-change event
                featureTable.on("selection-change", (changes) => {

                // If the selection is removed, remove the feature from the array
                changes.removed.forEach((item) => {
                    const data = features.find((data) => {
                        return data.feature === item.feature;
                    });
                    if (data) {
                        features.splice(features.indexOf(data), 1);
                    }
                });

                // If the selection is added, push all added selections to array
                changes.added.forEach((item) => {
                  const feature = item.feature;
                  features.push({
                    feature: feature
                  });
                });

                // polygonGraphicsLayer will be used by the sketchviewmodel
                // show the polygon being drawn on the view
                const polygonGraphicsLayer = new GraphicsLayer();
                map.add(polygonGraphicsLayer);

                 // add the select by rectangle button the view
                view.ui.add("select-by-rectangle", "top-left");
                const selectButton = document.getElementById("select-by-rectangle");


                // click event for the select by rectangle button
                selectButton.addEventListener("click", () => {
                  view.popup.close();
                  sketchViewModel.create("rectangle");
                });


                // add the clear selection button the view
                view.ui.add("clear-selection", "top-left");
                document.getElementById("clear-selection").addEventListener("click", () => {
                  featureTable.clearSelection();
                  featureTable.filterGeometry = null;
                  polygonGraphicsLayer.removeAll();
                });

                // create a new sketch view model set its layer
                const sketchViewModel = new SketchViewModel({
                  view: view,
                  layer: polygonGraphicsLayer
                });

                // Once user is done drawing a rectangle on the map
                // use the rectangle to select features on the map and table
                sketchViewModel.on("create", async (event) => {
                  if (event.state === "complete") {
                    // this polygon will be used to query features that intersect it
                    const geometries = polygonGraphicsLayer.graphics.map(function(graphic){
                      return graphic.geometry
                    });
                    const queryGeometry = await geometryEngineAsync.union(geometries.toArray());
                    selectFeatures(queryGeometry);
                  }
                });

                // This function is called when user completes drawing a rectangle
                // on the map. Use the rectangle to select features in the layer and table
                function selectFeatures(geometry) {
                  if (csvLayerView) {
                    // create a query and set its geometry parameter to the
                    // rectangle that was drawn on the view
                    const query = {
                      geometry: geometry,
                      outFields: ["*"]
                    };

                    // query graphics from the csv layer view. Geometry set for the query
                    // can be polygon for point features and only intersecting geometries are returned
                    csvLayerView.queryFeatures(query)
                      .then((results) => {
                        if (results.features.length === 0) {
                          clearSelection();
                        } else {
                          // pass in the query results to the table by calling its selectRows method.
                          // This will trigger FeatureTable's selection-change event
                          // where we will be setting the feature effect on the csv layer view
                          featureTable.filterGeometry = geometry;
                          featureTable.selectRows(results.features);
                        }
                      })
                      .catch(errorCallback);

                    function errorCallback(error) {
                      console.log("error happened:", error.message);
                    }
                  }
                }

            });


            // Listen for the click on the view and select any associated row in the table
            view.on("immediate-click", (event) => {
                view.hitTest(event).then((response) => {
                    const candidate = response.results.find((result) => {
                      return result.graphic && result.graphic.layer && result.graphic.layer === snjbzVectLayer;
                    });
                    // Select the rows of the clicked feature
                    candidate && featureTable.selectRows(candidate.graphic);
                });
            });

        });
      
          //map.add(snjbzVectLayer);

        
        // Add toggle visibility slider
        view.ui.add(document.getElementById("mainDiv"), "top-right");

        // Get reference to div elements
        const checkboxEle = document.getElementById("checkboxId");
        const labelText = document.getElementById("labelText");

        // Listen for when toggle is changed, call toggleFeatureTable function
        checkboxEle.onchange = () => {
            toggleFeatureTable();
        };

        function toggleFeatureTable() {
            // Check if the table is displayed, if so, toggle off. If not, display.
            if (!checkboxEle.checked) {
              appContainer.removeChild(tableContainer);
              labelText.innerHTML =
                "打开要素表";
            } else {
              appContainer.appendChild(tableContainer);
              labelText.innerHTML =
                "关闭要素表";
            }
        }     

      })
    }
}
</script>
<style scoped>
  @import url("https://js.arcgis.com/4.22/esri/themes/light/main.css");
  @import '/@/theme/gis/gisIndex.scss';
  @import 'splitpanes/dist/splitpanes.css';
   .splitpanes__pane {
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    font-size: 70px;
    color: var(--color-primary-light-5);
    border: 1px solid #ebeef5;
}
</style>
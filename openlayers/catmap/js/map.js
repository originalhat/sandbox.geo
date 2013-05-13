// Generated by CoffeeScript 1.6.2
(function() {
  var CATMAP, onFeatureSelect, onFeatureUnselect;

  CATMAP = {};

  this.CATMAP = CATMAP;

  CATMAP.load_map = function(map_div_name) {
    var boulder, center, color, colors, controls, geoProj, ghyb, gmap, gsat, gterr, kmlDir, map, mercProj, nex_mosaic, osm, salina, styles;

    geoProj = new OpenLayers.Projection("EPSG:4326");
    mercProj = new OpenLayers.Projection("EPSG:900913");
    controls = [
      new OpenLayers.Control.MousePosition({
        displayProjection: geoProj
      }), new OpenLayers.Control.OverviewMap, new OpenLayers.Control.KeyboardDefaults, new OpenLayers.Control.LayerSwitcher, new OpenLayers.Control.Navigation
    ];
    map = new OpenLayers.Map(map_div_name, {
      controls: controls
    });
    CATMAP.map = map;
    osm = new OpenLayers.Layer.OSM();
    map.addLayer(osm);
    gterr = new OpenLayers.Layer.Google("Google Terrain", {
      type: google.maps.MapTypeId.TERRAIN
    });
    gmap = new OpenLayers.Layer.Google("Google Streets", {
      numZoomLevels: 20
    });
    ghyb = new OpenLayers.Layer.Google("Google Hybrid", {
      type: google.maps.MapTypeId.HYBRID,
      numZoomLevels: 20
    });
    gsat = new OpenLayers.Layer.Google("Google Satellite", {
      type: google.maps.MapTypeId.SATELLITE,
      numZoomLevels: 22
    });
    map.addLayers([gterr, gmap, ghyb, gsat]);
    boulder = new OpenLayers.LonLat(-105.3, 40.028);
    salina = new OpenLayers.LonLat(-97.6459, 38.7871);
    center = salina;
    map.setCenter(center.transform(geoProj, mercProj), 5);
    colors = ['ff0000', '00ff00', '0000ff', 'ffd700', 'ff00ff', '00ffff'];
    styles = (function() {
      var _i, _len, _results;

      _results = [];
      for (_i = 0, _len = colors.length; _i < _len; _i++) {
        color = colors[_i];
        _results.push(new OpenLayers.Style({
          'strokeWidth': 3,
          'strokeColor': '#' + color
        }));
      }
      return _results;
    })();
    kmlDir = "kml";
    nex_mosaic = new OpenLayers.Layer.Image('radar.NEXRAD.mosaic', 'img/map_radar_2.png', new OpenLayers.Bounds(-127.650375523875420, 21.652538062803, -66.577937876818, 50.436626367301044).transform(geoProj, mercProj), new OpenLayers.Size(3400, 1600), {
      isBaseLayer: false,
      alwaysInRange: true
    });
    map.addLayers([nex_mosaic]);
    nex_mosaic.setOpacity(.5);
    return map;
  };

  onFeatureSelect = function(event) {
    var content, feature, popup;

    feature = event.feature;
    console.log(feature);
    content = "<h2>" + feature.attributes.name + "</h2>" + feature.attributes.description;
    console.log(feature.attributes.description);
    popup = new OpenLayers.Popup.FramedCloud("chickenXXX", feature.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(100, 100), content, null, true);
    feature.popup = popup;
    return CATMAP.map.addPopup(popup);
  };

  onFeatureUnselect = function(event) {
    var feature;

    feature = event.feature;
    console.log(feature);
    if (feature.popup) {
      CATMAP.map.removePopup(feature.popup);
      feature.popup.destroy();
      return delete feature.popup;
    }
  };

}).call(this);

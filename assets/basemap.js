/* 全站统一底图：Esri World Light Gray，失败时回退 OSM.de
   用法：GB_BASEMAP(map) 或 GB_BASEMAP(map, { maxZoom: 18, attribution: false })
   背景：tile.openstreetmap.org 在部分网络（含国内）不可达，2026-11 统一换源。 */
(function () {
  var ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
  var OSMDE = "https://tile.openstreetmap.de/{z}/{x}/{y}.png";
  var ATT_ESRI = '&copy; <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a> — Esri, HERE, Garmin, &copy; OpenStreetMap contributors';
  var ATT_OSM = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

  window.GB_BASEMAP = function (map, opts) {
    opts = opts || {};
    var attribution = opts.attribution === false ? "" : ATT_ESRI;
    var base = L.tileLayer(ESRI, {
      maxZoom: opts.maxZoom || 16,
      attribution: attribution
    }).addTo(map);

    var errs = 0;
    var swapped = false;
    base.on("tileerror", function () {
      errs += 1;
      if (errs === 6 && !swapped) {
        swapped = true;
        map.removeLayer(base);
        L.tileLayer(OSMDE, { maxZoom: 17, attribution: ATT_OSM }).addTo(map);
      }
    });
    return base;
  };
})();

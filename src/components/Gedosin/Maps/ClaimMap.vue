<template>
    <section>
        <div class="card" v-loading="loading">
            <div class="card-content">
                <div class="row">
                    <div id="map" class="map" >
                        <div class="selected-claims" v-if="selectedClaims" style="height: 100%;">
                            <div class="map-claims-controls">
                                <h6>Total: {{selectedClaims.length}}</h6>
                                <div class="close" @click="selectedClaims = null">
                                    <i class="fa fa-close"></i>
                                </div>
                            </div>
                            <div v-for="claim in selectedClaims" class="claim-box"
                                 @click="openNewTab('/claims/'+claim.properties.id)">

                                <div class="claim-name">Claim {{claim.properties.external_id}}</div>
                                <div class="claim-status">
                                    <span class="el-tag" :class="getClaimStatusClass(claim.properties.status_id)">{{ $t('claim_status.'+claim.properties.status.name) }}</span>
                                </div>
                                <div class="claim-date">{{claim.properties.happened_at}}</div>
                                <div class="claim-damage">{{claim.properties.damage_type}}</div>
                            </div>

                        </div>
                    </div>
                    <div class='map-overlay' id='legend' v-if="legend">
                        <div class="item" v-for="item in legend">
                            <div class="legend-key" :style="{backgroundColor: item.color}"></div>
                            {{ item.name}} - {{ item.count }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import mapboxgl from 'mapboxgl';
  import Vue from 'vue'
  import ClaimResource from '../../../api/resources/ClaimResource'
  import {Loading} from 'element-ui'

  Vue.use(Loading.directive)

  export default {
    name: 'ClaimMap',
    data () {
      return {
        claims: [],
        selectedClaims: null,
        claimsGeoData: [],
        loading: true,
        legend: {},
        selectedInsee: null
      }
    },
    created: function () {
      // ClaimResource.getUserClaims({noPaginate: true}).then(res => {
      //   this.claims = res.data
      //   this.initCustomSkinMap()
      // })
      ClaimResource.getUserClaimsGeoData({noPaginate: true}).then(res => {
        this.claimsGeoData = res.data
        this.initCustomSkinMap()
        this.initLegend()
        this.loading = false;
      })
    },
    computed: {


    },
    methods: {
      openNewTab: function(url){
          window.open(url, '_blank')
      },
      initLegend: function(){
          var colors = ['#FF5733', '#FF8A33', '#FFBD33', '#FFF033', '#DBFF33', '#A8FF33'],
              statusId
          for(let i in this.claimsGeoData.features){
              statusId = this.claimsGeoData.features[i].properties.status_id

              if(statusId && this.legend[statusId] === undefined){
                  this.legend[statusId] = {
                      count: 0,
                      color: '',
                      name: this.$t('claim_status.' + this.claimsGeoData.features[i].properties.status.name.toLowerCase()),
                      id: statusId
                  }
              }
              if(this.legend[statusId].color === ''){

                  if(statusId == 1){
                      this.legend[statusId].color = colors[0];
                  } else if(statusId == 2){
                      this.legend[statusId].color = colors[1];
                  } else if(statusId == 3){
                      this.legend[statusId].color = colors[2];
                  } else if(statusId == 5){
                      this.legend[statusId].color = colors[3];
                  } else if(statusId >= 6 && statusId <= 7){
                      this.legend[statusId].color = colors[4];
                  } else if(statusId >= 8){
                      this.legend[statusId].color = colors[5];
                  }
              }
              this.legend[statusId].count++;
          }
      },
      getClaimStatusClass: function(status_id) {
        if(status_id === 1) {
          return 'el-tag--danger';
        }
        if(status_id === 2) {
          return 'el-tag--warning';
        }
        if(status_id === 3) {
          return 'el-tag--warning';
        }
        if(status_id === 4) {
          return 'el-tag--warning';
        }
        if(status_id === 5) {
          return 'el-tag--success';
        }
        if(status_id === 6) {
          return 'el-tag--success';
        }
        return 'el-tag--success';
      },
      initCustomSkinMap () {

        mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpbWF6YWtoaSIsImEiOiJjanVrZG5hMm0xdGZ3M3lwZDEyMDltNDRoIn0.GwFL4zbQMrPqnxpvnNPVYg'
        console.log('initMap')

        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v10',
          center: [1.79191 , 46.611],
          zoom: 5.15,
        })

        let that = this
        this.map.on('load', function () {
          that.loadClusterMarkers()
        })

      },
      loadClusterMarkers: function () {
        let that = this

        var status1 = ['==', ['get', 'status_id'], 1]
        var status2 = ['==', ['get', 'status_id'], 2]
        var status3 = ['==', ['get', 'status_id'], 3]
        var status4 = ['==', ['get', 'status_id'], 5]
        var status5 = ["all", [">=", ["get", "status_id"], 6], ["<=", ["get", "status_id"], 7]];
        var status6 = ['>=', ['get', 'status_id'], 8]

        // colors to use for the categories
        var colors = ['#FF5733', '#FF8A33', '#FFBD33', '#FFF033', '#DBFF33', '#A8FF33']

        // add a clustered GeoJSON source for a sample set of earthquakes
        that.map.addSource('earthquakes', {
          'type': 'geojson',
          'data': that.claimsGeoData,
          'cluster': true,
          'clusterRadius': 100,
          'clusterProperties': { // keep separate counts for each magnitude category in a cluster
            'status1': ['+', ['case', status1, 1, 0]],
            'status2': ['+', ['case', status2, 1, 0]],
            'status3': ['+', ['case', status3, 1, 0]],
            'status4': ['+', ['case', status4, 1, 0]],
            'status5': ['+', ['case', status5, 1, 0]],
            'status6': ['+', ['case', status6, 1, 0]]
          }
        })
// circle and symbol layers for rendering individual earthquakes (unclustered points)
                that.map.addLayer({
                    'id': 'earthquake_circle',
                    'type': 'circle',
                    'source': 'earthquakes',
                    'filter': ['==', 'cluster', true],
                    'paint': {
                        'circle-color': ['case',
                            status1, colors[0],
                            status2, colors[1],
                            status3, colors[2],
                            status4, colors[3],
                            status5, colors[4],
                            status6, colors[5], colors[5]
                        ],
                        'circle-opacity': 0.6,
                        'circle-radius': 12
                    }
                })
                that.map.addLayer({
                    'id': 'earthquake_label',
                    'type': 'symbol',
                    'source': 'earthquakes',
                    'filter': ['==', 'cluster', true],
                    'layout': {
                        'text-field': ['number-format', ['get', 'status_id'], {'min-fraction-digits': 0, 'max-fraction-digits': 0}],
                        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                        'text-size': 15
                    },
                    'paint': {
                        'text-color': ['case', ['<', ['get', 'status_id'], 3], 'black', 'white']
                    }
                })

                that.map.addLayer({
                    id: "unclustered-point",
                    type: "circle",
                    source: "earthquakes",
                    filter: ["!", ["has", "point_count"]],
                    paint: {
                        'circle-color': ['case',
                            status1, colors[0],
                            status2, colors[1],
                            status3, colors[2],
                            status4, colors[3],
                            status5, colors[4],
                            status6, colors[5], colors[5]
                        ],
                        'circle-opacity': 0.6,
                        'circle-radius': 12
                    }
                });

// objects for caching and keeping track of HTML marker objects (for performance)
                var markers = {}
                var markersOnScreen = {}

                function updateMarkers () {
                    var newMarkers = {}
                    var features = that.map.querySourceFeatures('earthquakes')
// for every cluster on the screen, create an HTML marker for it (if we didn't yet),
// and add it to the map if it's not there already

                    for (var i = 0; i < features.length; i++) {
                        let element = features[i]
                        var coords = features[i].geometry.coordinates
                        var props = features[i].properties
                        let isCluster = props.cluster_id ? true : false
                        // if (!props.cluster) {console.log(props); continue}
                        var id = props.cluster_id ? props.cluster_id : props.id
                        let markerId = id

                        var marker = markers[id]
                        if (!marker) {
                            var el = that.createDonutChart(props)

                            el.addEventListener('click', function () {

                                console.log('click on marker')

                                if (markerId) {
                                    let clusterSource = that.map.getSource('earthquakes')
                                    if(isCluster){
                                        clusterSource.getClusterLeaves(markerId, -1, 0, function (err, aFeatures) {
                                            that.selectedClaims = aFeatures
                                        })
                                    } else {
                                        if(typeof element.properties.status === 'string'){
                                            element.properties.status = JSON.parse(element.properties.status)
                                        }

                                        that.selectedClaims = {element}
                                        console.log(id);
                                        console.log(id);
                                    }

                                }

                            })

                            marker = markers[id] = new mapboxgl.Marker({element: el}).setLngLat(coords)
                        }
                        newMarkers[id] = marker

                        if (!markersOnScreen[id]) {
                            marker.addTo(that.map)
                        }
                    }
// for every marker we've added previously, remove those that are no longer visible
                    for (id in markersOnScreen) {
                        if (!newMarkers[id]) {
                            markersOnScreen[id].remove()
                        }
                    }
                    markersOnScreen = newMarkers
                }

// after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
                that.map.on('data', function (e) {
                    if (e.sourceId !== 'earthquakes' || !e.isSourceLoaded) return

                    that.map.on('move', updateMarkers)
                    that.map.on('moveend', updateMarkers)
                    updateMarkers()
                })

            },
            // code for creating an SVG donut chart from feature properties
            createDonutChart: function (props) {
                var colors = ['#FF5733', '#FF8A33', '#FFBD33', '#FFF033', '#DBFF33', '#A8FF33', '#A8FF33']

                var offsets = []
                var counts = [props.status1, props.status2, props.status3, props.status4, props.status5, props.status6]
                var total = 0
                for (var i = 0; i < counts.length; i++) {
                    offsets.push(total)
                    total += counts[i]
                }

                var fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16
                var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18
                var r0 = Math.round(r * 0.6)
                var w = props.id ? (18 * 2) : (r * 2)

                var html = '<svg width="' + w + '" height="' + w + '" viewbox="0 0 ' + w + ' ' + w +
                        '" text-anchor="middle" style="font: ' + fontSize + 'px sans-serif">'
                if(props.id){
                    r = 18;
                    r0 = 11;
                    html += this.donutSegment(0, 1, 18, 11, colors[props.status_id - 1])
                } else {
                    for (i = 0; i < counts.length; i++) {
                        html += this.donutSegment(offsets[i] / total, (offsets[i] + counts[i]) / total, r, r0, colors[i])
                    }
                }
                for (i = 0; i < counts.length; i++) {
                    // if(total == 7){
                    //     console.log(offsets[i] / total)
                    //     console.log((offsets[i] + counts[i]) / total)
                    //     console.log(r)
                    //     console.log(r0)
                    // }

                    // html += this.donutSegment(offsets[i] / total, (offsets[i] + counts[i]) / total, r, r0, colors[i])
                }

                html += '<circle cx="' + r + '" cy="' + r + '" r="' + r0 +
                        '" fill="white" /><text dominant-baseline="central" transform="translate(' +
                        r + ', ' + r + ')">' + (total ? total : 1) + '</text></svg>'

                var el = document.createElement('div')
                el.innerHTML = html
                return el.firstChild
            },

            donutSegment: function (start, end, r, r0, color) {

                if (end - start === 1) end -= 0.00001
                var a0 = 2 * Math.PI * (start - 0.25)
                var a1 = 2 * Math.PI * (end - 0.25)
                var x0 = Math.cos(a0), y0 = Math.sin(a0)
                var x1 = Math.cos(a1), y1 = Math.sin(a1)
                var largeArc = end - start > 0.5 ? 1 : 0

                return ['<path d="M', r + r0 * x0, r + r0 * y0, 'L', r + r * x0, r + r * y0,
                    'A', r, r, 0, largeArc, 1, r + r * x1, r + r * y1,
                    'L', r + r0 * x1, r + r0 * y1, 'A',
                    r0, r0, 0, largeArc, 0, r + r0 * x0, r + r0 * y0,
                    '" fill="' + color + '" />'].join(' ')
            },
            loadMarkers: function () {
                // // add markers to map
                // let that = this
                // console.log('loadMarkers')
                // this.claims.forEach(function (claim) {
                //   console.log(claim)
                //   var el = document.createElement('div')
                //   el.className = 'marker'
                //   el.style.backgroundImage = 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/134893/pin-red.svg)'
                //   el.style.width = '21px'
                //   el.style.height = '21px'
                //
                //   el.addEventListener('click', function () {
                //     that.selectedInsee = claim.insee
                //   })
                //
                //   new mapboxgl.Marker(el)
                //     .setLngLat([claim.insee_code.long, claim.insee_code.lat])
                //     .addTo(that.map)
                // })
            },
        },
        mounted () {
        }
    }

</script>
<style scoped>
    #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        min-height:800px;
        box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);
    }
    h6 {
        margin-bottom:0;
        margin-top:0;
        line-height:55px;
        margin-left:21px;
        display: inline-block;

    }
    #legend {
        padding: 10px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        line-height: 18px;
        height: auto;
        margin-bottom: 40px;
        width: auto;
    }
    .card-content{
        min-height: 800px;
    }
    #legend .legend-key {
        display: inline-block;
        border-radius: 20%;
        width: 10px;
        height: 10px;
        margin-right: 5px;
    }
    #legend .item{
        margin-bottom: 5px;
    }
    #legend .item:last-child{
        margin-bottom: 0;
    }
    .map-overlay {
        position: absolute;
        bottom: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.8);
        margin-right: 20px;
        font-family: Arial, sans-serif;
        overflow: auto;
        border-radius: 3px;
    }
    .selected-claims .claim-status > span{
        color: #fff;
    }
</style>

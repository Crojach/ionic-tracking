import { DataField } from './../../../models/data-field';
import { DataFieldsService } from './../../services/data-fields.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl;

@Component({
  selector: 'app-activity-display',
  templateUrl: './activity-display.page.html',
  styleUrls: ['./activity-display.page.scss'],
})
export class ActivityDisplayPage implements OnInit {
  activity: any;
  map: any;
  geojson: any;
  dataFields: Array<DataField>;

  constructor(
    private route: ActivatedRoute,
    private dataFieldsService: DataFieldsService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.activity = params.activity;
      this.dataFields = this.dataFieldsService.getDataFields(this.activity.tip);

      const coordinates = JSON.parse(this.activity.koordinate);
      const coordsLength = coordinates.length;
      this.geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates
            }
          }
        ]
      };

      setTimeout(() => {
        
        this.createMap(coordinates);
      }, 0);

      this.setDataFields('time', this.activity.trajanjeAktivnosti);
      const timeParts = this.activity.trajanjeAktivnosti.split(':');
      let totalHours = parseInt(timeParts[0], 10);
      totalHours += parseInt(timeParts[1], 10) / 60;
      totalHours += parseInt(timeParts[2], 10) / 3600;
      const speed = this.activity.udaljenost / totalHours;

      this.setDataFields('speed', speed.toFixed(1));

      const pace = 60 / speed;

      const paceMinutes = Math.floor(pace);
      const paceSeconds = Math.round((pace - paceMinutes) * 60);

      this.setDataFields('pace', `${paceMinutes}:${paceSeconds < 10 ? '0' + paceSeconds : paceSeconds}`);

      this.setDataFields('distance', (this.activity.udaljenost).toFixed(1));
      this.setDataFields('altitude', (0).toFixed(1));
    });
  }

  private createMap(coordinates: Array<number>): void {
    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoiY3JvamFjaCIsImEiOiJjanpyZXlid3gwN2w3M29teDFqcHVhaDRwIn0.GscN6ezfC2mfwU-0EHMlwg';
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [15.9159122, 45.7665807],
        zoom: 15
      });

      this.map.on('load', () => {
        this.map.addSource('line', {
          type: 'geojson',
          data: this.geojson
        });

        // add the line which will be modified in the animation
        this.map.addLayer({
          id: 'line-animation',
          type: 'line',
          source: 'line',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-color': '#041872',
            'line-width': 5,
            'line-opacity': 0.8
          }
        });

        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        this.map.fitBounds(bounds, {
          padding: 20
        });
      });

    } catch (error) {

    }
  }

  private setDataFields(id: string, value: string): void {
    const data = this.dataFields.find(x => x.id === id);
    if (data) {
      data.value = value;
    }
  }
}

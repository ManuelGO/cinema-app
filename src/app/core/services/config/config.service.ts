import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Config } from '../../models/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config!: Config;

  constructor(private http: HttpClient) { }

  async loadAppConfig(): Promise<void> {
    this.config =  await lastValueFrom(this.http.get<Config>('assets/config/config.json'));
    console.log(this.config)
  }
}

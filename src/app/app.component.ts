import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  data = [
    { state: 'MN', county: '1', item: 0.297 },
    { state: 'MN', county: '1', item: 0.04 },
    { state: 'MN', county: '3', item: 0.14 },
    { state: 'CA', county: '2', item: 0.019 },
    { state: 'MN', county: '1', item: 0.0374 }, 
    { state: 'CA', county: '2', item: 0.037 },
    { state: 'CA', county: '3', item: 0.14 }
  ];

  dataExt: any[] = [];

  constructor() {
    this.processData();
  }

  private processData() {
    const statesSeen = {};
    const countiesSeen = {};

    this.dataExt = this.data.sort((a, b) => {
      const stateComp = a.state.localeCompare(b.state);
      return stateComp ? stateComp : a.county.localeCompare(b.county);
    }).map(x => {
      const stateSpan = statesSeen[x.state] ? 0 :
        this.data.filter(y => y.state === x.state).length;

      statesSeen[x.state] = true;

      const countySpan = countiesSeen[x.state] && countiesSeen[x.state][x.county] ? 0 :
        this.data.filter(y => y.state === x.state && y.county === x.county).length;

      countiesSeen[x.state] = countiesSeen[x.state] || {};
      countiesSeen[x.state][x.county] = true;

      return { ...x, stateSpan, countySpan };
    });
  }
}

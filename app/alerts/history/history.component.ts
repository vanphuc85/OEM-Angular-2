import { Component, OnInit } from '@angular/core';
import { HeaderserviceService } from './../../headerservice.service';
import { HierarchyService } from '../../hierarchy.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  name = 'History';
  constructor(private headerservice: HeaderserviceService,
    private hierarchyService: HierarchyService
  ) {

  }

  ngOnInit() {
    this.headerservice.name = 'History';
  }

}

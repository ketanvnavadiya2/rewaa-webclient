import { Component, OnInit } from '@angular/core';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'action'];
  dataSource;
  success = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadData();

    this.inventoryService.productOperation.subscribe( (data) => {
      if (data.type === 'success') {
          this.success = data.message;
          setTimeout( () => {
            this.success = null;
          }, 3000)
      }
    })
  }

  loadData = () => {
        this.inventoryService.getAllProducts().subscribe( (response)=> {

          if (response && response['products']) {
            this.dataSource = new MatTableDataSource(response['products']);
            this.dataSource.paginator = this.paginator;
          }

        }, (error) => {
          console.log("Error: ", error)
        })
  }

  onAddNewProduct = () => {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onDeleteProduct = (id) => {
    this.inventoryService.deleteProduct(id).subscribe( (response) => {
      this.loadData();

      if (response && response['data']['success']) {
        this.inventoryService.productOperation.next({ type: 'success', message: 'Delete Product Successful'})
      }

    }, (error) => {
      console.log("Error in Product Deleted", error);
    })

  }

  onEditProduct = (id) => {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  onViewProduct = (id) => {
    this.router.navigate([id, 'view'], {relativeTo: this.route});
  }



}





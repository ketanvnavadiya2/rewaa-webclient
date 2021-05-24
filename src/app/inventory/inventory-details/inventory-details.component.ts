import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {

  product = null;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      let productId = +params['id'];

      this.inventoryService.getProduct(productId).subscribe( (response) => {
        console.log("Response", response['products'][0]);
        this.product = response['products'][0];

      }, (error => {
        console.log("Error", error);
      }))

    });
  }

  onBack = () => {
    this.router.navigate(['/inventory']);
  }
}

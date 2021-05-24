import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent implements OnInit {

  productForm: FormGroup;
  titleAlertRequired: string = 'This field is required';
  id: number;
  editMode = false;

  constructor(
    private _fromBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    if(this.id || this.id === 0) {
      let product = this.inventoryService.getProduct(this.id).subscribe( (response) => {
        console.log("New Product Created", response['products'][0]);
        this.initForm(response['products'][0]);

      }, (error) => {
        console.log("Error in create new product", error);
      })
    } else {
      this.initForm({});
    }

  }

  initForm = (product) => { 
    this.productForm = this._fromBuilder.group({
      name: [product.name ? product.name : '', Validators.required],
      price: [product.price ? product.price : '', Validators.required],
      description: [product.description ? product.description : ''],
      imageUrl: [product.imageUrl ? product.imageUrl : ''],
    });
  }

  onSubmit(product) {
    if (this.editMode) {
      this.inventoryService.updateProduct(this.id, product).subscribe( (response) => {
        if (response && response['data']['success']) {
          this.inventoryService.productOperation.next({ type: 'success', message: 'Updated Product Successful'})
        }
      }, (error) => {
        console.log("Error in create new product", error);
      })

    } else {
      this.inventoryService.addProduct(product).subscribe( (response) => {
        if (response && response['data']['success']) {
          this.inventoryService.productOperation.next({ type: 'success', message: 'New Product Added Successful'})
        }
      }, (error) => {
        console.log("Error in create new product", error);
      })
    }
    this.router.navigate(['inventory']);
  }

}

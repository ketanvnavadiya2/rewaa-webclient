import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InventoryService {

  constructor(private http: HttpClient) { }

  getAllProducts = () => {
    return this.http.get('http://localhost:8080/inventory/products');
  }

  getProduct = (productId) => {
    return this.http.get('http://localhost:8080/inventory/product/' + productId);
  }

  addProduct(product) {
      return this.http.post('http://localhost:8080/inventory/product', product);
  }

  updateProduct(productId, product) {
    return this.http.put('http://localhost:8080/inventory/product/' + productId, product);

  }

  deleteProduct(productId) {
    return this.http.delete('http://localhost:8080/inventory/product/' + productId);
  }

}

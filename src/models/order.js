class Order {
  constructor(id, name, items, totalAmount, address, phone, date) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.totalAmount = totalAmount;
    this.address = address;
    this.phone = phone;
    this.date = date;
  }
//   constructor(id, product, totalPrice, deliveryAddress, status) {
//     this.id = id;
//     // this.name = name;
//     this.product = product;
//     this.totalPrice = totalPrice;
//     this.deliveryAddress = deliveryAddress;
//     // this.phone = phone;
//     this.status = status;
//   }
}

export default Order;

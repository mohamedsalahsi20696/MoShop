export interface UserData {
  name: string,
  email: string,
  password: string,
  rePassword: string,
  phone: string,
}

export interface ShippingAddress {
  details: string,
  phone: string,
  city: string,
}

export interface category {
  _id: string,
  name: string,
  slug: string,
  image: string,
}

export interface brand {
  _id: string,
  name: string,
  slug: string,
  image: string,
}

export interface product {
  images: string[],
  _id: string,
  title: string,
  description: string,
  price: number,
  priceAfterDiscount: number,
  imageCover: string,
  category: category,
  brand: brand,
  ratingsAverage: number,
  createdAt: Date,
  quantity: number,
}

export interface cartData {
  _id: string,
  totalCartPrice: number,
}

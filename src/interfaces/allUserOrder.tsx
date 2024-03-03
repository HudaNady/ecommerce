export interface UserAllOrder {
    shippingAddress?:  ShippingAddress;
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: PaymentMethodType;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              User;
    cartItems:         CartItem[];
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
    paidAt?:           Date;
}

export interface CartItem {
    count:   number;
    product: Product;
    price:   number;
    _id:     string;
}

export interface Product {
    subcategory:     Brand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    imageCover:      string;
    category:        Brand;
    brand:           Brand;
    ratingsAverage:  number;
    id:              string;
}

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: Category;
}

export enum Category {
    The6439D2D167D9Aa4Ca970649F = "6439d2d167d9aa4ca970649f",
    The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
    The6439D5B90049Ad0B52B90048 = "6439d5b90049ad0b52b90048",
}

export enum PaymentMethodType {
    Card = "card",
    Cash = "cash",
}

export interface ShippingAddress {
    details: string;
    phone:   string;
    city:    string;
}

export interface User {
    _id:   ID;
    name:  Name;
    email: Email;
    phone: string;
}

export enum ID {
    The6407Cf6F515Bdcf347C09F17 = "6407cf6f515bdcf347c09f17",
}

export enum Email {
    AhmedmuttiGmailCOM = "ahmedmutti@gmail.com",
}

export enum Name {
    AhmedAbdAlMuti = "Ahmed Abd Al-Muti",
}

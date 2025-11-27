export interface CoffeeCard {
  id: number;
  name: string;
  category: string;
  desc: string;
  price: string;
  rating: string;
  image: any; // pake any dulu karena require() menghasilkan number
}

export const coffeeCards: CoffeeCard[] = [
  {
    id: 1,
    name: 'Cradle Coffee',
    category: 'Signature',
    desc: 'With Steamed Milk',
    price: 'Rp. 20.000',
    rating: '4.7',
    image: require('../cappuccino/square/cappuccino_pic_1_square.png'),
  },
  {
    id: 2,
    name: 'Volcano Coffee',
    category: 'Signature',
    desc: 'With Steamed Milk',
    price: 'Rp. 21.000',
    rating: '4.8',
    image: require('../img/Signature/Volcano Coffee.webp'),
  },
  {
    id: 3,
    name: 'Espresso',
    category: 'Hot Coffee',
    desc: 'Strong and bold flavor',
    price: 'Rp. 14.000',
    rating: '4.6',
    image: require('../img/Hot Coffee/Espresso.webp'),
  },
  {
    id: 4,
    name: 'Latte',
    category: 'Hot Coffee',
    desc: 'Strong and bold flavor',
    price: 'Rp. 20.000',
    rating: '4.6',
    image: require('../img/Hot Coffee/Latte.jpg'),
  },
  {
    id: 5,
    name: 'Cappucino',
    category: 'Hot Coffee',
    desc: 'Strong and bold flavor',
    price: 'Rp. 18.000',
    rating: '4.6',
    image: require('../img/Hot Coffee/Cappucino.jpg'),
  },
  {
    id: 6,
    name: 'Americano',
    category: 'Hot Coffee',
    desc: 'Strong and bold flavor',
    price: 'Rp. 18.000',
    rating: '4.6',
    image: require('../img/Hot Coffee/Americano.jpeg'),
  },
  {
    id: 7,
    name: 'Latte',
    category: 'Ice Coffee',
    desc: 'Strong and bold flavor',
    price: 'Rp. 22.000',
    rating: '4.6',
    image: require('../img/Ice Coffee/Latte.jpg'),
  },
  {
    id: 8,
    name: 'Cappucino',
    category: 'Ice Coffee',
    desc: 'Strong and bold flavor',
    price: 'Rp. 22.000',
    rating: '4.6',
    image: require('../img/Ice Coffee/Cappucino.webp'),
  },
  {
    id: 9,
    name: 'Coffee Milk',
    category: 'Ice Coffee',
    desc: 'Strong and bold flavor',
    price: 'Rp. 20.000',
    rating: '4.6',
    image: require('../img/Ice Coffee/Coffee Milk.webp'),
  },
];

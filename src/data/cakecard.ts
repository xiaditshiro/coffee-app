export interface CoffeeBean {
  id: string;
  image: string;
  rating: number;
  name: string;
  desc: string;
  price: string;
}

export const coffeeBeans: CoffeeBean[] = [
  {
    id: 'cb1',
    image: require('../img/Cake/Cookies Cokelat.jpg'),
    rating: 4.8,
    name: 'Cookies Cokelat',
    desc: 'Rich, smooth flavor',
    price: 'Rp. 30.000',
  },
  {
    id: 'cb2',
    image: require('../img/Cake/Biscotti.jpg'),
    rating: 4.6,
    name: 'Biscotti',
    desc: 'Strong and bold taste',
    price: 'Rp. 15.000',
  },
  {
    id: 'cb3',
    image: require('../img/Cake/Oatmeal Cookies.webp'),
    rating: 4.7,
    name: 'Oatmeal Cookies',
    desc: 'Unique and exotic aroma',
    price: 'Rp. 30.000',
  },
  {
    id: 'cb4',
    image: require('../img/Cake/Banana Bread.jpg'),
    rating: 4.7,
    name: 'Banana Bread',
    desc: 'Unique and exotic aroma',
    price: 'Rp. 30.000',
  },
  {
    id: 'cb5',
    image: require('../img/Cake/Red Velvet Cake.jpg'),
    rating: 4.7,
    name: 'Red Velvet',
    desc: 'Unique and exotic aroma',
    price: 'Rp. 50.000',
  },
];

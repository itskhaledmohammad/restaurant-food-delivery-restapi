const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('menu_items').del()
    .then(() => {
      const items = ['Pasta', 'French Fries', 'Ice Cream', 'Bread',
        'Fried Rice', 'Pancakes', 'Burger', 'Pizza', 'Pumpkin Pie',
        'Chicken Pot Pie', 'Banana', 'Apple Pie', 'Bagel', 'Muffins',
        'Alfredo Sauce', "Reece's Peanut Cups", 'Ice Cream Cake',
        'Cheesecake', 'Cheese', 'Banana Bread', 'Potato Chips',
        'Cheetos', 'Doritos', 'Tacos', 'Burritos', 'Chimichanga',
        'Enchilada', 'Salsa', 'Marinara Sauce', 'Broccoli',
        'Chocolate Covered Strawberries', 'Kiwi', 'Tomato',
        'Salad', 'Steak', 'Chicken Tenders', 'Grilled Chicken',
        'Ribs', 'Biscuits and Gravy', 'Hot Dogs',
        'Fried Chicken', 'Roasted Chicken and Garlic',
        'Eggs', 'Bacon', 'Sausage', 'Mashed Potatoes',
        'Stuffing', 'Brownies', 'Cookies', 'Submarine Sandwiches',
        'Donuts', 'Turkey', 'Cranberry', 'Gravy', 'Green Beans',
        'Mac and Cheese', 'Soup', 'Lamb Chops',
        'Fried Pork Chops and Gravy', 'Ham', 'Sushi',
        'Teriyaki', 'Popcorn', 'Shrimp', 'Lasagna', 'Ravioli',
        'Gelatin', 'Pudding',
        'Meatballs', 'Gyro Sandwhich',
        'Pulled Pork', 'Nachos', 'Onion Rings',
        'Chocolate Cake', 'Carrot Cake',
        'Tater Tots', 'French Toast', 'Baked Potato',
        'Olive Garden Breadsticks', 'Crepes'];

      const menuItems = items.map((e) => ({
        item_name: e,
        price_cents: faker.random.number({ min: 1000, max: 10000 }),
      }));

      return knex('menu_items').insert(menuItems);
    });
};

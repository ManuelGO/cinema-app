export const menuItems = [
  { name: 'dashboard', trackID: 1 },
  { name: 'cinemas', trackID: 2 },
  { name: 'movies', trackID: 3 },
  {
    name: 'bookings',
    trackID: 4,
    subMenu: [
      {
        name: 'add booking',
        url: 'bookings/add-booking',
      },
    ],
  },
];

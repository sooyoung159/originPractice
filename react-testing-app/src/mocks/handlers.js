import { rest } from "msw";

export const handlers = [
  rest.get(`https://localhost:4000/products`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "America",
          imagePath: "/images/america.jpeg",
        },
        {
          name: "England",
          imagePath: "/images/england.jpeg",
        },
      ])
    );
  }),
  rest.get(`https://localhost:4000/options`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Insurance",
        },
        {
          name: "Dinner",
        },
      ])
    );
  }),
  rest.post("https://localhost:4000/order", (req, res, ctx) => {
    let dummyData = [{ orderNumber: 12345676, price: 2000 }];
    return res(ctx.json(dummyData));
  }),
];

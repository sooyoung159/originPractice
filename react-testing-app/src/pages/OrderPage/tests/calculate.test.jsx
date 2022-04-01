import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Type from "../Type";
import OrderPage from "..";

test("update product's total when products change", async () => {
  render(<Type orderType="products" />, { wrapper: OrderContextProvider });

  // 여행 상품 가격은 0월 부터 시작
  // exact를 false를 줘야 동적 상황에도 대응가능
  const productsTotal = screen.getByText("총 가격:", { exact: false });
  expect(productsTotal).toHaveTextContent("0");

  // 아메리카 여행 상품 한개 올리기
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent("1000");

  // 영국 여행 상품 3개 더 올리기
  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, "3");
  expect(productsTotal).toHaveTextContent("4000");
});

test("update option's total when options change", async () => {
  render(<Type orderType="options" />);

  const optionsTotal = screen.getByText("총 가격:", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent("500");

  const dinnerCheckbox = await screen.findByRole("checkbox", {
    name: "Dinner",
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("1000");

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("500");
});

describe("total price of goods and options", () => {
  test("total price starts with 0 and Updating total price when adding one product", async () => {
    render(<OrderPage />);

    const total = screen.getByText("총 가격:", { exact: false });
    expect(total).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    expect(total).toHaveTextContent("1000");
  });

  test("Updating total price when adding one option", async () => {
    render(<OrderPage />);
    const total = screen.getByText("총 가격:", { exact: false });

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent("500");
  });

  test("Updating total price when removing option and product", async () => {
    render(<OrderPage />);
    const total = screen.getByText("총 가격:", { exact: false });

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "3");

    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    expect(total).toHaveTextContent("1500");
  });
});

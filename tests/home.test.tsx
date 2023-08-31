import { render, screen } from "@testing-library/react";
import Home from "../app/page";

vi.mock("@clerk/nextjs", () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: "fafsfafsaf" })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC",
        fullName: "Charles Harris",
      },
    }),
  };
});

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({ className: "inter" }),
  };
});

test(`Home`, async () => {
  render(await Home());
  expect(screen.getByText("get started")).toBeTruthy();
});

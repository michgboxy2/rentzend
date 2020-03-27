import React from "react";
import {
  render,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import { MockedProvider } from "@apollo/react-testing";

import Login, { mutation } from "../components/signIn";

describe("Login Page", () => {
  afterEach(cleanup);

  it("renders without error", () => {
    let { getByText, getAllByPlaceholderText, container } = render(
      <MockedProvider mocks={[]}>
        <Login email="michgboxy3@gmail.com" password="password" />
      </MockedProvider>
    );

    getByText(/Login/);
  });
});

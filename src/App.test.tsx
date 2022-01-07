import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { rest, server } from "./testServer";

describe("App", () => {
  test("should redirect to /login if progress is 100", async () => {
    server.use(
      rest.get("/setup/status", (_, res, ctx) => {
        return res(ctx.json({ progress: 100 }));
      })
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(await screen.findByText("Log in")).toBeDefined();
  });
});

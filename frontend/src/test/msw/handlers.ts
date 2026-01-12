import { http, HttpResponse } from "msw";

type LoginBody = {
  username: string;
  password: string;
};

export const handlers = [
  http.post("/api/v1/login", async ({ request }) => {
    const body = (await request.json()) as LoginBody;

    if (body.username === "admin" && body.password === "admin") {
      return HttpResponse.json({
        token: "mock-jwt",
        user: { username: "admin" }
      });
    }

    return new HttpResponse("Unauthorized", { status: 401 });
  })
];

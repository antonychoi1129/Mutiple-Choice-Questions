import { app } from "../app.js";
import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";


Deno.test("GET request to /auth/register should return html file'", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/register")
      .expect(200)
      .expect("Content-Type", new RegExp("text/html"));
});

Deno.test("POST request with random email and password to /auth/register should return status 200", async () => {
  const testClient = await superoak(app);
  const randomEmail = `${Math.floor(Math.random() * 1000000)}@gmail.com`
  const randomPassword = `${Math.floor(Math.random() * 1000000)}`
  await testClient.post("/auth/register")
    .send(`{"email":${randomEmail} , "password":${randomPassword}}`)
    .expect(200);
});


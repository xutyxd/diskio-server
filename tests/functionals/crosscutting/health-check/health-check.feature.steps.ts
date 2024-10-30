import assert from "node:assert";

import { When, Then, Given } from "@cucumber/cucumber";

import { App } from '../../../../src/server/app';
import { ContractFirstAPIClient } from '../../../../src/package';

process.env.PORT = "0";

const app = new App();
const client = new ContractFirstAPIClient(`http://localhost:${app.server.port}`);
let request: ReturnType<ContractFirstAPIClient["healthCheck"]>;
let response: Awaited<typeof request>;

Given("I perform a fetch to {string}", (path) => {
    request = client.healthCheck();
    assert.equal(request instanceof Promise, true);
});
When("response is replied from the server", async () => {
    try {
        response = await request;
    } catch(e) {
        console.warn('Error fetching: ', e);
    }
});

Then("it should return a {string} code, the time he has been alive and the current timestamp", (expectedCode) => {
    assert.equal(response.response.status, expectedCode);
    assert.equal(response.data?.code, expectedCode);
    app.server.close();
    process.emit('SIGTERM');
});

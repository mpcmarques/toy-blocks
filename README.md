# Toy Blocks

## Installation

1. `npm i`
2. `npm start`
3. `npm test`

## Instructions

The current application is displaying a list of nodes. Don’t worry about what Nodes or Blocks are, just know that a Node has many Blocks. Each node represents a server. Each server implements the same API but returns different data. The important endpoints you will need to know for each server are:
/api/v1/status
/api/v1/blocks

Each node has many blocks and the blocks for each node are returned from the blocks endpoint.

Currently the application is getting the status for each node and updating the state. We would like you to retrieve the blocks from the endpoint, place them in the state and render them into a list that matches the design.

## Acceptance criteria:
1. Blocks are displayed when opening up the card
2. Loading, error, empty states are displayed when appropriate
3. Tests pass and coverage has been added to cover the changes
4. Implementation matches the design

___

- You have 75 minutes to complete the challenge from the time you begin.
- Tests are a mandatory part of the challenge, so please include them. Please add full test coverage to account for the features of the challenge, and make sure the full test suite passes.
- At the end of the challenge please verbally summarize and explain everything you have done, and show your UI work if applicable.

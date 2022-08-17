import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "redux-thunk";
import nodesReducer, {
  checkNodeStatus,
  getNodeBlocks,
  NodesState,
} from "../reducers/nodes";

describe("Store", () => {
  const nodes = {
    list: [
      { url: "a.com", online: false, name: "", loading: false, blocks: [] },
      { url: "b.com", online: false, name: "", loading: false, blocks: [] },
      { url: "c.com", online: false, name: "", loading: false, blocks: [] },
      { url: "d.com", online: false, name: "", loading: false, blocks: [] },
    ],
  };

  let store: EnhancedStore<
    { nodes: NodesState },
    AnyAction,
    [
      | ThunkMiddleware<{ nodes: NodesState }, AnyAction, null>
      | ThunkMiddleware<{ nodes: NodesState }, AnyAction, undefined>
    ]
  >;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        nodes: nodesReducer,
      },
      preloadedState: { nodes },
    });
  });
  afterAll(() => {});

  it("should display results when necessary data is provided", () => {
    const actions = [
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "alpha" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { node_name: "beta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "gamma" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[2] },
        payload: { node_name: "delta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { node_name: "epsilon" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "zeta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "eta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "theta" },
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: [{ id: 1, attributes: { data: "name" } }],
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: [{ id: 2, attributes: { data: "name" } }],
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: [{ id: 3, attributes: { data: "name" } }],
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[2] },
        payload: [{ id: 4, attributes: { data: "name" } }],
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: [{ id: 5, attributes: { data: "name" } }],
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: [{ id: 6, attributes: { data: "name" } }],
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: [{ id: 7, attributes: { data: "name" } }],
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: [{ id: 8, attributes: { data: "name" } }],
      },
    ];
    actions.forEach((action) => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        {
          url: "a.com",
          online: true,
          name: "theta",
          loading: false,
          blocks: [{ id: 8, attributes: { data: "name" } }],
        },
        {
          url: "b.com",
          online: true,
          name: "epsilon",
          loading: false,
          blocks: [{ id: 5, attributes: { data: "name" } }],
        },
        {
          url: "c.com",
          online: true,
          name: "delta",
          loading: false,
          blocks: [{ id: 4, attributes: { data: "name" } }],
        },
        { url: "d.com", online: false, name: "", loading: false, blocks: [] },
      ],
    };

    expect(actual.nodes).toEqual(expected);
  });
});

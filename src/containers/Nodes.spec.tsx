import React from "react";
import { mount } from "enzyme";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedNodes from "./Nodes";
import Node from "../components/Node";
import { checkNodesStatus, getNodeBlocks } from "../reducers/nodes";
import Blocks from "../components/Blocks";
import Block from "../components/Block";

describe("<Nodes />", () => {
  describe("it has blocks", () => {
    const nodes = {
      list: [
        {
          url: "https://thawing-springs-53971.herokuapp.com",
          online: false,
          name: "Node 1",
          loading: false,
          blocks: [
            { id: 1, attributes: { name: "name" } },
            { id: 2, attributes: { name: "name" } },
          ],
        },
        {
          url: "https://secret-lowlands-62331.herokuapp.com",
          online: false,
          name: "Node 2",
          loading: false,
          blocks: [{ id: 1, attributes: { name: "name" } }],
        },
      ],
    };

    let store: MockStoreEnhanced<unknown, {}>;

    function setup(): JSX.Element {
      const middlewares = [thunk];
      store = configureMockStore(middlewares)({ nodes });
      return (
        <Provider store={store}>
          <ConnectedNodes />
        </Provider>
      );
    }

    afterEach(() => {
      store.clearActions();
    });

    it("should contain <Node />", () => {
      const wrapper = mount(setup());

      expect(wrapper.find(Node).length).toEqual(2);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            meta: expect.objectContaining({ arg: nodes.list }),
            type: checkNodesStatus.pending.type,
          }),
        ])
      );
    });

    it("should contain <Blocks />", () => {
      const wrapper = mount(setup());

      expect(wrapper.find(Blocks).length).toEqual(2);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            meta: expect.objectContaining({ arg: nodes.list[0] }),
            type: getNodeBlocks.pending.type,
          }),
        ])
      );
    });

    it("should contain <Block />", () => {
      const wrapper = mount(setup());

      expect(wrapper.find(Block).length).toEqual(3);
    });

    it("should match snapshot", () => {
      const component = create(setup());
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe("it hasn't blocks", () => {
    const nodes = {
      list: [
        {
          url: "https://thawing-springs-53971.herokuapp.com",
          online: false,
          name: "Node 1",
          loading: false,
          blocks: [],
        },
        {
          url: "https://secret-lowlands-62331.herokuapp.com",
          online: false,
          name: "Node 2",
          loading: false,
          blocks: [],
        },
      ],
    };

    let store: MockStoreEnhanced<unknown, {}>;

    function setup(): JSX.Element {
      const middlewares = [thunk];
      store = configureMockStore(middlewares)({ nodes });
      return (
        <Provider store={store}>
          <ConnectedNodes />
        </Provider>
      );
    }

    afterEach(() => {
      store.clearActions();
    });

    it("should contain <Blocks />", () => {
      const wrapper = mount(setup());

      expect(wrapper.find(Blocks).length).toEqual(2);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            meta: expect.objectContaining({ arg: nodes.list[0] }),
            type: getNodeBlocks.pending.type,
          }),
        ])
      );
    });

    it("should not contain <Block />", () => {
      const wrapper = mount(setup());

      expect(wrapper.find(Block).length).toEqual(0);
    });

    it("should match snapshot", () => {
      const component = create(setup());
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

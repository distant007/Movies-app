import React from "react";
import { Tabs } from "antd";

import "./tabs.css";
export default class TabsItems extends React.Component {
  render() {
    const items = [
      { label: "Search", key: "item-1", children: "Search" },
      { label: "Rated", key: "item-2", children: "Content 2" },
    ];
    return <Tabs items={items} />;
  }
}

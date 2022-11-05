import React from "react";
import { Pagination } from "antd";

import MovieList from "../MoviesList";
import Input from "../Input";
import TabsItems from "../Tabs";
import "./app.css";
import "antd/dist/antd.css";
export default class App extends React.Component {
  render() {
    return (
      <section className="main">
        <TabsItems />
        <Input />
        <MovieList />
        <Pagination total={50} />
      </section>
    );
  }
}

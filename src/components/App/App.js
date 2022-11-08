import { Component } from "react";
import { Offline, Online } from "react-detect-offline";
import MoviesList from "../MoviesList";
import Input from "../Input";
import TabsItems from "../Tabs";
import "./app.css";
import "antd/dist/antd.css";
export default class App extends Component {
  state = {
    searchValue: "return",
  };
  searchMovies = (value) => {
    if (value.target.value) {
      this.setState({ searchValue: value.target.value });
    } else {
      this.setState({ searchValue: "return" });
    }
  };
  render() {
    const { currpage, searchValue } = this.state;
    return (
      <section className="main">
        <Online>
          <TabsItems />
          <Input searchMovies={this.searchMovies} />
          <MoviesList currpage={currpage} searchValue={searchValue} />
        </Online>
        <Offline>Only shown offline (surprise!)</Offline>
      </section>
    );
  }
}

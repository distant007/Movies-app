import React from "react";

import Movie from "../Movie";
import Loading from "../Loading";
import FetchApi from "../FetchApi";
import ErrorIndicator from "../ErrorIndicator";
import "./moviesList.css";
export default class MovieList extends React.Component {
  fetchApi = new FetchApi();
  state = {
    todoData: null,
    loading: true,
    error: false,
    currpage: null,
  };
  componentDidMount() {
    this.getTodoData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.currpage !== prevProps.currpage) {
      this.getTodoData();
    }
  }
  setTodoData(data) {
    this.setState({
      todoData: data,
      loading: false,
    });
  }
  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }
  getTodoData() {
    const { currpage } = this.props;
    if (!currpage) {
      return;
    }
    this.fetchApi
      .getInfoMovie(currpage)
      .then((data) => this.setTodoData(data))
      .catch(this.onError);
  }

  render() {
    const { todoData, loading, error } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <ErrorIndicator />;
    }
    return (
      <ul className="movies-list">
        {todoData.map((item) => (
          <li key={item.id} id={item.id}>
            <Movie item={item} />
          </li>
        ))}
      </ul>
    );
  }
}

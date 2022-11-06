import { Component } from "react";

import Movie from "../Movie";
import Loading from "../Loading";
import FetchApi from "../FetchApi";
import ErrorIndicator from "../ErrorIndicator";
import "./moviesList.css";
export default class MovieList extends Component {
  fetchApi = new FetchApi();
  state = {
    movieData: null,
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
      movieData: data,
      loading: false,
    });
  }
  loadingCurrPage() {
    this.setState({ loading: true });
  }
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };
  getTodoData() {
    const { currpage } = this.props;
    if (!currpage) {
      return;
    }
    this.loadingCurrPage();
    this.fetchApi
      .getInfoMovie(currpage)
      .then((data) => this.setTodoData(data))
      .catch(this.onError);
  }

  render() {
    const { movieData, loading, error } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Loading /> : null;
    const view = !(loading || error) ? <View movieData={movieData} /> : null;
    return (
      <ul className="movies-list">
        {errorMessage}
        {spinner}
        {view}
      </ul>
    );
  }
}
const View = ({ movieData }) => {
  const view = movieData.map((item) => (
    <li key={item.id} id={item.id}>
      <Movie
        date={item.release_date}
        title={item.original_title}
        voteAverage={item.vote_average}
        text={item.overview}
        posterPath={item.poster_path}
      />
    </li>
  ));
  return view;
};

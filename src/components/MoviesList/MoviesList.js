import { Component } from 'react'

import Movie from '../Movie'
import Loading from '../Loading'
import FetchApi from '../FetchApi'
import ErrorIndicator from '../ErrorIndicator'
import PaginationTabs from '../Pagination'
import './moviesList.css'
export default class MovieList extends Component {
  fetchApi = new FetchApi()
  state = {
    movieData: null,
    loading: true,
    error: false,
    currpage: 1,
    totalMovies: null,
    guestId: null,
  }
  componentDidMount() {
    this.getTodoData()
    this.authentication()
    this.fetchApi.getGenre()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currpage !== prevState.currpage) {
      this.getTodoData()
    }
    if (this.props.tab !== prevProps.tab) {
      this.getTodoData()
    }
    if (this.props.searchValue !== prevProps.searchValue) {
      this.getTodoData()
    }
  }
  authentication = () => {
    this.fetchApi.authentication().then((res) => this.setState({ guestId: res }))
  }
  setTodoData(data, total) {
    this.setState({
      movieData: data,
      loading: false,
      error: false,
      totalMovies: total,
    })
  }
  loadingCurrPage() {
    this.setState({ loading: true })
  }
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }
  getTodoData() {
    const { searchValue, tab } = this.props
    const { currpage, guestId } = this.state
    if (!currpage) {
      return
    }
    if (tab === 'Search') {
      this.loadingCurrPage()
      this.fetchApi
        .getInfoMovie(currpage, searchValue)
        .then((data) => this.setTodoData(data.results, data.total_results))
        .catch(this.onError)
    } else {
      this.loadingCurrPage()
      this.fetchApi
        .getRatedMovies(guestId)
        .then((data) => this.setTodoData(data.results, data.total_results))
        .catch(this.onError)
    }
  }
  onChangePage = (page) => {
    this.setState({ currpage: page })
  }
  render() {
    const { movieData, loading, error, currpage, totalMovies, guestId } = this.state
    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Loading /> : null
    const view = !(loading || error) ? <View movieData={movieData} guestId={guestId} /> : null
    const showMessege = totalMovies === 0 ? <Message /> : null
    const pagination = !(loading || error) ? (
      <Pagination currpage={currpage} onChangePage={this.onChangePage} totalMovies={totalMovies} />
    ) : null
    return (
      <div className="main-content">
        {errorMessage}
        {spinner}
        {view}
        {showMessege}
        {pagination}
      </div>
    )
  }
}
const View = ({ movieData, guestId }) => {
  const view = movieData.map((item) => (
    <li key={item.id} id={item.id}>
      <Movie
        guestId={guestId}
        movieId={item.id}
        date={item.release_date}
        title={item.original_title}
        voteAverage={item.rating}
        text={item.overview}
        posterPath={item.poster_path}
        genresId={item.genre_ids}
      />
    </li>
  ))
  return <ul className="movies-list">{view}</ul>
}
const Pagination = ({ currpage, onChangePage, totalMovies }) => {
  return <PaginationTabs currpage={currpage} onChangePage={onChangePage} totalMovies={totalMovies} />
}
const Message = () => {
  return <p>There are no such films</p>
}

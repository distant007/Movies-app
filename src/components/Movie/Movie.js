/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { Rate } from 'antd'
import { format } from 'date-fns'
import { Component } from 'react'

import FetchApi from '../../FetchApi'
import movieDefault from '../../images/movie.jpg'
import { Consumer } from '../MovieServiceContext'
import './movie.css'
export default class Movie extends Component {
  fetchApi = new FetchApi()
  state = {
    text: this.kitcut(this.props.text, 111),
    rate: null,
  }
  componentDidMount() {
    this.getCurrGenres()
    this.setRatedMovies()
  }
  kitcut(text, limit) {
    text = text.trim()
    if (text.length <= limit) return text

    text = text.slice(0, limit)

    return text.trim() + '...'
  }
  postRate = (value) => {
    const { movieId, guestId } = this.props
    this.setState({ rate: value })
    this.fetchApi.postRateMovies(value, movieId, guestId)
    localStorage.setItem(`${movieId}`, value)
  }
  setRatedMovies() {
    const { movieId } = this.props
    const rate = localStorage.getItem(`${movieId}`)
    if (rate !== null && rate !== 'undefined') {
      // let newRate = Number(rate)
      this.setState({ rate: rate })
    }
  }
  getCurrGenres = () => {
    return (
      <Consumer>
        {(valuesGenre) => {
          const { genresId } = this.props
          const currGenres = valuesGenre.filter((item) => genresId.indexOf(item.id) > -1)
          const genres = currGenres.map((item) => (
            <div className="movie-genre" key={item.id}>
              {item.name}
            </div>
          ))
          return <div className="movie-genre-block">{genres}</div>
        }}
      </Consumer>
    )
  }
  render() {
    const { date, title, posterPath } = this.props
    const { rate } = this.state
    const colorRate =
      rate <= 3
        ? { borderColor: '#E90000' }
        : rate <= 5
        ? { borderColor: '#E97E00' }
        : rate <= 7
        ? { borderColor: '#E9D100' }
        : { borderColor: '#66E900' }
    let MovieDate = date !== '' ? format(new Date(date), 'MMMM d, yyyy') : 'There is no date'
    const urlImg = posterPath !== null ? `https://image.tmdb.org/t/p/original${posterPath}` : movieDefault
    return (
      <div className="movie">
        <div className="left-side">
          <img className="movie-img" src={urlImg} alt="#" />
        </div>
        <div className="right-side">
          <h2 className="movie-title">{title}</h2>
          <div className="rating" style={colorRate}>
            {rate}
          </div>
          <p className="movie-date">{MovieDate}</p>
          {this.getCurrGenres()}
          <p className="movie-discription">{this.state.text}</p>
          <Rate allowHalf count={10} onChange={this.postRate} value={Number(rate)} />
        </div>
      </div>
    )
  }
}

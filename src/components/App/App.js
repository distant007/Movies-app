import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'

import MoviesList from '../MoviesList'
import Input from '../Input'
import TabsItems from '../Tabs'
import FetchApi from '../FetchApi'
import { Provider } from '../MovieServiceContext'
import './app.css'
import 'antd/dist/antd.css'
export default class App extends Component {
  FetchApi = new FetchApi()
  state = {
    searchValue: 'return',
    tab: 'Search',
    valuesGenre: [],
  }
  componentDidMount() {
    this.getGenre()
  }
  searchMovies = (value) => {
    if (value.target.value) {
      this.setState({ searchValue: value.target.value })
    } else {
      this.setState({ searchValue: 'return' })
    }
  }
  onChangeTabs = (key) => {
    this.setState({ tab: key })
  }
  setGenre(genres) {
    this.setState({ valuesGenre: genres })
  }
  getGenre = () => {
    this.FetchApi.getGenre().then((res) => this.setGenre(res.genres))
  }
  render() {
    const { currpage, searchValue, tab, valuesGenre } = this.state
    const input = tab === 'Search' ? <Input searchMovies={this.searchMovies} /> : null
    return (
      <section className="main">
        <Online>
          <Provider value={valuesGenre}>
            <TabsItems onChangeTabs={this.onChangeTabs} />
            {input}
            <MoviesList currpage={currpage} searchValue={searchValue} tab={tab} />
          </Provider>
        </Online>
        <Offline>Only shown offline (surprise!)</Offline>
      </section>
    )
  }
}

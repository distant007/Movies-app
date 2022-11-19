export default class FetchApi {
  _apiBase = 'https://api.themoviedb.org/3'
  _apiKey = 'api_key=12c052732f00500a4355cf2bf4538874'

  async getApi(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('OOOPs')
    }
    return await res.json()
  }
  async getInfoMovie(currpage, searchValue) {
    const res = await this.getApi(
      `${this._apiBase}/search/movie?${this._apiKey}&language=en-US&query=${searchValue}&page=${currpage}&include_adult=false`
    )
    // console.log(res);
    return res
  }
  async getTotalMovies(currpage, searchValue) {
    const res = await this.getApi(
      `${this._apiBase}/search/movie?${this._apiKey}&language=en-US&query=${searchValue}&page=${currpage}&include_adult=false`
    )
    return res.total_results
  }
  async authentication() {
    const res = await this.getApi(`https://api.themoviedb.org/3/authentication/guest_session/new?${this._apiKey}`)
    return res.guest_session_id
  }
  async getRatedMovies(id) {
    const res = await this.getApi(
      `${this._apiBase}/guest_session/${id}/rated/movies?${this._apiKey}&language=en-US&sort_by=created_at.asc`
    )
    console.log(res)
    return res
  }
  async getGenre() {
    const res = await this.getApi(`${this._apiBase}/genre/movie/list?${this._apiKey}&language=en-US`)
    return res
  }
}

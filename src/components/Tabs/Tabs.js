import { Component } from 'react'
import { Tabs } from 'antd'

import './tabs.css'
export default class TabsItems extends Component {
  render() {
    const items = [
      { label: 'Search', key: 'Search', destroyInactiveTabPane: 'false' },
      { label: 'Rated', key: 'Rated', destroyInactiveTabPane: 'false' },
    ]
    return <Tabs items={items} onChange={this.props.onChangeTabs} />
  }
}

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import './loading.css'
const antIcon = (
  <div className="loading">
    <LoadingOutlined
      style={{
        fontSize: 60,
      }}
      spin
    />
  </div>
)

const Loading = () => <Spin indicator={antIcon} />
export default Loading

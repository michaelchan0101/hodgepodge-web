import { Component } from 'react'
import HomeLayout from 'components/HomeLayout'

export default class Main extends Component {
  render() {
    return (
      <>
        <HomeLayout>
          <div>
            <h1 className='title'>Welcome to Detail</h1>
          </div>
        </HomeLayout>
      </>
    )
  }
}

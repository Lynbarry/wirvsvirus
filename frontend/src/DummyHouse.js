import React, { Component } from 'react'

class DummyHouse extends Component {
  render() {
    return (
      <main class="content">
        <div id="testHouse">
          <div class="overlay" id="room1"></div>
          <div class="overlay" id="room2"></div>
          <div class="overlay" id="room3"></div>
          <div class="overlay" id="room4"></div>
          <div class="overlay" id="room5"></div>
        </div>
        <div id="lightController">
          <button>Step 1</button>
          <button>Step 2</button>
          <button>Step 3</button>
          <button>Step 4</button>
        </div>
      </main>
    )
  }
}

export default DummyHouse

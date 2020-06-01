import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    data: [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5],
    error: null,
    loops: 0,
    search: 0
  }

  updateSearch = (ev) => {
    ev.preventDefault();
    this.setState({
      search: parseInt(ev.target.value)
    })
  };

  handleLinearSearch = (value) => {
    console.log('handleLinearSearch ran')
    let data = this.state.data;
    for(let i = 0; i < data.length; i++) {
      if(data[i] === value) {
        this.setState({
          loops: i + 1
        })
        return;
      }
    }
    return this.state.loops;
  };

  handleBinarySearch = (value, start = 0, end = this.state.data.length - 1, count = 0) => {
    console.log('handleBinarySearch ran')
    let data = this.state.data.sort()

    if(start > end) {
      console.log('start > end')
      this.setState({
        error: 'Search query not contained in dataset',
        loops: count
      })
      return;
    }

    let index = Math.floor((start + end) / 2);
    let item = data[index];

    if(item === value) {
      this.setState({
        loops: count
      })
      return;
    } else if(item < value) {
      console.log('smaller than median')
      count++
      return this.handleBinarySearch(value, index + 1, end, count);
    } else if(item > value) {
      console.log('larger than median')
      return this.handleBinarySearch(value, start, index - 1, count);
    }
  };
  
  render() {
    return (
      <div className='App'>
        <input onChange={this.updateSearch} type='number' placeholder='Search Query' id='search' name='search'></input>
        <button onClick={() => this.handleLinearSearch(parseInt(this.state.search))}>Linear Search</button>
        <button onClick={() => this.handleBinarySearch(parseInt(this.state.search))}>Binary Search</button>

        <p>{this.state.error}</p>
        <p>It took {this.state.loops} search iterations to find {this.state.search}</p>
      </div>
    )
  };
};

export default App;
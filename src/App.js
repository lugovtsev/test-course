import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import './App.css';

/*let myClass = classNames({
  'App-intro': true,
  'custom': 1==0
});
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={myClass}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/

var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.readmoreClick = this.readmoreClick.bind(this);
  }

  readmoreClick(e) {
    e.preventDefault();
    this.setState({visible: true});
  }

  render() {
    console.log(this);
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;

    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>
        <button
          onClick={this.readmoreClick}
          className={'news__readmore ' + (visible ? 'none': '')}>
          Подробнее
        </button>
        <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
      </div>
    )
  }
}

Article.propTypes = {
  data: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired
  })
}

class News extends Component {
  constructor(props) {
    super(props);
    this.increase = this.increase.bind(this);
    this.state = { counter: 0 }
  }

  increase() {
    this.setState({
      counter: ++this.state.counter
    }, function() {
      console.log(this.state.counter)
    })
  }

  render() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return (
      <div className='news'>
        {newsTemplate}
        <strong
          onClick={this.increase}
          className={classNames({'news__count': true, 'none': data.length <= 0})}
        >
          Всего новостей: {data.length}
        </strong>
      </div>
    );
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired
}

class TestInput extends Component {
  constructor(props) {
    super(props);
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.ClickHandler = this.ClickHandler.bind(this);
    this.state = {
      val: ''
    }
  }
  ChangeHandler(e) {
    this.setState({val: e.target.value.toUpperCase()})
  }
  ClickHandler(e) {
    alert(this.state.val)
  }
  render() {
    return (
      <div>
        <input
          className='test-input'
          onChange = {this.ChangeHandler}
          value={this.state.val}
        />
        <button onClick={this.ClickHandler}>Показать</button>
      </div>
    )
  }
}

class UnControlTestInput extends Component {
  ClickHandler(e) {
    console.log(this.refs);
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value)
  //вариант проще и можно не привязывать this к обработчику  alert(document.getElementById('inp').value)
  }

  render() {
    return (
      <div>
        <input
          placeholder='Введите значение'
          defaultValue=''
          className='test-input'
          ref='myTestInput' />
        <button onClick={this.ClickHandler.bind(this)} ref='myTestButton'>Показать</button>
      </div>
    )
  }
}

const StatelessUncontrolTestInput = () => {
  return (
    <div>
      <input
        placeholder='Введите значение'
        className='test-input'
        id='inp' />
      <button onClick={() => {alert(document.getElementById('inp').value)}} >Показать</button>
    </div>
  )
}


class App extends Component {
  render() {
    return (
      <div className='app'>
        <h3>Новости</h3>
        <TestInput />
        <hr />
        <h2>Неконтролируемый компонент</h2>
        <UnControlTestInput />
        <hr />
        <h2>Stateless uncontrolled компонент</h2>
        <StatelessUncontrolTestInput />
        <News data={my_news} />
      </div>
    );
  }
}

export default App;

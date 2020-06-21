import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import SearchFilms from './components/pages/SearchFilms';

function App() {
  return (
    <Router>
      <div className='flex flex-col h-screen'>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={SearchFilms} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

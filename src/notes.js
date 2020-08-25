import React ,{Component} from 'react';
import Takenote from './components/Takenote';
import Signin from './components/Signin';
import NavBAr from './components/Navbar';
import Footer from './components/footer';
import './App.css';
import {BrowserRouter, Route,Switch } from "react-router-dom";
import i18next from 'i18next';
import ar from './languages/ar'
import en from './languages/en'
import 'rtl-detect'
import MiniDrawer from './components/drawer'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
class App extends Component {
  constructor(props){
    super(props);
    i18next.init({
      lng: 'en',
      debug: true,
      resources: {
        en: {
          translation: en()
        },
        ar: {
          translation: ar()
        }
      }
    })
    // document.getElementsByTagName('html')[0].setAttribute("dir", "ltr")
    this.state = {
      lang:'en',
      drawer:false
    }
    this.changelanguage=this.changelanguage.bind(this);
  }
  changelanguage(lang)
  {
    i18next.changeLanguage(lang);
    this.setState({lang});
    lang == 'ar'? document.getElementsByTagName('html')[0].setAttribute("dir", "rtl") : document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");; 
    
    // localStorage.clear();
    // const style = document.getElementById('style-direction');
    // if(lang === 'en'){
    //   style.href = '/src/css/style-ltr.css';
    //   $('body').removeClass('direction-rtl').addClass('direction-ltr');
    // }else{
    //   style.href = '/src/css/style-rtl.css';
    //   $('body').removeClass('direction-ltr').addClass('direction-rtl');
    // }
  }
  toggleDrawer(toggle){
    this.setState({drawer:toggle})

  }
  render() {
    return (
        <div className="App">
          {/* <Button  onClick={()=>{this.toggleDrawer(true)}}>{'left'}</Button>
          <Drawer anchor={'right'} open={this.state.drawer} onClose={()=>{this.toggleDrawer(false)}}>
            xxx
          </Drawer> */}
        <div className="d-flex flex-column min-vh-100">
          {i18next.language == 'ar'?<NavBAr/>:null}
          {i18next.language == 'en'?<NavBAr/>:null}

          <BrowserRouter>
            <Switch>
              <Route exact path="/" component = {()=><Signin/>}/>
              <Route path="/notes/" component = {()=><Takenote/>}/>
            </Switch>
          </BrowserRouter>
          <footer className="mt-auto"><Footer changelanguage={this.changelanguage}/></footer> 
          {/* <MiniDrawer/> */}
          
        </div>
        </div>
    )
  }
}
export default(App);
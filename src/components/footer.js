import React, { Component } from 'react';
import logo from '../components/logo.ico'
import counterpart from 'counterpart';
import en from '../languages/en'
import ar from '../languages/ar'
import i18next from 'i18next';

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('ar', ar);
counterpart.setLocale('en');

class Footer extends Component {
  
  render(){
  return (
    <div className="footer">
      {/* <div className="row">
        <div className="col-md-12">
          <div className="footer p-3 mt-4 text-center bg-dark text-light">
            Developed By:
            <span className="text-danger font-weight-normal">
              Moahned Kohil
            </span>
            , Using <i className="fab fa-react fa-2x" /> React JS &amp; Redux JS
            integrated with external movies data API
            <a
              href="http://www.omdbapi.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OMDB
            </a>
          </div>
        </div>
      </div> */}
      <nav className="navbar  bg-dark  pt-0 pb-0 ">
          <div className="container">
            <div className="  text-center  text-light  ">
              {/* Developed By:  
              <span className="text-danger font-weight-normal" src={logo}> Moahned Kohil</span> */}
            </div>
            <div>
              <div className="btn-group dropup">
                <button type="button" className="btn  dropdown-toggle text-danger" data-toggle="dropdown" >
                  {i18next.t('lang')}
                </button>
                <div className="dropdown-menu" >
                  {/* <a class="dropdown-item" href="" onClick={(e)=>{e.preventDefault(); counterpart.setLocale('en')}}>EN</a>
                  <a class="dropdown-item" href="" onClick={(e)=>{e.preventDefault(); counterpart.setLocale('ar')}}>ع</a> */}
                  <a className="dropdown-item" href="" onClick={(e)=>{e.preventDefault(); this.props.changelanguage('en')}}>EN</a>
                  <a className="dropdown-item" href="" onClick={(e)=>{e.preventDefault(); this.props.changelanguage('ar')}}>ع</a>
                </div>
              </div>
            </div>
          </div>
      </nav>
    </div>
  );}
}
export default Footer;
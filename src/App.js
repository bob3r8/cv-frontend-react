import './App.css';
import Resume from './Resume'
import React from 'react'
import useLocalStorage from 'use-local-storage'

const switchTheme = () => {
  const currTheme = localStorage.getItem('page-theme');
  const newTheme = currTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('page-theme',  newTheme);
  localStorage.setItem('page-theme',  newTheme);
}

function RenderHeader(props){
  return(
    <div id='header'>
      <select id='lang-chooser' value={props.lang} onChange={(e) => props.setLang(e.target.value)}>
        <option value='en'>En</option>
        <option value='ru'>Ru</option>
      </select>
      <a href={'/cv_' + props.lang + '.pdf'} id='cv-downloader' download={true}>
        <svg className='download-svg' width={24} height={24} aria-hidden={true} viewBox='0, 0, 24, 24'>
          <g id='download-arrow' stroke='currentColor' strokeWidth={3}>
              <line x1={12} y1={5} x2={12} y2={16} />
              <polygon points='8,14 12,19 16,14' fill='currentColor'/>
              <line x1={2} y1={22} x2={22} y2={22}/>
          </g>
        </svg>
      </a>
      <button onClick={switchTheme} id='theme-switcher'>
        <svg className='bulb-svg' width={24} height={24} aria-hidden={true} viewBox='0, 0, 24, 24'>
          <g className='bulb' fill='currentColor'>
            <circle className='bulb-head' cx={12} cy={12} r={5}/>
            <rect width={5} height={11} x={9.5} y={12}/>
          </g>
          <g id='light-lines' stroke='currentColor' strokeWidth={2}>
            <line x1={1} y1={12} x2={6} y2={12} />
            <line x1={3} y1={4} x2={6} y2={7} />
            <line x1={12} y1={1} x2={12} y2={6} />
            <line x1={24-3} y1={4} x2={24-6} y2={7} />
            <line x1={24-1} y1={12} x2={24-6} y2={12} />
          </g>
        </svg>
      </button>

    </div>
  )
}

const App = () => {
  var theme = localStorage.getItem('page-theme');
  theme = theme ? theme : 'dark';
  document.body.setAttribute('page-theme', theme)
  const [lang, setLang] = useLocalStorage('page-lang', 'en');
  return (
      <div className="App">
        <RenderHeader lang={lang} setLang={setLang}/>
        <Resume lang={lang} />
      </div>
  );
}
//<Resume lang={lang}/>


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

export default App;

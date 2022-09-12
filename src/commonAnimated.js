import { useIsVisible } from 'react-is-visible'
import { useRef } from 'react'
import {CSSTransition} from 'react-transition-group'

export function RenderLoader(props) {
    return(
      <CSSTransition
        in={props.isLoading}
        timeout={250}
        className="loader"
        unmountOnExit>
        <div><div></div><div></div></div>
      </CSSTransition>
    )
  }

var appearenceStyling = (isVisible) => ( isVisible ? {
    animation: 'appeareFromBottom 300ms' 
    } : {
    opacity: 0
})

export function AppearingCard(props){
    const nodeRef = useRef();
    const isVisible = useIsVisible(nodeRef, {once: true});
 
    return(
        <div className="card" id={props.id} style={appearenceStyling(isVisible)}>
            <props.InnerComponent refer={nodeRef} data={props.innerComponentData} lang={props.lang}/>
        </div>
    )
}

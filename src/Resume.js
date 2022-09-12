import React, {Component} from 'react'
import 'intersection-observer'
import './Resume.css';
import { getData } from './fetchingData'
import { AppearingCard, RenderLoader } from './commonAnimated'
import { text } from './translations'

function renderList(item, i){
    var list_string = '';
    if (item.hasOwnProperty('additional')){
        list_string = item.value + ' (';
        if (item.hasOwnProperty('additional_name')){
            list_string = list_string + item.additional_name + ': '
        }
        
        item.additional.forEach(elem => list_string = list_string + elem + '; ' )
        list_string = list_string.slice(0, -2) + ').'
    }
    else{
        list_string = item.value + '.'
    }
    return <li key={i}>{list_string}</li>
}

function renderWorkExperience(item, i){
    return (
        <li key={i}>
            <h3>{item.organization_name}</h3>
            <div className="work_experience_header">
                {item.position !== '' &&
                <h4 className="left_column">{item.position}</h4>
                }
                {item.hire_date !== null &&
                <h4 className="right_column">{item.hire_date.slice(0,-3)} – {item.fire_date.slice(0,-3)}</h4>
                }
            </div>
            <p>{item.description}</p>
        </li>
    )
}

function RenderPersonal(props){
    return(
    <table style={props.style}>
            <thead><tr><th colSpan="2"><h1 ref={props.refer}>{props.data.desired_position}<br/>{props.data.name}</h1></th></tr></thead>
            <tbody>
            <tr><td className="left_column"><h3>{text.personal.phone[props.lang]}:</h3></td><td className="right_column"><a href={"tel:" + props.data.phone}>{props.data.phone}</a></td></tr>
            <tr><td className="left_column"><h3>{text.personal.e_mail[props.lang]}:</h3></td><td className="right_column"><a href={"mailto:" + props.data.e_mail}>{props.data.e_mail}</a></td></tr>
            <tr><td className="left_column"><h3>{text.personal.github[props.lang]}:</h3></td><td className="right_column"><a href={"http://"+ props.data.site}>{props.data.site}</a></td></tr>
            <tr><td className="left_column"><h3>{text.personal.birth_date[props.lang]}:</h3></td><td className="right_column">{props.data.birth_date}</td></tr>
            </tbody>
    </table>
        )
}

function RenderEducation(props){
    const date = props.data.start_date.substring(0, 4) + "-" + props.data.graduation_date.substring(0, 4);
    return(
        <table style={props.style}>
            <thead><tr><th colSpan="2"><h2 ref={props.refer}>{text.education.header[props.lang]}</h2></th></tr></thead>
            <tbody>
            <tr><td className="left_column"><h3>{text.education.institution[props.lang]}:</h3></td><td className="right_column">{props.data.institution}, {date}</td></tr>
            <tr><td className="left_column"><h3>{text.education.degree[props.lang]}:</h3></td><td className="right_column">{props.data.degree}</td></tr>
            <tr><td className="left_column"><h3>{text.education.speciality[props.lang]}:</h3></td><td className="right_column">{props.data.speciality}</td></tr>
            <tr><td className="left_column"><h3>{text.education.qualification[props.lang]}:</h3></td><td className="right_column">{props.data.qualification}</td></tr>
            </tbody>
        </table>
        )
}

function RenderSummary(props){
    return(
        <div style={props.style}>
            <h2 ref={props.refer}>{text.summary_header[props.lang]}</h2>
            <p>{props.data}</p>
        </div>
    )
}

// function RenderSkills(props){
//     return(
//         <div style={props.style}>
//             <div id="skills_list">
//             <h2 id="skills_header" ref={props.refer}>{text.skills.header[props.lang]}</h2>
//                     <div id="program_langs">
//                         <h3>{text.skills.prog_langs[props.lang]}:</h3>
//                         <ul>
//                             {props.data.program_langs.map(renderList)}
//                         </ul>
//                     </div>
//                     <div id="other_skills">
//                         <h3>{text.skills.techs[props.lang]}:</h3>
//                         <ul>
//                             {props.data.other.map(renderList)}
//                         </ul>
//                     </div>
//                     <div id="languages_skills">
//                         <h3>{text.skills.langs[props.lang]}:</h3>
//                         <ul>
//                             {props.data.languages.map(renderList)}
//                         </ul>
//                     </div>
//                     <div id="soft_skills">
//                     <h3>{text.skills.soft_skills[props.lang]}:</h3>
//                         <ul>
//                             {props.data.soft_skills.map(renderList)}
//                         </ul>
//                     </div>
//             </div>
//         </div>
//     )
// }
function RenderSkills(props){
    return(
        <div style={props.style}>
            <h2 id="skills_header" ref={props.refer}>{text.skills.header[props.lang]}</h2>
            <div id="skills_list">
                <div id='skills-left_side'>
                    <div className="skills_info" id="program_langs">
                        <h3>{text.skills.prog_langs[props.lang]}:</h3>
                        <ul>
                            {props.data.program_langs.map(renderList)}
                        </ul>
                    </div>
                    <div className="skills_info" id="other_skills">
                        <h3>{text.skills.techs[props.lang]}:</h3>
                        <ul>
                            {props.data.other.map(renderList)}
                        </ul>
                    </div>
                </div>
                <div id='skills-right_side'>
                    <div className="skills_info" id="languages_skills">
                        <h3>{text.skills.langs[props.lang]}:</h3>
                        <ul>
                            {props.data.languages.map(renderList)}
                        </ul>
                    </div>
                    <div className="skills_info" id="soft_skills">
                    <h3>{text.skills.soft_skills[props.lang]}:</h3>
                        <ul>
                            {props.data.soft_skills.map(renderList)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RenderWorkExperienceList(props){
    return(
        <ul style={props.style}>
            <h2 ref={props.refer}>{text.work_exp_header[props.lang]}</h2>
            {props.data.map(renderWorkExperience)}
        </ul>
        
    )
}


class Resume extends Component {
    constructor(props){
        super(props);
        this.state = {loaded: false}
    }
    updateResumeState(resume_json){
        resume_json.loaded = true; 
        this.setState(resume_json);
    }
    async componentDidUpdate(prevProps){
        if(prevProps.lang !== this.props.lang){
            this.setState({loaded: false})
            getData(this.props.lang, "/resume").then(resume_json => this.updateResumeState(resume_json));
        }
    }
    async componentDidMount(){ 
        getData(this.props.lang, "/resume").then(resume_json => this.updateResumeState(resume_json));
    }
    render(){
        const isLoaded = this.state.loaded;
        const isLoading = !this.state.loaded;
        return (
            <div className="content">
                <RenderLoader isLoading={isLoading}/>
                {isLoaded && (
                <div id='resume'>
                    <div id='resume-left_side'>
                    <AppearingCard id="personal" InnerComponent={RenderPersonal} innerComponentData={this.state.worker} lang={this.props.lang}/>
                    <AppearingCard id="education" InnerComponent={RenderEducation} innerComponentData={this.state.education} lang={this.props.lang}/>
                    </div>
                    <div id='resume-right_side'>
                    <AppearingCard id="skills" InnerComponent={RenderSkills} innerComponentData={this.state.skills_list} lang={this.props.lang}/>
                    <AppearingCard id="summary" InnerComponent={RenderSummary} innerComponentData={this.state.worker.summary} lang={this.props.lang}/>
                    </div>
                    <AppearingCard id="work_experience_list" InnerComponent={RenderWorkExperienceList} innerComponentData={this.state.work_experience_list} lang={this.props.lang}/>
                </div>
                )
                }
            </div>
        )
    }
}
export default Resume;

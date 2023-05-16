import React, { useEffect, useState } from 'react';
import './index';
import './index.css'
import Mockup from './Mockup';


let dataCollection = {
};


const WorkInfo = (props) => {
  const [workPlace, setWorkplace] = useState('')
  const [workTasks, setWorkTasks] = useState('');
  const [workFrom, setWorkFrom] = useState('');
  const [workTo, setWorkTo] = useState('');
  const [isWorking, setIsWorking] = useState(false)
  const [isList, setIsList] = useState(false);
  const [placeholder, setPlaceholder] = useState('Enter a description')
  
  function changePlaceholder(checked){
    if(checked){
      setPlaceholder('*List start with asterisks \n*Another Item');
    }
    else{
      setPlaceholder('Enter a description')
    }
  }

  function handleValidation(e){
    if(e.target.className === 'input-missing-info' && e.target.value) {
      e.target.classList.remove('input-missing-info')
    }
    
  }

  function handleReset(arg){
    if(!arg || (!workFrom && !workPlace && !workTasks && !workTo)){
      return
    }
    else{
      setWorkFrom('');
      setWorkTasks('');
      setWorkplace('');
      setWorkTo('');
    }
  }

  if(props.reset){
    handleReset(true)
  }


  return (
    <div id='work-data-form-container'>
      <form className='work-data-form' id='workplace'>
        <label className='form-labels'>Workplace</label>
        <input type='text' id='workplace' onChange={(e) => {setWorkplace(e.target.value); handleValidation(e)}} value= {workPlace} required></input>
        <label className='form-labels'>Tasks Performed</label>
        <textarea id='tasks' onChange={(e) =>  setWorkTasks(e.target.value)} value={workTasks} placeholder={placeholder} required></textarea>
        <label className='form-labels'>Enable List</label>
        <input type='checkbox' id='isList' onClick={(e) => {setIsList(e.target.checked); changePlaceholder(e.target.checked); setWorkTasks('')}}></input>
        <label className='form-labels'>From</label>
        <input type='text' id='workFrom' placeholder='2021 or 2021/03' onChange={(e) => setWorkFrom(e.target.value)} value={workFrom} required></input>
        <label className='form-labels'>To</label>
        <input type='text' id='workTo' placeholder='2023 or 2023/06' onChange={(e) => setWorkTo(e.target.value)} value={workTo} disabled={isWorking} required></input>
        <label className='form-labels'> Currently Working</label>
        <input type='checkbox' onClick={(e) => {setIsWorking(e.target.checked); setWorkTo('')}} value={isWorking}></input>
          <button className='reset-button' type='button' onClick={() => handleReset(true)}>Reset</button>
      </form>
    </div>
  )
}

const EducationInfo = (props) => {
  const [Institution, setInstitution] = useState('')
  const [degree, setDegree] = useState('');
  const [studyFrom,  setStudyFrom] = useState('');
  const [studyTo, setStudyTo] = useState('');
  const [inProgress, setInprogress] = useState(false)

  function handleReset(arg){
    if(!arg || (!studyFrom && !Institution && !degree && !studyTo)){
      return
    }
    setStudyFrom('');
    setDegree('');
    setInstitution('');
    setStudyTo('');

  }
  if(props.reset){
    handleReset(true)
  }

 return (
  <div id='education-data-form-container'>
    <form className='education-data-form' required id='education'>
      <label className='form-labels'>Institution</label>
      <input type='text' id='institution' onChange={(e) => setInstitution(e.target.value)} value={Institution} required></input>
      <label className='form-labels'>Degree</label>
      <input type='text' id='degree' onChange={(e) => setDegree(e.target.value)} value={degree} required></input>
      <label className='form-labels'>From</label>
      <input type='text' id='studyFrom' onChange={(e) => setStudyFrom(e.target.value)} value={studyFrom} required></input>
      <label className='form-labels'>To</label>
      <input type='text' id='studyTo' onChange={(e) => setStudyTo(e.target.value)} disabled={inProgress} value={studyTo} required></input>
      <label className='form-labels'>In progress</label>
      <input type='checkbox' onClick={(e) => {setInprogress(e.target.checked); setStudyTo('')}} value={inProgress} required></input>
      <div>
        <button className='reset-button' type='button' onClick={() => handleReset(true) }>Reset</button>
      </div>
    </form>
  </div>
 )
}



function handleSubmit(){
  dataCollection = {}
  const inputs = document.getElementsByTagName('input')
  const textareas = document.getElementsByTagName('textarea');
  const inputCombinedArray = [...inputs , ...textareas]
  
  for(const i of inputCombinedArray) {
    if(!i.value && !i.disabled && i.type !== 'file' && i.type === 'text' && i.parentElement.className !== 'dialog-container') {
      i.classList.add('input-missing-info') 
    }
    else{
      i.classList.remove('input-missing-info')
    }
  }
  if(document.getElementsByClassName('input-missing-info').length !== 0){
    alert('Missing field')
    return false;
  }

  else{
    const parentWorkElements = document.getElementsByClassName('work-data-form')
    const parentEducationElements = document.getElementsByClassName('education-data-form')
    const parentPersonalElements = document.getElementsByClassName('personal-data-form')
    const parentElementsArray = [...parentPersonalElements,  ...parentWorkElements, ...parentEducationElements]

    for(const element of parentElementsArray) {
      const obj = {id: element.id+'input'}
      Array.from(element.children).forEach(child => {
        const key = child.id;
        const value = child.value
        obj[key] = value;
      })
      if(!dataCollection[element.id]){ 
        dataCollection[element.id] = [];
        dataCollection[element.id].push(obj)
      } else{
        dataCollection[element.id].push(obj)
      }
    }
  }
  return dataCollection;
}



const Form = (props) => {
  const [workForm, setWorkForm] = React.useState([])
  const [educationForm, setEducationForm] = React.useState([]) 
  const [id, setId] = React.useState(1)
  const [formId, setFormID] = React.useState();
  const [reset, setReset] = useState(false)  

 
  function addForm(formName) {
    setId(prevID => prevID+1);
    const newFormID = formName+(id+1);
    setFormID(newFormID)
    if(formName === 'WorkForm'){
      const newWorkForm = <WorkInfo FORMID={newFormID} key={newFormID}/>;
      return setWorkForm(workForm.concat(newWorkForm))
    }
    else{
      const newEducationForm = <EducationInfo FORMID={newFormID} key={newFormID}/>
      return setEducationForm(educationForm.concat(newEducationForm))
    }
  }
  
  function handleReset() {
    setEducationForm([]);
    setWorkForm([])
  }

  function handlePrint(){

  }

  return (
    <div id='forms-container'>
      <div id='personal-data-form-container'>
        <form className='personal-data-form' id='personal' >
          <label className='form-labels'>Name</label>
          <input type='text' id='name' placeholder='Name'  required></input>
          <label className='form-labels'>Surname</label>
          <input type='text' id='surname' placeholder='Surname'required ></input>
          <label className='form-labels'>Date of Birth</label>
          <input type='date' id='date' required></input>
          <label className='form-labels'>Country</label>
          <input type='text' id='country' placeholder='Country'  required></input>
          <label className='form-labels'>City</label>
          <input type='text' id='city' placeholder='City' required></input>
          <label className='form-labels'>Email</label>
          <input type='email' id='email' ></input>
          <label className='form-labels'>Phone</label>
          <input type='tel' id='tel' ></input>
          <label className='form-labels'>Photo</label>
          <input type='file' id='photo' accept='.jpg, .jpeg, .png' ></input>
          <label className='form-labels'>Profile / Sumary</label>
          <textarea id='profile'></textarea>
        </form>
        <hr id='form-separator'></hr>
        <WorkInfo FORMID= 'WorkForm0' reset= {reset}></WorkInfo>
          {workForm}
        <button className='add-form-button' onClick={() => addForm('WorkForm')}>Add Work</button>
        <hr id='form-separator'></hr>
        <EducationInfo FORMID = 'EducationForm0' reset = {reset}></EducationInfo>
        {educationForm}
        <button className='add-form-button' onClick={() => addForm('EducationForm')}>Add Education</button>
        <hr id='form-separator'></hr>
        <div id='form-submit'>
          <button id='submit-form-button'
          onClick={() => {
            if(handleSubmit()){
              props.setData(handleSubmit()); 
              props.setgridColumns('auto 39rem')
            }
            } 
          }
          >
            Submit
          </button>
          <button id='reset-all-button' onMouseDown={() =>  {handleReset(); setReset(true)}} onMouseUp={() => {
            setReset(false); 
            // handleSubmit();
            props.setData(handleSubmit())
            props.setgridColumns('auto')
            }}
            >Reset All</button>
          <button onClick={() => window.print()}>Print / Save</button>  
        </div>
      </div>
    </div>
  )

}


function App() {
  const [data, setData] = useState('')
  const [gridColumns, setgridColumns] = useState('auto')
  return (
    <div className="App" style={{gridTemplateColumns: gridColumns}}>
      <Form setData= {setData} setgridColumns={setgridColumns} ></Form>
      <Mockup dataCollection = {data} ></Mockup>
    </div>
  );
}

export default App;




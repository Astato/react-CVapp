import React, { useRef, useState } from 'react';
import './index';
import './index.css'

async function getImg(){
  const imageInput = document.getElementById('photo');
  if (imageInput && imageInput.files[0] && imageInput.files) {
    const file = imageInput.files[0];
    const imgSrc = await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = function (event) {
        resolve(event.target.result);
      };
    });
    return imgSrc;
  }
  else{
    return '';
  }
  }



  function FontsizeSelect(){
    const maxSize = 40;
    let minSize = 10;
    const sizeArray = []

    function options(){
      while(minSize <= maxSize){
        sizeArray.push(minSize)
        minSize+=2;
      }
      return sizeArray;
    }
    const sizes = options()
    const optionElement = sizes.map((size, index) => {
      return(
          <option key={index}>{size.toString()}</option>
      )
    })
    return optionElement
  }

  
const Mockup = (props) =>{
  let eduTitle = false;
  let workTitle = false;
  const dataCollection = props.dataCollection
  const [image, setImage] = useState(null);
  const [workSection, setWorkSection] = useState({
    sectionTitle : 'Work Experience',
    tasksTitle: 'Tasks Performed:',
    startEndTitle : 'Start Date - End Date:'
  })
  const [educationSection, setEducationSection] = useState( {
    degreeTitle : 'Degree:',
    institutionTitle: 'Institution:',
    sectionTitle: 'Education:',
    startEndTitle: 'Start Date- End Date:'
  })
  const [personalTitle, setPersonalSection] = useState('Profile')

  const modal1 = useRef(null);
  const modal2 = useRef(null);
  const modal3 = useRef(null)

  if(Object.keys(dataCollection).length <1) {
    return
  }
  async function waitImage(){
    const url = await getImg();
    setImage(url)
  }

  function editSection(section, element, newValue) {
    if(section ==='education'){
      setEducationSection((previousValue) => {
         previousValue[element] = newValue;
         return {...previousValue}
        })
      }
      if(section === 'work'){
      setWorkSection((previousValue) => {
        previousValue[element] = newValue;
        return {...previousValue}
     })
    }
  }
 

  function openDialog(dialog) {
      dialog.showModal()
  }
  function closeDialog(dialog) {
    dialog.close()
  }

  function ConvertToList(string){
    const array = [];
    let item = ''
    for(let char = 0; char < string.length; char++){
      if(string[char] === '\n' || string[char] === '*'){
        if(item.length > 1) {
          array.push(item)
          item = '';
        }
        continue
      }
      item+=string[char];
      if(char === string.length-1){
        array.push(item)
      }
    }
    const list = array.map((item, index) => {
        return (
          <ul className='tasks-list'>
            <li key={index}>
             {item}
            </li>
          </ul>
        )
    })
    return list;
  }

  function handleFontChange(value, type){
    if(type === 'titles'){
      const titles = document.getElementsByTagName('h3')
        for(const title of titles){
          title.style.fontSize = value.toString()+'px';
        }
    }
    else if(type === 'subtitles') {
      const subtitles = document.getElementsByTagName('h4') 
      for(const subtitle of subtitles) {
        subtitle.style.fontSize = value.toString()+'px';
      }
    }
    else{
      const texts = document.getElementsByTagName('p')    
      for(const text of texts) {
        text.style.fontSize = value.toString()+'px'
      }
    }
  }

  const dataArray = Object.keys(dataCollection).map(key => {
    const array = dataCollection[key]  
    const values = array.map(obj => {
      const { degree, institution, studyFrom, studyTo} = {...obj}
      const { workplace, tasks, workFrom, workTo} = {...obj}
      const { name, surname, country, city, date, email, tel, profile} = {...obj}
      const ID = obj.id 

      if(ID.match('personal')){
        waitImage();
        let age;
        const DATE = new Date();
        const year = DATE.getFullYear();
        if(date) {
         age = Number(date.split('-')[0]);
         age = year - age;  
        }
        return(
          <section key={name} className='mockup-personal-section'>
            <div>
              <img src={image} id='user-photo' alt='' ></img>
              <h3 >{surname}, {name}</h3>
            </div>
            <div id='personal-mockup-section-basic-information'>
              <p>{city}, {country}</p>
              <p>{email}</p>
              <p>{date}</p>
              <p>Tel: {tel}</p>
            </div>
            <div id='profile-container'>
              <div className='section-title'>
                <h3>{personalTitle || 'Profile'}
                  <button style={{marginLeft: '1rem'}} onClick={() => openDialog(modal3.current)} className='edit-line-button'>Edit</button>
                </h3>
              </div>
              <dialog className='dialog' ref={modal3}>
                <div className='dialog-container'>
                  <label>Sectioon TItle</label>
                  <input type='text' placeholder='Profil' onChange={(e) => setPersonalSection(e.target.value)}></input>
                  <button onClick={() => closeDialog(modal3.current)} >Accept</button>
                </div>

              </dialog>
              <hr className='separator'></hr>
              <p>{profile}</p>
            </div>
          </section>
        )
      }
      if(ID.match('workplace')) {
        let mainWorkSection = 
        <>
          <h4>{workplace}</h4>
          <h4 style={{textDecoration: 'underline'}}>{workSection.tasksTitle || 'Tasks Performed'}</h4>
          <p>{tasks}</p>
          <h4 style={{textDecoration: 'underline'}}>{workSection.startEndTitle || 'Start Date - End Date:'}</h4>
          <p>{workFrom} - {workTo || 'Active'}</p>
        </>;  
        if(document.getElementById('isList').checked){
         mainWorkSection = 
         <>
          <h4>{workplace}</h4>
          <h4 style={{textDecoration: 'underline'}}>{workSection.tasksTitle || 'Tasks Performed'}</h4>
          <p>{ConvertToList(tasks)}</p>
          <h4 style={{textDecoration: 'underline'}}>{workSection.startEndTitle || 'Start Date - End Date:'}</h4>
          <p>{workFrom} - {workTo || 'Active'}</p>
         </>;  
        }
        if(!workTitle){
          workTitle = true;
          return (
            <section className='mockup-work-section' key={workplace}>
              <div className='section-title'>
                <h3>{workSection.sectionTitle || 'Work Experience'} 
                  <button className='edit-line-button' onClick={() => openDialog(modal1.current)} >Edit</button>
                </h3>
              </div>
                <dialog className='dialog' ref={modal1} >
                  <div className='dialog-container'>
                    <label style={{marginBottom: '2rem', fontWeight:'900'}}>Change Section title and subtitles</label>
                    <label>Section Title</label>
                    <input type='text' placeholder='Experiencia Laboral' onChange={(e) => editSection('work','sectionTitle', e.target.value)}></input>
                    <label>Tasks / Description</label>
                    <input type='text' placeholder='Descripción' onChange={(e) => editSection('work', 'tasksTitle', e.target.value)}></input>
                    <label>Start / End </label>
                    <input type='text' placeholder='Desde - Hasta' onChange={(e) => editSection('work', 'startEndTitle', e.target.value)}></input>
                    <button onClick={() => closeDialog(modal1.current)}>Accept</button>
                  </div>
                </dialog>
                <div className='separator-container'>
                  <hr className='separator'/>
                </div>
              {mainWorkSection}
            </section>
          )
        }
        return (
          <section className='mockup-work-section' key={workplace}>
            {mainWorkSection}
          </section>
        

        )
      } if(ID.match('education')){
          const mainEducationSection = 
          <>
            <h4 style={{textDecoration:'underline'}}>{ educationSection.degreeTitle  ||'Degree:'}</h4>
            <p><b>{degree}</b></p>
            <h4 style={{textDecoration: 'underline'}}>{educationSection.institutionTitle ||'Institution:'}</h4>
            <p>{institution}</p>
            <h4 style={{textDecoration: 'underline'}}>{educationSection.startEndTitle || 'Start Date - End Date:'}</h4>
            <p>{studyFrom} / {studyTo || 'In progress'}</p>
          </> ;
          if(!eduTitle){
            eduTitle= true;
            return(
              <section key={institution} className='mockup-education-section'>
                <div className='section-title'>
                  <h3> {educationSection.sectionTitle || 'Education'}
                    <button className='edit-line-button' onClick={() => openDialog(modal2.current)}>Edit</button>
                  </h3>
                </div>
                <dialog className='dialog' ref={modal2}>
                  <div className='dialog-container'>
                    <label style={{marginBottom: '2rem', fontWeight:'900'}}>Change Section title and subtitles</label>
                    <label>Section Title</label>
                    <input type='text' placeholder='Éducation' onChange={(e) => editSection('education','sectionTitle', e.target.value)}></input>
                    <label>Institution</label>
                    <input type='text' placeholder='Établissement' onChange={(e) => editSection('education', 'institutionTItle', e.target.value)}></input>
                    <label>Start / End </label>
                    <input type='text' placeholder='Date de début - Date de fin.' onChange={(e) => editSection('education', 'startEndTitle', e.target.value)}></input>
                    <label>Degree </label>
                    <input type='text' placeholder='Degré' onChange={(e) => editSection('education', 'degreeTitle', e.target.value)}></input>

                    <button onClick={() => closeDialog(modal2.current)}>Accept</button>
                  </div>
                </dialog>
                  <hr className='separator'></hr>
                <div className='separator-container'>
                </div>
                {mainEducationSection}
              </section>
          )  
        }
        return(
          <div key={institution} className='mockup-education-section'>
            {mainEducationSection}
          </div>
        )
      }

    })
    return values;
  })
  
  return(
    <div id='mockup-container' style={{display: props.showMockup}}>
      <div>
      <select onChange={(e) => {handleFontChange(e.target.value, 'titles')}}>
        <option>Titles Font Size</option>
        {FontsizeSelect()}
      </select>
      <select onChange={(e) => {handleFontChange(e.target.value, 'subtitles')}}>
      <option>Subtitles Font Size</option>
        {FontsizeSelect()}
      </select>
      <select onChange={(e) => {handleFontChange(e.target.value, 'text')}}>
      <option>Text Font Size</option>
        {FontsizeSelect()}
      </select>
      </div>
      {dataArray}
    </div>
  )
}

export default Mockup
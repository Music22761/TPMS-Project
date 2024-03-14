/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import style from '../../../css/style/Certificate.module.css'
import moment from 'moment'
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import jsPDF from 'jspdf';


function Certificate(props) {

  const certificateRef = useRef(null)

  const handleDownloadCertificate = ()=>{
    alert('Downloaging...')
    //ใช้ html2canvas cap หน้าจอ ที่เป็น certificate
    html2canvas(certificateRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      //สร้างไฟล์ jsPDF แล้วเพิ่มภาพที่ cap ไว้มาใส่
      const pdf = new jsPDF('l','mm',[1000,670])
      pdf.addImage(imgData,'PNG',0,0,1000,670)

      //download certificate
      pdf.save(`${name.split(' ').join('_')}_certificate`)


    })
  }

  const {name,course,dateStart,dateEnd,signature,signatureDetail,logo} = props

  console.log("Props in Certificate:",signatureDetail);
  return (
    <>
      <div ref={certificateRef} className={style.certificateWrapper}>
        <div className={style.certificateContainer}>
            <div>
              <img style={{width:'100px'}} src={logo.preview} alt="" />
            </div>

            <h1>CERTIFICATE OF TPMS</h1>

            <span className={style.smallText}>ประกาศนียบัตรนี้ มอบให้</span>

          <p className={style.primaryItalicText}>{name}</p>

          <span className={style.smallText}>เพื่อแสดงถึงความสำเร็จกับการผ่านการอบรม</span>

          <h2>{course}</h2>

          <span className={style.smallText}>{`conducted from ${
            dateStart ? moment(dateStart).format('MMMM YYYY') : '-'
          } to ${dateEnd ? moment(dateEnd).format('MMMM YYYY') : '-'}`}</span>
          
          <div className={style.signatureBlock}>
            <img className={style.signatureImage} src={signature.preview} alt='' />

            <span className={style.horizontalBar} />

            <div className={style.smallText}>{signatureDetail}</div>
          </div>

        </div> 
      </div>

      <Button variant='contained' onClick={handleDownloadCertificate} style={{width:'100%',marginTop:'3rem'}}>Download PDF</Button>
    </>
  );
}

export default Certificate;
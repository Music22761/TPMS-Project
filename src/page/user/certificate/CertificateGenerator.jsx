import { Button } from "@mui/material";
import style from "../../../css/style/Certificate.module.css";
import Modal from "./Modal";
import { useReducer, useState } from "react";
import Certificate from "./certificate";


const initialState = {
  name: "Sitthikan Chaiyamart",
  course: "Computer Science Programmer",
  dateStart: "2022-05-20",
  dateEnd: "2023-05-20",
  signature: "",
  signatureDetail: "Mahasarakham University",
  logo:""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TEXT_CHANGE":
      return { ...state, [action.field]: action.payload };
    default:
      break;
  }
};

function CertificateGenerator() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, course, dateStart, dateEnd, signature, signatureDetail,logo } =
      formState;

    if (
      name &&
      course &&
      dateStart &&
      dateEnd &&
      signature &&
      signatureDetail && 
      logo
    ) {
      console.log("form submited!!", formState);

      setIsOpenModal(true);
    }else{
      alert("Please fill all detail")
    }
  };

  const handleTextChange = (e) => {
    dispatch({
      type: "TEXT_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <form onSubmit={handleSubmitForm}>
            <div className={style.inputGroup}>
              <label htmlFor="user-name">Name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                id="user-name"
                onChange={handleTextChange}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="course">Course</label>
              <input
                type="text"
                name="course"
                value={formState.course}
                id="course"
                onChange={handleTextChange}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="dateStart">Date of Conduct Start</label>
              <input
                type="date"
                name="dateStart"
                value={formState.dateStart}
                id="dateStart"
                onChange={handleTextChange}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="dateEnd">Date of Conduct Start</label>
              <input
                type="date"
                name="dateEnd"
                value={formState.dateEnd}
                id="dateStart"
                onChange={handleTextChange}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="signature">Signature</label>
              <input
                type="file"
                name="signature"
                // value={formState.signature}
                id="signature"
                onChange={(e) => {
                  const selected = e.target.files[0];

                  const objectUrl = URL.createObjectURL(selected);

                  dispatch({
                    type: "TEXT_CHANGE",
                    field: e.target.name,
                    payload: { ...selected, preview: objectUrl },
                  });
                }}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="logo">Logo</label>
              <input
                type="file"
                name="logo"
                // value={formState.signature}
                id="logo"
                onChange={(e) => {
                  const selected = e.target.files[0];

                  const objectUrl = URL.createObjectURL(selected);

                  dispatch({
                    type: "TEXT_CHANGE",
                    field: e.target.name,
                    payload: { ...selected, preview: objectUrl },
                  });
                }}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="signatureDetail">Signature Detail</label>
              <input
                type="text"
                name="signatureDetail"
                value={formState.signatureDetail}
                id="signatureDetail"
                onChange={handleTextChange}
              />
            </div>

            <Button style={{ width: "100%" }} type="submit" variant="contained">
              Generate Certificate
            </Button>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
      >
        {Certificate(formState)}
      </Modal>
    </>
  );
}

export default CertificateGenerator;

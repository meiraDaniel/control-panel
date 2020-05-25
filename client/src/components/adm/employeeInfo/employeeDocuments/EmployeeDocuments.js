import React, { useEffect, useState,useCallback } from "react";
import { connect } from "react-redux";
import getAllUploads from "../../../../services/API/getAllUploads";
import { getMonthName } from "../../../../services/services";
import { useHistory } from "react-router-dom";

function EmployeeDocuments({ account_id, token }) {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [data, setData] = useState([]);
  const [tableYear, setTableYear] = useState();
  const [documents, setDocuments] = useState([]);

const history = useHistory()

const handleAllUploads = useCallback(()  => {
  getAllUploads(account_id, token)
    .then((res) => {
      setData(res.data);
      res.data.forEach((item) => setYears([item.year]));
    })
    .catch((err) => console.log(err));
},[account_id, token]);

  useEffect(() => {
    handleAllUploads();
  }, [handleAllUploads]);


  const handleYears =  async (year) => {
    await setTableYear(year);
     data.filter((obj) => obj.year === year).forEach((item) => setMonths([item.month]));
  };

  const displayDocuments =(selectedMonth)=>{
  setDocuments(data.filter((obj)=> obj.year === tableYear && obj.month===parseInt(selectedMonth)))
 
  }

  return (
    <div className="employeeHours--main">
      <div className="employeeHours--top">
        <h2>Employees</h2>
      </div>
      <div className="employeeHours--center-main">
        <div className="employeeHours--left-selectYear">
        
          <div className="employeeHours--left-bottom-yearlist">
            {years ? (
              years
                .filter((v, i) => years.indexOf(v) === i)
                .map((year, i) => (
                  <button
                    className="button"
                    onClick={() => handleYears(year)}
                    key={i}
                  >
                    {year}
                  </button>
                ))
            ) : (
              <p>No data Avaible</p>
            )}
          </div>
          <button
            id="employeeHours--button-back"
            className="button"
            onClick={() => history.push("/adm/dashboard")}
          >
            BACK
          </button>
          <div className="employeeHours--rigth-information">
            <div className="employeeHours--right-top-select">
               { tableYear?<select
               onChange={(e)=>displayDocuments(e.target.value)}
                  className="employeeHours--select"
                  name="months"
                  id="months"
                >
                  <option value="none">Select a Month</option>
                  {months
                    .filter((v, i) => months.indexOf(v) === i)
                    .map((month, i) => (
                      <option key={i} value={month}>
                        {getMonthName(parseInt(month) + 1)}
                      </option>
                    ))}
                </select>:null}
                <div className="employeeHours-right-center-table">
               {documents?documents.map(doc=>
                <img key={doc.id} src={doc.upload} alt={doc.upload_name}/> 
               
                ):null} 
                
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapToProps(state) {
  return {
    account_id: state.getId.account_id,

    token: state.createSession.token,
  };
}

export default connect(mapToProps)(EmployeeDocuments);

import React, {useEffect, useState} from 'react';
import style from '../stylesheets/home.module.css'
import {get} from "./useAPI/useAPI";

const HomePage = ({employee_information, company_image_url}) => {
  const [office, setOffice] = useState({})
  const [officeStatistics, setOfficeStatistics] = useState([])
  const [company, setCompany] = useState({})
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    get(`${process.env.HOST}/offices/${employee_information.office_id}`)
      .then(
        (response) => {
          setOffice(response.data);
        })
      .catch(
        (errors) => {
          setErrors(errors)
        }
      )
  }, []);

  useEffect(() => {
    get(`${process.env.HOST}/statistics/office_visiting/${employee_information.office_id}`)
      .then(
        (response) => {
          setOfficeStatistics(response.data);
        })
      .catch(
        (errors) => {
          setErrors(errors)
        }
      )
  }, []);

  useEffect(() => {
    get(`${process.env.HOST}/companies/${employee_information.company_id}`)
      .then(
        (response) => {
          setCompany(response.data);
        })
      .catch(
        (errors) => {
          setErrors(errors)
        }
      )
  }, []);

  return (
    <div>
      {errors ? <div className={style.requestErrors}>
        <h1>{errors.message}</h1>
      </div> : null}
      <div className={style.wrapper}>
        <div className={style.companyInformation}>
          <h1>{company.name}</h1>
          <img src={company_image_url} alt="Company logo"/>
          <p>{company.description}</p>
        </div>
        <div className={style.officesInformation}>
          <h1>{`Your current office is on ${office.town}, ${office.street}, ${office.house_number}`}</h1>
          {officeStatistics.map((item) =>
          <h1 key={item.quantity}>{item.week_day} - {item.quantity}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
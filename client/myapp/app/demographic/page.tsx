"use client";

import React, { useState } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';


interface DemographicData {
  age: number;
  relationship: string;
  relationshipOther: string;
  gender: string;
  genderOther: string;
  hispanicOrigin: string[];
  race: string[];
  raceOther: string;
  education: string;
  housing: string[];
  housingOther: string;
  householdBudget: string;
  assistance: string[];
  assistanceOther: string;
  maritalStatus: string;
  householdSize: number;
  under18: number;
  occupationalStatus: string[];
  occupationOther: string;
}

const DemographicPage: React.FC = () => {
  const router = useRouter();
  const [demographicData, setDemographicData] = useState<DemographicData>({
    age: 0,
    relationship: '',
    relationshipOther: '',
    gender: '',
    genderOther: '',
    hispanicOrigin: [],
    race: [],
    raceOther: '',
    education: '',
    housing: [],
    housingOther: '',
    householdBudget: '',
    assistance: [],
    assistanceOther: '',
    maritalStatus: '',
    householdSize: 0,
    under18: 0,
    occupationalStatus: [],
    occupationOther: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDemographicData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { checked, value } = event.target;
    setDemographicData((prevData) => {
      const updatedList = checked
        ? [...prevData[name as keyof DemographicData] as string[], value]
        : (prevData[name as keyof DemographicData] as string[]).filter((item) => item !== value);
      return { ...prevData, [name]: updatedList };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(demographicData)
    try {
      // const response = await fetch("http://localhost:5000", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(demographicData),
      // });
      const response = { ok: true };

      if (response.ok) {
        router.push("/consent"); // Redirect to the Consent page
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };





  return (
    <div className="demographic-container">
      <h2>We want to know you better</h2>
      <form onSubmit={handleSubmit} className="demographic-form">
        <div className="form-group">
        <label className="question-title">D1. What is your age?</label>
          <input type="number" name="age" value={demographicData.age} onChange={handleChange} />
        </div>

        <div className="form-group">
        <label className="question-title">D2. What is your relationship with the child(ren)?</label>
          <select name="relationship" value={demographicData.relationship} onChange={handleChange}>
            <option value="">Select</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="grandparent">Grandparent</option>
            <option value="other">Other (Please specify)</option>
          </select>
          {demographicData.relationship === "other" && (
            <input type="text" name="relationshipOther" value={demographicData.relationshipOther} onChange={handleChange} />
          )}
        </div>

        <div className="form-group">
        <label className="question-title">D3. What is your gender?</label>
          <select name="gender" value={demographicData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other (Please specify)</option>
          </select>
          {demographicData.gender === "other" && (
            <input type="text" name="genderOther" value={demographicData.genderOther} onChange={handleChange} />
          )}
        </div>

        <div className="form-group">
        <label className="question-title">D4. Are you of Hispanic, Latino/a, or Spanish origin? Mark all that apply.</label>
          {["No", "Mexican", "Puerto Rican", "Cuban", "Other"].map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name="hispanicOrigin"
                value={option}
                checked={demographicData.hispanicOrigin.includes(option)}
                onChange={(e) => handleCheckboxChange(e, "hispanicOrigin")}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>

        <div className="form-group">
        <label className="question-title">D5. What is your race? Mark all that apply.</label>
          {["White or Caucasian", "Black or African American", "American Indian or Alaska Native", "Asian", "Native American", "Pacific Islander", "Other"].map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name="race"
                value={option}
                checked={demographicData.race.includes(option)}
                onChange={(e) => handleCheckboxChange(e, "race")}
              />
              <label>{option}</label>
            </div>
          ))}
          {demographicData.race.includes("Other") && (
            <input type="text" name="raceOther" value={demographicData.raceOther} onChange={handleChange} />
          )}
        </div>

          <div className="form-group">
          <label className="question-title">D6. What is the highest grade or level of schooling that you completed?</label>
    <select name="education" value={demographicData.education} onChange={handleChange}>
      <option value="">Select</option>
      <option value="someHighSchool">Some high school or less</option>
      <option value="highSchoolDiploma">High school diploma or GED equivalent</option>
      <option value="someCollege">Some college or vocational training</option>
      <option value="bachelorOrHigher">Bachelor’s degree or higher</option>
    </select>
  </div>

  <div className="form-group">
  <label className="question-title">D7. Are you in/on ________. Please mark all that apply.</label>
    {["Public housing", "Section 8 rental certificates", "Section 202", "Private housing", "Other"].map((option, index) => (
      <div key={index}>
        <input
          type="checkbox"
          name="housing"
          value={option}
          checked={demographicData.housing.includes(option)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, "housing")}
        />
        <label>{option}</label>
      </div>
    ))}
    {demographicData.housing.includes("Other") && (
      <input type="text" name="housingOther" value={demographicData.housingOther} onChange={handleChange} />
    )}
  </div>

  <div className="form-group">
  <label className="question-title">D8. In the past 12 months, what was your proximate household budget?</label>
    <input 
      type="number" 
      name="householdBudget" 
      placeholder="Enter amount" 
      value={demographicData.householdBudget} 
      onChange={handleChange} 
    />
    <label className="question-title">Or select a range:</label>
    <select name="householdBudget" value={demographicData.householdBudget} onChange={handleChange}>
      <option value="">Select</option>
      <option value="0-10000">$0 to $10,000</option>
      <option value="10001-25000">$10,001 to $25,000</option>
      <option value="25001-40000">$25,001 to $40,000</option>
      <option value="40001-55000">$40,001 to $55,000</option>
      <option value="55001-75000">$55,001 to $75,000</option>
      <option value="75001-90000">$75,001 to $90,000</option>
      <option value="90001-105000">$90,001 to $105,000</option>
      <option value="moreThan105000">More than $105,000</option>
    </select>
  </div>

  <div className="form-group">
  <label className="question-title">D9. In the last 12 months, have you or anyone else in your household received. Please mark all that apply.</label>
    {["TANF", "Food stamp or EBT", "Unemployment Insurance", "Worker’s Compensation", "Other"].map((option, index) => (
      <div key={index}>
        <input
          type="checkbox"
          name="assistance"
          value={option}
          checked={demographicData.assistance.includes(option)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, "assistance")}
        />
        <label>{option}</label>
      </div>
    ))}
    {demographicData.assistance.includes("Other") && (
      <input type="text" name="assistanceOther" value={demographicData.assistanceOther} onChange={handleChange} />
    )}
  </div>

  <div className="form-group">
  <label className="question-title">D10. Marital status</label>
    <select name="maritalStatus" value={demographicData.maritalStatus} onChange={handleChange}>
      <option value="">Select</option>
      <option value="married">Married</option>
      <option value="livingAsMarried">Living as married or living with a romantic partner</option>
      <option value="separated">Separated</option>
      <option value="divorced">Divorced</option>
      <option value="widowed">Widowed</option>
      <option value="singleNeverMarried">Single and never been married</option>
    </select>
  </div>

  <div className="form-group">
  <label className="question-title">D11. Including yourself, how many people currently live in your household?</label>
    <input type="number" name="householdSize" value={demographicData.householdSize} onChange={handleChange} />
  </div>

  <div className="form-group">
  <label className="question-title">D12. How many of your household members are under the age of 18?</label>
    <input type="number" name="under18" value={demographicData.under18} onChange={handleChange} />
  </div>

  <div className="form-group">
  <label className="question-title">D13. Which of the following best describes your current occupational status? Mark all that apply.</label>
    {["Employed", "Unemployed for 1 year or more", "Unemployed for less than 1 year", "Homemaker", "Student", "Retired", "Other"].map((option, index) => (
      <div key={index}>
        <input
          type="checkbox"
          name="occupationalStatus"
          value={option}
          checked={demographicData.occupationalStatus.includes(option)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, "occupationalStatus")}
        />
        <label>{option}</label>
    </div>
  ))}
  {demographicData.occupationalStatus.includes("Other") && (
    <input type="text" name="occupationOther" value={demographicData.occupationOther} onChange={handleChange} />
  )}
</div>




        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default DemographicPage;

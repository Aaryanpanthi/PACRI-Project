"use client";
import './page.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import ShowMoreComponent from '../components/ShowMoreComponent';

const ConsentPage: React.FC = () => {

  const [consentGiven, setConsentGiven] = useState(false);
  const router = useRouter();

  const handleConsent = () => {
    setConsentGiven(true);
    alert("Thank you for your consent!");
    router.push('/chatbot'); // Redirect to the chatbot page
  };


  return (
    <div className="consent-page">
      <h1>Consent Form</h1>

      <div className="section">
        <h2>Purpose</h2>
        <ShowMoreComponent>
          <p>This interview studies caregivers' knowledge and resource needs for managing childhood asthma in public housing, contributing to research on health improvement, with voluntary 30-45 minute sessions approved by Howard University's IRB.</p>
          <>
            <p>This interview aims to examine caregivers' understanding of healthy home programs on addressing asthma, needed resources for maintaining a healthy indoor environment for children with asthma, and understanding of the Asthma Action Plan, as well as needed resources for adherence to the Action Plan. The information learned in this focus group will be used in a study on improving the health of urban minority asthmatic children living in public housing. Procedure You will be asked to participate in an interview 30-45 minutes, the interview can be in-person or online (via Zoom), based on your availability and preferences. As approved through the Howard University Institutional Review Board, this interview will be audio-recorded, and a note-taker will be present. You can choose whether or not to participate in this focus group, and you may stop at any time during the study. Your decision will not impact the healthy home service you receive.</p>
          </>
        </ShowMoreComponent>
      </div>

      <div className="section">
        <h2>Compensation</h2>
        
        <p>You will receive $50 gift card as a token of appreciation upon the completion of the interview.</p>
      
      </div>
      

      <div className="section">
        <h2>Benefits</h2>
        <ShowMoreComponent>
          <p>This research aims to enhance quality of life for families with asthmatic children in public housing, with participants contributing to the development of healthy home initiatives.</p>
          <>
            <p>The results of this research will be useful in improving quality of life for families with asthmatic children in public housing. The benefit to you for participating in this study is the contribution to the potential development of healthy home initiatives and programs for public housing residents.</p>
          </>
        </ShowMoreComponent>
      </div>

      <div className="section">
        <h2>Risks</h2>
        <ShowMoreComponent>
          <p>No risks are expected, but participants may take breaks or stop anytime; free counseling is available at certified Community Mental Health Centers if needed.(SEE MORE FOR CONTACTS)</p>
          <>
          <p>No risks are anticipated. However, you may feel uncomfortable when answering some of the questions. Tell the moderator at any time if you wish to take a break or stop the focus group. The following certified Community Mental Health Centers provide free counseling services if you need:</p>
<ul>
  <li>Hillcrest Children and Family Center, 3029 Martin Luther King Jr Avenue SE, Washington, DC – 20032, T(202) 232-6100</li>
  <li>Whitman Walker Clinic, 2301 Martin Luther King Jr Avenue SE, Washington, DC – 20020, T(202) 745-7000</li>
  <li>Child and Youth Mental Health Services, Howard Road SE, Washington, DC – 20020, T(202) 698-1838</li>
</ul>

          </>
        </ShowMoreComponent>
      </div>

      <div className="section">
        <h2>Confidentiality</h2>
        <ShowMoreComponent>
          <p>Your individual privacy will be maintained in all published and written data resulting from the study</p>
          <>
            <p> In the transcription of the focus group interview, your name will not be associated with your responses. All data will be coded by identification number assigned to you and are known only by the investigators on this project.

We will analyze the data, but-as stated above-your responses will remain confidential, and no names or other identifiable information will be included in any reports.g</p>
          </>
        </ShowMoreComponent>
      </div>

      <div className="section">
        <h2>Contacts</h2>
        <ShowMoreComponent>
          <p>If you have any questions or concerns regarding this study, please contact Meirong Liu</p>
          <>
            <p> Meirong Liu, Ph.D. 601 Howard PL Washington DC, 20059 Meirong.liu@howard.edu Phone: (202)716-9712 If you have any questions for the Howard University Institutional Review Board, please contact: Office of Regulatory Research Compliance Howard University HU Research Bldg 1 1840 7th Street, NW, Suite 309 Washington, D.C. 20001 Phone: (202) 865-8597 Fax: (202) 232-5286</p>
          </>
        </ShowMoreComponent>
      </div>

      <div className="consent-button-container">
        <button 
          className="consent-button" 
          onClick={handleConsent}
          disabled={consentGiven}
        >
          I have read and give consent to the interview
        </button>
      </div>

    </div>


  );
};

export default ConsentPage;

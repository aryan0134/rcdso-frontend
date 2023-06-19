import React from 'react'
import dentist from './dentist.jpg'
import court from './court.jpg'
import complaint from './complaint.png'
import arrow from './arrow.png'
import advice from './advice.png'
import { BsCircle } from 'react-icons/bs'
import contactus from './contactus.png'
import { Link } from 'react-router-dom'
import Footer from "../components/Footer"

function Home() {
  return (
    <>
        <section id='start'>
            <img src={dentist} className='dentistgif' />
            <Link to="/contact">
              <img src={contactus} className='picfix' />
            </Link>
            <div className='start-heading'><h1>Our company offers assistance to dentists who are facing RCDSO complaints at almost no cost</h1></div>
            <div className='start-text'><p>You are reading this because you have received a complaint from RCDSO, and probably one of your patients has filed a complaint against you or your dental office with the Royal College of Dental Surgeons of Ontario (RCDSO). You are now panicking and do not know what to do, so you are Googling the words "dental lawyers" or "best dental lawyer in the city" and making up your mind to pay thousands of dollars to lawyers. The main problem with such RCDSO complaints is that dentists do not know how serious they would be, how much they would cost, and where to start working on them. You are in the right place because we can help. What we want in reply from you is advice when we send a query of another complaint of our client to help them also. That way, we all can help each other and create a safer place.<br /><br />
Our company offers assistance to dentists who are facing complaints from patients that have been filed with the regulating authority, RCDSO. Our services include preparing replies to letters and documents to present the dentist's perspective and side of the story to the complaint committee. We offer our services for free in certain cases, while charging a fee of $500 to $1000 in others. Additionally, we inform the dentist of the expected outcome of the case.<br /><br />
This service is free for you if you have assisted us previously with your views on any of our cases. We generally take advice from various dentists on our client’s cases. If you support us by replying to our request, then this service is free for you; otherwise, you must pay a small fee of $500 to 1000. The price could vary depending on the work involved.<br /><br />
We have noticed that dentists are often harassed by patients, and patients file senseless complaints as they are not required to pay anything to file any complaint.</p>
</div>
            <div className='start-3'><h1>“Offcourse We are biased towards dentists.”</h1></div>
        </section>
        <section className='start3'>
          <img src={court} className='court' />
          <img src={complaint} className='complaint' />
          <div className='flow1'>1.	The investigator will typically contact you by phone to inform you of the complaint.</div>
          <img src={arrow} className='arrow1' />
          <div className='flow2'>2.	You will receive a set of documents, including a copy of the complaint, through secure email or physical mail.</div>
          <img src={arrow} className='arrow2' />
          <div className='flow3'>3.	The investigator will ask you to respond to the complaint within 30 to 60 days, providing dental records and other relevant documents.</div>
          <img src={arrow} className='arrow3' />
          <div className='flow4'>4.	The investigator may request additional information or documents.</div>
          <img src={arrow} className='arrow4' />
          <div className='flow5'>5.	You will keep receiving updates every 60 days via email, with subject like ““ 100 days delay letter – C120235CC - Singh - Julie (encrypt) [PCRAPL] CRM:0445001216”</div>
          <img src={arrow} className='arrow5' />
          <div className='flow6'>6.	Eventually, you will receive a decision via email. Follow the decision, and if necessary, book the required course and send a copy to RCDSO. Both the client and dentist receive a copy of the ICRC's decision. College staff are not involved in the ICRC's decision-making process.</div>
        </section>
        <section id="start2">
            <div className='facts-heading'><h1>FACTS</h1></div>
            <div className='facts-body'>
                <p>RCDSO is your friend and not your enemy. Consider the same person who made the complaint goes to the civil court with the same complaint, the consequences would be many times worse because the judge does not know about the problems of dentists and their business. Here, your complaint is handled by a group of dentists who might have gone through the same feeling you are going through right now. They want to save you by probably pretending that they have acted as if they punished the dentist for his mistake and settle the case as quickly as possible. Make sure you leave your ego behind, treat them like your friend, and never challenge their views or decisions. Never hire a lawyer to threaten or show your power to the RCDSO committee; otherwise, you will turn your friend into your worst enemy.<br /><br />
                You understand your case more than a lawyer, so consider doing it yourself. Consider adding us to your team to gain more confidence. We will provide you with all your queries. We would prepare the paperwork based on X-rays, PAN, visit records, dentist notes, and screenshots or other information from practice management software like Paradigm, Tracker, Abledent, or similar software.<br /><br />
                Stay calm. You have PLP, your knowledge, and you have us on your side. As a team, we will get through it. Your license is not at stake unless you have done something beyond imagination. We have not seen any cases so far where our client lost their license, not because we are very intelligent, but due to the fact that when you run a business, it is obvious that you make mistakes, and every dentist makes mistakes. If RCDSO started revoking licenses on complaints, probably there would be no dentist left in the city.<br /><br />
                ICRC cannot award money or damages because the law that governs its actions does not allow it to award compensation of any kind. Only courts have the authority to do so.
                </p>
            </div>
        </section>
        <section id='start4'>
          <img src={advice} />
          <div className='bullet1'><span><BsCircle /></span><h1>Never get emotional and give favors to patients, as such patients may later cause regret.</h1></div>
          <div className='bullet2'><span><BsCircle /></span><h1>If a patient speaks poorly of a previous dentist, flag them in the management system as they may be a troublemaker. Most practice management systems offer color-coded flagging options.</h1></div>
          <div className='bullet3'><span><BsCircle /></span><h1>If an employee frequently uses the word "Legal/illegal" ,consider getting rid of them gradually.</h1></div>
          <div className='bullet4'><span><BsCircle /></span><h1>Keep a punch card system for employee attendance, which can be ordered inexpensively from Amazon.</h1></div>
          <div className='bullet5'><span><BsCircle /></span><h1>Share your views on blogs in the last tab of this website to help other dentists.</h1></div>
          <div className='bullet6'><span><BsCircle /></span><h1>Never give an employee advance salary or a car loan, as they may know your loopholes and make it difficult to reclaim loans.</h1></div>
          <div className='bullet7'><span><BsCircle /></span><h1>Instead of paying lawyers, use a network like ours for information, as margins have decreased for dentists and employee costs are increasing.</h1></div>
        </section>
        <Footer />
    </>
  )
}

export default Home

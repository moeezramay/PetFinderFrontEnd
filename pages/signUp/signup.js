import React from 'react';
import "./signup.css";
import Waves from "../../public/waves";
import Logo from "../../public/signInlogo";
import TouchHand from "../../public/handTouchsvg";
import ShareIcon from "../../public/shareIconsvg";
import { useRouter } from "next/navigation";


function SignUp() {
  var router = useRouter();

  var shiftPage = (link) => {
    router.push(link);
  }
  //shiftPage("/signup");
  return (
    <form>
    <div className="parent">                                                          {/*Parent Element that holds the entire page */}
      <div className='centerIt'>                                                      {/* For centering the box*/}
        <div className='aboutSectionHeading' maxWidth="lg" minWidth="sm">  
               
       {/* div for the entire box of signup and about section*/}
        <div className='aboutSectiondiv'  data-testid='aboutSectiondiv'>   {/* About section*/}  
        <div   className='primarySignUpLogo'> <Logo /></div>
        <div className='name'>Name</div>
        <input placeholder="Enter your Name" type='phoneNo' variant='outlined' size='small' className='EmailTextField'/>
        <div className='password'>Password</div>
        <input placeholder="Enter your Password" type='phoneNo' variant='outlined' size='small' className='EmailTextField' />
        <div className='confirmPassword'>Confirm Password</div>
        <input placeholder="Confirm your password" type='phoneNo' variant='outlined' size='small' className='EmailTextField' />
        <div className='tradeMark'> ©MatDevs - 2023 - All Rights Reserved</div>
                                {/*Lost Pets Section End */}
          </div>
          <div className='signUpSectiondiv'>                                    {/* Signup section*/}
            <div className='logoAndSignUp'>   
              <div variant='h5' className='signUpHeading'>SignUp</div>
            </div>
            <div className='EmailAndPasswordAndForgotPass'>                          {/* Email, Password, ForgotPassword, Button, Dont have an account section*/}
              <div variant='subtitle2' className='EmailHeading'>Email</div>
              <input placeholder="Enter your Email" type='phoneNo' variant='outlined' size='small' className='EmailTextField'/>
              <div variant='subtitle2' className='PassHeading'>Phone</div>
              <input placeholder="Enter your Phone No." type='phoneNo' variant='outlined' size='small' className='PassTextField' />
              <div className='Gender'>Gender</div>
              <div class="checkbox-div">
              <label>
              <input type="checkbox"/>Male     
              </label>
              <label>
              <input type="checkbox"/> Female
              </label>
              <label>
              <input type="checkbox"/> Other
              </label>
              </div>
              <button  className="signUpButton"  >SignUp</button>
              <div className='DontHaveAnAccountdiv'>
                <div variant='subtitle2' className='DontHaveAnAccount'>Already have an account?</div>
                <link href="/signIn" rel="noopener noreferrer">   {/* Add Link To signIn Page */}
                  <div variant='subtitle2' className='SignUp' href=''>SignIn</div>
                </link>
              </div>            
            </div>
          </div>

        </div>
        <Waves className="waves" />
      </div>
    </div>
    </form>
  );
}

export default SignUp;
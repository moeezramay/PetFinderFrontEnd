import React from 'react';
import "./signup.css";
import Waves from "../../public/waves";
import MiniLogo from "../../public/miniLogoBlacksvg";
import TouchHand from "../../public/handTouchsvg";
import ShareIcon from "../../public/shareIconsvg";
import { useRouter } from "next/navigation";

<<<<<<< HEAD
function SignUp() {
    var router = useRouter();

    var shiftSignIn = () => {
        router.push("../signIns/signIn");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Add functionality here
        router.push("../homePage/home");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="parent">
                <div className="centerIt">
                    <div className="aboutSectionHeading-signUp">
                        <div className="aboutSectiondiv">
                            <div className="aboutHeading-signUp">
                                One Platform!
                            </div>
                            <div className="aboutDescription-signUp">
                                For Finding Lost Pets!
                            </div>
                            <div className="OwnersSection-signUp">
                                <div className="parent-owner-signUp">
                                    <div className="owner-title-signUp">
                                        Owners!
                                    </div>
                                    <div className="ownerSubTitle-signUp">
                                        Find your lost pet
                                        <br />
                                        within a few clicks!
                                    </div>
                                </div>
                                <div className="hand-logo-signUp">
                                    <TouchHand />
                                </div>
                            </div>
                            <div className="LostPetsSection-signUp">
                                <div className="parent-owner-signUp">
                                    <div className="owner-title-signUp">
                                        Lost Pets!
                                    </div>
                                    <div className="ownerSubTitle-signUp">
                                        Register any lost pet
                                        <br />
                                        to find its owner!
                                    </div>
                                </div>
                                <div className="hand-logo-signUp">
                                    <ShareIcon />
                                </div>
                            </div>
                        </div>
                        <div className="signUpSectiondiv">
                            <div className="logo-parent-signUp">
                                <MiniLogo className="logo-signUp" />
                            </div>
                            <div className="signUpHeading-signUp">SignUp</div>
                            <div className="email-pass-confirm-section-signUp">
                                <div className="email-heading-signUp">
                                    Email
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Email"
                                />
                                <div className="email-heading-signUp">
                                    Password
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Password"
                                />
                                <div className="email-heading-signUp">
                                    Confirm Password
                                </div>
                                <input
                                    className="email-input-signUp"
                                    placeholder="Type Your Password"
                                />
                            </div>
                            <div className="SeperatingLine-signUp"></div>
                            <button
                                className="singup-Button-signUp"
                                type="submit"
                            >
                                SignUp
                            </button>
                            <div className="parent-acc-signUp">
                                <div className="already-acc-signUp">
                                    Already have an account?
                                </div>
                                <div
                                    className="link-sign-signUp"
                                    onClick={shiftSignIn}
                                >
                                    SignIn
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
=======

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
>>>>>>> ab8a3a9612708d140712e09aafe34ee5230db838

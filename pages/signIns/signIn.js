import React from 'react';
import "./sign.css";
import Waves from "./../../public/waves"; // Adjusted import
import Logo from "./../../public/signInlogo"; // Adjusted import
import TouchHand from "./../../public/handTouchsvg"; // Adjusted import
import ShareIcon from "./../../public/shareIconsvg"; // Adjusted import
import { useRouter } from "next/navigation";

// Rest of your code...

function signIn() {
  var router = useRouter();

  var shiftPage = (link) => {
    router.push(link);
  }
  //shiftPage("/signup");
  return (
    <form>
    <div className="parent">                                                          {/*Parent Element that holds the entire page */}
      <div className='centerIt'>                                                      {/* For centering the box*/}
        <div className='aboutSectionHeading' maxWidth="lg" minWidth="sm">       {/* div for the entire box of signup and about section*/}

          <div className='aboutSectiondiv'  data-testid='aboutSectiondiv'>   {/* About section*/}       
            <div variant='h4' className='aboutHeading'>One Platform!</div>
            <div variant='h6' className='aboutDescription'>For Finding Lost Pets!</div>
            <div className='OwnersSection'>     {/*Owner Section Start */}
              <div className='ParentOwner'>   
                <div variant='h5' color='#f6fdff' fontWeight='bold'>Owners!</div>
                <div className='OwnerDescription'>
                  <div variant='h7' color='#f6fdff'>Find your lost pet</div>
                  <div variant='h7' color='#f6fdff'>within a few clicks!</div>
                </div>
              </div>
              <div className='HandLogo'>
                <TouchHand />
              </div>
            </div>                            {/*Owner Section End */}

            <div className='LostPetsSection'>     {/*Lost Pets Section Start */}
              <div className='ParentOwner'>   
                <div variant='h5' color='#f6fdff' fontWeight='bold'>Lost Pets!</div>
                <div className='OwnerDescription'>
                  <div variant='h7' color='#f6fdff'>Register any lost</div>
                  <div variant='h7' color='#f6fdff'>pets to find its owner</div>
                </div>
              </div>
              <div className='ShareLogo'>
                <ShareIcon />
              </div>
            </div>                        {/*Lost Pets Section End */}
          </div>

          <div className='signUpSectiondiv'>                                    {/* Signup section*/}
            <div className='logoAndSignUp'>
              <Logo  className='signUpLogo'/>
              <div variant='h5' className='signUpHeading'>SignIn</div>
            </div>
            <div className='EmailAndPasswordAndForgotPass'>                          {/* Email, Password, ForgotPassword, Button, Dont have an account section*/}
              <div variant='subtitle2' className='EmailHeading'>Email</div>
              <input label="Enter your email" type='email' variant='outlined' size='small' className='Emailinput' />
              <div variant='subtitle2' className='PassHeading'>Password</div>
              <input label="Enter your Password" type='password' variant='outlined' size='small' className='Passinput' />
              <link href="https://www.example.com" target="_blank" rel="noopener noreferrer">  {/* Add link To Forgot Password Page */}
                <div variant='subtitle2' className='ForgotPassHeading'>Forgot Password?</div> 
              </link>
              <div className='SeperatingLine'></div>
              <button variant="contained" className="signInButton">SignIn</button>
              <div className='DontHaveAnAccountdiv'>
                <div variant='subtitle2' className='DontHaveAnAccount'>Dont have an account?</div>
                <link href="/signup" rel="noopener noreferrer">   {/* Add link To signIn Page */}
                  <div variant='subtitle2' className='SignUp'>SignUp</div>
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

export default signIn;
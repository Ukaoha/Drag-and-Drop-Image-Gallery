import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaFacebook, FaGoogle} from 'react-icons/fa'
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/Config';
import { CircleLoader } from 'react-spinners';

import './Auth.css'
import Loader from '../../Components/Loader/Loader';

// validated inputs

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .required('Password is required'),

})
const provider = new GoogleAuthProvider();


  

const Login = () => {
  const navigate = useNavigate();
  
  // login in with google
  const SignInWithGoogle = ()=> {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      toast.success('login successfull');
    //   redirectUser()


      // ...
    }).catch((error) => {
      // Handle Errors here.
      toast.error(error.message)
    });
  }
    // login with facebook




    const [isLoading , setIsLoading] = useState(false);

    return ( 
        <>
                  <Formik
initialValues={{ name: '', email: '', password: '' , passwordConfirmed:'' }}
validationSchema={validationSchema}

onSubmit={(values, { setSubmitting }) => {
    setSubmitting(true);
    setIsLoading(true)

    signInWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setIsLoading(false);
     setSubmitting(false);
    toast.success('Login successful');
    // redirectUser()
    navigate('/gallery')


    // ...
  })
  .catch((error) => {
    console.log(error.message)
    setSubmitting(false);
    setIsLoading(false);
    toast.error(error.message);

  });


}}

  
>
{({ values, errors, isSubmitting  } ) => 
(
  <>
  {isLoading && <Loader/>} 
  <div className='form-container'>
  <div className='form-wrapper'>

  <Form>

  <div className='form-control'>
    <h2>Sign in</h2>

  <Field type="email" name="email" placeholder="Email" />
  <ErrorMessage name='email' component='div' className='error' />
  </div>
  <div className='form-control'>
<Field type="password" name="password" placeholder="Password" />
<ErrorMessage name='password' component='div' className='error'/>
</div>
<div>

<button  className='btn' type="submit" disabled={isSubmitting}>
Login
</button>
<p>Or</p>
 
</div>
<ToastContainer/>
</Form>
<div className='google-wrapper' >
<div className='google' >
    <button className='google-btn'   onClick={SignInWithGoogle}  >
      
            <span><FaGoogle color="#fff" /> </span> Login with Google
    </button>

    <span>
      <p>Forgotten password ?
        <Link to="/resetPassword"> Reset password</Link>
      </p>
    </span>
 </div>
 </div>

</div>
</div>
</>

)

    }

</Formik>



        </>
     );
}
 
export default Login;
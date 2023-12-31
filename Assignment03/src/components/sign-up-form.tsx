import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp, login } from '../store/user/user.action';
import { UserData } from '../types/user-data';
import { AppDispatch } from '../store/store';
import { toast } from 'react-hot-toast';

const defaultFormFields: UserData = {
  username: '',
  password: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(signUp(formFields));

    if (response.meta.requestStatus === 'fulfilled') {
      await dispatch(login(response.payload));
    } else {
      toast.error('Sign up failed');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Sign Up</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
        <div>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter your username"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

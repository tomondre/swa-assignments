import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/user/user.action';
import { UserData } from '../types/user-data';
import { AppDispatch } from '../store/store';

const defaultFormFields: UserData = {
  username: '',
  password: '',
  token: '',
  admin: false,
};

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formFields, setFormFields] = useState<UserData>(defaultFormFields);
  const { username, password } = formFields;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(login(formFields));
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Log In</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            placeholder="Enter your username"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

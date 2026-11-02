import { useState, type FC, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signupUser } from '../store/slices/authSlice';
import { selectAuthLoading, selectIsAuthenticated } from '../store/selectors/authSelectors';
import { AuthLayout, PasswordInput } from '../components/auth';
import { Input, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common';

export const SignupPage: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthLoading = useAppSelector(selectAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateName = (val: string): string | undefined => {
    if (!val.trim()) {
      return 'Full name is required';
    }
    return undefined;
  };

  const validateEmail = (val: string): string | undefined => {
    if (!val.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validatePassword = (val: string): string | undefined => {
    if (!val) {
      return 'Password is required';
    }
    if (val.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return undefined;
  };

  const validateConfirmPassword = (val: string, passVal: string): string | undefined => {
    if (!val) {
      return 'Please confirm your password';
    }
    if (val !== passVal) {
      return 'Passwords do not match';
    }
    return undefined;
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(val) }));
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (touched.password) {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(val),
        confirmPassword: touched.confirmPassword
          ? validateConfirmPassword(confirmPassword, val)
          : undefined,
      }));
    }
  };

  const handleConfirmPasswordChange = (val: string) => {
    setConfirmPassword(val);
    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(val, password),
      }));
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'password' | 'confirmPassword') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(name) }));
    } else if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else if (field === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    } else if (field === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(confirmPassword, password),
      }));
    }
  };

  const isFormValid =
    !validateName(name) &&
    !validateEmail(email) &&
    !validatePassword(password) &&
    !validateConfirmPassword(confirmPassword, password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword, password);

    if (nameErr || emailErr || passwordErr || confirmErr) {
      setErrors({
        name: nameErr,
        email: emailErr,
        password: passwordErr,
        confirmPassword: confirmErr,
      });
      return;
    }

    setErrors({});
    setDemoNotice(null);

    try {
      await dispatch(signupUser({ name, email, password })).unwrap();
      setDemoNotice('Account registration successful.');
    } catch (err: unknown) {
      const message = typeof err === 'string' ? err : 'Account registration will be available soon.';
      setDemoNotice(message);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full bg-[#FFFFFF] border border-[#E5E5E5]">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-[20px] font-semibold text-[#171717]">
            Create your account
          </CardTitle>
          <CardDescription className="text-[13px] text-[#737373]">
            Get started with Job Tracker.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-3">
          {demoNotice && (
            <div className="p-3 border border-[#E5E5E5] rounded-md bg-[#FAFAFA] flex items-start gap-2.5 text-[13px] text-[#171717]">
              <Info size={16} className="text-[#171717] shrink-0 mt-0.5" />
              <div className="leading-snug">{demoNotice}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={() => handleBlur('name')}
              error={touched.name ? errors.name : undefined}
              disabled={isAuthLoading}
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              disabled={isAuthLoading}
              autoComplete="email"
            />

            <PasswordInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              helperText={!errors.password ? 'Must be at least 8 characters long.' : undefined}
              disabled={isAuthLoading}
              autoComplete="new-password"
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              disabled={isAuthLoading}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              disabled={!isFormValid || isAuthLoading}
              isLoading={isAuthLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="pt-2 text-center text-[13px] text-[#737373] border-t border-[#E5E5E5]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-[#171717] underline underline-offset-4 hover:text-[#737373] transition-colors"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default SignupPage;

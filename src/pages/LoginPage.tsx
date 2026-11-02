import { useState, type FC, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { AuthLayout, PasswordInput } from '../components/auth';
import { Input, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

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
    return undefined;
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
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else if (field === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const isFormValid = !validateEmail(email) && !validatePassword(password);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr || passwordErr) {
      setErrors({ email: emailErr, password: passwordErr });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setDemoNotice(null);

    // Demonstrate frontend behavior per Phase 3.1 specifications
    setTimeout(() => {
      setIsSubmitting(false);
      setDemoNotice('Authentication integration is coming soon.');
    }, 500);
  };

  return (
    <AuthLayout>
      <Card className="w-full bg-[#FFFFFF] border border-[#E5E5E5]">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-[20px] font-semibold text-[#171717]">
            Welcome back
          </CardTitle>
          <CardDescription className="text-[13px] text-[#737373]">
            Sign in to your Job Tracker account.
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
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              disabled={isSubmitting}
              autoComplete="email"
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              disabled={isSubmitting}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              disabled={!isFormValid || isSubmitting}
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </form>

          <div className="pt-2 text-center text-[13px] text-[#737373] border-t border-[#E5E5E5]">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-[#171717] underline underline-offset-4 hover:text-[#737373] transition-colors"
            >
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;

import Button from "@/Components/Button";
import Input from "@/Components/Input";
import MainLayout from "@/Layouts/MainLayout";
import { createUser, loginUser } from "@/Services/Query";
import {
  EmailPattern,
  NumberPattern,
  PasswordPattern,
} from "@/System/function";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const { control: SignInControl, handleSubmit: SignInHandleSubmit } =
    useForm<UserSignInFormInput>({
      mode: "all",
    });
  const { control: SignUpControl, handleSubmit: SignUpHandleSubmit } =
    useForm<UserSignUpFormInput>({
      mode: "all",
    });
  const onSignUpFormSubmit: SubmitHandler<UserSignUpFormInput> = (data) => {
    createUser(data).then(() => navigate("/"));
  };
  const onSignInFormSubmit: SubmitHandler<UserSignInFormInput> = (data) => {
    loginUser(data).then(() => navigate("/"));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout
      title="Login to your dashboard - Pretium Concept"
      description="Login to your Pretium Concept account to view and track your orders in realtime"
    >
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-7xl px-6 flex flex-col items-start gap-12 md:flex-row"
        >
          {/* SignIn Section */}
          <motion.form
            variants={itemVariants}
            onSubmit={SignInHandleSubmit(onSignInFormSubmit)}
            className="glass border-2 border-red-200/30 rounded-2xl px-8 py-6 w-full md:w-1/2 backdrop-blur-lg shadow-xl"
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">
                Sign in to your Pretium Concept account to continue your learning journey
              </p>
            </div>
            <div className="pt-4 pb-3 space-y-7">
              <div>
                <Input
                  control={SignInControl}
                  rules={{
                    required: "Email field is required",
                    pattern: {
                      value: EmailPattern,
                      message: "Ouch, that doesn't look like an email!",
                    },
                  }}
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
              </div>
              <div>
                <Input
                  control={SignInControl}
                  rules={{ required: "Password field is required" }}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="text-base tracking-wide underline underline-offset-1 decoration-dotted"
            >
              Forgot password?
            </Link>
            <div className="flex flex-col items-end">
              <Button variant="primary" size="lg" className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                Sign In
              </Button>
            </div>
          </motion.form>

          {/* SignUp Section */}
          <motion.form
            variants={itemVariants}
            onSubmit={SignUpHandleSubmit(onSignUpFormSubmit)}
            className="glass border-2 border-red-200/30 rounded-2xl px-8 py-6 w-full md:w-1/2 backdrop-blur-lg shadow-xl"
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Pretium Concept</h2>
              <p className="text-gray-600">
                Create your account and start your learning journey today
              </p>
            </div>
            <div className="pt-4 pb-3 space-y-5">
              <div>
                <Input
                  control={SignUpControl}
                  rules={{
                    required: "First Name field is required",
                  }}
                  name="first_name"
                  placeholder="First Name"
                />
              </div>
              <div>
                <Input
                  control={SignUpControl}
                  rules={{
                    required: "Last Name field is required",
                  }}
                  name="last_name"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <Input
                  control={SignUpControl}
                  name="username"
                  placeholder="Username"
                  rules={{
                    required: "Username field is required",
                  }}
                // updateOnChange={(e: BaseSyntheticEvent) => {
                //   return { ...e, ...{ value: "ola" } };
                // }}
                />
              </div>
              <div>
                <Input
                  control={SignUpControl}
                  rules={{
                    required: "Phone field is required",
                    pattern: {
                      value: NumberPattern,
                      message: "Phone number can't contain letters",
                    },
                  }}
                  name="phone"
                  placeholder="Phone"
                />
              </div>
              <div>
                <Input
                  control={SignUpControl}
                  rules={{
                    required: "Email field is required",
                    pattern: {
                      value: EmailPattern,
                      message: "Ouch, that doesn't look like an email!",
                    },
                  }}
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
              </div>
              <div>
                <Input
                  control={SignUpControl}
                  rules={{
                    required: "Password field is required",
                    minLength: {
                      value: 8,
                      message:
                        "Password must contain the following: <br/> <em> - a <strong>lowercase</strong> letter <br/> - an <strong>uppercase</strong> letter <br/> - a <strong>number</strong> <br/> - Minimum of 8 characters </em> ",
                    },
                    pattern: {
                      value: PasswordPattern,
                      message:
                        "Password must contain the following: <br/> <em> - a <strong>lowercase</strong> letter <br/> - an <strong>uppercase</strong> letter <br/> - a <strong>number</strong> <br/> - Minimum of 8 characters </em> ",
                    },
                  }}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Button type="submit" variant="primary" size="lg" className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                Sign Up
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AuthPage;

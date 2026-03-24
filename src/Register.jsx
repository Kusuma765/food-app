import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submitLogic = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Trim values
    const newUser = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      mobile: data.mobile.trim(),
    };

    // ✅ Check duplicate email
    const userExists = users.find(
      (user) => user.email === newUser.email
    );

    if (userExists) {
      alert("User already exists ❌");
      return;
    }

    // ✅ Save user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful ✅");

    reset();
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit(submitLogic)}>

        <h2>Sign Up</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        {/* Mobile */}
        <input
          type="tel"
          placeholder="Mobile Number"
          {...register("mobile", { required: true })}
        />

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default Register;
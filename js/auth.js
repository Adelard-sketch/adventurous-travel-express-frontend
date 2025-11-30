// Login
const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const res = await api.post("/api/auth/login", { email, password });
    console.log('Login response:', res);
    
    if (res.success && res.token) {
      localStorage.setItem("token", res.token);
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      alert("Login successful!");
      
      // Redirect admin users directly to admin dashboard
      if (res.user && res.user.role === 'admin') {
        window.location.href = "admin.html";
      } else {
        window.location.href = "dashboard.html";
      }
    } else {
      alert(res.message || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error('Login error:', err);
    alert("Login failed. Please check your credentials.");
  }
});

// Signup
const signupForm = document.getElementById("signupForm");

signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = signupForm.name.value;
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  try {
    const res = await api.post("/api/auth/register", { name, email, password });
    console.log('Signup response:', res);
    
    if (res.success && res.token) {
      localStorage.setItem("token", res.token);
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      alert("Signup successful!");
      window.location.href = "dashboard.html";
    } else {
      alert(res.message || "Signup failed. Please try again.");
    }
  } catch (err) {
    console.error('Signup error:', err);
    alert("Signup failed. Please check your information.");
  }
});


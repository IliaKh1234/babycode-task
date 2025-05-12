import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const instance = axios.create(); 
const mock = new MockAdapter(instance, { delayResponse: 1000 });

const students = [
  { id: 1, name: "Luka", email: "luka@example.com", course: "Math", status: "Active" },
  { id: 2, name: "Nino", email: "nino@example.com", course: "Physics", status: "Inactive" },
];

const admin = {
  id: 3,
  name: "admin",
  email: "admin@example.com",
  password: "admin123",
};

// Students endpoint
mock.onGet("/students").reply(200, students);

// Login endpoint
mock.onPost("/login").reply(config => {
  const { email, password } = JSON.parse(config.data);

  if (email === admin.email && password === admin.password) {
    return [200, admin];
  } else {
    return [401, { message: "Invalid credentials" }];
  }
});

export default instance;

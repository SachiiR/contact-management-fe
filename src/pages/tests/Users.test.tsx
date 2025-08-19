import API from "../../api";
import { User } from "../../types/user";

// Mock API module
jest.mock("../api");
const mockedAPI = API as jest.Mocked<typeof API>;

// Mock navigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("UsersPage", () => {
  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "user" },
    { id: "2", name: "Jane Doe", email: "jane@example.com", role: "user" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });
});

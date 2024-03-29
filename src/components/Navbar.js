import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../contexts/AuthContext";
import report from "../report/Network_Time_IP_Logs_Report_SYN_Flood_Full Traffic.pdf";

function Navbar() {
  //= () => (

  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Get logout function from context

  const tohome = () => {
    navigate("/home");
  };
  const update = () => {
    navigate("/update-profile");
  };

  const handlelogout = async () => {
    try {
      await logout();
      navigate("/login"); // Navigate to login page after successful logout
    } catch (error) {
      // Handle logout error (e.g., show an alert to the user)
    }
  };

  const generateReport = () => {
    const link = document.createElement("a");
    link.href = report;
    link.download = "network-report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid" style={{ backgroundColor: "#d4ecff" }}>
        <a class="navbar-brand" href="#" onClick={tohome}>
          N-SAM
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Options
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" onClick={update}>
                    Update password
                  </a>
                </li>
                <li>
                  <button class="dropdown-item" onClick={generateReport}>
                    Generate Report
                  </button>
                </li>
                <li>
                  <hr class="dropdown-divider"></hr>
                </li>
                <li>
                  <a class="dropdown-item" href="#" onClick={handlelogout}>
                    Log Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div className="profile-section">
            <button className="user-icon-btn">
              <img
                className="user-icon"
                src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                alt="User Icon"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

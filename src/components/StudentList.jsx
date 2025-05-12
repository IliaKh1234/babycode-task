import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"; 
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase"; // Make sure db is exported


const StudentList = () => {
  const [students, setStudents] = useState([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate()


  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true)
    });
    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAuthChecked(false)
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed");
    }
  };
  
useEffect(() => {
    const fetchStudents = async () => {
        try {
          setLoading(true);
          const querySnapshot = await getDocs(collection(db, "students"));
          const studentsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStudents(studentsData);
          setError(null);
        } catch (err) {
          setError("Failed to fetch students. Please try again later.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
  fetchStudents();
}, []);

  const filtered = filter
    ? students.filter((s) =>
        s.course.toLowerCase().includes(filter.toLowerCase())
      )
    : students

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return { backgroundColor: "#d1fae5", color: "#065f46" }
      case "inactive":
        return { backgroundColor: "#f3f4f6", color: "#1f2937" }
      case "pending":
        return { backgroundColor: "#fef3c7", color: "#92400e" }
      default:
        return { backgroundColor: "#dbeafe", color: "#1e40af" }
    }
  }

  const styles = {
    container: {
      maxWidth: "100%",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      height: "100vh",
    },
    header: {
      padding: "16px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "space-between",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "12px",
    },
    searchContainer: {
      position: "relative",
      marginTop: "8px",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: "14px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      textAlign: "left",
      padding: "12px 16px",
      borderBottom: "1px solid #e5e7eb",
      fontSize: "12px",
      fontWeight: "bold",
      color: "#6b7280",
    },
    td: {
      padding: "12px 16px",
      borderBottom: "1px solid #e5e7eb",
    },
    studentName: {
      fontWeight: "bold",
      marginBottom: "4px",
    },
    studentEmail: {
      fontSize: "14px",
      color: "#6b7280",
    },
    statusBadge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
    },
    loadingItem: {
      padding: "12px 16px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
    },
    loadingBar: {
      height: "16px",
      backgroundColor: "#f3f4f6",
      borderRadius: "4px",
      marginBottom: "8px",
    },
    errorMessage: {
      padding: "16px",
      textAlign: "center",
      color: "#ef4444",
    },
    emptyMessage: {
      padding: "16px",
      textAlign: "center",
      color: "#6b7280",
    },
    logIn: {
      backgroundColor: "#2264E5",
      padding: "5px 20px",
      color: "white",
      outline: "none",
      border: "none",
      cursor: "pointer",
      borderRadius: "15px",
      fontSize: "20px",
      marginRight: "40px",
      marginTop: "10px",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Student List</h2>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by course..."
              style={styles.searchInput}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div>
          {authChecked ? (
              <>
            <button onClick={() => navigate("/add")} style={styles.logIn}>
              Add Student
            </button>
               <button onClick={handleLogout} style={styles.logIn}>Log Out</button>
               </>
          ) : (
            <button onClick={() => navigate("/login")} style={styles.logIn}>
              Log In
            </button>
          )}
        </div>
      </div>

      {error && <div style={styles.errorMessage}>{error}</div>}

      {loading ? (
        <div>
          {[1, 2, 3].map((i) => (
            <div key={i} style={styles.loadingItem}>
              <div style={{ width: "60%" }}>
                <div style={{ ...styles.loadingBar, width: "200px" }}></div>
                <div style={{ ...styles.loadingBar, width: "150px" }}></div>
              </div>
              <div style={{ width: "20%" }}>
                <div style={{ ...styles.loadingBar, width: "80px" }}></div>
              </div>
              <div style={{ width: "20%" }}>
                <div style={{ ...styles.loadingBar, width: "60px" }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>STUDENT</th>
              <th style={styles.th}>COURSE</th>
              <th style={styles.th}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} style={styles.emptyMessage}>
                  No students found matching your search criteria.
                </td>
              </tr>
            ) : (
              filtered.map((student) => (
                <tr key={student.id}>
                  <td style={styles.td}>
                    <div style={styles.studentName}>{student.name}</div>
                    <div style={styles.studentEmail}>{student.email}</div>
                  </td>
                  <td style={styles.td}>{student.course}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        ...getStatusStyle(student.status),
                      }}
                    >
                      {student.status || "No status"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StudentList

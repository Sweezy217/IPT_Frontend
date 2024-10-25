export const postUserWorkSpace = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/createWorkspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return [response.json(), null];
    } else {
      console.error("Failed to add user");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const inviteUser = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return [response.json(), null];
    } else {
      console.error("Failed to Invite Member");
    }
  } catch (error) {
    console.error("Error Invite Member:", error);
  }
};

export const getUserWorkSpaces = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/workspaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return [response.json(), null];
    } else {
      console.error("Failed to get User WorkSpaces");
    }
  } catch (error) {
    console.error("Error getting User WorkSpaces:", error);
  }
};

export const fetchTeamMembers = async (org) => {
  try {
    const response = await fetch(`http://localhost:8000/teamMembers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ org: org }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("123datadata", data);
      return [data.teamMembers, null];
    } else {
      const error = `Failed to get team members: ${response.statusText}`;
      console.error(error);
      return [null, error];
    }
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [null, error.message];
  }
};

export const fetchUserWorkspaces = async (email) => {
  try {
    const response = await fetch(
      `http://localhost:8000/userWorkSpaces?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return [data.message, null];
    } else {
      const error = `Failed to get workspaces: ${response.statusText}`;
      console.error(error);
      return [null, error];
    }
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return [null, error.message];
  }
};

export const createTask = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check for network errors or non-2xx status codes
    if (!response.ok) {
      const errorMessage = await response.text(); // Read the error message from the server
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }

    // Validate the response is JSON
    const result = await response.json();

    console.log("Task created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating task:", error.message || error);
    return { error: error.message || "An unknown error occurred" };
  }
};

export const getUserTasks = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/getTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }

    const result = await response.json();
    return [result, null];
  } catch (error) {
    console.error("Error creating task:", error.message || error);
    return [null, { error: error.message || "An unknown error occurred" }];
  }
};

export const signUp = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      return [null, result.message];
    }

    const result = await response.json();
    return [result, null];
  } catch (error) {
    console.error("Error adding user:", error);
    return [null, error.message];
  }
};

export const login = async (data) => {
  // const base64Cred = btoa(`${data.email}:${data.password}`).toString(
  //   "base64"
  // );
  // console.log("base64Cred", base64Cred);
  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Basic ${base64Cred}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      return [null, result.message];
    }

    const result = await response.json();
    return [result, null];
  } catch (error) {
    return [null, `"Error loggind user in:", ${error}`];
  }
};
export const deleteTeamMember = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return [true, null];
  } catch (error) {
    console.error("Error deleting Member:", error);
    return [null, error];
  }
};

export const editTeamMember = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/editmember", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return [true, null];
  } catch (error) {
    console.error("Error editing Member:", error);
    return [null, error];
  }
};

export const addProject = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/addProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return [null, `Error: ${response.status} - ${errorMessage}`];
    }

    const result = await response.json();
    return [result, null];
  } catch (error) {
    return [null, { error: error.message || "An unknown error occurred" }];
  }
};

export const getProjects = async (workspaceName) => {
  try {
    const response = await fetch("http://localhost:8000/getProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workspaceName: workspaceName }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return [null, `Error: ${response.status} - ${errorMessage}`];
    }

    const result = await response.json();
    return [result.message, null];
  } catch (error) {
    return [null, { error: error.message || "An unknown error occurred" }];
  }
};

export const uploadImg = async (formData) => {
  try {
    const response = await fetch("http://localhost:8000/upload-profile-image", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    return ["Image uploaded successfully:", result];
  } catch (err) {
    return ["Error uploading image:", err];
  }
};

export const deleteTask = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/deletetask", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return [true, null];
  } catch (error) {
    console.error("Error deleting task:", error);
    return [null, error];
  }
};
const apiUrl = "https://clumsy-blog.herokuapp.com";

export const ping = async () => {
  try {
    const res = await fetch(apiUrl);
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const userSignup = async (user) => {
  try {
    const response = await fetch(`${apiUrl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const userLogin = async (user) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const userLogout = async () => {
  try {
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const myProfile = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/user/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const viewBlog = async (id, token) => {
  try {
    const response = await fetch(`${apiUrl}/blog/${id}/view`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const newPost = async (post, token) => {
  try {
    const response = await fetch(`${apiUrl}/blog/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(post),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addComment = async (id, comment, token) => {
  try {
    const response = await fetch(`${apiUrl}/blog/${id}/comment/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

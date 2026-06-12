console.clear();
const base = "http://localhost:3000";

const functions = {
  async postCourse() {
    const res = await fetch(base + "/lms/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cursoReact),
    });
    const body = await res.json();
    console.table(body);
  },

  async postLesson(lesson) {
    const res = await fetch(base + "/lms/lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lesson),
    });
    const body = await res.json();
    console.table(body);
  },

  async getCourses() {
    const res = await fetch(base + "/lms/courses");
    const body = await res.json();
    console.log(body);
  },

  async getCourse() {
    const res = await fetch(base + "/lms/course/javascript-completo");
    const body = await res.json();
    console.log(body);
  },

  async getLesson() {
    const res = await fetch(
      base + "/lms/lesson/javascript-completo/funcoes-basico",
    );
    const body = await res.json();
    console.log(body);
  },

  async postUser() {
    const res = await fetch(base + "/auth/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "André Rafael",
        username: "andre",
        email: "andre@origamid.com",
        password: "12345678",
      }),
    });
    const body = await res.json();
    console.table(body);
  },
};

if (process.argv[2]) {
  functions[process.argv[2]]();
}

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
    const res = await fetch(base + "/lms/course/html-e-css");
    const body = await res.json();
    console.log(body);
  },

  async getLesson() {
    const res = await fetch(base + "/lms/lesson/html-e-css/tags-basicas");
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

  async completeLesson() {
    const res = await fetch(base + "/lms/lesson/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: process.argv[3],
        lessonId: process.argv[4],
      }),
    });
    const body = await res.json();
    console.log(body);
  },

  async resetCourse() {
    const res = await fetch(base + "/lms/course/reset", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: 1,
      }),
    });
    const body = await res.json();
    console.table(body);
  },

  async getCertificates() {
    const res = await fetch(base + "/lms/certificates");
    const body = await res.json();
    console.log(body);
  },

  async getCertificate() {
    const res = await fetch(base + "/lms/certificate/" + process.argv[3]);
    const body = await res.json();
    console.log(body);
  },
};

if (process.argv[2]) {
  functions[process.argv[2]]();
}

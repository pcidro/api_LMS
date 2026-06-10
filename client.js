console.clear();
const base = "http://localhost:3000";

const functions = {
  async postCourse() {
    const res = await fetch(base + "/lms/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courses.javascript),
    });
    const body = await res.json();
    console.table(body);
  },

  async postLesson(lesson) {
    const res = await fetch(base + "/lms/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lesson),
    });
    const body = await res.json();
    console.table(body);
  },
};

if (process.argv[2]) {
  functions[process.argv[2]]();
}
